import { TopicSection } from "../data/types";

interface SectionCardProps {
  section: TopicSection;
  categoryColor: string;
  stats: {
    total: number;
    done: number;
  };
  onClick: () => void;
}

export function SectionCard({
  section,
  categoryColor,
  stats,
  onClick,
}: SectionCardProps) {
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
        padding: "16px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        gap: "12px",
        flexWrap: "wrap",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = `${categoryColor}40`;
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
          {stats.total} questions • {stats.done} completed
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
            color: categoryColor,
          }}
        >
          {completionPct}%
        </div>
        <div style={{ fontSize: "1.5rem" }}>→</div>
      </div>
    </div>
  );
}
