import React, { useEffect } from "react";

function Toast({ message, type, onClose }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const isDark = document.documentElement.getAttribute("data-theme") === "dark";
  const accentColor = type === "success" ? "#2dd4bf" : type === "error" ? "#f87171" : "#38bdf8";
  
  // Explicitly set colors to avoid "black on black" issues
  const bgColor = isDark ? "#1e293b" : "#ffffff";
  const textColor = isDark ? "#f1f5f9" : "#0f172a";

  return (
    <div style={{
      position: "fixed",
      top: "24px",
      right: "24px",
      backgroundColor: bgColor,
      color: textColor,
      padding: "12px 20px",
      borderRadius: "8px",
      fontWeight: "600",
      fontSize: "14px",
      zIndex: 9999,
      border: `1px solid var(--border-color)`,
      borderLeft: `4px solid ${accentColor}`,
      display: "flex",
      alignItems: "center",
      gap: "12px",
      minWidth: "260px",
      boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
      animation: "slideIn 0.2s ease-out",
    }}>
      <div style={{ flex: 1 }}>{message}</div>
      <span
        onClick={onClose}
        style={{ 
          cursor: "pointer", 
          fontSize: "16px", 
          color: isDark ? "rgba(255,255,255,0.4)" : "rgba(0,0,0,0.4)",
          padding: "2px"
        }}
      >
        ✕
      </span>
    </div>
  );
}

export default Toast;