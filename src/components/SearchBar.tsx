import { useState } from "react";

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  resultCount?: number;
}

export function SearchBar({
  value,
  onChange,
  placeholder = "Search...",
  resultCount,
}: SearchBarProps) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div className="search-bar animate-slide-right" style={{ marginBottom: 20 }}>
      <div style={{ position: "relative" }}>
        <input
          type="text"
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          style={{
            width: "100%",
            padding: "12px 14px 12px 38px",
            fontSize: "0.88rem",
            border: `2px solid ${isFocused ? "var(--amber)" : "var(--border)"}`,
            borderRadius: 8,
            background: "var(--surface)",
            color: "var(--text)",
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='20' height='20' viewBox='0 0 24 24' fill='none' stroke='%23888' stroke-width='2'%3E%3Ccircle cx='11' cy='11' r='8'/%3E%3Cpath d='m21 21-4.35-4.35'/%3E%3C/svg%3E\")",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "10px center",
            backgroundSize: "18px",
            transition: "all 0.3s cubic-bezier(0.16, 1, 0.3, 1)",
            boxShadow: isFocused
              ? "0 4px 12px rgba(245, 158, 11, 0.15)"
              : "none",
          }}
        />
        {value && (
          <button
            onClick={() => onChange("")}
            style={{
              position: "absolute",
              right: "10px",
              top: "50%",
              transform: "translateY(-50%)",
              background: "var(--surface2)",
              border: "1px solid var(--border)",
              borderRadius: "50%",
              width: "24px",
              height: "24px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              color: "var(--muted)",
              fontSize: "0.9rem",
              transition: "all 0.2s",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "var(--red-dim)";
              e.currentTarget.style.color = "var(--red)";
              e.currentTarget.style.borderColor = "var(--red)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "var(--surface2)";
              e.currentTarget.style.color = "var(--muted)";
              e.currentTarget.style.borderColor = "var(--border)";
            }}
          >
            ×
          </button>
        )}
      </div>
      {value && resultCount !== undefined && (
        <div
          className="animate-fade"
          style={{
            fontSize: "0.75rem",
            color: "var(--muted)",
            marginTop: "8px",
            display: "flex",
            alignItems: "center",
            gap: "6px",
          }}
        >
          <span style={{ color: "var(--amber)" }}>✓</span>
          {resultCount} result{resultCount !== 1 ? "s" : ""} found
        </div>
      )}
    </div>
  );
}
