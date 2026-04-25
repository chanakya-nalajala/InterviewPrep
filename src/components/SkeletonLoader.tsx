// Skeleton loader for better loading UX
export function SkeletonCard() {
  return (
    <div
      className="card"
      style={{
        background: "var(--surface)",
        border: "1px solid var(--border)",
        padding: "20px",
        animation: "pulse 1.5s ease-in-out infinite",
      }}
    >
      <div
        style={{
          width: "60px",
          height: "60px",
          borderRadius: "8px",
          background: "var(--surface2)",
          marginBottom: "16px",
        }}
      />
      <div
        style={{
          width: "70%",
          height: "20px",
          borderRadius: "4px",
          background: "var(--surface2)",
          marginBottom: "12px",
        }}
      />
      <div
        style={{
          width: "90%",
          height: "14px",
          borderRadius: "4px",
          background: "var(--surface2)",
          marginBottom: "8px",
        }}
      />
      <div
        style={{
          width: "80%",
          height: "14px",
          borderRadius: "4px",
          background: "var(--surface2)",
          marginBottom: "16px",
        }}
      />
      <div
        style={{
          width: "50%",
          height: "12px",
          borderRadius: "4px",
          background: "var(--surface2)",
        }}
      />
    </div>
  );
}

export function SkeletonStat() {
  return (
    <div
      className="card"
      style={{
        textAlign: "center",
        padding: "14px 10px",
        animation: "pulse 1.5s ease-in-out infinite",
      }}
    >
      <div
        style={{
          width: "60%",
          height: "28px",
          borderRadius: "4px",
          background: "var(--surface2)",
          margin: "0 auto 8px",
        }}
      />
      <div
        style={{
          width: "80%",
          height: "12px",
          borderRadius: "4px",
          background: "var(--surface2)",
          margin: "0 auto",
        }}
      />
    </div>
  );
}

export function SkeletonList({ count = 3 }: { count?: number }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          style={{
            padding: "12px 14px",
            background: "var(--surface2)",
            borderRadius: 6,
            border: "1px solid var(--border)",
            animation: "pulse 1.5s ease-in-out infinite",
            animationDelay: `${index * 0.1}s`,
          }}
        >
          <div
            style={{
              width: "90%",
              height: "16px",
              borderRadius: "4px",
              background: "var(--surface)",
              marginBottom: "10px",
            }}
          />
          <div
            style={{
              display: "flex",
              gap: "8px",
            }}
          >
            <div
              style={{
                width: "80px",
                height: "32px",
                borderRadius: "4px",
                background: "var(--surface)",
              }}
            />
            <div
              style={{
                width: "80px",
                height: "32px",
                borderRadius: "4px",
                background: "var(--surface)",
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
