import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Toast from "../components/Toast";

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
        // After axios login response
        localStorage.setItem('user_id', response.data.user_id); 
        localStorage.setItem("student_name", response.data.name);
        showToast("Login Successful! Welcome back", "success");
        setTimeout(() => navigate("/dashboard"), 1500); // 1.5s wait then redirect
      } else {
        showToast("Invalid email or password!", "error");
      }
    } catch (err) {
      showToast("Login failed! Check backend.", "error");
    }
  };

  return (
    <div style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "100vh",
    }}>
      {/* Toast */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      <div style={{
        backgroundColor: "rgba(15, 32, 68, 0.85)",
        padding: "40px",
        borderRadius: "16px",
        width: "350px",
        border: "1px solid rgba(255,255,255,0.2)",
        boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
      }}>
        <h2 style={{ textAlign: "center", color: "white", marginBottom: "30px", fontSize: "28px" }}>
          🔐 Login
        </h2>

        <label style={{ color: "white", fontSize: "14px" }}>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          style={{
            width: "100%", padding: "12px", marginBottom: "20px", marginTop: "6px",
            borderRadius: "8px", border: "1px solid rgba(255,255,255,0.3)",
            backgroundColor: "rgba(255,255,255,0.1)", color: "white",
            fontSize: "15px", outline: "none", boxSizing: "border-box",
          }}
        />

        <label style={{ color: "white", fontSize: "14px" }}>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
          style={{
            width: "100%", padding: "12px", marginBottom: "25px", marginTop: "6px",
            borderRadius: "8px", border: "1px solid rgba(255,255,255,0.3)",
            backgroundColor: "rgba(255,255,255,0.1)", color: "white",
            fontSize: "15px", outline: "none", boxSizing: "border-box",
          }}
        />

        <button
          onClick={handleLogin}
          style={{
            width: "100%", padding: "13px", backgroundColor: "#0EA5E9",
            color: "white", border: "none", borderRadius: "50px",
            fontSize: "16px", fontWeight: "bold", cursor: "pointer",
          }}
        >
          Login
        </button>

        <p style={{ textAlign: "center", marginTop: "20px", color: "rgba(255,255,255,0.7)" }}>
          Don't have an account?{" "}
          <span onClick={() => navigate("/register")}
            style={{ color: "#00ff99", cursor: "pointer", fontWeight: "bold" }}>
            Register here
          </span>
        </p>
      </div>
    </div>
  );
}

export default Login;