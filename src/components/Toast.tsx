// Toast Component - Notification messages

import { useEffect } from "react";

interface ToastProps {
  message: string;
  type?: "info" | "error" | "success" | "warning";
  onClose: () => void;
  duration?: number;
}

export function Toast({
  message,
  type = "info",
  onClose,
  duration = 5000,
}: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const getColors = () => {
    switch (type) {
      case "error":
        return {
          bg: "var(--red)",
          border: "#dc2626",
          icon: "❌",
        };
      case "success":
        return {
          bg: "var(--green)",
          border: "#16a34a",
          icon: "✅",
        };
      case "warning":
        return {
          bg: "var(--amber)",
          border: "#d97706",
          icon: "⚠️",
        };
      default:
        return {
          bg: "var(--blue)",
          border: "#2563eb",
          icon: "ℹ️",
        };
    }
  };

  const colors = getColors();

  return (
    <div
      style={{
        position: "fixed",
        top: 20,
        right: 20,
        zIndex: 9999,
        maxWidth: 420,
        width: "calc(100% - 40px)",
        animation: "slideInRight 0.3s ease-out",
      }}
    >
      <div
        style={{
          background: "var(--surface)",
          border: `1px solid ${colors.border}`,
          borderLeft: `4px solid ${colors.border}`,
          borderRadius: 8,
          padding: "14px 16px",
          boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
          display: "flex",
          alignItems: "flex-start",
          gap: 12,
        }}
      >
        <span style={{ fontSize: "1.2rem", marginTop: 2 }}>{colors.icon}</span>
        <div style={{ flex: 1 }}>
          <p
            style={{
              fontSize: "0.85rem",
              lineHeight: 1.5,
              color: "var(--text)",
              margin: 0,
            }}
          >
            {message}
          </p>
        </div>
        <button
          onClick={onClose}
          style={{
            background: "none",
            border: "none",
            color: "var(--muted)",
            cursor: "pointer",
            fontSize: "1.2rem",
            padding: 0,
            lineHeight: 1,
            transition: "color 0.2s",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "var(--text)")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "var(--muted)")}
        >
          ×
        </button>
      </div>
      <style>{`
        @keyframes slideInRight {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}
