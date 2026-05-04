import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Question, QuestionStatus } from "../data/types.ts";
import { StatusButton } from "./StatusButton.tsx";
import { getAnswerByQuestionId } from "../data/dataLoader";

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
  const [answer, setAnswer] = useState<string>("");
  const [showAnswer, setShowAnswer] = useState(false);

  // Load answer from data.json on mount
  useEffect(() => {
    const loadedAnswer = getAnswerByQuestionId(question.id);
    if (loadedAnswer) {
      setAnswer(loadedAnswer);
    }
  }, [question.id]);

  const handleToggleAnswer = () => {
    setShowAnswer(!showAnswer);
  };

  // Generate Google search link with question and hint
  const generateGoogleSearchLink = () => {
    const searchQuery = `${question.question} ${question.hint} code example`;
    const encodedQuery = encodeURIComponent(searchQuery);
    return `https://www.google.com/search?q=${encodedQuery}`;
  };

  return (
    <div
      style={{
        padding: "12px 14px",
        background: "var(--surface2)",
        borderRadius: 6,
        border: `1px solid var(--border)`,
        transition: "all 0.15s",
      }}
    >
      {/* Question */}
      <p
        style={{
          fontSize: "0.86rem",
          lineHeight: 1.6,
          marginBottom: 10,
          fontWeight: 500,
        }}
      >
        {question.question}
      </p>

      {/* Action Buttons */}
      <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
        {/* Hint Toggle Button */}
        <button
          onClick={onToggleHint}
          style={{
            fontSize: "0.72rem",
            padding: "6px 14px",
            background: showHint ? `${color}20` : "var(--surface)",
            color: showHint ? color : "var(--muted)",
            border: `1px solid ${showHint ? `${color}40` : "var(--border)"}`,
            borderRadius: 4,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: 6,
            transition: "all 0.15s",
            minHeight: "36px",
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
          <span style={{ fontSize: "0.9rem" }}>{showHint ? "🔓" : "🧩"}</span>
          {showHint ? "Hide Hint" : "Show Hint"}
        </button>

        {/* Show Answer Button */}
        {answer && (
          <button
            onClick={handleToggleAnswer}
            style={{
              fontSize: "0.72rem",
              padding: "6px 14px",
              background: showAnswer ? "var(--purple)20" : "var(--surface)",
              color: showAnswer ? "var(--purple)" : "var(--muted)",
              border: `1px solid ${showAnswer ? "var(--purple)40" : "var(--border)"}`,
              borderRadius: 4,
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              gap: 6,
              transition: "all 0.15s",
              minHeight: "36px",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = "var(--purple)60";
              e.currentTarget.style.background = "var(--purple)15";
            }}
            onMouseLeave={(e) => {
              if (!showAnswer) {
                e.currentTarget.style.borderColor = "var(--border)";
                e.currentTarget.style.background = "var(--surface)";
              } else {
                e.currentTarget.style.borderColor = "var(--purple)40";
                e.currentTarget.style.background = "var(--purple)20";
              }
            }}
          >
            <span style={{ fontSize: "0.9rem" }}>
              {showAnswer ? "📖" : "💡"}
            </span>
            {showAnswer ? "Hide Answer" : "Show Answer"}
          </button>
        )}

        {/* Google Search Button */}
        <a
          href={generateGoogleSearchLink()}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            fontSize: "0.72rem",
            padding: "6px 14px",
            background: "var(--surface)",
            color: "var(--muted)",
            border: "1px solid var(--border)",
            borderRadius: 4,
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            gap: 6,
            transition: "all 0.15s",
            minHeight: "36px",
            textDecoration: "none",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.borderColor = "var(--blue)60";
            e.currentTarget.style.background = "var(--blue)15";
            e.currentTarget.style.color = "var(--blue)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.borderColor = "var(--border)";
            e.currentTarget.style.background = "var(--surface)";
            e.currentTarget.style.color = "var(--muted)";
          }}
        >
          <span style={{ fontSize: "0.9rem" }}>🔍</span>
          Search Google
        </a>
      </div>

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

      {/* Answer Display */}
      {showAnswer && answer && (
        <div
          style={{
            marginTop: 12,
            padding: "14px 16px",
            background: "var(--purple)08",
            border: "1px solid var(--purple)30",
            borderLeft: "3px solid var(--purple)",
            borderRadius: 4,
          }}
        >
          <div
            style={{
              display: "flex",
              gap: 8,
              marginBottom: 10,
            }}
          >
            <span
              style={{
                fontSize: "0.7rem",
                fontWeight: 600,
                textTransform: "uppercase",
                letterSpacing: "0.05em",
                color: "var(--purple)",
                marginTop: 2,
              }}
            >
              📖 Answer:
            </span>
          </div>
          <div
            className="markdown-content"
            style={{
              fontSize: "0.82rem",
              lineHeight: 1.6,
              color: "var(--text)",
            }}
          >
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{answer}</ReactMarkdown>
          </div>
        </div>
      )}

      {/* Progress Tracking */}
      <div
        style={{
          marginTop: 12,
          display: "flex",
          gap: 6,
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
              width: "100%",
              marginTop: 8,
              display: "flex",
              gap: 6,
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            <span style={{ fontSize: "0.68rem", color: "var(--muted)" }}>
              Confidence:
            </span>
            {[1, 2, 3, 4, 5].map((level) => (
              <button
                key={level}
                onClick={() => onUpdateProgress(status, level)}
                style={{
                  minWidth: 32,
                  minHeight: 32,
                  fontSize: "0.72rem",
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
                  padding: 4,
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
