import React from "react";
import { useNavigate } from "react-router-dom";
import ThemeToggle from "../components/ThemeToggle";

function Home() {
  const navigate = useNavigate();

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "var(--bg-color)", color: "var(--text-main)" }}>

      {/* Navbar */}
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "20px 40px",
        backgroundColor: "var(--nav-bg)",
        borderBottom: "1px solid var(--border-color)",
        position: "sticky",
        top: 0,
        zIndex: 100,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <span style={{ fontSize: "16px", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.1em" }}>
            Analytica
          </span>
        </div>

        <div style={{ display: "flex", gap: "24px", alignItems: "center" }}>
          <ThemeToggle />
          <button onClick={() => navigate("/login")} style={{
            fontSize: "14px", fontWeight: "500", color: "var(--text-main)",
            backgroundColor: "transparent", border: "none", cursor: "pointer"
          }}>
            Login
          </button>
          <button onClick={() => navigate("/register")} style={{
            padding: "8px 20px", borderRadius: "8px",
            border: "none", backgroundColor: "var(--accent-color)",
            color: "#0f172a", cursor: "pointer", fontSize: "14px",
            fontWeight: "600"
          }}>
            Get Started
          </button>
        </div>
      </div>

      {/* Hero Section */}
      <div style={{ textAlign: "center", padding: "120px 20px 80px" }}>
        <h1 style={{
          fontSize: "48px", fontWeight: "800",
          lineHeight: "1.1", marginBottom: "24px",
          maxWidth: "800px", margin: "0 auto 24px",
        }}>
          Understand your learning <br />
          with data-driven <span style={{ color: "var(--accent-color)" }}>insights</span>.
        </h1>

        <p style={{
          fontSize: "18px", color: "var(--text-secondary)",
          maxWidth: "600px", margin: "0 auto 48px", lineHeight: "1.6",
        }}>
          Track study patterns, analyze quiz performance, and optimize your 
          academic journey with our minimal learning analytics system.
        </p>

        <div style={{ display: "flex", gap: "16px", justifyContent: "center" }}>
          <button onClick={() => navigate("/register")} style={{
            padding: "14px 32px", borderRadius: "8px",
            border: "none", backgroundColor: "var(--accent-color)",
            color: "#0f172a", fontSize: "16px", fontWeight: "700",
            cursor: "pointer"
          }}>
            Join Analytica
          </button>
          <button onClick={() => navigate("/login")} style={{
            padding: "14px 32px", borderRadius: "8px",
            border: "1px solid var(--border-color)", backgroundColor: "transparent",
            color: "var(--text-main)", fontSize: "16px", fontWeight: "600",
            cursor: "pointer"
          }}>
            View Demo
          </button>
        </div>
      </div>

      {/* Features Grid */}
      <div style={{ padding: "80px 40px", maxWidth: "1000px", margin: "0 auto" }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "32px",
        }}>
          {[
            { symbol: "□", title: "Activity Tracking", desc: "Monitor time spent on topics with precision." },
            { symbol: "□", title: "Performance Data", desc: "Get detailed analytics of your quiz scores." },
            { symbol: "□", title: "Smart Alerts", desc: "Identify topics that need more attention." },
          ].map((feature, i) => (
            <div key={i} style={{
              padding: "32px",
              backgroundColor: "var(--card-bg)",
              borderRadius: "12px",
              border: "1px solid var(--border-color)",
            }}>
              <div style={{ fontSize: "20px", color: "var(--accent-color)", marginBottom: "16px" }}>{feature.symbol}</div>
              <h3 style={{ fontSize: "18px", fontWeight: "700", marginBottom: "12px" }}>{feature.title}</h3>
              <p style={{ color: "var(--text-secondary)", fontSize: "14px", lineHeight: "1.6" }}>{feature.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div style={{
        textAlign: "center",
        padding: "60px 20px",
        color: "var(--text-muted)",
        fontSize: "13px",
        borderTop: "1px solid var(--border-color)",
      }}>
        © 2026 Analytica Learning Behaviour Systems
      </div>

    </div>
  );
}

export default Home;