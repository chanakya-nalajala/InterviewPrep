import { HashRouter, Navigate, Route, Routes } from "react-router-dom";
import { AuthProvider, useAuth } from "./hooks/useAuth";
import { lazy, ReactNode, Suspense, useState } from "react";
import Login from "./pages/Login";
import "./styles/global.css";

// Lazy load heavy pages for better initial load time
const Dashboard = lazy(() => import("./pages/Dashboard"));

interface LayoutProps {
  children: ReactNode;
}

function Layout({ children }: LayoutProps) {
  const { user, logout } = useAuth();
  const [showUserName, setShowUserName] = useState(false);

  return (
    <div
      style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}
    >
      <nav
        style={{
          borderBottom: "1px solid var(--border)",
          background: "rgba(10,10,15,0.9)",
          backdropFilter: "blur(12px)",
          position: "sticky",
          top: 0,
          zIndex: 50,
          padding: "0 12px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          minHeight: 54,
          gap: 8,
        }}
      >
        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <span
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 800,
              fontSize: "clamp(0.9rem, 3vw, 1rem)",
              color: "var(--text)",
            }}
          >
            Interview<span style={{ color: "var(--amber)" }}>Prep</span>
          </span>
        </div>

        {/* User Menu - Always Visible */}
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div
            style={{
              position: "relative",
              display: "flex",
              alignItems: "center",
              gap: 6,
            }}
            title={user?.displayName || "User"}
          >
            <img
              src={user?.photoURL || undefined}
              alt={user?.displayName || "User"}
              onClick={() => setShowUserName(!showUserName)}
              style={{
                width: 28,
                height: 28,
                borderRadius: "50%",
                border: `2px solid ${showUserName ? "var(--amber)" : "var(--border)"}`,
                cursor: "pointer",
                transition: "all 0.2s",
              }}
            />
            {showUserName && (
              <span
                style={{
                  fontSize: "clamp(0.7rem, 2vw, 0.8rem)",
                  color: "var(--text)",
                  fontWeight: 500,
                  maxWidth: "120px",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap",
                  animation:
                    "revealName 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)",
                  transformOrigin: "left center",
                }}
                className="user-name"
              >
                {user?.displayName?.split(" ")[0] || "User"}
              </span>
            )}
          </div>
          <button
            className="btn btn-ghost btn-sm logout-btn"
            onClick={logout}
            style={{
              fontSize: "clamp(0.65rem, 2vw, 0.72rem)",
              padding: "5px 8px",
              minHeight: "auto",
              height: "auto",
            }}
          >
            Logout
          </button>
        </div>
      </nav>

      <main
        style={{
          flex: 1,
          maxWidth: 860,
          margin: "0 auto",
          padding: "20px 16px",
          width: "100%",
        }}
      >
        {children}
      </main>

      <style>{`
        @keyframes revealName {
          0% {
            opacity: 0;
            transform: translateX(-20px) scale(0.8);
            filter: blur(4px);
          }
          50% {
            opacity: 0.8;
            transform: translateX(2px) scale(1.05);
            filter: blur(1px);
          }
          100% {
            opacity: 1;
            transform: translateX(0) scale(1);
            filter: blur(0);
          }
        }

        /* Mobile logout button styling */
        @media (max-width: 768px) {
          .logout-btn {
            padding: 4px 8px !important;
            font-size: 0.65rem !important;
            font-weight: 500 !important;
            min-height: 28px !important;
            height: 28px !important;
            line-height: 1.2 !important;
          }
        }

        /* Very small screens - even more compact */
        @media (max-width: 360px) {
          .logout-btn {
            padding: 4px 6px !important;
            font-size: 0.6rem !important;
          }
        }
      `}</style>
    </div>
  );
}

function AppRoutes() {
  const { user, loading } = useAuth();

  if (loading)
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <div
          style={{
            width: 36,
            height: 36,
            border: "2px solid var(--border)",
            borderTopColor: "var(--amber)",
            borderRadius: "50%",
            animation: "spin 0.7s linear infinite",
          }}
        />
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );

  if (!user)
    return (
      <Routes>
        <Route path="*" element={<Login />} />
      </Routes>
    );

  return (
    <Layout>
      <Suspense
        fallback={
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "60vh",
            }}
          >
            <div
              style={{
                width: 36,
                height: 36,
                border: "2px solid var(--border)",
                borderTopColor: "var(--amber)",
                borderRadius: "50%",
                animation: "spin 0.7s linear infinite",
              }}
            />
          </div>
        }
      >
        <Routes>
          <Route path="/" element={<Navigate to="/dashboard" replace />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </Suspense>
    </Layout>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <HashRouter>
        <AppRoutes />
      </HashRouter>
    </AuthProvider>
  );
}
