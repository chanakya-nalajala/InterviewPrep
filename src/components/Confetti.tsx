import { useEffect, useState } from "react";

interface ConfettiPiece {
  id: number;
  x: number;
  y: number;
  rotation: number;
  color: string;
  size: number;
  delay: number;
}

export function Confetti({ trigger }: { trigger: boolean }) {
  const [pieces, setPieces] = useState<ConfettiPiece[]>([]);

  useEffect(() => {
    if (trigger) {
      const colors = [
        "#f59e0b", // amber
        "#10b981", // green
        "#60a5fa", // blue
        "#a78bfa", // purple
        "#fb923c", // orange
        "#22d3ee", // cyan
      ];

      const newPieces: ConfettiPiece[] = Array.from({ length: 30 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: 0, // Start at top of viewport
        rotation: Math.random() * 360,
        color: colors[Math.floor(Math.random() * colors.length)],
        size: Math.random() * 12 + 8, // Bigger pieces: 8-20px
        delay: Math.random() * 0.5,
      }));

      setPieces(newPieces);

      // Clear after animation
      setTimeout(() => {
        setPieces([]);
      }, 3500);
    }
  }, [trigger]);

  // Always render the container when triggered, even before pieces are created
  if (!trigger && pieces.length === 0) {
    return null;
  }

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        pointerEvents: "none",
        zIndex: 99999,
        overflow: "hidden",
      }}
    >
      {pieces.map((piece) => (
        <div
          key={piece.id}
          className="confetti-piece"
          style={{
            position: "absolute",
            left: `${piece.x}%`,
            top: `${piece.y}%`,
            width: `${piece.size}px`,
            height: `${piece.size}px`,
            background: piece.color,
            borderRadius: "50%",
            animationName: "confettiFall",
            animationDuration: "3s",
            animationTimingFunction: "ease-in",
            animationDelay: `${piece.delay}s`,
            animationFillMode: "forwards",
            transform: `rotate(${piece.rotation}deg)`,
            boxShadow: `0 0 6px ${piece.color}`,
            willChange: "transform, opacity",
          }}
        />
      ))}
      <style>{`
        @keyframes confettiFall {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(120vh) rotate(720deg);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
}

// Success celebration toast
export function SuccessMessage({
  message,
  show,
}: {
  message: string;
  show: boolean;
}) {
  if (!show) return null;

  // Pick emoji based on message content
  const getEmoji = () => {
    if (message.includes("Category") || message.includes("INCREDIBLE")) return "🏆";
    if (message.includes("Section")) return "✨";
    if (message.includes("First")) return "🎯";
    if (message.includes("crushing")) return "🚀";
    return "🎉";
  };

  return (
    <div
      className="animate-scale"
      style={{
        position: "fixed",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        zIndex: 10000,
        background: "var(--surface)",
        border: "2px solid var(--green)",
        borderRadius: 16,
        padding: "28px 36px",
        boxShadow: "0 20px 60px rgba(0,0,0,0.4), 0 0 0 1px var(--green)40",
        textAlign: "center",
        maxWidth: "90%",
        backdropFilter: "blur(10px)",
      }}
    >
      <div
        style={{
          fontSize: "3.5rem",
          marginBottom: 12,
          animation: "bounce 0.6s ease-in-out infinite",
        }}
      >
        {getEmoji()}
      </div>
      <div
        style={{
          fontSize: "clamp(1rem, 4vw, 1.3rem)",
          fontWeight: 800,
          color: "var(--green)",
          fontFamily: "var(--font-display)",
          lineHeight: 1.3,
        }}
      >
        {message}
      </div>
    </div>
  );
}
