import { TopicSection } from "../data/types";
import { useState } from "react";

interface SectionCardProps {
  section: TopicSection;
  categoryColor: string;
  stats: {
    total: number;
    done: number;
  };
  onClick: () => void;
  index?: number;
}

export function SectionCard({
  section,
  categoryColor,
  stats,
  onClick,
  index = 0,
}: SectionCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const completionPct = stats.total
    ? Math.round((stats.done / stats.total) * 100)
    : 0;

  const animationDelay = `${index * 0.05}s`;

  return (
    <div
      className="card animate-slide-right"
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        cursor: "pointer",
        transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
        padding: "16px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        gap: "12px",
        flexWrap: "wrap",
        borderLeft: `3px solid ${isHovered ? categoryColor : "transparent"}`,
        background: isHovered ? "var(--surface2)" : "var(--surface)",
        transform: isHovered ? "translateX(8px)" : "translateX(0)",
        boxShadow: isHovered
          ? `0 4px 12px rgba(0,0,0,0.1), -3px 0 0 ${categoryColor}`
          : "none",
        animationDelay,
      }}
    >
      <div style={{ flex: 1 }}>
        <h3
          style={{
            fontSize: "1rem",
            fontWeight: 600,
            marginBottom: 8,
            transition: "color 0.2s",
            color: isHovered ? categoryColor : "var(--text)",
          }}
        >
          {section.name}
        </h3>
        <div
          style={{
            fontSize: "0.8rem",
            color: "var(--muted)",
            display: "flex",
            alignItems: "center",
            gap: "8px",
          }}
        >
          <span>📝 {stats.total} questions</span>
          {stats.done > 0 && (
            <>
              <span>•</span>
              <span style={{ color: categoryColor }}>
                ✓ {stats.done} completed
              </span>
            </>
          )}
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
            color: completionPct === 100 ? "var(--green)" : categoryColor,
            transition: "all 0.3s",
            transform: isHovered ? "scale(1.1)" : "scale(1)",
          }}
        >
          {completionPct}%
          {completionPct === 100 && (
            <span style={{ marginLeft: "4px", fontSize: "1rem" }}>✨</span>
          )}
        </div>
        <div
          style={{
            fontSize: "1.5rem",
            transition: "transform 0.3s",
            transform: isHovered ? "translateX(4px)" : "translateX(0)",
          }}
        >
          →
        </div>
      </div>
    </div>
  );
}
