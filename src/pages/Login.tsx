import { useAuth } from "../hooks/useAuth";
import { Toast } from "../components/Toast";
import { useState } from "react";
import { GoogleIcon } from "../components/GoogleIcon.tsx";

export default function Login() {
  const { login } = useAuth();
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleLogin = async () => {
    try {
      await login();
    } catch (error: any) {
      // Check if it's a sign-up disabled error
      if (
        error?.code === "auth/admin-restricted-operation" ||
        error?.code === "auth/operation-not-allowed" ||
        error?.message?.includes("sign-up") ||
        error?.message?.includes("new user")
      ) {
        setErrorMessage(
          "New user sign-ups are currently disabled. Please contact the developer for access.",
        );
      } else {
        // Generic error message
        setErrorMessage(
          "Unable to sign in. Please try again or contact the developer for assistance.",
        );
      }
      console.error("Login error:", error);
    }
  };

  return (
    <>
      {/* Toast notification */}
      {errorMessage && (
        <Toast
          message={errorMessage}
          type="error"
          onClose={() => setErrorMessage(null)}
          duration={8000}
        />
      )}

      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background:
            "radial-gradient(ellipse at 50% 0%, rgba(245,158,11,0.08) 0%, transparent 60%)",
        }}
      >
        {/* Scanline effect */}
        <div
          style={{
            position: "fixed",
            inset: 0,
            pointerEvents: "none",
            zIndex: 0,
            backgroundImage:
              "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.05) 2px, rgba(0,0,0,0.05) 4px)",
          }}
        />

        <div
          className="animate-in"
          style={{
            textAlign: "center",
            zIndex: 1,
            maxWidth: 450,
            padding: "0 20px",
            width: "100%",
          }}
        >
          {/* Logo */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              width: 56,
              height: 56,
              borderRadius: 14,
              background: "var(--amber-glow)",
              border: "1px solid var(--amber-dim)",
              marginBottom: 24,
            }}
          >
            <span style={{ fontSize: 26 }}>⚡</span>
          </div>

          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(1.6rem, 6vw, 2rem)",
              fontWeight: 800,
              color: "var(--text)",
              letterSpacing: "-0.03em",
              marginBottom: 8,
            }}
          >
            Interview<span style={{ color: "var(--amber)" }}>Prep</span>
          </h1>

          <p
            className="text-muted"
            style={{ fontSize: "0.82rem", marginBottom: 32, lineHeight: 1.7 }}
          >
            800+ curated interview questions with expert hints.
            <br />
            Java · Spring · Microservices · Angular
          </p>

          <div
            style={{
              background: "var(--surface)",
              border: "1px solid var(--border)",
              borderRadius: 12,
              padding: "24px 20px",
              width: "100%",
            }}
          >
            <p
              style={{
                fontSize: "0.72rem",
                color: "var(--muted)",
                marginBottom: 16,
                letterSpacing: "0.06em",
                textTransform: "uppercase",
              }}
            >
              Sign in to continue
            </p>
            <button
              className="btn btn-primary w-full"
              style={{
                justifyContent: "center",
                padding: "12px 18px",
                fontSize: "0.82rem",
                minHeight: "48px",
              }}
              onClick={handleLogin}
            >
              <GoogleIcon />
              Continue with Google
            </button>
            <p
              className="text-muted"
              style={{ fontSize: "0.68rem", marginTop: 14, lineHeight: 1.4 }}
            >
              Secure authentication via Firebase
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
