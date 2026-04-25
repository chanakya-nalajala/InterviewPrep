import { Question, QuestionStatus } from "../data/types";
import { QuestionCard } from "./QuestionCard";

interface QuestionsListProps {
  interviewQuestions: Question[];
  scenarioQuestions: Question[];
  categoryColor: string;
  visibleHints: Set<string>;
  onToggleHint: (id: string) => void;
  getQuestionStatus: (id: string) => QuestionStatus;
  getQuestionConfidence: (id: string) => number;
  onUpdateProgress: (
    id: string,
    status: QuestionStatus,
    confidence: number,
  ) => void;
}

export function QuestionsList({
  interviewQuestions,
  scenarioQuestions,
  categoryColor,
  visibleHints,
  onToggleHint,
  getQuestionStatus,
  getQuestionConfidence,
  onUpdateProgress,
}: QuestionsListProps) {
  return (
    <div>
      {/* Interview Questions */}
      {interviewQuestions.length > 0 && (
        <div style={{ marginBottom: 32 }}>
          <h3
            style={{
              fontSize: "0.95rem",
              marginBottom: 16,
              color: "var(--text)",
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: "0.05em",
            }}
          >
            💬 Interview Questions ({interviewQuestions.length})
          </h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {interviewQuestions.map((q) => (
              <QuestionCard
                key={q.id}
                question={q}
                showHint={visibleHints.has(q.id)}
                onToggleHint={() => onToggleHint(q.id)}
                color={categoryColor}
                status={getQuestionStatus(q.id)}
                confidence={getQuestionConfidence(q.id)}
                onUpdateProgress={(status, confidence) =>
                  onUpdateProgress(q.id, status, confidence)
                }
              />
            ))}
          </div>
        </div>
      )}

      {/* Scenario Questions */}
      {scenarioQuestions.length > 0 && (
        <div>
          <h3
            style={{
              fontSize: "0.95rem",
              marginBottom: 16,
              color: "var(--text)",
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: "0.05em",
            }}
          >
            🎯 Scenario Questions ({scenarioQuestions.length})
          </h3>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {scenarioQuestions.map((q) => (
              <QuestionCard
                key={q.id}
                question={q}
                showHint={visibleHints.has(q.id)}
                onToggleHint={() => onToggleHint(q.id)}
                color="var(--blue)"
                status={getQuestionStatus(q.id)}
                confidence={getQuestionConfidence(q.id)}
                onUpdateProgress={(status, confidence) =>
                  onUpdateProgress(q.id, status, confidence)
                }
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
