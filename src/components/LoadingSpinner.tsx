export function LoadingSpinner() {
  return (
    <div
      className="animate-in"
      style={{ padding: "40px", textAlign: "center" }}
    >
      <div
        style={{
          width: 48,
          height: 48,
          border: "4px solid var(--border)",
          borderTopColor: "var(--amber)",
          borderRadius: "50%",
          animation: "spin 0.7s linear infinite",
          margin: "100px auto",
        }}
      />
      <p style={{ color: "var(--muted)", marginTop: 16 }}>
        Loading questions...
      </p>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
