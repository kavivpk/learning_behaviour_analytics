import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Toast from "../components/Toast";
import ThemeToggle from "../components/ThemeToggle";

function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [toast, setToast] = useState(null);
  const navigate = useNavigate();

  const showToast = (message, type) => {
    setToast({ message, type });
  };

  const handleRegister = async () => {
    if (!name || !email || !password || !confirmPassword) {
      showToast("Please fill all fields!", "error");
      return;
    }

    if (password !== confirmPassword) {
      showToast("Passwords do not match!", "error");
      return;
    }

    try {
      const response = await axios.post("http://127.0.0.1:5000/api/register", {
        name,
        email,
        password,
      });

      if (response.data.success) {
        localStorage.setItem("user_id", response.data.user_id);
        localStorage.setItem("student_id", response.data.user_id);
        localStorage.setItem("student_name", response.data.name);
        showToast("Registration Successful! Welcome 🎉", "success");
        setTimeout(() => navigate("/dashboard"), 1500);
      } else {
        showToast("Email already exists! Try login.", "error");
      }
    } catch (err) {
      showToast("Registration failed! Check backend.", "error");
    }
  };

  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "100vh",
      backgroundColor: "var(--bg-color)",
      backgroundImage: "radial-gradient(circle at 2px 2px, var(--border-color) 1px, transparent 0)",
      backgroundSize: "40px 40px",
    }} className="animate-fade">
      
      {/* Theme Toggle Positioned Top Right */}
      <div style={{ position: "absolute", top: "2rem", right: "2rem" }}>
        <ThemeToggle />
      </div>

      {/* Toast */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      <div style={{
        backgroundColor: "var(--bg-surface)",
        padding: "3rem",
        borderRadius: "var(--radius-lg)",
        width: "100%",
        maxWidth: "450px",
        border: "1px solid var(--border-color)",
        boxShadow: "var(--shadow-lg)",
        backdropFilter: "blur(20px)",
      }}>
        <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
          <div style={{ 
            width: "50px", 
            height: "50px", 
            background: "var(--accent-gradient)", 
            borderRadius: "14px", 
            display: "inline-flex", 
            alignItems: "center", 
            justifyContent: "center",
            marginBottom: "1rem",
            boxShadow: "0 10px 20px rgba(59, 130, 246, 0.3)"
          }}>
            <span style={{ fontSize: "24px" }}>📝</span>
          </div>
          <h2 style={{ color: "var(--text-main)", fontSize: "1.8rem", fontWeight: "900", letterSpacing: "-0.5px" }}>
            Join CogniTrack
          </h2>
          <p style={{ color: "var(--text-secondary)", fontSize: "14px", marginTop: "8px" }}>
            Initialize your learning analytics profile today.
          </p>
        </div>

        {/* Name */}
        <div style={{ marginBottom: "1.25rem" }}>
          <label style={{ color: "var(--text-secondary)", fontSize: "13px", fontWeight: "700", display: "block", marginBottom: "8px", textTransform: "uppercase", letterSpacing: "0.5px" }}>Full Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="John Doe"
            style={{
               width: "100%", padding: "12px 16px",
               borderRadius: "12px", border: "1px solid var(--border-color)",
               backgroundColor: "var(--bg-color)", color: "var(--text-main)",
               fontSize: "15px", outline: "none", boxSizing: "border-box",
               transition: "all 0.2s"
            }}
            onFocus={(e) => e.target.style.borderColor = "var(--accent-color)"}
            onBlur={(e) => e.target.style.borderColor = "var(--border-color)"}
          />
        </div>

        {/* Email */}
        <div style={{ marginBottom: "1.25rem" }}>
          <label style={{ color: "var(--text-secondary)", fontSize: "13px", fontWeight: "700", display: "block", marginBottom: "8px", textTransform: "uppercase", letterSpacing: "0.5px" }}>Institutional Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="name@university.edu"
            style={{
              width: "100%", padding: "12px 16px",
              borderRadius: "12px", border: "1px solid var(--border-color)",
              backgroundColor: "var(--bg-color)", color: "var(--text-main)",
              fontSize: "15px", outline: "none", boxSizing: "border-box",
              transition: "all 0.2s"
            }}
            onFocus={(e) => e.target.style.borderColor = "var(--accent-color)"}
            onBlur={(e) => e.target.style.borderColor = "var(--border-color)"}
          />
        </div>

        {/* Password Group */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px", marginBottom: "2rem" }}>
          <div>
            <label style={{ color: "var(--text-secondary)", fontSize: "13px", fontWeight: "700", display: "block", marginBottom: "8px", textTransform: "uppercase", letterSpacing: "0.5px" }}>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              style={{
                width: "100%", padding: "12px 16px",
                borderRadius: "12px", border: "1px solid var(--border-color)",
                backgroundColor: "var(--bg-color)", color: "var(--text-main)",
                fontSize: "15px", outline: "none", boxSizing: "border-box",
                transition: "all 0.2s"
              }}
              onFocus={(e) => e.target.style.borderColor = "var(--accent-color)"}
              onBlur={(e) => e.target.style.borderColor = "var(--border-color)"}
            />
          </div>
          <div>
            <label style={{ color: "var(--text-secondary)", fontSize: "13px", fontWeight: "700", display: "block", marginBottom: "8px", textTransform: "uppercase", letterSpacing: "0.5px" }}>Confirm</label>
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="••••••••"
              style={{
                width: "100%", padding: "12px 16px",
                borderRadius: "12px", border: "1px solid var(--border-color)",
                backgroundColor: "var(--bg-color)", color: "var(--text-main)",
                fontSize: "15px", outline: "none", boxSizing: "border-box",
                transition: "all 0.2s"
              }}
              onFocus={(e) => e.target.style.borderColor = "var(--accent-color)"}
              onBlur={(e) => e.target.style.borderColor = "var(--border-color)"}
            />
          </div>
        </div>

        {/* Register Button */}
        <button
          onClick={handleRegister}
          style={{
            width: "100%", padding: "16px",
            backgroundColor: "var(--accent-color)", color: "white",
            border: "none", borderRadius: "14px",
            fontSize: "16px", fontWeight: "800", cursor: "pointer",
            boxShadow: "0 10px 20px rgba(59, 130, 246, 0.3)",
            transition: "all 0.3s"
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "translateY(-2px)";
            e.currentTarget.style.boxShadow = "0 15px 25px rgba(59, 130, 246, 0.4)";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "translateY(0)";
            e.currentTarget.style.boxShadow = "0 10px 20px rgba(59, 130, 246, 0.3)";
          }}
        >
          Initialize Account
        </button>

        <p style={{ textAlign: "center", marginTop: "2rem", color: "var(--text-secondary)", fontSize: "14px" }}>
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            style={{ color: "var(--accent-color)", cursor: "pointer", fontWeight: "800" }}
          >
            Sign In
          </span>
        </p>
      </div>

      <div style={{ marginTop: "2rem", color: "var(--text-muted)", fontSize: "12px" }}>
        © 2026 CogniTrack Intelligence Systems
      </div>
    </div>
  );
}

export default Register;
