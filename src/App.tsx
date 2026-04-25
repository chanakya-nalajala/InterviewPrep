// src/App.tsx
import { HashRouter, Navigate, NavLink, Route, Routes } from "react-router-dom";
import { AuthProvider, useAuth } from "./hooks/useAuth";
import { lazy, Suspense, ReactNode, useState } from "react";
import Login from "./pages/Login";
import "./styles/global.css";

// Lazy load heavy pages for better initial load time
const Dashboard = lazy(() => import("./pages/Dashboard"));
const InterviewQuestions = lazy(
  () => import("./pages/./InterviewQuestions.tsx"),
);

interface LayoutProps {
  children: ReactNode;
}

function Layout({ children }: LayoutProps) {
  const { user, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
          padding: "0 16px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          minHeight: 54,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16, flex: 1 }}>
          <span
            style={{
              fontFamily: "var(--font-display)",
              fontWeight: 800,
              fontSize: "1rem",
              color: "var(--text)",
            }}
          >
            Interview<span style={{ color: "var(--amber)" }}>Prep</span>
          </span>
          {/* Desktop Navigation */}
          <div
            style={{
              display: "flex",
              gap: 4,
            }}
            className="desktop-nav"
          >
            <NavItem to="/dashboard" label="Dashboard" />
            <NavItem to="/interview" label="Interview Q&A" />
          </div>
        </div>

        {/* Desktop User Menu */}
        <div
          style={{ display: "flex", alignItems: "center", gap: 12 }}
          className="desktop-nav"
        >
          <img
            src={user?.photoURL || undefined}
            alt="avatar"
            style={{
              width: 28,
              height: 28,
              borderRadius: "50%",
              border: "1px solid var(--border)",
            }}
          />
          <button className="btn btn-ghost btn-sm" onClick={logout}>
            Logout
          </button>
        </div>

        {/* Mobile Hamburger Menu */}
        <button
          className="mobile-menu-btn"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          style={{
            display: "none",
            background: "transparent",
            border: "1px solid var(--border)",
            borderRadius: 6,
            padding: "8px 12px",
            cursor: "pointer",
            color: "var(--text)",
            fontSize: "1.2rem",
          }}
        >
          {mobileMenuOpen ? "✕" : "☰"}
        </button>
      </nav>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div
          className="mobile-menu"
          style={{
            position: "sticky",
            top: 54,
            zIndex: 40,
            background: "rgba(10,10,15,0.95)",
            backdropFilter: "blur(12px)",
            borderBottom: "1px solid var(--border)",
            padding: "12px 16px",
            display: "none",
            flexDirection: "column",
            gap: 8,
          }}
        >
          <NavItem
            to="/dashboard"
            label="Dashboard"
            onClick={() => setMobileMenuOpen(false)}
          />
          <NavItem
            to="/interview"
            label="Interview Q&A"
            onClick={() => setMobileMenuOpen(false)}
          />
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              padding: "8px 12px",
              marginTop: 8,
              borderTop: "1px solid var(--border)",
              paddingTop: 12,
            }}
          >
            <img
              src={user?.photoURL || undefined}
              alt="avatar"
              style={{
                width: 32,
                height: 32,
                borderRadius: "50%",
                border: "1px solid var(--border)",
              }}
            />
            <span style={{ fontSize: "0.85rem", flex: 1 }}>
              {user?.displayName}
            </span>
            <button
              className="btn btn-ghost btn-sm"
              onClick={() => {
                logout();
                setMobileMenuOpen(false);
              }}
            >
              Logout
            </button>
          </div>
        </div>
      )}

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
        @media (max-width: 768px) {
          .desktop-nav {
            display: none !important;
          }
          .mobile-menu-btn {
            display: block !important;
          }
          .mobile-menu {
            display: flex !important;
          }
        }

        @media (min-width: 769px) {
          .mobile-menu {
            display: none !important;
          }
        }
      `}</style>
    </div>
  );
}

interface NavItemProps {
  to: string;
  label: string;
  onClick?: () => void;
}

function NavItem({ to, label, onClick }: NavItemProps) {
  return (
    <NavLink
      to={to}
      onClick={onClick}
      style={({ isActive }) => ({
        padding: "8px 12px",
        borderRadius: 6,
        fontSize: "0.8rem",
        textDecoration: "none",
        color: isActive ? "var(--amber)" : "var(--muted)",
        background: isActive ? "var(--amber-glow)" : "transparent",
        transition: "all 0.15s",
        display: "block",
      })}
    >
      {label}
    </NavLink>
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
          <Route path="/interview" element={<InterviewQuestions />} />
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
