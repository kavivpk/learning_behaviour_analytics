
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
    <button onClick={toggleTheme} className="theme-toggle-btn">
      {theme === "dark" ? (
        <>
          <span>○</span>
          <span>Light</span>
        </>
      ) : (
        <>
          <span>●</span>
          <span>Dark</span>
        </>
      )}
    </button>
  );
};

export default ThemeToggle;
