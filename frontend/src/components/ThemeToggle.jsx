import React, { useEffect, useState } from "react";

const ThemeToggle = () => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <button 
      onClick={toggleTheme} 
      className="glass-card"
      style={{
        padding: "8px 16px",
        display: "flex",
        alignItems: "center",
        gap: "10px",
        cursor: "pointer",
        borderRadius: "12px",
        border: theme === "dark" ? "1px solid rgba(56, 189, 248, 0.4)" : "1px solid rgba(2, 132, 199, 0.2)",
        backgroundColor: "var(--glass-bg)",
        transition: "all 0.3s ease",
        outline: "none"
      }}
    >
      {theme === "dark" ? (
        <>
          <span style={{ fontSize: "16px", color: "#38bdf8", fontWeight: "900" }}>○</span>
          <span style={{ fontSize: "12px", fontWeight: "700", color: "#38bdf8", textTransform: "uppercase", letterSpacing: "0.05em" }}>Light Mode</span>
        </>
      ) : (
        <>
          <span style={{ fontSize: "16px", color: "#0284c7", fontWeight: "900" }}>●</span>
          <span style={{ fontSize: "12px", fontWeight: "700", color: "#0284c7", textTransform: "uppercase", letterSpacing: "0.05em" }}>Dark Mode</span>
        </>
      )}
    </button>
  );
};

export default ThemeToggle;
