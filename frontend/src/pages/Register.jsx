import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Toast from "../components/Toast";

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

        <h2 style={{
          textAlign: "center",
          color: "white",
          marginBottom: "30px",
          fontSize: "28px",
        }}>
          📝 Register
        </h2>

        {/* Name */}
        <label style={{ color: "white", fontSize: "14px" }}>Full Name</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your name"
          style={{
            width: "100%", padding: "12px", marginBottom: "15px", marginTop: "6px",
            borderRadius: "8px", border: "1px solid rgba(255,255,255,0.3)",
            backgroundColor: "rgba(255,255,255,0.1)", color: "white",
            fontSize: "15px", outline: "none", boxSizing: "border-box",
          }}
        />

        {/* Email */}
        <label style={{ color: "white", fontSize: "14px" }}>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          style={{
            width: "100%", padding: "12px", marginBottom: "15px", marginTop: "6px",
            borderRadius: "8px", border: "1px solid rgba(255,255,255,0.3)",
            backgroundColor: "rgba(255,255,255,0.1)", color: "white",
            fontSize: "15px", outline: "none", boxSizing: "border-box",
          }}
        />

        {/* Password */}
        <label style={{ color: "white", fontSize: "14px" }}>Password</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Enter your password"
          style={{
            width: "100%", padding: "12px", marginBottom: "15px", marginTop: "6px",
            borderRadius: "8px", border: "1px solid rgba(255,255,255,0.3)",
            backgroundColor: "rgba(255,255,255,0.1)", color: "white",
            fontSize: "15px", outline: "none", boxSizing: "border-box",
          }}
        />

        {/* Confirm Password */}
        <label style={{ color: "white", fontSize: "14px" }}>Confirm Password</label>
        <input
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          placeholder="Confirm your password"
          style={{
            width: "100%", padding: "12px", marginBottom: "25px", marginTop: "6px",
            borderRadius: "8px", border: "1px solid rgba(255,255,255,0.3)",
            backgroundColor: "rgba(255,255,255,0.1)", color: "white",
            fontSize: "15px", outline: "none", boxSizing: "border-box",
          }}
        />

        {/* Register Button */}
        <button
          onClick={handleRegister}
          style={{
            width: "100%", padding: "13px",
            backgroundColor: "#0EA5E9", color: "white",
            border: "none", borderRadius: "50px",
            fontSize: "16px", fontWeight: "bold", cursor: "pointer",
          }}
        >
          Register
        </button>

        <p style={{ textAlign: "center", marginTop: "20px", color: "rgba(255,255,255,0.7)" }}>
          Already have an account?{" "}
          <span
            onClick={() => navigate("/login")}
            style={{ color: "#00ff99", cursor: "pointer", fontWeight: "bold" }}
          >
            Login here
          </span>
        </p>
      </div>
    </div>
  );
}

export default Register;