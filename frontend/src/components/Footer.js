import React from "react";
import { Link } from "react-router-dom";

const footerLinks = [
  { label: "Dashboard", to: "/dashboard" },
  { label: "Topics", to: "/topic/C Programming" },
  { label: "Login", to: "/login" },
  { label: "Register", to: "/register" },
];



function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-footer">
      <div className="footer-glow" />
      <div className="footer-inner">

        {/* Brand Column */}
        <div className="footer-brand">
          <div className="footer-logo">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none">
              <rect width="24" height="24" rx="6" fill="var(--accent-color)" />
              <path d="M12 7C9.23858 7 7 9.23858 7 12C7 14.7614 9.23858 17 12 17C14.7614 17 17 14.7614 17 12"
                stroke="white" strokeWidth="2.5" strokeLinecap="round" />
              <circle cx="12" cy="12" r="2" fill="white" />
            </svg>
            <span className="footer-logo-text">Analytica</span>
          </div>
          <p className="footer-tagline">
            AI-powered learning analytics to help students study smarter, track progress, and achieve mastery.
          </p>

        </div>

        {/* Navigation Links */}
        <div className="footer-links-col">
          <h4 className="footer-col-heading">Navigate</h4>
          <ul className="footer-links-list">
            {footerLinks.map((link) => (
              <li key={link.label}>
                <Link to={link.to} className="footer-link">{link.label}</Link>
              </li>
            ))}
          </ul>
        </div>

        {/* Tech Stack */}
        <div className="footer-links-col">
          <h4 className="footer-col-heading">Built With</h4>
          <ul className="footer-links-list">
            {["React.js", "Python Flask", "MySQL", "Groq AI (openai/gpt-oss-120b)", "Chart.js", "REST API"].map((tech) => (
              <li key={tech}>
                <span className="footer-tech-tag">{tech}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Project Info */}
        <div className="footer-links-col">
          <h4 className="footer-col-heading">About</h4>
          <ul className="footer-links-list">
            <li><span className="footer-info-item">🎓 Academic Project</span></li>
            <li><span className="footer-info-item">📊 Data Analytics Platform</span></li>
            <li><span className="footer-info-item">🤖 AI-Powered Adaptive Quizzes</span></li>
            <li><span className="footer-info-item">🔒 Secure Auth (Hashed Passwords)</span></li>
            <li><span className="footer-info-item">🔥 Daily Streak & Points System</span></li>
          </ul>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="footer-bottom">
        <span>© {year} Analytica Learning Behaviour Systems. All rights reserved.</span>
        <span className="footer-bottom-dot">·</span>
        <span>Powered by <span className="footer-accent">Groq AI</span></span>
      </div>
    </footer>
  );
}

export default Footer;
