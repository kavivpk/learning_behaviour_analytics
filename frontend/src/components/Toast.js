import React, { useEffect } from "react";

function Toast({ message, type, onClose }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000); // 3 seconds la auto close
    return () => clearTimeout(timer);
  }, [onClose]);

  const accentColor = type === "success" ? "var(--accent-secondary)" : type === "error" ? "#ff6b6b" : "var(--accent-color)";

  return (
    <div style={{
      position: "fixed",
      top: "30px",
      right: "30px",
      backgroundColor: "var(--toast-bg)",
      color: "var(--text-main)",
      padding: "16px 24px",
      borderRadius: "16px",
      fontWeight: "600",
      fontSize: "15px",
      zIndex: 9999,
      boxShadow: "0 15px 40px rgba(0,0,0,0.15)",
      display: "flex",
      alignItems: "center",
      gap: "12px",
      minWidth: "300px",
      border: `1px solid var(--border-color)`,
      borderLeft: `6px solid ${accentColor}`,
      animation: "slideIn 0.3s ease",
    }}>
      <div style={{ fontSize: "20px" }}>
        {type === "success" ? "✅" : type === "error" ? "❌" : "ℹ️"}
      </div>
      <div style={{ flex: 1 }}>{message}</div>
      <span
        onClick={onClose}
        style={{ 
          cursor: "pointer", 
          fontSize: "18px", 
          color: "var(--text-muted)",
          padding: "4px"
        }}
      >
        ✕
      </span>
    </div>
  );
}

export default Toast;