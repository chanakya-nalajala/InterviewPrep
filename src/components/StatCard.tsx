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

  // Helper function to convert hex color to rgba
  const hexToRgba = (hex: string, alpha: number): string => {
    // Remove # if present
    hex = hex.replace('#', '');

    // Parse RGB values
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);

    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  };

  // Map CSS variables to their actual hex values
  const getColorValue = (cssColor: string): string => {
    const colorMap: Record<string, string> = {
      'var(--amber)': '#f59e0b',
      'var(--green)': '#10b981',
      'var(--blue)': '#60a5fa',
      'var(--purple)': '#a78bfa',
      'var(--red)': '#ef4444',
      'var(--muted)': '#6b6b80',
      'var(--text)': '#e8e8f0',
    };
    return colorMap[cssColor] || cssColor;
  };

  // Helper function to create color with opacity
  const getColorWithOpacity = (cssColor: string, opacity: number): string => {
    const hexColor = getColorValue(cssColor);
    return hexToRgba(hexColor, opacity);
  };

  return (
    <div
      className="card animate-scale"
      onMouseEnter={(e) => {
        setIsHovered(true);
        e.currentTarget.style.transform = "translateY(-2px)";
        e.currentTarget.style.boxShadow = `0 8px 24px ${getColorWithOpacity(color, 0.2)}`;
        e.currentTarget.style.borderColor = getColorWithOpacity(color, 0.4);
      }}
      onMouseLeave={(e) => {
        setIsHovered(false);
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "none";
        e.currentTarget.style.borderColor = getColorWithOpacity(color, 0.2);
      }}
      style={{
        textAlign: "center",
        padding: "10px 6px",
        transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
        animationDelay,
        position: "relative",
        overflow: "hidden",
        borderColor: getColorWithOpacity(color, 0.2),
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
