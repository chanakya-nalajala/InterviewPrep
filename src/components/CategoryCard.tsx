import { CategoryData } from "../data/types";

interface CategoryCardProps {
  category: CategoryData;
  stats: {
    total: number;
    done: number;
  };
  onClick: () => void;
}

export function CategoryCard({ category, stats, onClick }: CategoryCardProps) {
  const completionPct = stats.total
    ? Math.round((stats.done / stats.total) * 100)
    : 0;

  return (
    <div
      className="card"
      onClick={onClick}
      style={{
        cursor: "pointer",
        transition: "all 0.2s",
        border: `1px solid ${category.color}20`,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = `${category.color}60`;
        e.currentTarget.style.transform = "translateY(-2px)";
        e.currentTarget.style.boxShadow = "0 8px 16px rgba(0,0,0,0.1)";
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
}
