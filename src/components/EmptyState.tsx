// Empty state component for better UX

interface EmptyStateProps {
  icon?: string;
  title: string;
  description?: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export function EmptyState({
  icon = "🔍",
  title,
  description,
  action,
}: EmptyStateProps) {
  return (
    <div
      className="animate-in"
      style={{
        textAlign: "center",
        padding: "60px 20px",
        maxWidth: "400px",
        margin: "0 auto",
      }}
    >
      <div
        style={{
          fontSize: "4rem",
          marginBottom: 16,
          animation: "wiggle 2s ease-in-out infinite",
        }}
      >
        {icon}
      </div>
      <h3
        style={{
          fontSize: "1.2rem",
          fontWeight: 700,
          color: "var(--text)",
          marginBottom: 8,
          fontFamily: "var(--font-display)",
        }}
      >
        {title}
      </h3>
      {description && (
        <p
          style={{
            fontSize: "0.85rem",
            color: "var(--muted)",
            lineHeight: 1.6,
            marginBottom: 20,
          }}
        >
          {description}
        </p>
      )}
      {action && (
        <button onClick={action.onClick} className="btn btn-primary">
          {action.label}
        </button>
      )}
    </div>
  );
}

// Playful "no results" message
export function NoResults({ searchTerm }: { searchTerm: string }) {
  const messages = [
    "Hmm, that's a tough one to find! 🤔",
    "Nothing here... yet! 🔮",
    "Our search ninjas came up empty! 🥷",
    "No matches found, but nice try! 💪",
  ];

  const randomMessage = messages[Math.floor(Math.random() * messages.length)];

  return (
    <EmptyState
      icon="🕵️"
      title={randomMessage}
      description={`No results found for "${searchTerm}". Try different keywords or explore other categories!`}
    />
  );
}

// Completion celebration state
export function CompletedState({
  categoryName,
  onContinue,
}: {
  categoryName: string;
  onContinue: () => void;
}) {
  return (
    <div
      className="animate-scale"
      style={{
        textAlign: "center",
        padding: "60px 20px",
        maxWidth: "450px",
        margin: "0 auto",
      }}
    >
      <div
        style={{
          fontSize: "5rem",
          marginBottom: 16,
          animation: "bounce 1s ease-in-out infinite",
        }}
      >
        🎊
      </div>
      <h2
        style={{
          fontSize: "1.8rem",
          fontWeight: 800,
          color: "var(--green)",
          marginBottom: 12,
          fontFamily: "var(--font-display)",
        }}
      >
        Amazing Work!
      </h2>
      <p
        style={{
          fontSize: "1rem",
          color: "var(--text)",
          lineHeight: 1.6,
          marginBottom: 24,
        }}
      >
        You've completed all questions in{" "}
        <span style={{ color: "var(--amber)", fontWeight: 600 }}>
          {categoryName}
        </span>
        ! Keep up the great momentum! 🚀
      </p>
      <button onClick={onContinue} className="btn btn-primary">
        Continue Learning →
      </button>
    </div>
  );
}
