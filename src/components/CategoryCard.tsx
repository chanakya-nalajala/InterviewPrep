import { CategoryData } from "../data/types";
import { useState } from "react";

interface CategoryCardProps {
  category: CategoryData;
  stats: {
    total: number;
    done: number;
  };
  onClick: () => void;
  index?: number;
}

export function CategoryCard({
  category,
  stats,
  onClick,
  index = 0,
}: CategoryCardProps) {
  const [isPressed, setIsPressed] = useState(false);
  const completionPct = stats.total
    ? Math.round((stats.done / stats.total) * 100)
    : 0;

  const animationDelay = `${index * 0.08}s`;

  return (
    <div
      className="card animate-scale"
      onClick={onClick}
      onMouseDown={() => setIsPressed(true)}
      onMouseUp={() => setIsPressed(false)}
      onMouseLeave={() => setIsPressed(false)}
      style={{
        cursor: "pointer",
        transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
        border: `1px solid ${category.color}20`,
        position: "relative",
        overflow: "hidden",
        animationDelay,
        transform: isPressed ? "scale(0.98)" : "scale(1)",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = `${category.color}60`;
        e.currentTarget.style.transform = isPressed
          ? "scale(0.98)"
          : "translateY(-4px)";
        e.currentTarget.style.boxShadow = `0 12px 24px rgba(0,0,0,0.15), 0 0 0 1px ${category.color}20`;
        const icon = e.currentTarget.querySelector(".category-icon");
        if (icon)
          (icon as HTMLElement).style.transform = "scale(1.1) rotate(5deg)";
      }}
    >
      {/* Subtle gradient overlay */}
      <div
        style={{
          position: "absolute",
          top: 0,
          right: 0,
          width: "100px",
          height: "100px",
          background: `radial-gradient(circle, ${category.color}10 0%, transparent 70%)`,
          pointerEvents: "none",
        }}
      />

      <div
        className="category-icon"
        style={{
          fontSize: "2.2rem",
          marginBottom: 10,
          transition: "transform 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
        }}
      >
        {category.icon}
      </div>
      <h3
        style={{
          fontSize: "1rem",
          fontWeight: 700,
          marginBottom: 6,
          color: category.color,
          transition: "color 0.2s",
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
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <span>
          {stats.done}/{stats.total} completed
        </span>
        <span
          style={{
            fontWeight: 700,
            color: completionPct === 100 ? "var(--green)" : category.color,
          }}
        >
          {completionPct}%
        </span>
      </div>
      <div
        className="progress-track"
        style={{
          position: "relative",
          overflow: "visible",
        }}
      >
        <div
          className="progress-fill"
          style={{
            width: `${completionPct}%`,
            background: completionPct === 100 ? "var(--green)" : category.color,
            transition: "width 0.6s cubic-bezier(0.16, 1, 0.3, 1)",
            position: "relative",
          }}
        >
          {completionPct === 100 && (
            <span
              style={{
                position: "absolute",
                right: "-8px",
                top: "-10px",
                fontSize: "1rem",
                animation: "bounce 1s ease-in-out infinite",
              }}
            >
              ✨
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
