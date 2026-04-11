import React from "react";
import { useNavigate } from "react-router-dom";
import 'bootstrap-icons/font/bootstrap-icons.css';
import ThemeToggle from "../components/ThemeToggle";

function Home() {
  const navigate = useNavigate();

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "var(--bg-color)", color: "var(--text-main)" }} className="animate-fade">

      {/* Navbar */}
      <nav style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "1rem 2.5rem",
        backgroundColor: "var(--bg-surface)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid var(--border-color)",
        position: "sticky",
        top: 0,
        zIndex: 100,
        boxShadow: "var(--shadow-sm)"
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
          <div style={{ 
            width: "35px", 
            height: "35px", 
            background: "var(--accent-gradient)", 
            borderRadius: "10px", 
            display: "flex", 
            alignItems: "center", 
            justifyContent: "center",
            boxShadow: "0 0 20px rgba(59, 130, 246, 0.4)"
          }}>
            <span style={{ fontSize: "18px" }}>📊</span>
          </div>
          <span style={{ fontSize: "1.1rem", fontWeight: "800", letterSpacing: "-0.5px" }}>
            Cogni<span style={{ color: "var(--accent-color)" }}>Track</span>
          </span>
        </div>

        <div style={{ display: "flex", gap: "15px", alignItems: "center" }}>
          <ThemeToggle />
          <button onClick={() => navigate("/login")} style={{
            padding: "8px 24px", borderRadius: "12px",
            border: "1px solid var(--border-color)", backgroundColor: "var(--bg-card)",
            color: "var(--text-main)", cursor: "pointer", fontSize: "14px", fontWeight: "600"
          }}>
            Sign In
          </button>
          <button onClick={() => navigate("/register")} style={{
            padding: "8px 24px", borderRadius: "12px",
            border: "none", backgroundColor: "var(--accent-color)",
            color: "white", cursor: "pointer", fontSize: "14px",
            fontWeight: "800", boxShadow: "0 4px 12px rgba(59, 130, 246, 0.3)"
          }}>
            Get Started
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <div style={{ textAlign: "center", padding: "100px 40px 80px", maxWidth: "1200px", margin: "0 auto" }}>

        <div style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "8px",
          backgroundColor: "rgba(59, 130, 246, 0.1)",
          border: "1px solid rgba(59, 130, 246, 0.2)",
          borderRadius: "50px",
          padding: "8px 20px",
          fontSize: "13px",
          fontWeight: "700",
          color: "var(--accent-color)",
          marginBottom: "30px",
          textTransform: "uppercase",
          letterSpacing: "1px"
        }}>
          ✨ Next-Gen Learning Intelligence
        </div>

        <h1 style={{
          fontSize: "4.5rem", fontWeight: "900",
          lineHeight: "1", marginBottom: "25px",
          letterSpacing: "-3px",
          color: "var(--text-main)"
        }}>
          Analyze Your <span style={{ color: "var(--accent-color)" }}>Growth</span> <br />
          In Real-Time.
        </h1>

        <p style={{
          fontSize: "1.2rem", color: "var(--text-secondary)",
          maxWidth: "600px", margin: "0 auto 40px", lineHeight: "1.6",
          fontWeight: "400"
        }}>
          CogniTrack transforms your study behavior into actionable insights. 
          Track progress, identify knowledge gaps, and optimize your path to mastery.
        </p>

        <div style={{ display: "flex", gap: "15px", justifyContent: "center", marginBottom: "80px" }}>
          <button onClick={() => navigate("/register")} style={{
            padding: "16px 45px", borderRadius: "14px",
            border: "none", backgroundColor: "var(--accent-color)",
            color: "white", fontSize: "16px", fontWeight: "800",
            cursor: "pointer", boxShadow: "0 15px 30px rgba(59, 130, 246, 0.3)"
          }}>
            Create Free Profile
          </button>
          <button onClick={() => navigate("/login")} style={{
            padding: "16px 45px", borderRadius: "14px",
            border: "1px solid var(--border-color)", backgroundColor: "var(--bg-surface)",
            color: "var(--text-main)", fontSize: "16px", fontWeight: "700", cursor: "pointer"
          }}>
            Sign In
          </button>
        </div>

        {/* Hero Stats */}
        <div style={{
          display: "flex",
          justifyContent: "center",
          gap: "20px",
          flexWrap: "wrap",
        }}>
          {[
            { label: "Learning Modules", value: "45+", color: "var(--accent-color)" },
            { label: "Active Students", value: "2.4k", color: "var(--accent-secondary)" },
            { label: "Data Points", value: "1M+", color: "#8b5cf6" },
          ].map((stat, i) => (
            <div key={i} style={{
              textAlign: "left",
              backgroundColor: "var(--bg-surface)",
              borderRadius: "var(--radius-lg)",
              padding: "1.5rem 2.5rem",
              border: `1px solid var(--border-color)`,
              minWidth: "200px",
              boxShadow: "var(--shadow-md)",
            }}>
              <div style={{ fontSize: "2rem", fontWeight: "900", color: stat.color }}>{stat.value}</div>
              <div style={{ color: "var(--text-secondary)", fontSize: "13px", fontWeight: "600", textTransform: "uppercase" }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Features Section */}
      <section style={{
        padding: "100px 40px",
        backgroundColor: "var(--bg-surface)",
        borderTop: "1px solid var(--border-color)",
      }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: "60px" }}>
            <h2 style={{ fontSize: "2.5rem", fontWeight: "900", color: "var(--text-main)", letterSpacing: "-1px" }}>
              Engineered for <span style={{ color: "var(--accent-color)" }}>Success</span>
            </h2>
            <p style={{ color: "var(--text-secondary)", fontSize: "1.1rem" }}>Advanced features for modern academic growth.</p>
          </div>

          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "2rem",
          }}>
            {[
              { icon: "⚡", title: "Instant Analytics", desc: "Live tracking of study duration and session intensity." },
              { icon: "🎯", title: "Proficiency Mapping", desc: "Detailed breakdown of skill levels across different topics." },
              { icon: "🧠", title: "Gap Identification", desc: "AI-driven detection of topics requiring immediate review." },
              { icon: "📈", title: "Progress Visualization", desc: "High-fidelity charts mapping your academic trajectory." },
            ].map((feature, i) => (
              <div key={i} style={{
                backgroundColor: "var(--bg-color)",
                borderRadius: "var(--radius-lg)",
                padding: "2.5rem",
                border: `1px solid var(--border-color)`,
                transition: "all 0.3s",
              }}>
                <div style={{ fontSize: "32px", marginBottom: "1.5rem" }}>{feature.icon}</div>
                <h3 style={{ color: "var(--text-main)", fontSize: "1.25rem", fontWeight: "800", marginBottom: "1rem" }}>{feature.title}</h3>
                <p style={{ color: "var(--text-secondary)", fontSize: "15px", lineHeight: "1.6" }}>{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{
        padding: "4rem 2.5rem",
        textAlign: "center",
        borderTop: "1px solid var(--border-color)",
      }}>
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "10px", marginBottom: "1rem" }}>
          <div style={{ 
            width: "30px", height: "30px", 
            background: "var(--accent-gradient)", 
            borderRadius: "8px", 
            display: "flex", alignItems: "center", justifyContent: "center" 
          }}>
            <span style={{ fontSize: "14px" }}>📊</span>
          </div>
          <span style={{ fontWeight: "800", color: "var(--text-main)" }}>CogniTrack</span>
        </div>
        <p style={{ color: "var(--text-muted)", fontSize: "14px" }}>
          © 2026 CogniTrack Learning Intelligence. All rights reserved.
        </p>
      </footer>
    </div>
  );
}

export default Home;