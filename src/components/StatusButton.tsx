interface StatusButtonProps {
  label: string;
  active: boolean;
  color: string;
  onClick: () => void;
}

export function StatusButton({
  label,
  active,
  color,
  onClick,
}: StatusButtonProps) {
  return (
    <button
      onClick={onClick}
      style={{
        fontSize: "0.72rem",
        padding: "4px 10px",
        background: active ? `${color}20` : "var(--surface)",
        color: active ? color : "var(--muted)",
        border: `1px solid ${active ? color : "var(--border)"}`,
        borderRadius: 4,
        cursor: "pointer",
        fontWeight: active ? 600 : 400,
        transition: "all 0.15s",
      }}
      onMouseEnter={(e) => {
        if (!active) {
          e.currentTarget.style.borderColor = `${color}60`;
          e.currentTarget.style.background = `${color}10`;
        }
      }}
      onMouseLeave={(e) => {
        if (!active) {
          e.currentTarget.style.borderColor = "var(--border)";
          e.currentTarget.style.background = "var(--surface)";
        }
      }}
    >
      {label}
    </button>
  );
}
