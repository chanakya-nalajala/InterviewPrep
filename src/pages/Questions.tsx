import { useState, useEffect } from "react";
import {
  CategoryData,
  Question,
  QuestionStatus,
  TopicSection,
} from "../data/types";
import { useProgress } from "../hooks/useProgress";
import { LoadingSpinner } from "../components/LoadingSpinner";
import { SearchBar } from "../components/SearchBar";
import { Breadcrumb } from "../components/Breadcrumb";
import { CategoryCard } from "../components/CategoryCard";
import { SectionCard } from "../components/SectionCard";
import { QuestionsList } from "../components/QuestionsList";
import { exportSectionToPDF } from "../services/pdfExport";

export default function Questions() {
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
  const [exportingPDF, setExportingPDF] = useState(false);

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

  const handleExportPDF = async () => {
    if (!selectedSection || !selectedCategory) return;

    setExportingPDF(true);
    try {
      await exportSectionToPDF(selectedSection, {
        sectionName: selectedSection.name,
        categoryName: selectedCategory.name,
        categoryColor: selectedCategory.color,
        includeHints: false,
        includeAIAnswers: true,
      });
    } catch (error) {
      console.error("Error exporting PDF:", error);
      alert("Failed to export PDF. Please try again.");
    } finally {
      setExportingPDF(false);
    }
  };



  const filteredCategories = getFilteredCategories();

  // Show loading spinner while questions are being loaded
  if (loading) {
    return <LoadingSpinner />;
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
        <p
          className="text-muted"
          style={{ fontSize: "0.82rem", lineHeight: 1.5 }}
        >
          {!selectedCategory &&
            !selectedSection &&
            `${categories.length} categories • 818 questions with expert hints`}
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
      />



      {/* LEVEL 1: Category Grid */}
      {!selectedCategory && !selectedSection && (
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
            gap: 14,
          }}
        >
          {filteredCategories.map((category) => (
            <CategoryCard
              key={category.id}
              category={category}
              stats={getCategoryStats(category)}
              onClick={() => setSelectedCategory(category)}
            />
          ))}
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
            return (
              <SectionCard
                key={section.id}
                section={section}
                categoryColor={selectedCategory.color}
                stats={{ total: totalQuestions, done: doneQuestions }}
                onClick={() => setSelectedSection(section)}
              />
            );
          })}
        </div>
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
  );
}
