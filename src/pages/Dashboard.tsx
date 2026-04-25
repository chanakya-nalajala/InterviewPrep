// src/pages/Dashboard.tsx
import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { useProgress } from "../hooks/useProgress";
import { useMemo } from "react";
import { ProgressStats, CategoryStats } from "../data/types";

// Import all questions to get category IDs
import { javaCoreQuestions } from "../data/questions/javaCoreQuestions";
import { javaCollectionsQuestions } from "../data/questions/javaCollectionsQuestions";
import { javaQuestions } from "../data/questions/javaQuestions";
import { springQuestions } from "../data/questions/springQuestions";
import { microservicesQuestions } from "../data/questions/microservicesQuestions";
import { angularQuestions } from "../data/questions/angularQuestions";
import { kafkaQuestions } from "../data/questions/kafkaQuestions";

const CATEGORY_INFO: Record<
  string,
  { icon: string; name: string; color: string }
> = {
  "java-core": { icon: "☕", name: "Java Core", color: "var(--amber)" },
  "java-collections": { icon: "📦", name: "Collections", color: "var(--blue)" },
  "java-concurrency": {
    icon: "⚡",
    name: "Concurrency",
    color: "var(--purple)",
  },
  "java-jvm": { icon: "🔧", name: "JVM & Memory", color: "var(--orange)" },
  "java-modern": { icon: "🚀", name: "Modern Java", color: "var(--cyan)" },
  "spring-core": { icon: "🍃", name: "Spring Core", color: "var(--green)" },
  "spring-boot": { icon: "🚀", name: "Spring Boot", color: "var(--lime)" },
  "spring-data": { icon: "💾", name: "Spring Data", color: "var(--teal)" },
  "spring-security": {
    icon: "🔒",
    name: "Spring Security",
    color: "var(--red)",
  },
  "spring-web": { icon: "🌐", name: "Spring Web", color: "var(--indigo)" },
  microservices: { icon: "🏗️", name: "Microservices", color: "var(--purple)" },
  angular: { icon: "🅰️", name: "Angular", color: "var(--red)" },
  kafka: { icon: "📨", name: "Apache Kafka", color: "var(--purple)" },
};

// Map to get category from question ID
const QUESTION_TO_CATEGORY: Record<string, string> = {};

// Helper to determine subcategory from section ID
function getJavaSubcategory(sectionId: string): string {
  // Concurrency sections
  if (
    sectionId.includes("concurrency") ||
    sectionId.includes("thread") ||
    sectionId.includes("lock") ||
    sectionId.includes("atomic") ||
    sectionId.includes("executor") ||
    sectionId.includes("completable") ||
    sectionId.includes("deadlock")
  ) {
    return "java-concurrency";
  }
  // JVM sections
  if (
    sectionId.includes("jvm") ||
    sectionId.includes("memory") ||
    sectionId.includes("gc") ||
    sectionId.includes("classloader")
  ) {
    return "java-jvm";
  }
  // Modern Java sections
  if (
    sectionId.includes("modern") ||
    sectionId.includes("lambda") ||
    sectionId.includes("stream") ||
    sectionId.includes("optional") ||
    sectionId.includes("record") ||
    sectionId.includes("virtual-thread")
  ) {
    return "java-modern";
  }
  // Collections sections
  if (
    sectionId.includes("collection") ||
    sectionId.includes("list") ||
    sectionId.includes("map") ||
    sectionId.includes("set") ||
    sectionId.includes("queue") ||
    sectionId.includes("comparable")
  ) {
    return "java-collections";
  }
  // Default to java-core
  return "java-core";
}

// Populate question-to-category mapping
javaCoreQuestions.sections.forEach((section) => {
  section.interviewQuestions.forEach((q) => {
    QUESTION_TO_CATEGORY[q.id] = "java-core";
  });
  section.scenarioQuestions.forEach((q) => {
    QUESTION_TO_CATEGORY[q.id] = "java-core";
  });
});

javaCollectionsQuestions.sections.forEach((section) => {
  section.interviewQuestions.forEach((q) => {
    QUESTION_TO_CATEGORY[q.id] = "java-collections";
  });
  section.scenarioQuestions.forEach((q) => {
    QUESTION_TO_CATEGORY[q.id] = "java-collections";
  });
});

// Map javaQuestions sections to appropriate subcategories
javaQuestions.sections.forEach((section) => {
  const categoryId = getJavaSubcategory(section.id);
  section.interviewQuestions.forEach((q) => {
    QUESTION_TO_CATEGORY[q.id] = categoryId;
  });
  section.scenarioQuestions.forEach((q) => {
    QUESTION_TO_CATEGORY[q.id] = categoryId;
  });
});

springQuestions.sections.forEach((section) => {
  let categoryId = "spring-core";
  if (section.id.includes("boot")) categoryId = "spring-boot";
  else if (section.id.includes("data") || section.id.includes("jpa"))
    categoryId = "spring-data";
  else if (section.id.includes("security")) categoryId = "spring-security";
  else if (
    section.id.includes("web") ||
    section.id.includes("rest") ||
    section.id.includes("mvc")
  )
    categoryId = "spring-web";

  section.interviewQuestions.forEach((q) => {
    QUESTION_TO_CATEGORY[q.id] = categoryId;
  });
  section.scenarioQuestions.forEach((q) => {
    QUESTION_TO_CATEGORY[q.id] = categoryId;
  });
});

microservicesQuestions.sections.forEach((section) => {
  section.interviewQuestions.forEach((q) => {
    QUESTION_TO_CATEGORY[q.id] = "microservices";
  });
  section.scenarioQuestions.forEach((q) => {
    QUESTION_TO_CATEGORY[q.id] = "microservices";
  });
});

angularQuestions.sections.forEach((section) => {
  section.interviewQuestions.forEach((q) => {
    QUESTION_TO_CATEGORY[q.id] = "angular";
  });
  section.scenarioQuestions.forEach((q) => {
    QUESTION_TO_CATEGORY[q.id] = "angular";
  });
});

kafkaQuestions.sections.forEach((section) => {
  section.interviewQuestions.forEach((q) => {
    QUESTION_TO_CATEGORY[q.id] = "kafka";
  });
  section.scenarioQuestions.forEach((q) => {
    QUESTION_TO_CATEGORY[q.id] = "kafka";
  });
});

export default function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { progress, loading, error } = useProgress();

  // Calculate stats dynamically from questions object
  const stats = useMemo<ProgressStats>(() => {
    if (!progress || !progress.questions) {
      return {
        total: 818,
        done: 0,
        revisit: 0,
        pending: 818,
        skipped: 0,
        avgConfidence: 0,
        byCategory: {},
      };
    }

    const questions = progress.questions;
    let done = 0;
    let revisit = 0;
    let skipped = 0;
    let totalConfidence = 0;
    let confidenceCount = 0;

    const byCategory: Record<string, CategoryStats> = {};

    // Initialize category stats
    Object.keys(CATEGORY_INFO).forEach((catId) => {
      byCategory[catId] = {
        total: 0,
        done: 0,
        revisit: 0,
        pending: 0,
        avgConfidence: 0,
      };
    });

    // Calculate from actual question progress
    Object.values(questions).forEach((q) => {
      if (q.status === "done") done++;
      else if (q.status === "revisit") revisit++;
      else if (q.status === "skipped") skipped++;

      if (q.confidence > 0) {
        totalConfidence += q.confidence;
        confidenceCount++;
      }

      // Update category stats
      const categoryId = QUESTION_TO_CATEGORY[q.questionId];
      if (categoryId && byCategory[categoryId]) {
        if (q.status === "done") byCategory[categoryId].done++;
        else if (q.status === "revisit") byCategory[categoryId].revisit++;
      }
    });

    // Set totals for each category (from our static data)
    byCategory["java-core"].total = 92;
    byCategory["java-collections"].total = 90;
    byCategory["java-concurrency"].total = 80;
    byCategory["java-jvm"].total = 40;
    byCategory["java-modern"].total = 50;
    byCategory["spring-core"].total = 41;
    byCategory["spring-boot"].total = 40;
    byCategory["spring-data"].total = 30;
    byCategory["spring-security"].total = 20;
    byCategory["spring-web"].total = 71;
    byCategory["microservices"].total = 60;
    byCategory["angular"].total = 100;
    byCategory["kafka"].total = 80;

    // Calculate pending for each category
    Object.keys(byCategory).forEach((catId) => {
      byCategory[catId].pending =
        byCategory[catId].total -
        byCategory[catId].done -
        byCategory[catId].revisit;
    });

    return {
      total: 818,
      done,
      revisit,
      pending: 818 - done - revisit - skipped,
      skipped,
      avgConfidence:
        confidenceCount > 0 ? totalConfidence / confidenceCount : 0,
      byCategory,
    };
  }, [progress]);

  if (loading) return <Spinner />;

  // Show setup instructions if permissions error
  if (error) {
    return <FirebaseSetupInstructions />;
  }

  const completionPct = stats.total
    ? Math.round((stats.done / stats.total) * 100)
    : 0;

  return (
    <div className="animate-in" style={{ padding: "0 0 40px" }}>
      {/* Hero */}
      <div style={{ marginBottom: 32 }}>
        <p
          className="text-muted"
          style={{
            fontSize: "0.75rem",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            marginBottom: 6,
          }}
        >
          Welcome back
        </p>
        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "1.8rem",
            fontWeight: 800,
            letterSpacing: "-0.02em",
          }}
        >
          {user?.displayName?.split(" ")[0]}'s Prep Board
        </h1>
      </div>

      {/* Overview Stats */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
          gap: 12,
          marginBottom: 28,
        }}
      >
        <StatCard label="Total" value={stats.total} color="var(--text)" />
        <StatCard label="Done" value={stats.done} color="var(--green)" />
        <StatCard label="Revisit" value={stats.revisit} color="var(--amber)" />
        <StatCard label="Pending" value={stats.pending} color="var(--muted)" />
        <StatCard
          label="Avg Confidence"
          value={
            stats.avgConfidence > 0
              ? `${stats.avgConfidence.toFixed(1)}/5`
              : "N/A"
          }
          color="var(--blue)"
        />
      </div>

      {/* Overall Progress */}
      <div className="card" style={{ marginBottom: 24 }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 12,
          }}
        >
          <span
            style={{
              fontSize: "0.78rem",
              color: "var(--muted)",
              textTransform: "uppercase",
              letterSpacing: "0.08em",
            }}
          >
            Overall Completion
          </span>
          <span
            style={{
              fontWeight: 700,
              color: completionPct === 100 ? "var(--green)" : "var(--amber)",
              fontSize: "1.1rem",
            }}
          >
            {completionPct}%
          </span>
        </div>
        <div className="progress-track">
          <div
            className="progress-fill"
            style={{
              width: `${completionPct}%`,
              background:
                completionPct === 100 ? "var(--green)" : "var(--amber)",
            }}
          />
        </div>
      </div>

      {/* Per-Category Breakdown */}
      <div className="card" style={{ marginBottom: 24 }}>
        <h2
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "0.95rem",
            marginBottom: 20,
            color: "var(--muted)",
            textTransform: "uppercase",
            letterSpacing: "0.08em",
          }}
        >
          Progress by Category
        </h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {Object.entries(stats.byCategory).map(([categoryId, catStats]) => {
            const pct = catStats.total
              ? Math.round((catStats.done / catStats.total) * 100)
              : 0;
            const info = CATEGORY_INFO[categoryId] || {
              icon: "📌",
              name: categoryId,
              color: "var(--text)",
            };
            return (
              <div key={categoryId}>
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: 6,
                  }}
                >
                  <div
                    style={{ display: "flex", alignItems: "center", gap: 8 }}
                  >
                    <span style={{ fontSize: "1rem" }}>{info.icon}</span>
                    <span style={{ fontSize: "0.82rem", color: "var(--text)" }}>
                      {info.name}
                    </span>
                  </div>
                  <span style={{ fontSize: "0.75rem", color: "var(--muted)" }}>
                    {catStats.done}/{catStats.total} &nbsp;·&nbsp;
                    <span
                      style={{
                        color: pct === 100 ? "var(--green)" : "var(--amber)",
                      }}
                    >
                      {pct}%
                    </span>
                  </span>
                </div>
                <div className="progress-track">
                  <div
                    className="progress-fill"
                    style={{
                      width: `${pct}%`,
                      background: pct === 100 ? "var(--green)" : info.color,
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="card">
        <h2
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "0.95rem",
            marginBottom: 16,
            color: "var(--muted)",
            textTransform: "uppercase",
            letterSpacing: "0.08em",
          }}
        >
          Quick Actions
        </h2>
        <button
          className="btn btn-primary"
          onClick={() => navigate("/interview")}
          style={{ width: "100%", justifyContent: "center", padding: "14px" }}
        >
          📋 Continue Learning
        </button>
        {stats.revisit > 0 && (
          <div
            style={{
              marginTop: 16,
              padding: "14px 16px",
              background: "var(--amber-glow)",
              border: "1px solid var(--amber-dim)",
              borderRadius: "var(--radius)",
              fontSize: "0.8rem",
              color: "var(--amber)",
            }}
          >
            ⚡ You have <strong>{stats.revisit}</strong> question
            {stats.revisit > 1 ? "s" : ""} marked for revisit!
          </div>
        )}
      </div>
    </div>
  );
}

interface StatCardProps {
  label: string;
  value: number | string;
  color: string;
}

function StatCard({ label, value, color }: StatCardProps) {
  return (
    <div className="card" style={{ textAlign: "center", padding: "16px 12px" }}>
      <div
        style={{
          fontSize: "1.6rem",
          fontWeight: 700,
          color,
          fontFamily: "var(--font-display)",
        }}
      >
        {value}
      </div>
      <div
        style={{
          fontSize: "0.7rem",
          color: "var(--muted)",
          marginTop: 4,
          textTransform: "uppercase",
          letterSpacing: "0.06em",
        }}
      >
        {label}
      </div>
    </div>
  );
}

function Spinner() {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: 300,
      }}
    >
      <div
        style={{
          width: 32,
          height: 32,
          border: "2px solid var(--border)",
          borderTopColor: "var(--amber)",
          borderRadius: "50%",
          animation: "spin 0.7s linear infinite",
        }}
      />
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

function FirebaseSetupInstructions() {
  return (
    <div
      className="card"
      style={{ maxWidth: 700, margin: "40px auto", padding: 32 }}
    >
      <div style={{ textAlign: "center", marginBottom: 24 }}>
        <div style={{ fontSize: "3rem", marginBottom: 12 }}>🔒</div>
        <h2
          style={{ fontSize: "1.5rem", marginBottom: 8, color: "var(--amber)" }}
        >
          Firebase Setup Required
        </h2>
        <p style={{ color: "var(--muted)", fontSize: "0.9rem" }}>
          Please configure Firestore security rules to enable progress tracking
        </p>
      </div>

      <div
        style={{
          background: "var(--surface)",
          padding: 20,
          borderRadius: 8,
          marginBottom: 20,
        }}
      >
        <h3
          style={{
            fontSize: "0.85rem",
            marginBottom: 12,
            color: "var(--text)",
          }}
        >
          📋 Step 1: Go to Firebase Console
        </h3>
        <ol
          style={{
            fontSize: "0.85rem",
            color: "var(--muted)",
            lineHeight: 1.8,
            paddingLeft: 20,
          }}
        >
          <li>
            Open{" "}
            <a
              href="https://console.firebase.google.com/"
              target="_blank"
              rel="noopener noreferrer"
              style={{ color: "var(--blue)" }}
            >
              Firebase Console
            </a>
          </li>
          <li>
            Select your project:{" "}
            <code
              style={{
                background: "var(--bg)",
                padding: "2px 6px",
                borderRadius: 4,
              }}
            >
              interview-prep-29587
            </code>
          </li>
          <li>
            Click <strong>Firestore Database</strong> in the left menu
          </li>
          <li>
            Click the <strong>Rules</strong> tab
          </li>
        </ol>
      </div>

      <div
        style={{
          background: "var(--surface)",
          padding: 20,
          borderRadius: 8,
          marginBottom: 20,
        }}
      >
        <h3
          style={{
            fontSize: "0.85rem",
            marginBottom: 12,
            color: "var(--text)",
          }}
        >
          📝 Step 2: Add These Security Rules
        </h3>
        <pre
          style={{
            background: "var(--bg)",
            padding: 16,
            borderRadius: 6,
            fontSize: "0.75rem",
            overflowX: "auto",
            color: "var(--text)",
            border: "1px solid var(--border)",
          }}
        >
          {`rules_version = '2';

service cloud.firestore {
  match /databases/{database}/documents {
    match /userProgress/{userId} {
      allow read, write: if request.auth != null
                         && request.auth.uid == userId;
    }
  }
}`}
        </pre>
      </div>

      <div
        style={{
          background: "var(--surface)",
          padding: 20,
          borderRadius: 8,
          marginBottom: 24,
        }}
      >
        <h3
          style={{
            fontSize: "0.85rem",
            marginBottom: 12,
            color: "var(--text)",
          }}
        >
          ✅ Step 3: Publish Rules
        </h3>
        <p
          style={{
            fontSize: "0.85rem",
            color: "var(--muted)",
            lineHeight: 1.6,
          }}
        >
          Click the <strong>Publish</strong> button in Firebase Console, then
          refresh this page.
        </p>
      </div>

      <div
        style={{
          padding: 16,
          background: "var(--amber-glow)",
          border: "1px solid var(--amber-dim)",
          borderRadius: 8,
          fontSize: "0.8rem",
          color: "var(--text)",
        }}
      >
        💡 <strong>What these rules do:</strong> They allow authenticated users
        to read and write only their own progress data, keeping your learning
        journey private and secure.
      </div>
    </div>
  );
}
