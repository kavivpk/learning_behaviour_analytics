
import React, { useEffect, useState } from "react";
import 'bootstrap-icons/font/bootstrap-icons.css';

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
          <i className="bi bi-sun-fill" style={{ color: "#FFD43B" }}></i>
          <span>Light Mode</span>
        </>
      ) : (
        <>
          <i className="bi bi-moon-stars-fill" style={{ color: "#A29BFE" }}></i>
          <span>Dark Mode</span>
        </>
      )}
    </button>
  );
};

export default ThemeToggle;
