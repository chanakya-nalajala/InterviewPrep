// Interview Questions - Drill-Down Navigation (Category → Section → Questions)
import { useState, useEffect } from "react";
import {
  CategoryData,
  Question,
  QuestionStatus,
  TopicSection,
} from "../data/types";
import { useProgress } from "../hooks/useProgress";
import { QuestionCard } from "./QuestionCard.tsx";

export default function InterviewQuestions() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<CategoryData | null>(
    null,
  );
  const [selectedSection, setSelectedSection] = useState<TopicSection | null>(
    null,
  );
  const [visibleHints, setVisibleHints] = useState<Set<string>>(new Set());
  const [categories, setCategories] = useState<CategoryData[]>([]);
  const [loading, setLoading] = useState(true);

  const { updateProgress, getQuestionStatus, getQuestionConfidence } =
    useProgress();

  // Safe fallbacks
  const safeGetStatus =
    getQuestionStatus || (() => "pending" as QuestionStatus);
  const safeGetConfidence = getQuestionConfidence || (() => 0);
  const safeUpdateProgress = updateProgress || (async () => {});

  // Dynamically load all question data
  useEffect(() => {
    const loadQuestions = async () => {
      try {
        const [
          { javaCoreQuestions },
          { javaCollectionsQuestions },
          { javaQuestions },
          { springQuestions },
          { microservicesQuestions },
          { angularQuestions },
          { kafkaQuestions },
        ] = await Promise.all([
          import("../data/questions/javaCoreQuestions"),
          import("../data/questions/javaCollectionsQuestions"),
          import("../data/questions/javaQuestions"),
          import("../data/questions/springQuestions"),
          import("../data/questions/microservicesQuestions"),
          import("../data/questions/angularQuestions"),
          import("../data/questions/kafkaQuestions"),
        ]);

        // Extract sections from javaQuestions
        const concurrencySections = javaQuestions.sections.filter((s) =>
          s.id.startsWith("concurrency"),
        );
        const jvmSections = javaQuestions.sections.filter((s) =>
          s.id.startsWith("jvm"),
        );
        const modernSections = javaQuestions.sections.filter((s) =>
          s.id.startsWith("modern"),
        );

        const javaConcurrencyQuestions: CategoryData = {
          id: "java-concurrency",
          name: "Java Concurrency",
          icon: "⚡",
          color: "var(--purple)",
          description: "Threading, locks, atomic operations, executors",
          sections: concurrencySections,
        };

        const javaJvmQuestions: CategoryData = {
          id: "java-jvm",
          name: "JVM & Memory",
          icon: "🔧",
          color: "var(--orange)",
          description: "Memory management, GC, class loading",
          sections: jvmSections,
        };

        const javaModernQuestions: CategoryData = {
          id: "java-modern",
          name: "Modern Java",
          icon: "🚀",
          color: "var(--cyan)",
          description: "Lambdas, streams, optional, records, virtual threads",
          sections: modernSections,
        };

        const springCoreQuestions: CategoryData = {
          ...springQuestions,
          id: "spring-core",
          name: "Spring Core",
          sections: springQuestions.sections.filter(
            (s) =>
              s.id.includes("core") ||
              s.id.includes("ioc") ||
              s.id.includes("aop"),
          ),
        };
        const springBootQuestions: CategoryData = {
          ...springQuestions,
          id: "spring-boot",
          name: "Spring Boot",
          sections: springQuestions.sections.filter((s) =>
            s.id.includes("boot"),
          ),
        };
        const springDataQuestions: CategoryData = {
          ...springQuestions,
          id: "spring-data",
          name: "Spring Data",
          sections: springQuestions.sections.filter(
            (s) => s.id.includes("data") || s.id.includes("jpa"),
          ),
        };
        const springSecurityQuestions: CategoryData = {
          ...springQuestions,
          id: "spring-security",
          name: "Spring Security",
          sections: springQuestions.sections.filter((s) =>
            s.id.includes("security"),
          ),
        };
        const springWebQuestions: CategoryData = {
          ...springQuestions,
          id: "spring-web",
          name: "Spring Web",
          sections: springQuestions.sections.filter(
            (s) =>
              s.id.includes("web") ||
              s.id.includes("rest") ||
              s.id.includes("mvc"),
          ),
        };

        setCategories([
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
        ]);
        setLoading(false);
      } catch (error) {
        console.error("Error loading questions:", error);
        setLoading(false);
      }
    };

    loadQuestions();
  }, []);

  // Calculate stats
  const getCategoryStats = (category: CategoryData) => {
    let total = 0;
    let done = 0;
    category.sections.forEach((section) => {
      section.interviewQuestions.forEach((q) => {
        total++;
        if (safeGetStatus(q.id) === "done") done++;
      });
      section.scenarioQuestions.forEach((q) => {
        total++;
        if (safeGetStatus(q.id) === "done") done++;
      });
    });
    return { total, done };
  };

  // Filter logic
  const getFilteredCategories = () => {
    if (!search) return categories;
    const searchLower = search.toLowerCase();
    return categories.filter((cat) => {
      const nameMatch = cat.name.toLowerCase().includes(searchLower);
      const descMatch = cat.description.toLowerCase().includes(searchLower);
      const hasMatchingQuestions = cat.sections.some((section) => {
        const sectionMatch = section.name.toLowerCase().includes(searchLower);
        const questionMatch = [
          ...section.interviewQuestions,
          ...section.scenarioQuestions,
        ].some(
          (q) =>
            q.question.toLowerCase().includes(searchLower) ||
            q.hint.toLowerCase().includes(searchLower),
        );
        return sectionMatch || questionMatch;
      });
      return nameMatch || descMatch || hasMatchingQuestions;
    });
  };

  const getFilteredSections = (category: CategoryData) => {
    if (!search) return category.sections;
    const searchLower = search.toLowerCase();
    return category.sections.filter((section) => {
      const nameMatch = section.name.toLowerCase().includes(searchLower);
      const hasMatchingQuestions = [
        ...section.interviewQuestions,
        ...section.scenarioQuestions,
      ].some(
        (q) =>
          q.question.toLowerCase().includes(searchLower) ||
          q.hint.toLowerCase().includes(searchLower),
      );
      return nameMatch || hasMatchingQuestions;
    });
  };

  const getFilteredQuestions = (questions: Question[]) => {
    if (!search) return questions;
    const searchLower = search.toLowerCase();
    return questions.filter(
      (q) =>
        q.question.toLowerCase().includes(searchLower) ||
        q.hint.toLowerCase().includes(searchLower),
    );
  };

  const toggleHint = (id: string) => {
    const newSet = new Set(visibleHints);
    if (newSet.has(id)) newSet.delete(id);
    else newSet.add(id);
    setVisibleHints(newSet);
  };

  const goBack = () => {
    if (selectedSection) setSelectedSection(null);
    else if (selectedCategory) setSelectedCategory(null);
  };

  const filteredCategories = getFilteredCategories();

  // Show loading spinner while questions are being loaded
  if (loading) {
    return (
      <div
        className="animate-in"
        style={{ padding: "40px", textAlign: "center" }}
      >
        <div
          style={{
            width: 48,
            height: 48,
            border: "4px solid var(--border)",
            borderTopColor: "var(--amber)",
            borderRadius: "50%",
            animation: "spin 0.7s linear infinite",
            margin: "100px auto",
          }}
        />
        <p style={{ color: "var(--muted)", marginTop: 16 }}>
          Loading questions...
        </p>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

  return (
    <div className="animate-in" style={{ padding: "0 0 40px" }}>
      {/* Header */}
      <div style={{ marginBottom: 20 }}>
        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(1.4rem, 5vw, 1.8rem)",
            fontWeight: 800,
            letterSpacing: "-0.02em",
            marginBottom: 8,
          }}
        >
          📋 Interview Q&A
        </h1>
        <p className="text-muted" style={{ fontSize: "0.82rem", lineHeight: 1.5 }}>
          {!selectedCategory &&
            !selectedSection &&
            `${categories.length} categories • 818 questions with expert hints`}
          {selectedCategory &&
            !selectedSection &&
            `${selectedCategory.name} • ${getCategoryStats(selectedCategory).total} questions`}
          {selectedSection && `${selectedSection.name}`}
        </p>
      </div>

      {/* Breadcrumb Navigation */}
      {(selectedCategory || selectedSection) && (
        <div
          style={{
            marginBottom: 16,
            display: "flex",
            alignItems: "center",
            gap: 8,
            fontSize: "0.82rem",
            flexWrap: "wrap",
          }}
        >
          <button
            onClick={goBack}
            className="btn"
            style={{
              padding: "8px 16px",
              background: "var(--amber-glow)",
              color: "var(--amber)",
              borderRadius: 6,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: 6,
              fontSize: "0.8rem",
              minHeight: "36px",
            }}
          >
            ← Back
          </button>

          {selectedCategory && (
            <>
              <button
                onClick={() => setSelectedSection(null)}
                style={{
                  background: "none",
                  border: "none",
                  color: selectedCategory.color,
                  cursor: selectedSection ? "pointer" : "default",
                  padding: "4px 0",
                  fontWeight: 600,
                  fontSize: "0.85rem",
                }}
              >
                {selectedCategory.icon} {selectedCategory.name}
              </button>
            </>
          )}
          {selectedSection && (
            <>
              <span className="text-muted">/</span>
              <span style={{ fontWeight: 600, fontSize: "0.82rem" }}>
                {selectedSection.name}
              </span>
            </>
          )}
        </div>
      )}

      {/* Search Bar */}
      <div className="search-bar" style={{ marginBottom: 20 }}>
        <input
          type="text"
          placeholder={`Search ${selectedCategory ? selectedCategory.name : "all categories"}...`}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={{
            width: "100%",
            padding: "12px 14px 12px 38px",
            fontSize: "0.88rem",
            border: "1px solid var(--border)",
            borderRadius: 8,
            background: "var(--surface)",
            color: "var(--text)",
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 24 24' fill='none' stroke='%23888' stroke-width='2'%3E%3Ccircle cx='11' cy='11' r='8'/%3E%3Cpath d='m21 21-4.35-4.35'/%3E%3C/svg%3E\")",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "10px center",
            backgroundSize: "18px",
          }}
        />
      </div>

      {/* LEVEL 1: Category Grid */}
      {!selectedCategory && !selectedSection && (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
            gap: 14,
          }}
        >
          {filteredCategories.map((category) => {
            const stats = getCategoryStats(category);
            const completionPct = stats.total
              ? Math.round((stats.done / stats.total) * 100)
              : 0;
            return (
              <div
                key={category.id}
                className="card"
                onClick={() => setSelectedCategory(category)}
                style={{
                  cursor: "pointer",
                  transition: "all 0.2s",
                  border: `1px solid ${category.color}20`,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = `${category.color}60`;
                  e.currentTarget.style.transform = "translateY(-2px)";
                  e.currentTarget.style.boxShadow =
                    "0 8px 16px rgba(0,0,0,0.1)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = `${category.color}20`;
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "var(--shadow)";
                }}
              >
                <div style={{ fontSize: "2.2rem", marginBottom: 10 }}>
                  {category.icon}
                </div>
                <h3
                  style={{
                    fontSize: "1rem",
                    fontWeight: 700,
                    marginBottom: 6,
                    color: category.color,
                  }}
                >
                  {category.name}
                </h3>
                <p
                  style={{
                    fontSize: "0.78rem",
                    color: "var(--muted)",
                    marginBottom: 14,
                    lineHeight: 1.5,
                  }}
                >
                  {category.description}
                </p>
                <div
                  style={{
                    fontSize: "0.72rem",
                    color: "var(--muted)",
                    marginBottom: 8,
                  }}
                >
                  {stats.done}/{stats.total} completed • {completionPct}%
                </div>
                <div className="progress-track">
                  <div
                    className="progress-fill"
                    style={{
                      width: `${completionPct}%`,
                      background: category.color,
                    }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* LEVEL 2: Sections List */}
      {selectedCategory && !selectedSection && (
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {getFilteredSections(selectedCategory).map((section) => {
            const totalQuestions =
              section.interviewQuestions.length +
              section.scenarioQuestions.length;
            const doneQuestions = [
              ...section.interviewQuestions,
              ...section.scenarioQuestions,
            ].filter((q) => safeGetStatus(q.id) === "done").length;
            const completionPct = totalQuestions
              ? Math.round((doneQuestions / totalQuestions) * 100)
              : 0;
            return (
              <div
                key={section.id}
                className="card"
                onClick={() => setSelectedSection(section)}
                style={{
                  cursor: "pointer",
                  transition: "all 0.2s",
                  padding: "16px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: "12px",
                  flexWrap: "wrap",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = `${selectedCategory.color}40`;
                  e.currentTarget.style.transform = "translateX(4px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "var(--border)";
                  e.currentTarget.style.transform = "translateX(0)";
                }}
              >
                <div style={{ flex: 1 }}>
                  <h3
                    style={{
                      fontSize: "1rem",
                      fontWeight: 600,
                      marginBottom: 8,
                    }}
                  >
                    {section.name}
                  </h3>
                  <div style={{ fontSize: "0.8rem", color: "var(--muted)" }}>
                    {totalQuestions} questions • {doneQuestions} completed
                  </div>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "flex-end",
                    gap: 8,
                  }}
                >
                  <div
                    style={{
                      fontSize: "1.2rem",
                      fontWeight: 700,
                      color: selectedCategory.color,
                    }}
                  >
                    {completionPct}%
                  </div>
                  <div style={{ fontSize: "1.5rem" }}>→</div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* LEVEL 3: Questions */}
      {selectedSection && selectedCategory && (
        <div>
          {/* Interview Questions */}
          {getFilteredQuestions(selectedSection.interviewQuestions).length >
            0 && (
            <div style={{ marginBottom: 32 }}>
              <h3
                style={{
                  fontSize: "0.95rem",
                  marginBottom: 16,
                  color: "var(--text)",
                  fontWeight: 600,
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                }}
              >
                💬 Interview Questions (
                {
                  getFilteredQuestions(selectedSection.interviewQuestions)
                    .length
                }
                )
              </h3>
              <div
                style={{ display: "flex", flexDirection: "column", gap: 12 }}
              >
                {getFilteredQuestions(selectedSection.interviewQuestions).map(
                  (q) => (
                    <QuestionCard
                      key={q.id}
                      question={q}
                      showHint={visibleHints.has(q.id)}
                      onToggleHint={() => toggleHint(q.id)}
                      color={selectedCategory.color}
                      status={safeGetStatus(q.id)}
                      confidence={safeGetConfidence(q.id)}
                      onUpdateProgress={(status, confidence) =>
                        safeUpdateProgress(q.id, status, confidence)
                      }
                    />
                  ),
                )}
              </div>
            </div>
          )}

          {/* Scenario Questions */}
          {getFilteredQuestions(selectedSection.scenarioQuestions).length >
            0 && (
            <div>
              <h3
                style={{
                  fontSize: "0.95rem",
                  marginBottom: 16,
                  color: "var(--text)",
                  fontWeight: 600,
                  textTransform: "uppercase",
                  letterSpacing: "0.05em",
                }}
              >
                🎯 Scenario Questions (
                {getFilteredQuestions(selectedSection.scenarioQuestions).length}
                )
              </h3>
              <div
                style={{ display: "flex", flexDirection: "column", gap: 12 }}
              >
                {getFilteredQuestions(selectedSection.scenarioQuestions).map(
                  (q) => (
                    <QuestionCard
                      key={q.id}
                      question={q}
                      showHint={visibleHints.has(q.id)}
                      onToggleHint={() => toggleHint(q.id)}
                      color="var(--blue)"
                      status={safeGetStatus(q.id)}
                      confidence={safeGetConfidence(q.id)}
                      onUpdateProgress={(status, confidence) =>
                        safeUpdateProgress(q.id, status, confidence)
                      }
                    />
                  ),
                )}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
