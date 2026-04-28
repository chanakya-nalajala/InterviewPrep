import { useEffect, useState } from "react";

interface StatCardProps {
  label: string;
  value: number | string;
  color: string;
  index?: number;
}

export function StatCard({ label, value, color, index = 0 }: StatCardProps) {
  const [displayValue, setDisplayValue] = useState(0);
  const [isHovered, setIsHovered] = useState(false);

  // Animate number counting for numeric values
  useEffect(() => {
    if (typeof value === "number") {
      let start = 0;
      const duration = 800;
      const increment = value / (duration / 16);
      const timer = setInterval(() => {
        start += increment;
        if (start >= value) {
          setDisplayValue(value);
          clearInterval(timer);
        } else {
          setDisplayValue(Math.floor(start));
        }
      }, 16);
      return () => clearInterval(timer);
    }
  }, [value]);

  const animationDelay = `${index * 0.08}s`;

  return (
    <div
      className="card animate-scale"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        textAlign: "center",
        padding: "10px 6px",
        transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
        transform: isHovered ? "translateY(-4px) scale(1.05)" : "scale(1)",
        boxShadow: isHovered
          ? `0 8px 20px rgba(0,0,0,0.15), 0 0 0 2px ${color}20`
          : "none",
        borderColor: isHovered ? `${color}40` : "var(--border)",
        animationDelay,
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Subtle background gradient on hover */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          background: `radial-gradient(circle at center, ${color}08 0%, transparent 70%)`,
          opacity: isHovered ? 1 : 0,
          transition: "opacity 0.3s",
          pointerEvents: "none",
        }}
      />

      <div
        style={{
          fontSize: "clamp(0.95rem, 3.5vw, 1.4rem)",
          fontWeight: 700,
          color,
          fontFamily: "var(--font-display)",
          transition: "transform 0.3s",
          transform: isHovered ? "scale(1.1)" : "scale(1)",
          position: "relative",
        }}
      >
        {typeof value === "number" ? displayValue : value}
      </div>
      <div
        style={{
          fontSize: "clamp(0.55rem, 1.8vw, 0.65rem)",
          color: "var(--muted)",
          marginTop: 2,
          textTransform: "uppercase",
          letterSpacing: "0.04em",
          position: "relative",
        }}
      >
        {label}
      </div>
    </div>
  );
}
