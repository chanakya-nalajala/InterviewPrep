// src/pages/QuestionCard.tsx - Enhanced UI for Questions with Hints
import { Question, QuestionStatus } from "../data/types";

// ────────────────────────────────────────────────────────────────────────────

interface QuestionCardProps {
  question: Question;
  showHint: boolean;
  onToggleHint: () => void;
  color: string;
  status: QuestionStatus;
  confidence: number;
  onUpdateProgress: (status: QuestionStatus, confidence: number) => void;
}

export function QuestionCard({
  question,
  showHint,
  onToggleHint,
  color,
  status,
  confidence,
  onUpdateProgress,
}: QuestionCardProps) {
  return (
    <div
      style={{
        padding: "14px 16px",
        background: "var(--surface2)",
        borderRadius: 6,
        border: `1px solid var(--border)`,
        transition: "all 0.15s",
      }}
    >
      {/* Question */}
      <p
        style={{
          fontSize: "0.88rem",
          lineHeight: 1.6,
          marginBottom: 10,
          fontWeight: 500,
        }}
      >
        {question.question}
      </p>

      {/* Hint Toggle Button */}
      <button
        onClick={onToggleHint}
        style={{
          fontSize: "0.75rem",
          padding: "4px 12px",
          background: showHint ? `${color}20` : "var(--surface)",
          color: showHint ? color : "var(--muted)",
          border: `1px solid ${showHint ? `${color}40` : "var(--border)"}`,
          borderRadius: 4,
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          gap: 6,
          transition: "all 0.15s",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.borderColor = `${color}60`;
          e.currentTarget.style.background = `${color}15`;
        }}
        onMouseLeave={(e) => {
          if (!showHint) {
            e.currentTarget.style.borderColor = "var(--border)";
            e.currentTarget.style.background = "var(--surface)";
          } else {
            e.currentTarget.style.borderColor = `${color}40`;
            e.currentTarget.style.background = `${color}20`;
          }
        }}
      >
        <span style={{ fontSize: "0.9rem" }}>{showHint ? "🔓" : "💡"}</span>
        {showHint ? "Hide Hint" : "Show Hint"}
      </button>

      {/* Hint Display */}
      {showHint && (
        <div
          style={{
            marginTop: 12,
            padding: "12px 14px",
            background: `${color}08`,
            border: `1px solid ${color}30`,
            borderLeft: `3px solid ${color}`,
            borderRadius: 4,
          }}
        >
          <div style={{ display: "flex", gap: 8 }}>
            <span
              style={{
                fontSize: "0.7rem",
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: "0.05em",
                color: color,
                marginTop: 2,
              }}
            >
              Hint:
            </span>
            <p
              style={{
                fontSize: "0.82rem",
                lineHeight: 1.5,
                color: "var(--text)",
                fontStyle: "italic",
              }}
            >
              {question.hint}
            </p>
          </div>
        </div>
      )}

      {/* Progress Tracking */}
      <div
        style={{
          marginTop: 12,
          display: "flex",
          gap: 8,
          flexWrap: "wrap",
          alignItems: "center",
        }}
      >
        <StatusButton
          label="✓ Done"
          active={status === "done"}
          color="var(--green)"
          onClick={() => onUpdateProgress("done", confidence || 3)}
        />
        <StatusButton
          label="⟲ Revisit"
          active={status === "revisit"}
          color="var(--amber)"
          onClick={() => onUpdateProgress("revisit", confidence || 2)}
        />
        <StatusButton
          label="→ Skip"
          active={status === "skipped"}
          color="var(--muted)"
          onClick={() => onUpdateProgress("skipped", confidence || 0)}
        />

        {/* Confidence Rating */}
        {(status === "done" || status === "revisit") && (
          <div
            style={{
              marginLeft: "auto",
              display: "flex",
              gap: 4,
              alignItems: "center",
            }}
          >
            <span style={{ fontSize: "0.7rem", color: "var(--muted)" }}>
              Confidence:
            </span>
            {[1, 2, 3, 4, 5].map((level) => (
              <button
                key={level}
                onClick={() => onUpdateProgress(status, level)}
                style={{
                  width: 24,
                  height: 24,
                  fontSize: "0.7rem",
                  border:
                    confidence === level
                      ? `2px solid ${color}`
                      : "1px solid var(--border)",
                  background:
                    confidence >= level ? `${color}40` : "var(--surface)",
                  color: confidence >= level ? color : "var(--muted)",
                  borderRadius: 4,
                  cursor: "pointer",
                  fontWeight: confidence === level ? 700 : 400,
                }}
              >
                {level}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

interface StatusButtonProps {
  label: string;
  active: boolean;
  color: string;
  onClick: () => void;
}

function StatusButton({ label, active, color, onClick }: StatusButtonProps) {
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
