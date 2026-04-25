import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ThemeToggle from "../components/ThemeToggle";
import Toast from "../components/Toast";

const inputStyle = {
  width: "100%",
  padding: "11px 14px",
  borderRadius: "8px",
  border: "1px solid var(--border-color)",
  backgroundColor: "var(--input-bg)",
  color: "var(--text-main)",
  fontSize: "14px",
  outline: "none",
  boxSizing: "border-box",
  transition: "border-color 0.2s",
};

const labelStyle = {
  color: "var(--text-secondary)",
  fontSize: "12px",
  fontWeight: "600",
  textTransform: "uppercase",
  letterSpacing: "0.06em",
  display: "block",
  marginBottom: "6px",
};

const icons = {
  activity: (color) => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"></polyline>
    </svg>
  ),
  performance: (color) => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 20V10"></path><path d="M18 20V4"></path><path d="M6 20v-4"></path>
    </svg>
  ),
  alerts: (color) => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path>
    </svg>
  ),
  ai: (color) => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M21 12a9 9 0 1 1-9-9c2.52 0 4.93 1 6.74 2.74L21 8"></path>
      <path d="M21 3v5h-5"></path><path d="M12 7v5l4 2"></path>
    </svg>
  ),
  logo: (size = 32, color = "var(--accent-color)") => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="24" height="24" rx="6" fill={color} />
      <path d="M12 7C9.23858 7 7 9.23858 7 12C7 14.7614 9.23858 17 12 17C14.7614 17 17 14.7614 17 12" stroke="white" strokeWidth="2.5" strokeLinecap="round"/>
      <circle cx="12" cy="12" r="2" fill="white" />
    </svg>
  )
};

const features = [
  {
    icon: icons.activity("#3b82f6"),
    bg: "rgba(59, 130, 246, 0.1)",
    title: "Activity Tracking",
    desc: "Monitor time spent on topics with precision and clarity.",
  },
  {
    icon: icons.performance("#10b981"),
    bg: "rgba(16, 185, 129, 0.1)",
    title: "Performance Data",
    desc: "Get detailed analytics of your quiz scores over time.",
  },
  {
    icon: icons.alerts("#f59e0b"),
    bg: "rgba(245, 158, 11, 0.1)",
    title: "Smart Alerts",
    desc: "Identify topics that need more attention instantly.",
  },
  {
    icon: icons.ai("#8b5cf6"),
    bg: "rgba(139, 92, 246, 0.1)",
    title: "AI-Powered Quizzes",
    desc: "Adaptive quizzes generated from your own study sessions.",
  },
];

function Home() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("login");
  const [toast, setToast] = useState(null);

  // Login state
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  // Register state
  const [regName, setRegName] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [regConfirm, setRegConfirm] = useState("");

  const showToast = (message, type) => setToast({ message, type });

  const handleLogin = async () => {
    if (!loginEmail || !loginPassword) {
      showToast("Please fill all fields.", "error");
      return;
    }
    try {
      const res = await axios.post("http://127.0.0.1:5000/api/login", {
        email: loginEmail,
        password: loginPassword,
      });
      if (res.data.success) {
        localStorage.setItem("user_id", res.data.user_id);
        localStorage.setItem("student_id", res.data.user_id);
        localStorage.setItem("student_name", res.data.name);
        showToast("Welcome back!", "success");
        setTimeout(() => navigate("/dashboard"), 1000);
      } else {
        showToast("Invalid credentials.", "error");
      }
    } catch {
      showToast("Connection failed.", "error");
    }
  };

  const handleRegister = async () => {
    if (!regName || !regEmail || !regPassword || !regConfirm) {
      showToast("Please fill all fields.", "error");
      return;
    }
    if (regPassword !== regConfirm) {
      showToast("Passwords do not match.", "error");
      return;
    }
    try {
      const res = await axios.post("http://127.0.0.1:5000/api/register", {
        name: regName,
        email: regEmail,
        password: regPassword,
      });
      if (res.data.success) {
        localStorage.setItem("user_id", res.data.user_id);
        localStorage.setItem("student_id", res.data.user_id);
        localStorage.setItem("student_name", res.data.name);
        showToast("Account created!", "success");
        setTimeout(() => navigate("/dashboard"), 1000);
      } else {
        showToast("Registration failed.", "error");
      }
    } catch {
      showToast("Connection failed.", "error");
    }
  };

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "var(--bg-color)", color: "var(--text-main)" }}>

      {/* Navbar */}
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "18px 40px",
        backgroundColor: "var(--nav-bg)",
        borderBottom: "1px solid var(--border-color)",
        position: "sticky",
        top: 0,
        zIndex: 100,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          {icons.logo(28)}
          <span style={{ fontSize: "17px", fontWeight: "800", textTransform: "uppercase", letterSpacing: "0.12em", color: "var(--accent-color)" }}>
            Analytica
          </span>
        </div>
        <ThemeToggle />
      </div>

      {toast && (
        <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />
      )}

      {/* Main Two-Column Layout */}
      <div style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "calc(100vh - 65px)",
        padding: "40px 40px",
        gap: "60px",
        maxWidth: "1200px",
        margin: "0 auto",
        flexWrap: "wrap",
      }}>

        {/* LEFT — Hero + Features */}
        <div style={{ flex: "1 1 400px", maxWidth: "560px" }}>
          <div style={{
            display: "inline-block",
            padding: "4px 14px",
            backgroundColor: "var(--accent-color)",
            color: "#0f172a",
            borderRadius: "100px",
            fontSize: "12px",
            fontWeight: "700",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            marginBottom: "20px",
          }}>
            Learning Analytics Platform
          </div>

          <h1 style={{
            fontSize: "42px",
            fontWeight: "800",
            lineHeight: "1.15",
            marginBottom: "18px",
          }}>
            Understand your learning<br />
            with data-driven{" "}
            <span style={{ color: "var(--accent-color)" }}>insights.</span>
          </h1>

          <p style={{
            fontSize: "16px",
            color: "var(--text-secondary)",
            lineHeight: "1.7",
            marginBottom: "40px",
            maxWidth: "480px",
          }}>
            Track study patterns, analyze quiz performance, and optimize your
            academic journey with our minimal learning analytics system.
          </p>

            {/* Feature Grid */}
          <div style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: "20px",
          }}>
            {features.map((f, i) => (
              <div key={i} className="glass-card animate-fade-in" style={{
                padding: "24px",
                display: "flex",
                flexDirection: "column",
                gap: "12px",
                animationDelay: `${i * 0.1}s`
              }}>
                <div style={{
                  width: "48px",
                  height: "48px",
                  borderRadius: "12px",
                  backgroundColor: f.bg,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}>
                  {f.icon}
                </div>
                <div>
                  <div style={{ fontSize: "15px", fontWeight: "700", marginBottom: "4px" }}>{f.title}</div>
                  <div style={{ fontSize: "12px", color: "var(--text-secondary)", lineHeight: "1.5" }}>{f.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* RIGHT — Login / Register Card */}
        <div className="glass-card animate-fade-in" style={{
          flex: "0 0 450px",
          padding: "48px 40px",
          animationDelay: "0.4s"
        }}>
          {/* Logo Icon inside Card */}
          <div style={{ display: "flex", justifyContent: "center", marginBottom: "24px" }}>
             {icons.logo(48)}
          </div>

          {/* Tabs */}
          <div style={{
            display: "flex",
            backgroundColor: "var(--glass-bg)",
            borderRadius: "12px",
            padding: "5px",
            marginBottom: "36px",
            border: "1px solid var(--border-color)",
          }}>
            {["login", "register"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                style={{
                  flex: 1,
                  padding: "12px",
                  borderRadius: "10px",
                  border: "none",
                  cursor: "pointer",
                  fontSize: "15px",
                  fontWeight: "700",
                  transition: "all 0.3s",
                  backgroundColor: activeTab === tab ? "var(--accent-color)" : "transparent",
                  color: activeTab === tab ? "#0f172a" : "var(--text-secondary)",
                  textTransform: "capitalize",
                }}
              >
                {tab === "login" ? "Login" : "Register"}
              </button>
            ))}
          </div>

          {/* LOGIN FORM */}
          {activeTab === "login" && (
            <div style={{ textAlign: "center" }}>
              <h2 className="text-gradient" style={{ fontSize: "28px", marginBottom: "8px" }}>Welcome Back</h2>
              <p style={{ fontSize: "14px", color: "var(--text-secondary)", marginBottom: "32px" }}>
                Continue your learning journey.
              </p>

              <div style={{ marginBottom: "20px", textAlign: "left" }}>
                <label style={labelStyle}>Email Address</label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={loginEmail}
                  onChange={(e) => setLoginEmail(e.target.value)}
                  style={{...inputStyle, padding: "14px 16px", fontSize: "15px", backgroundColor: "var(--glass-bg)", borderRadius: "12px"}}
                />
              </div>

              <div style={{ marginBottom: "32px", textAlign: "left" }}>
                <label style={labelStyle}>Password</label>
                <input
                  type="password"
                  placeholder="Enter your password"
                  value={loginPassword}
                  onChange={(e) => setLoginPassword(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleLogin()}
                  style={{...inputStyle, padding: "14px 16px", fontSize: "15px", backgroundColor: "var(--glass-bg)", borderRadius: "12px"}}
                />
              </div>

              <button
                onClick={handleLogin}
                className="premium-btn"
                style={{
                  width: "100%",
                  padding: "16px",
                  fontSize: "16px",
                  marginBottom: "20px",
                }}
              >
                Sign In
              </button>

              <p style={{ textAlign: "center", fontSize: "14px", color: "var(--text-secondary)" }}>
                Don't have an account?{" "}
                <span
                  onClick={() => setActiveTab("register")}
                  style={{ color: "var(--accent-color)", cursor: "pointer", fontWeight: "600" }}
                >
                  Register here
                </span>
              </p>
            </div>
          )}

          {/* REGISTER FORM */}
          {activeTab === "register" && (
            <div style={{ textAlign: "center" }}>
              <h2 className="text-gradient" style={{ fontSize: "28px", marginBottom: "8px" }}>Join Analytica</h2>
              <p style={{ fontSize: "14px", color: "var(--text-secondary)", marginBottom: "32px" }}>
                Start your data-driven study journey today.
              </p>

              <div style={{ marginBottom: "18px", textAlign: "left" }}>
                <label style={labelStyle}>Full Name</label>
                <input
                  type="text"
                  placeholder="Enter your name"
                  value={regName}
                  onChange={(e) => setRegName(e.target.value)}
                  style={{...inputStyle, padding: "14px 16px", fontSize: "15px"}}
                />
              </div>

              <div style={{ marginBottom: "18px", textAlign: "left" }}>
                <label style={labelStyle}>Email Address</label>
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={regEmail}
                  onChange={(e) => setRegEmail(e.target.value)}
                  style={{...inputStyle, padding: "14px 16px", fontSize: "15px"}}
                />
              </div>

              <div style={{ marginBottom: "18px", textAlign: "left" }}>
                <label style={labelStyle}>Password</label>
                <input
                  type="password"
                  placeholder="Create a password"
                  value={regPassword}
                  onChange={(e) => setRegPassword(e.target.value)}
                  style={{...inputStyle, padding: "14px 16px", fontSize: "15px"}}
                />
              </div>

              <div style={{ marginBottom: "32px", textAlign: "left" }}>
                <label style={labelStyle}>Confirm Password</label>
                <input
                  type="password"
                  placeholder="Repeat your password"
                  value={regConfirm}
                  onChange={(e) => setRegConfirm(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleRegister()}
                  style={{...inputStyle, padding: "14px 16px", fontSize: "15px"}}
                />
              </div>

              <button
                onClick={handleRegister}
                className="premium-btn"
                style={{
                  width: "100%",
                  padding: "16px",
                  fontSize: "16px",
                  marginBottom: "20px",
                }}
              >
                Create Account
              </button>

              <p style={{ textAlign: "center", fontSize: "14px", color: "var(--text-secondary)" }}>
                Already have an account?{" "}
                <span
                  onClick={() => setActiveTab("login")}
                  style={{ color: "var(--accent-color)", cursor: "pointer", fontWeight: "600" }}
                >
                  Login here
                </span>
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Footer */}
      <div style={{
        textAlign: "center",
        padding: "24px 20px",
        color: "var(--text-muted)",
        fontSize: "12px",
        borderTop: "1px solid var(--border-color)",
      }}>
        © 2026 Analytica Learning Behaviour Systems
      </div>
    </div>
  );
}

export default Home;