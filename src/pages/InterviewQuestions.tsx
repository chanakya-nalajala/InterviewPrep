// src/pages/InterviewQuestions.tsx - Enhanced UI for Questions with Hints
import { useState } from "react";
import { javaCoreQuestions } from "../data/questions/javaCoreQuestions";
import { javaCollectionsQuestions } from "../data/questions/javaCollectionsQuestions";
import { javaQuestions } from "../data/questions/javaQuestions";
import { springQuestions } from "../data/questions/springQuestions";
import { microservicesQuestions } from "../data/questions/microservicesQuestions";
import { angularQuestions } from "../data/questions/angularQuestions";
import { kafkaQuestions } from "../data/questions/kafkaQuestions";
import { CategoryData, Question, QuestionStatus } from "../data/types";
import { useProgress } from "../hooks/useProgress";

export default function InterviewQuestions() {
  const [search, setSearch] = useState("");
  const [expandedSections, setExpandedSections] = useState<Set<string>>(
    new Set(),
  );
  const [visibleHints, setVisibleHints] = useState<Set<string>>(new Set());
  const { updateProgress, getQuestionStatus, getQuestionConfidence } =
    useProgress();

  // Provide default functions if hook fails
  const safeGetStatus =
    getQuestionStatus || (() => "pending" as QuestionStatus);
  const safeGetConfidence = getQuestionConfidence || (() => 0);
  const safeUpdateProgress = updateProgress || (async () => {});

  // Extract Concurrency, JVM, and Modern Java from comprehensive javaQuestions
  const concurrencySections = javaQuestions.sections.filter((s) =>
    s.id.startsWith("concurrency"),
  );
  const jvmSections = javaQuestions.sections.filter((s) =>
    s.id.startsWith("jvm"),
  );
  const modernJavaSections = javaQuestions.sections.filter((s) =>
    s.id.startsWith("modern"),
  );

  // Extract Spring Boot, Spring Data, Spring Security from comprehensive springQuestions
  const springCoreSections = springQuestions.sections.filter(
    (s) =>
      s.id.startsWith("spring-") &&
      !s.id.startsWith("boot-") &&
      !s.id.startsWith("data-") &&
      !s.id.startsWith("security-") &&
      !s.id.startsWith("web-") &&
      !s.id.startsWith("test-") &&
      !s.id.startsWith("advanced-"),
  );
  const springBootSections = springQuestions.sections.filter((s) =>
    s.id.startsWith("boot-"),
  );
  const springDataSections = springQuestions.sections.filter((s) =>
    s.id.startsWith("data-"),
  );
  const springSecuritySections = springQuestions.sections.filter((s) =>
    s.id.startsWith("security-"),
  );
  const springWebSections = springQuestions.sections.filter(
    (s) =>
      s.id.startsWith("web-") ||
      s.id.startsWith("test-") ||
      s.id.startsWith("advanced-"),
  );

  const javaConcurrencyQuestions: CategoryData = {
    id: "java-concurrency",
    name: "3. Concurrency & Multithreading",
    icon: "⚡",
    color: "var(--purple)",
    description:
      "Threads, Locks, Synchronization, Atomic, ExecutorService, CompletableFuture, ThreadLocal",
    sections: concurrencySections,
  };

  const javaJvmQuestions: CategoryData = {
    id: "java-jvm",
    name: "4. JVM & Memory Model",
    icon: "🔧",
    color: "var(--orange)",
    description:
      "JVM Architecture, Heap/Stack, Garbage Collection, Java Memory Model",
    sections: jvmSections,
  };

  const javaModernQuestions: CategoryData = {
    id: "java-modern",
    name: "5. Modern Java (8/11/17/21)",
    icon: "🚀",
    color: "var(--cyan)",
    description:
      "Lambda, Streams, Optional, Records, Sealed Classes, Virtual Threads",
    sections: modernJavaSections,
  };

  const springCoreQuestions: CategoryData = {
    id: "spring-core",
    name: "6. Spring Core",
    icon: "🍃",
    color: "var(--green)",
    description: "IoC, DI, Bean Lifecycle, AOP, ApplicationContext & Events",
    sections: springCoreSections,
  };

  const springBootQuestions: CategoryData = {
    id: "spring-boot",
    name: "7. Spring Boot",
    icon: "🚀",
    color: "var(--lime)",
    description: "Auto-Configuration, Profiles, Actuator, Testing",
    sections: springBootSections,
  };

  const springDataQuestions: CategoryData = {
    id: "spring-data",
    name: "8. Spring Data JPA",
    icon: "💾",
    color: "var(--teal)",
    description: "JPA, Hibernate, Transactions, Query Methods, Pagination",
    sections: springDataSections,
  };

  const springSecurityQuestions: CategoryData = {
    id: "spring-security",
    name: "9. Spring Security",
    icon: "🔒",
    color: "var(--red)",
    description:
      "Security Architecture, JWT, OAuth2, Authentication & Authorization",
    sections: springSecuritySections,
  };

  const springWebQuestions: CategoryData = {
    id: "spring-web",
    name: "10-12. Spring Web & Advanced",
    icon: "🌐",
    color: "var(--indigo)",
    description: "REST, WebClient, Testing, Async, Caching, Batch",
    sections: springWebSections,
  };

  const categories: CategoryData[] = [
    javaCoreQuestions,
    javaCollectionsQuestions,
    javaConcurrencyQuestions,
    javaJvmQuestions,
    javaModernQuestions,
    springCoreQuestions,
    springBootQuestions,
    springDataQuestions,
    springSecurityQuestions,
    springWebQuestions,
    microservicesQuestions,
    angularQuestions,
    kafkaQuestions,
  ];

  const toggleSection = (sectionId: string) => {
    setExpandedSections((prev) => {
      const next = new Set(prev);
      if (next.has(sectionId)) {
        next.delete(sectionId);
      } else {
        next.add(sectionId);
      }
      return next;
    });
  };

  const toggleHint = (questionId: string) => {
    setVisibleHints((prev) => {
      const next = new Set(prev);
      if (next.has(questionId)) {
        next.delete(questionId);
      } else {
        next.add(questionId);
      }
      return next;
    });
  };

  const filteredCategories = categories
    .map((cat) => ({
      ...cat,
      sections: cat.sections
        .map((section) => ({
          ...section,
          interviewQuestions: section.interviewQuestions.filter((q) =>
            q.question.toLowerCase().includes(search.toLowerCase()),
          ),
          scenarioQuestions: section.scenarioQuestions.filter((q) =>
            q.question.toLowerCase().includes(search.toLowerCase()),
          ),
        }))
        .filter(
          (s) =>
            s.interviewQuestions.length > 0 || s.scenarioQuestions.length > 0,
        ),
    }))
    .filter((cat) => cat.sections.length > 0);

  const totalQuestions = categories.reduce(
    (acc, cat) =>
      acc +
      cat.sections.reduce(
        (sAcc, sec) =>
          sAcc + sec.interviewQuestions.length + sec.scenarioQuestions.length,
        0,
      ),
    0,
  );

  return (
    <div className="animate-in" style={{ paddingBottom: 40 }}>
      {/* Header */}
      <div style={{ marginBottom: 28 }}>
        <p
          className="text-muted"
          style={{
            fontSize: "0.72rem",
            textTransform: "uppercase",
            letterSpacing: "0.1em",
            marginBottom: 4,
          }}
        >
          Complete Interview Guide
        </p>
        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "1.5rem",
            fontWeight: 800,
            letterSpacing: "-0.02em",
            marginBottom: 8,
          }}
        >
          Interview Questions & Scenarios
        </h1>
        <p style={{ fontSize: "0.85rem", color: "var(--muted)" }}>
          {totalQuestions}+ questions with detailed hints covering Java, Spring,
          Microservices, Angular
        </p>
      </div>

      {/* Search */}
      <div style={{ marginBottom: 24 }}>
        <input
          type="text"
          placeholder="🔍 Search questions..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{ maxWidth: 500 }}
        />
      </div>

      {/* Categories */}
      <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
        {filteredCategories.map((category) => (
          <div key={category.id}>
            {/* Category Header */}
            <div
              style={{
                marginBottom: 16,
                padding: "12px 16px",
                background: `${category.color}15`,
                border: `1px solid ${category.color}40`,
                borderRadius: 8,
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <span style={{ fontSize: "1.5rem" }}>{category.icon}</span>
                <div>
                  <h2
                    style={{
                      fontFamily: "var(--font-display)",
                      fontSize: "1.1rem",
                      fontWeight: 700,
                      color: category.color,
                      marginBottom: 2,
                    }}
                  >
                    {category.name}
                  </h2>
                  <p style={{ fontSize: "0.75rem", color: "var(--muted)" }}>
                    {category.description}
                  </p>
                </div>
              </div>
            </div>

            {/* Sections */}
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {category.sections.map((section) => (
                <SectionCard
                  key={section.id}
                  section={section}
                  isExpanded={expandedSections.has(section.id)}
                  onToggle={() => toggleSection(section.id)}
                  visibleHints={visibleHints}
                  onToggleHint={toggleHint}
                  categoryColor={category.color}
                  getQuestionStatus={safeGetStatus}
                  getQuestionConfidence={safeGetConfidence}
                  updateProgress={safeUpdateProgress}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ────────────────────────────────────────────────────────────────────────────

interface SectionCardProps {
  section: {
    id: string;
    name: string;
    interviewQuestions: Question[];
    scenarioQuestions: Question[];
  };
  isExpanded: boolean;
  onToggle: () => void;
  visibleHints: Set<string>;
  onToggleHint: (id: string) => void;
  categoryColor: string;
  getQuestionStatus: (id: string) => QuestionStatus;
  getQuestionConfidence: (id: string) => number;
  updateProgress: (
    questionId: string,
    status: QuestionStatus,
    confidence: number,
  ) => Promise<void>;
}

function SectionCard({
  section,
  isExpanded,
  onToggle,
  visibleHints,
  onToggleHint,
  categoryColor,
  getQuestionStatus,
  getQuestionConfidence,
  updateProgress,
}: SectionCardProps) {
  const totalQs =
    section.interviewQuestions.length + section.scenarioQuestions.length;

  return (
    <div
      className="card"
      style={{
        borderColor: isExpanded ? `${categoryColor}60` : "var(--border)",
        transition: "all 0.2s",
      }}
    >
      {/* Section Header */}
      <div
        onClick={onToggle}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          cursor: "pointer",
        }}
      >
        <div>
          <h3
            style={{
              fontSize: "0.95rem",
              fontWeight: 600,
              marginBottom: 4,
              color: categoryColor,
            }}
          >
            {section.name}
          </h3>
          <p style={{ fontSize: "0.75rem", color: "var(--muted)" }}>
            {section.interviewQuestions.length} interview questions •{" "}
            {section.scenarioQuestions.length} scenarios
          </p>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span
            className="badge"
            style={{
              background: "var(--surface2)",
              color: "var(--muted)",
              fontSize: "0.7rem",
            }}
          >
            {totalQs} Q
          </span>
          <span
            style={{
              fontSize: "1rem",
              color: "var(--muted)",
              transform: isExpanded ? "rotate(180deg)" : "rotate(0deg)",
              transition: "transform 0.2s",
            }}
          >
            ▼
          </span>
        </div>
      </div>

      {/* Expanded Questions */}
      {isExpanded && (
        <div
          style={{
            marginTop: 20,
            paddingTop: 20,
            borderTop: "1px solid var(--border)",
          }}
        >
          {/* Interview Questions */}
          {section.interviewQuestions.length > 0 && (
            <div style={{ marginBottom: 24 }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  marginBottom: 12,
                }}
              >
                <span style={{ fontSize: "1.2rem" }}>🎯</span>
                <h4
                  style={{
                    fontSize: "0.85rem",
                    fontWeight: 600,
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                    color: "var(--amber)",
                  }}
                >
                  Interview Questions
                </h4>
              </div>
              <div
                style={{ display: "flex", flexDirection: "column", gap: 12 }}
              >
                {section.interviewQuestions.map((q) => (
                  <QuestionCard
                    key={q.id}
                    question={q}
                    showHint={visibleHints.has(q.id)}
                    onToggleHint={() => onToggleHint(q.id)}
                    color={categoryColor}
                    status={getQuestionStatus(q.id)}
                    confidence={getQuestionConfidence(q.id)}
                    onUpdateProgress={(status, confidence) =>
                      updateProgress(q.id, status, confidence)
                    }
                  />
                ))}
              </div>
            </div>
          )}

          {/* Scenario Questions */}
          {section.scenarioQuestions.length > 0 && (
            <div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  marginBottom: 12,
                }}
              >
                <span style={{ fontSize: "1.2rem" }}>🧩</span>
                <h4
                  style={{
                    fontSize: "0.85rem",
                    fontWeight: 600,
                    textTransform: "uppercase",
                    letterSpacing: "0.05em",
                    color: "var(--blue)",
                  }}
                >
                  Scenario-Based Questions
                </h4>
              </div>
              <div
                style={{ display: "flex", flexDirection: "column", gap: 12 }}
              >
                {section.scenarioQuestions.map((q) => (
                  <QuestionCard
                    key={q.id}
                    question={q}
                    showHint={visibleHints.has(q.id)}
                    onToggleHint={() => onToggleHint(q.id)}
                    color="var(--blue)"
                    status={getQuestionStatus(q.id)}
                    confidence={getQuestionConfidence(q.id)}
                    onUpdateProgress={(status, confidence) =>
                      updateProgress(q.id, status, confidence)
                    }
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// ────────────────────────────────────────────────────────────────────────────

interface QuestionCardProps {
  question: Question;
  showHint: boolean;
  onToggleHint: () => void;
  color: string;
  status: QuestionStatus;
  confidence: number;
  onUpdateProgress: (status: QuestionStatus, confidence: number) => void;
}

function QuestionCard({
  question,
  showHint,
  onToggleHint,
  color,
  status,
  confidence,
  onUpdateProgress,
}: QuestionCardProps) {
  return (
    <div
      style={{
        padding: "14px 16px",
        background: "var(--surface2)",
        borderRadius: 6,
        border: `1px solid var(--border)`,
        transition: "all 0.15s",
      }}
    >
      {/* Question */}
      <p
        style={{
          fontSize: "0.88rem",
          lineHeight: 1.6,
          marginBottom: 10,
          fontWeight: 500,
        }}
      >
        {question.question}
      </p>

      {/* Hint Toggle Button */}
      <button
        onClick={onToggleHint}
        style={{
          fontSize: "0.75rem",
          padding: "4px 12px",
          background: showHint ? `${color}20` : "var(--surface)",
          color: showHint ? color : "var(--muted)",
          border: `1px solid ${showHint ? `${color}40` : "var(--border)"}`,
          borderRadius: 4,
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          gap: 6,
          transition: "all 0.15s",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = `${color}60`;
          e.currentTarget.style.background = `${color}15`;
        }}
        onMouseLeave={(e) => {
          if (!showHint) {
            e.currentTarget.style.borderColor = "var(--border)";
            e.currentTarget.style.background = "var(--surface)";
          } else {
            e.currentTarget.style.borderColor = `${color}40`;
            e.currentTarget.style.background = `${color}20`;
          }
        }}
      >
        <span style={{ fontSize: "0.9rem" }}>{showHint ? "🔓" : "💡"}</span>
        {showHint ? "Hide Hint" : "Show Hint"}
      </button>

      {/* Hint Display */}
      {showHint && (
        <div
          style={{
            marginTop: 12,
            padding: "12px 14px",
            background: `${color}08`,
            border: `1px solid ${color}30`,
            borderLeft: `3px solid ${color}`,
            borderRadius: 4,
          }}
        >
          <div style={{ display: "flex", gap: 8 }}>
            <span
              style={{
                fontSize: "0.7rem",
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: "0.05em",
                color: color,
                marginTop: 2,
              }}
            >
              Hint:
            </span>
            <p
              style={{
                fontSize: "0.82rem",
                lineHeight: 1.5,
                color: "var(--text)",
                fontStyle: "italic",
              }}
            >
              {question.hint}
            </p>
          </div>
        </div>
      )}

      {/* Progress Tracking */}
      <div
        style={{
          marginTop: 12,
          display: "flex",
          gap: 8,
          flexWrap: "wrap",
          alignItems: "center",
        }}
      >
        <StatusButton
          label="✓ Done"
          active={status === "done"}
          color="var(--green)"
          onClick={() => onUpdateProgress("done", confidence || 3)}
        />
        <StatusButton
          label="⟲ Revisit"
          active={status === "revisit"}
          color="var(--amber)"
          onClick={() => onUpdateProgress("revisit", confidence || 2)}
        />
        <StatusButton
          label="→ Skip"
          active={status === "skipped"}
          color="var(--muted)"
          onClick={() => onUpdateProgress("skipped", confidence || 0)}
        />

        {/* Confidence Rating */}
        {(status === "done" || status === "revisit") && (
          <div
            style={{
              marginLeft: "auto",
              display: "flex",
              gap: 4,
              alignItems: "center",
            }}
          >
            <span style={{ fontSize: "0.7rem", color: "var(--muted)" }}>
              Confidence:
            </span>
            {[1, 2, 3, 4, 5].map((level) => (
              <button
                key={level}
                onClick={() => onUpdateProgress(status, level)}
                style={{
                  width: 24,
                  height: 24,
                  fontSize: "0.7rem",
                  border:
                    confidence === level
                      ? `2px solid ${color}`
                      : "1px solid var(--border)",
                  background:
                    confidence >= level ? `${color}40` : "var(--surface)",
                  color: confidence >= level ? color : "var(--muted)",
                  borderRadius: 4,
                  cursor: "pointer",
                  fontWeight: confidence === level ? 700 : 400,
                }}
              >
                {level}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

interface StatusButtonProps {
  label: string;
  active: boolean;
  color: string;
  onClick: () => void;
}

function StatusButton({ label, active, color, onClick }: StatusButtonProps) {
  return (
    <button
      onClick={onClick}
      style={{
        fontSize: "0.72rem",
        padding: "4px 10px",
        background: active ? `${color}20` : "var(--surface)",
        color: active ? color : "var(--muted)",
        border: `1px solid ${active ? color : "var(--border)"}`,
        borderRadius: 4,
        cursor: "pointer",
        fontWeight: active ? 600 : 400,
        transition: "all 0.15s",
      }}
      onMouseEnter={(e) => {
        if (!active) {
          e.currentTarget.style.borderColor = `${color}60`;
          e.currentTarget.style.background = `${color}10`;
        }
      }}
      onMouseLeave={(e) => {
        if (!active) {
          e.currentTarget.style.borderColor = "var(--border)";
          e.currentTarget.style.background = "var(--surface)";
        }
      }}
    >
      {label}
    </button>
  );
}
