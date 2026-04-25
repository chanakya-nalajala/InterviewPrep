interface StatCardProps {
  label: string;
  value: number | string;
  color: string;
}

export function StatCard({ label, value, color }: StatCardProps) {
  return (
    <div className="card" style={{ textAlign: "center", padding: "14px 10px" }}>
      <div
        style={{
          fontSize: "clamp(1.3rem, 4vw, 1.6rem)",
          fontWeight: 700,
          color,
          fontFamily: "var(--font-display)",
        }}
      >
        {value}
      </div>
      <div
        style={{
          fontSize: "0.68rem",
          color: "var(--muted)",
          marginTop: 4,
          textTransform: "uppercase",
          letterSpacing: "0.06em",
        }}
      >
        {label}
      </div>
    </div>
  );
}
