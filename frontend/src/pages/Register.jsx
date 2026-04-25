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
      showToast("Please fill all fields.", "error");
      return;
    }

    if (password !== confirmPassword) {
      showToast("Passwords mismatch.", "error");
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
        showToast("Account created.", "success");
        setTimeout(() => navigate("/dashboard"), 1000);
      } else {
        showToast("Registration failed.", "error");
      }
    } catch (err) {
      showToast("Connection failed.", "error");
    }
  };

  return (
    <div style={{
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "100vh",
      padding: "20px",
      backgroundColor: "var(--bg-color)"
    }}>
      <div style={{ position: "absolute", top: "20px", right: "20px" }}>
        <ThemeToggle />
      </div>

      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      <div className="glass-card animate-fade-in" style={{
        padding: "48px 40px",
        width: "100%",
        maxWidth: "400px",
        textAlign: "center"
      }}>
        <h2 className="text-gradient" style={{ 
          fontSize: "32px", 
          marginBottom: "8px"
        }}>
          Join Analytica
        </h2>
        <p style={{ 
          color: "var(--text-secondary)", 
          fontSize: "14px", 
          marginBottom: "32px" 
        }}>
          Start your data-driven learning path
        </p>

        <div style={{ textAlign: "left", marginBottom: "16px" }}>
          <label style={{ color: "var(--text-secondary)", fontSize: "12px", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.05em", display: "block", marginBottom: "6px" }}>Full Name</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{
              width: "100%", padding: "12px 16px", borderRadius: "12px", border: "1px solid var(--border-color)",
              backgroundColor: "var(--glass-bg)", color: "var(--text-main)", fontSize: "14px", outline: "none", boxSizing: "border-box"
            }}
          />
        </div>

        <div style={{ textAlign: "left", marginBottom: "16px" }}>
          <label style={{ color: "var(--text-secondary)", fontSize: "12px", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.05em", display: "block", marginBottom: "6px" }}>Email Address</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{
              width: "100%", padding: "12px 16px", borderRadius: "12px", border: "1px solid var(--border-color)",
              backgroundColor: "var(--glass-bg)", color: "var(--text-main)", fontSize: "14px", outline: "none", boxSizing: "border-box"
            }}
          />
        </div>

        <div style={{ textAlign: "left", marginBottom: "16px" }}>
          <label style={{ color: "var(--text-secondary)", fontSize: "12px", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.05em", display: "block", marginBottom: "6px" }}>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              width: "100%", padding: "12px 16px", borderRadius: "12px", border: "1px solid var(--border-color)",
              backgroundColor: "var(--glass-bg)", color: "var(--text-main)", fontSize: "14px", outline: "none", boxSizing: "border-box"
            }}
          />
        </div>

        <div style={{ textAlign: "left", marginBottom: "32px" }}>
          <label style={{ color: "var(--text-secondary)", fontSize: "12px", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.05em", display: "block", marginBottom: "6px" }}>Confirm Password</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            style={{
              width: "100%", padding: "12px 16px", borderRadius: "12px", border: "1px solid var(--border-color)",
              backgroundColor: "var(--glass-bg)", color: "var(--text-main)", fontSize: "14px", outline: "none", boxSizing: "border-box"
            }}
          />
        </div>

        <button
          onClick={handleRegister}
          className="premium-btn"
          style={{
            width: "100%", padding: "14px", marginBottom: "20px"
          }}
        >
          Create Account
        </button>

        <div style={{ height: "1px", backgroundColor: "var(--border-color)", margin: "24px 0" }} />

        <p style={{ color: "var(--text-secondary)", fontSize: "14px" }}>
          Joined before?{" "}
          <span onClick={() => navigate("/login")}
            style={{ color: "var(--accent-color)", cursor: "pointer", fontWeight: "700" }}>
            Login now
          </span>
        </p>
      </div>
    </div>
  );
}

export default Register;
