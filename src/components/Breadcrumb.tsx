import { CategoryData, TopicSection } from "../data/types";

interface BreadcrumbProps {
  selectedCategory: CategoryData | null;
  selectedSection: TopicSection | null;
  onBack: () => void;
  onCategoryClick: () => void;
}

export function Breadcrumb({
  selectedCategory,
  selectedSection,
  onBack,
  onCategoryClick,
}: BreadcrumbProps) {
  if (!selectedCategory && !selectedSection) {
    return null;
  }

  return (
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
        onClick={onBack}
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
            onClick={onCategoryClick}
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
  );
}
