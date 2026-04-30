import { useAuth } from "../hooks/useAuth";
import { useProgress } from "../hooks/useProgress";
import { useMemo, useState } from "react";
import {
  CategoryData,
  CategoryStats,
  ProgressStats,
  Question,
  QuestionStatus,
  TopicSection,
} from "../data/types";
import { StatCard } from "../components/StatCard.tsx";
import { SkeletonCard, SkeletonStat } from "../components/SkeletonLoader";
import {
  getAllQuestionsWithCategories,
  getOrganizedCategories,
  getTotalQuestionCount,
} from "../data/dataLoader";
import { SearchBar } from "../components/SearchBar";
import { Breadcrumb } from "../components/Breadcrumb";
import { CategoryCard } from "../components/CategoryCard";
import { SectionCard } from "../components/SectionCard";
import { QuestionsList } from "../components/QuestionsList";
import { exportSectionToPDF } from "../services/pdfExport";
import { NoResults } from "../components/EmptyState";

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
  const {
    progress,
    loading,
    error,
    updateProgress,
    getQuestionStatus,
    getQuestionConfidence,
  } = useProgress();

  // Combine time-based greeting with random message
  const [greeting] = useState(() => {
    const timeGreeting = getTimeOfDay();
    const randomMessage =
      GREETINGS[Math.floor(Math.random() * GREETINGS.length)];
    return `${timeGreeting}! ${randomMessage}`;
  });

  // Questions component state
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<CategoryData | null>(
    null,
  );
  const [selectedSection, setSelectedSection] = useState<TopicSection | null>(
    null,
  );
  const [visibleHints, setVisibleHints] = useState<Set<string>>(new Set());
  const [exportingPDF, setExportingPDF] = useState(false);

  // Get categories and question counts dynamically from JSON
  const categories = useMemo(() => getOrganizedCategories(), []);
  const totalQuestions = useMemo(() => getTotalQuestionCount(), []);
  const allQuestions = useMemo(() => getAllQuestionsWithCategories(), []);

  // Safe fallbacks for progress functions
  const safeGetStatus =
    getQuestionStatus || (() => "pending" as QuestionStatus);
  const safeGetConfidence = getQuestionConfidence || (() => 0);
  const safeUpdateProgress = updateProgress || (async () => {});

  // Helper functions for Questions
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

  const handleExportPDF = async () => {
    if (!selectedSection || !selectedCategory) return;

    setExportingPDF(true);
    try {
      await exportSectionToPDF(selectedSection, {
        sectionName: selectedSection.name,
        categoryName: selectedCategory.name,
        categoryColor: selectedCategory.color,
        includeHints: true,
        includeAnswers: true,
      });
    } catch (error) {
      console.error("Error exporting PDF:", error);
      alert("Failed to export PDF. Please try again.");
    } finally {
      setExportingPDF(false);
    }
  };

  const filteredCategories = getFilteredCategories();

  // Calculate stats dynamically from question object
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

    // Use stats from Firestore if available, but always use current totalQuestions
    if (progress.stats) {
      return {
        ...progress.stats,
        total: totalQuestions,
        pending:
          totalQuestions -
          progress.stats.done -
          progress.stats.revisit -
          progress.stats.skipped,
      };
    }

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
        (q) => q.categoryId === cat.id,
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

  if (loading) {
    return (
      <div className="animate-in" style={{ padding: "0 0 40px" }}>
        <div style={{ marginBottom: 24 }}>
          <div
            style={{
              width: "200px",
              height: "16px",
              background: "var(--surface2)",
              borderRadius: 4,
              marginBottom: 8,
              animation: "pulse 1.5s ease-in-out infinite",
            }}
          />
          <div
            style={{
              width: "280px",
              height: "28px",
              background: "var(--surface2)",
              borderRadius: 4,
              animation: "pulse 1.5s ease-in-out infinite",
            }}
          />
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(110px, 1fr))",
            gap: 10,
            marginBottom: 24,
          }}
        >
          {[0, 1, 2, 3, 4].map((i) => (
            <SkeletonStat key={i} />
          ))}
        </div>
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: 16,
          }}
        >
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      </div>
    );
  }

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
      <div style={{ marginBottom: 16 }}>
        <p
          className="text-muted"
          style={{
            fontSize: "clamp(0.85rem, 2.5vw, 1rem)",
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
            fontSize: "clamp(1.3rem, 5vw, 1.8rem)",
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
          marginBottom: 0,
        }}
      >
        <div
          className="stats-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 6,
          }}
        >
          <StatCard
            label="Completion"
            value={`${completionPct}%`}
            color={completionPct === 100 ? "var(--green)" : "var(--purple)"}
            index={0}
          />
          <StatCard
            label="Total"
            value={stats.total}
            color="var(--blue)"
            index={1}
          />
          <StatCard
            label="Done"
            value={stats.done}
            color="var(--green)"
            index={2}
          />
          <StatCard
            label="Revisit"
            value={stats.revisit}
            color="var(--amber)"
            index={3}
          />
          <StatCard
            label="Pending"
            value={stats.pending}
            color="var(--red)"
            index={4}
          />
          <StatCard
            label="Avg Confidence"
            value={
              stats.avgConfidence > 0
                ? `${stats.avgConfidence.toFixed(1)}/5`
                : "N/A"
            }
            color="var(--purple)"
            index={5}
          />
        </div>
      </div>

      {/* Questions Section */}
      <div style={{ marginTop: 20, paddingTop: 16 }}>
        {/* Questions Header */}
        <div style={{ marginBottom: 16 }}>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(1.2rem, 4vw, 1.4rem)",
              fontWeight: 700,
              letterSpacing: "-0.02em",
              marginBottom: 6,
            }}
          >
            📋 Interview Q&A
          </h2>
          <p
            className="text-muted"
            style={{
              fontSize: "clamp(0.75rem, 2vw, 0.82rem)",
              lineHeight: 1.5,
            }}
          >
            {!selectedCategory &&
              !selectedSection &&
              `${categories.length} categories • ${totalQuestions} questions with expert hints`}
            {selectedCategory &&
              !selectedSection &&
              `${selectedCategory.name} • ${getCategoryStats(selectedCategory).total} questions`}
            {selectedSection && `${selectedSection.name}`}
          </p>
        </div>

        {/* Breadcrumb Navigation with Action Buttons */}
        <div
          style={{
            display: "flex",
            gap: 12,
            alignItems: "flex-start",
            justifyContent: "space-between",
            marginBottom: selectedCategory || selectedSection ? 0 : 20,
            flexWrap: "wrap",
            position: "sticky",
            top: 54,
            zIndex: 40,
            background: "rgba(10,10,15,0.9)",
            backdropFilter: "blur(12px)",
            padding: "12px 0",
            marginLeft: -16,
            marginRight: -16,
            paddingLeft: 16,
            paddingRight: 16,
            borderBottom: "1px solid var(--border)",
          }}
        >
          <Breadcrumb
            selectedCategory={selectedCategory}
            selectedSection={selectedSection}
            onBack={goBack}
            onCategoryClick={() => setSelectedSection(null)}
          />

          {/* Export PDF Button - Only show when viewing questions */}
          {selectedSection && selectedCategory && (
            <button
              onClick={handleExportPDF}
              disabled={exportingPDF}
              className="btn"
              style={{
                padding: "8px 16px",
                background: exportingPDF ? "var(--surface)" : "var(--green)15",
                color: exportingPDF ? "var(--muted)" : "var(--green)",
                border: `1px solid ${exportingPDF ? "var(--border)" : "var(--green)40"}`,
                borderRadius: 6,
                cursor: exportingPDF ? "wait" : "pointer",
                display: "flex",
                alignItems: "center",
                gap: 6,
                fontSize: "0.8rem",
                minHeight: "36px",
                transition: "all 0.15s",
              }}
              onMouseEnter={(e) => {
                if (!exportingPDF) {
                  e.currentTarget.style.background = "var(--green)25";
                  e.currentTarget.style.borderColor = "var(--green)60";
                }
              }}
              onMouseLeave={(e) => {
                if (!exportingPDF) {
                  e.currentTarget.style.background = "var(--green)15";
                  e.currentTarget.style.borderColor = "var(--green)40";
                }
              }}
            >
              <span style={{ fontSize: "1rem" }}>
                {exportingPDF ? "⏳" : "📄"}
              </span>
              {exportingPDF ? "Generating PDF..." : "Export to PDF"}
            </button>
          )}
        </div>

        {/* Search Bar */}
        <SearchBar
          value={search}
          onChange={setSearch}
          placeholder={`Search ${selectedCategory ? selectedCategory.name : "all categories"}...`}
          resultCount={
            selectedCategory && !selectedSection
              ? getFilteredSections(selectedCategory).length
              : filteredCategories.length
          }
        />

        {/* LEVEL 1: Category Grid */}
        {!selectedCategory && !selectedSection && (
          <>
            {filteredCategories.length === 0 && search ? (
              <NoResults searchTerm={search} />
            ) : (
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
                  gap: 14,
                }}
              >
                {filteredCategories.map((category, index) => (
                  <CategoryCard
                    key={category.id}
                    category={category}
                    stats={getCategoryStats(category)}
                    onClick={() => setSelectedCategory(category)}
                    index={index}
                  />
                ))}
              </div>
            )}
          </>
        )}

        {/* LEVEL 2: Sections List */}
        {selectedCategory && !selectedSection && (
          <>
            {getFilteredSections(selectedCategory).length === 0 && search ? (
              <NoResults searchTerm={search} />
            ) : (
              <div
                style={{ display: "flex", flexDirection: "column", gap: 10 }}
              >
                {getFilteredSections(selectedCategory).map((section, index) => {
                  const totalQuestions =
                    section.interviewQuestions.length +
                    section.scenarioQuestions.length;
                  const doneQuestions = [
                    ...section.interviewQuestions,
                    ...section.scenarioQuestions,
                  ].filter((q) => safeGetStatus(q.id) === "done").length;
                  return (
                    <SectionCard
                      key={section.id}
                      section={section}
                      categoryColor={selectedCategory.color}
                      stats={{ total: totalQuestions, done: doneQuestions }}
                      onClick={() => setSelectedSection(section)}
                      index={index}
                    />
                  );
                })}
              </div>
            )}
          </>
        )}

        {/* LEVEL 3: Questions */}
        {selectedSection && selectedCategory && (
          <QuestionsList
            interviewQuestions={getFilteredQuestions(
              selectedSection.interviewQuestions,
            )}
            scenarioQuestions={getFilteredQuestions(
              selectedSection.scenarioQuestions,
            )}
            categoryColor={selectedCategory.color}
            visibleHints={visibleHints}
            onToggleHint={toggleHint}
            getQuestionStatus={safeGetStatus}
            getQuestionConfidence={safeGetConfidence}
            onUpdateProgress={safeUpdateProgress}
          />
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
