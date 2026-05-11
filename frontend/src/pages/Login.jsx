import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Toast from "../components/Toast";
import ThemeToggle from "../components/ThemeToggle";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [toast, setToast] = useState(null);
  const navigate = useNavigate();

  const showToast = (message, type) => {
    setToast({ message, type });
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://127.0.0.1:5000/api/login", {
        email,
        password,
      });

      if (response.data.success) {
        localStorage.setItem("user_id", response.data.user_id);
        localStorage.setItem("student_id", response.data.user_id);
        localStorage.setItem("student_name", response.data.name);
        showToast("Welcome back.", "success");
        setTimeout(() => navigate("/dashboard"), 1000);
      } else {
        showToast("Invalid credentials.", "error");
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
          Welcome Back
        </h2>
        <p style={{ 
          color: "var(--text-secondary)", 
          fontSize: "14px", 
          marginBottom: "32px" 
        }}>
          Continue your personalized learning journey
        </p>

        <div style={{ textAlign: "left", marginBottom: "20px" }}>
          <label style={{ 
            color: "var(--text-secondary)", 
            fontSize: "12px", 
            fontWeight: "700", 
            textTransform: "uppercase",
            letterSpacing: "0.05em",
            display: "block",
            marginBottom: "8px"
          }}>Email Address</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{
              width: "100%", 
              padding: "12px 16px", 
              borderRadius: "12px", 
              border: "1px solid var(--border-color)",
              backgroundColor: "var(--glass-bg)", 
              color: "var(--text-main)",
              fontSize: "14px", 
              outline: "none",
              boxSizing: "border-box"
            }}
          />
        </div>

        <div style={{ textAlign: "left", marginBottom: "32px" }}>
          <label style={{ 
            color: "var(--text-secondary)", 
            fontSize: "12px", 
            fontWeight: "700", 
            textTransform: "uppercase",
            letterSpacing: "0.05em",
            display: "block", 
            marginBottom: "8px" 
          }}>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{
              width: "100%", 
              padding: "12px 16px",
              borderRadius: "12px", 
              border: "1px solid var(--border-color)",
              backgroundColor: "var(--glass-bg)", 
              color: "var(--text-main)",
              fontSize: "14px", 
              outline: "none",
              boxSizing: "border-box"
            }}
          />
        </div>

        <button
          onClick={handleLogin}
          className="premium-btn"
          style={{
            width: "100%", 
            padding: "14px", 
            marginBottom: "20px"
          }}
        >
          Sign In
        </button>

        <div style={{ 
          height: "1px", 
          backgroundColor: "var(--border-color)", 
          margin: "12px 0" 
        }} />

        <p style={{ color: "var(--text-secondary)", fontSize: "14px" }}>
          New here?{" "}
          <span onClick={() => navigate("/register")}
            style={{ color: "var(--accent-color)", cursor: "pointer", fontWeight: "700" }}>
            Create an account
          </span>
        </p>
      </div>
    </div>
  );
}

export default Login;
