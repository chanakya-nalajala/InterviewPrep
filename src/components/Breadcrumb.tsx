import { CategoryData, TopicSection } from "../data/types";
import { useState } from "react";

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
  const [isBackHovered, setIsBackHovered] = useState(false);

  if (!selectedCategory && !selectedSection) {
    return null;
  }

  return (
    <div
      className="animate-slide-right"
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
        onMouseEnter={() => setIsBackHovered(true)}
        onMouseLeave={() => setIsBackHovered(false)}
        className="btn"
        style={{
          padding: "8px 16px",
          background: isBackHovered ? "var(--amber)" : "var(--amber-glow)",
          color: isBackHovered ? "#000" : "var(--amber)",
          borderRadius: 6,
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          gap: 6,
          fontSize: "0.8rem",
          minHeight: "36px",
          transition: "all 0.2s cubic-bezier(0.16, 1, 0.3, 1)",
          transform: isBackHovered ? "translateX(-4px)" : "translateX(0)",
        }}
      >
        <span
          style={{
            transition: "transform 0.2s",
            display: "inline-block",
            transform: isBackHovered ? "translateX(-2px)" : "translateX(0)",
          }}
        >
          ←
        </span>
        Back
      </button>

      {selectedCategory && (
        <>
          <span className="text-muted" style={{ opacity: 0.5 }}>
            /
          </span>
          <button
            onClick={onCategoryClick}
            style={{
              background: "none",
              border: "none",
              color: selectedCategory.color,
              cursor: selectedSection ? "pointer" : "default",
              padding: "4px 8px",
              fontWeight: 600,
              fontSize: "0.85rem",
              borderRadius: 4,
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => {
              if (selectedSection) {
                e.currentTarget.style.background = `${selectedCategory.color}15`;
              }
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "none";
            }}
          >
            <span style={{ marginRight: "4px" }}>{selectedCategory.icon}</span>
            {selectedCategory.name}
          </button>
        </>
      )}
      {selectedSection && (
        <>
          <span className="text-muted" style={{ opacity: 0.5 }}>
            /
          </span>
          <span
            className="animate-fade"
            style={{
              fontWeight: 600,
              fontSize: "0.82rem",
              color: "var(--text)",
            }}
          >
            {selectedSection.name}
          </span>
        </>
      )}
    </div>
  );
}
