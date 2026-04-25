import { useAuth } from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { useProgress } from "../hooks/useProgress";
import { useMemo, useState } from "react";
import { ProgressStats, CategoryStats } from "../data/types";
import { StatCard } from "../components/StatCard.tsx";
import { LoadingSpinner } from "../components/LoadingSpinner.tsx";
import {
  getOrganizedCategories,
  getTotalQuestionCount,
  getAllQuestionsWithCategories,
} from "../data/dataLoader";

// Time-based greeting helper
function getTimeOfDay(): string {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  if (hour < 21) return "Good evening";
  return "Good night";
}

// Random greeting messages - perky and energetic!
const GREETINGS = [
  "Ready to crush that interview? Let's go! 🚀",
  "Time to level up your skills! 💪",
  "You're on fire! Keep the momentum going! 🔥",
  "Let's ace this together! 🎯",
  "Your dream job is waiting - let's prep! ✨",
  "Feeling unstoppable today? You should! 💫",
  "Let's turn those nerves into confidence! ⚡",
  "Practice time! You're getting better every day! 📈",
  "Ready to show them what you've got? 🌟",
  "Let's make today count! 🎉",
  "Time to shine - you've got this! ✨",
  "Bringing your A-game today? Absolutely! 🏆",
  "Let's do this! Success is just around the corner! 🎊",
  "Feeling powerful? You are! 💥",
  "Let's turn preparation into domination! 🚀",
];

export default function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { progress, loading, error } = useProgress();

  // Combine time-based greeting with random message
  const [greeting] = useState(() => {
    const timeGreeting = getTimeOfDay();
    const randomMessage =
      GREETINGS[Math.floor(Math.random() * GREETINGS.length)];
    return `${timeGreeting}! ${randomMessage}`;
  });

  // Get categories and question counts dynamically from JSON
  const categories = useMemo(() => getOrganizedCategories(), []);
  const totalQuestions = useMemo(() => getTotalQuestionCount(), []);
  const allQuestions = useMemo(() => getAllQuestionsWithCategories(), []);

  // Calculate stats dynamically from questions object
  const stats = useMemo<ProgressStats>(() => {
    if (!progress || !progress.questions) {
      return {
        total: totalQuestions,
        done: 0,
        revisit: 0,
        pending: totalQuestions,
        skipped: 0,
        avgConfidence: 0,
        byCategory: {},
      };
    }

    // Use stats from Firestore if available (should be synced by recalculateStats)
    if (progress.stats) {
      console.log("📊 Using stats from Firestore:", progress.stats);
      return progress.stats;
    }

    // Fallback: calculate stats client-side if not in Firestore yet
    console.log("⚠️ Stats not in Firestore, calculating client-side...");


    const questions = progress.questions;
    let done = 0;
    let revisit = 0;
    let skipped = 0;
    let totalConfidence = 0;
    let confidenceCount = 0;

    const byCategory: Record<string, CategoryStats> = {};

    // Initialize category stats from actual data
    categories.forEach((cat) => {
      const categoryTotal = allQuestions.filter(
        (q) => q.categoryId === cat.id
      ).length;

      byCategory[cat.id] = {
        total: categoryTotal,
        done: 0,
        revisit: 0,
        pending: categoryTotal,
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

      // Update category stats - find the category for this question
      const questionData = allQuestions.find((aq) => aq.id === q.questionId);
      if (questionData && byCategory[questionData.categoryId]) {
        if (q.status === "done") byCategory[questionData.categoryId].done++;
        else if (q.status === "revisit")
          byCategory[questionData.categoryId].revisit++;
      }
    });

    // Calculate pending for each category
    Object.keys(byCategory).forEach((catId) => {
      byCategory[catId].pending =
        byCategory[catId].total -
        byCategory[catId].done -
        byCategory[catId].revisit;
    });

    return {
      total: totalQuestions,
      done,
      revisit,
      pending: totalQuestions - done - revisit - skipped,
      skipped,
      avgConfidence:
        confidenceCount > 0 ? totalConfidence / confidenceCount : 0,
      byCategory,
    };
  }, [progress, categories, totalQuestions, allQuestions]);

  if (loading) return <LoadingSpinner />;

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
      <div style={{ marginBottom: 24 }}>
        <p
          className="text-muted"
          style={{
            fontSize: "1rem",
            letterSpacing: "0.01em",
            marginBottom: 6,
            fontWeight: 700,
          }}
        >
          {greeting}
        </p>
        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(1.4rem, 5vw, 1.8rem)",
            fontWeight: 700,
            letterSpacing: "-0.02em",
            wordBreak: "break-word",
          }}
        >
          {user?.displayName?.split(" ")[0]}'s Prep Board
        </h1>
      </div>

      {/* Overview Stats */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(110px, 1fr))",
          gap: 10,
          marginBottom: 24,
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

            // Find category info from loaded data
            const categoryData = categories.find((cat) => cat.id === categoryId);
            const info = categoryData
              ? {
                  icon: categoryData.icon,
                  name: categoryData.name,
                  color: categoryData.color,
                }
              : {
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
          style={{
            width: "100%",
            justifyContent: "center",
            padding: "12px 14px",
            minHeight: "48px",
          }}
        >
          📋 Continue Learning
        </button>
        {stats.revisit > 0 && (
          <div
            style={{
              marginTop: 16,
              padding: "12px 14px",
              background: "var(--amber-glow)",
              border: "1px solid var(--amber-dim)",
              borderRadius: "var(--radius)",
              fontSize: "0.8rem",
              color: "var(--amber)",
              lineHeight: 1.5,
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
