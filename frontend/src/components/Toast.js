import React, { useEffect } from "react";

function Toast({ message, type, onClose }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000); // 3 seconds la auto close
    return () => clearTimeout(timer);
  }, [onClose]);

  const bgColor = type === "success" ? "#00ff99" : type === "error" ? "#ff6b6b" : "#0EA5E9";

  return (
    <div style={{
      position: "fixed",
      top: "20px",
      right: "20px",
      backgroundColor: bgColor,
      color: "#000",
      padding: "14px 20px",
      borderRadius: "12px",
      fontWeight: "bold",
      fontSize: "14px",
      zIndex: 9999,
      boxShadow: "0 4px 20px rgba(0,0,0,0.3)",
      display: "flex",
      alignItems: "center",
      gap: "10px",
      minWidth: "250px",
      animation: "slideIn 0.3s ease",
    }}>
      {type === "success" ? "✅" : type === "error" ? "❌" : "ℹ️"}
      {message}
      <span
        onClick={onClose}
        style={{ marginLeft: "auto", cursor: "pointer", fontSize: "16px" }}
      >
        ✕
      </span>
    </div>
  );
}

export default Toast;