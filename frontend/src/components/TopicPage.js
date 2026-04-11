import { useParams, useNavigate } from "react-router-dom";
import React, { useState, useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";
import ThemeToggle from "./ThemeToggle";

function TopicPage() {
  const { name } = useParams();
  const navigate = useNavigate();
  const [timeSpent, setTimeSpent] = useState(0);
  const [content, setContent] = useState("");
  const timerRef = useRef(null);

  useEffect(() => {
    // Start the timer when the component mounts
    timerRef.current = setInterval(() => {
      setTimeSpent((prev) => prev + 1);
    }, 1000);

    // Fetch topic content
    const fetchContent = async () => {
      try {
        const response = await fetch(`/topics/${name.toLowerCase()}.md`);
        if (response.ok) {
          const text = await response.text();
          setContent(text);
        } else {
          setContent(`# Content not found\n\nSorry, the content for **${name}** could not be found.`);
        }
      } catch (err) {
        setContent(`# Error\n\nFailed to load content.`);
      }
    };
    fetchContent();

    // Clean up timer when leaving page
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [name]);

  const handleFinishTopic = async () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    try {
      const studentId = localStorage.getItem("student_id") || localStorage.getItem("user_id");

      if (!studentId) return;

      const response = await fetch("http://127.0.0.1:5000/api/track", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          student_id: studentId,
          topic: name,
          time_spent: timeSpent,
        }),
      });

      if (response.ok) {
        navigate(`/quiz/${name.toLowerCase()}`);
      }
    } catch (error) {
      console.error("Error saving activity:", error);
    }
  };

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "var(--bg-color)", color: "var(--text-main)" }} className="animate-fade">
      {/* Navbar */}
      <nav style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "1rem 2.5rem",
        backgroundColor: "var(--bg-surface)",
        backdropFilter: "blur(12px)",
        borderBottom: "1px solid var(--border-color)",
        position: "sticky",
        top: 0,
        zIndex: 100,
        boxShadow: "var(--shadow-sm)"
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "12px", cursor: "pointer" }} onClick={() => navigate("/dashboard")}>
          <div style={{ 
            width: "35px", height: "35px", 
            background: "var(--accent-gradient)", 
            borderRadius: "10px", 
            display: "flex", alignItems: "center", justifyContent: "center" 
          }}>
            <span style={{ fontSize: "18px" }}>📊</span>
          </div>
          <span style={{ fontSize: "1.1rem", fontWeight: "800", letterSpacing: "-0.5px" }}>
            Cogni<span style={{ color: "var(--accent-color)" }}>Track</span>
          </span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "20px" }}>
          <ThemeToggle />
          <button onClick={() => navigate("/dashboard")} style={{
            padding: "8px 20px", borderRadius: "12px",
            backgroundColor: "transparent", color: "var(--text-main)", border: "1px solid var(--border-color)",
            fontWeight: "700", cursor: "pointer", fontSize: "14px"
          }}>
            Dashboard
          </button>
        </div>
      </nav>

      <div style={{ maxWidth: "900px", margin: "40px auto", padding: "0 20px" }}>
        <div style={{ 
          backgroundColor: "var(--bg-surface)", 
          padding: "3rem", 
          borderRadius: "var(--radius-lg)", 
          border: "1px solid var(--border-color)", 
          boxShadow: "var(--shadow-lg)" 
        }}>
          
          <div style={{ 
            display: "flex", 
            justifyContent: "space-between", 
            alignItems: "flex-end", 
            marginBottom: "3rem", 
            borderBottom: "2px solid var(--border-color)", 
            paddingBottom: "1.5rem" 
          }}>
            <div>
              <div style={{ fontSize: "13px", fontWeight: "800", color: "var(--accent-color)", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "8px" }}>
                Current Topic
              </div>
              <h1 style={{ fontSize: "2.5rem", fontWeight: "900", color: "var(--text-main)", margin: 0, letterSpacing: "-1px" }}>
                {name}
              </h1>
            </div>
            
            <div style={{ 
              textAlign: "right", 
              backgroundColor: "var(--bg-color)", 
              padding: "12px 20px", 
              borderRadius: "12px",
              border: "1px solid var(--border-color)"
            }}>
              <p style={{ color: "var(--text-secondary)", fontSize: "12px", margin: "0 0 4px 0", fontWeight: "700", textTransform: "uppercase" }}>
                Time Recorded
              </p>
              <p style={{ color: "var(--accent-color)", fontSize: "18px", margin: 0, fontWeight: "900" }}>
                {Math.floor(timeSpent/60)}m {timeSpent%60}s
              </p>
            </div>
          </div>
          
          <article style={{ 
            textAlign: "left", 
            lineHeight: "1.7", 
            fontSize: "1.1rem", 
            color: "var(--text-main)" 
          }} className="markdown-content">
            <ReactMarkdown>{content}</ReactMarkdown>
          </article>
          
          <div style={{ textAlign: "center", marginTop: "4rem", borderTop: "1px solid var(--border-color)", paddingTop: "3rem" }}>
            <button 
              onClick={handleFinishTopic} 
              style={{
                padding: "18px 45px", 
                fontSize: "16px", 
                fontWeight: "900", 
                backgroundColor: "var(--accent-color)", 
                color: "white", 
                border: "none",
                borderRadius: "16px", 
                cursor: "pointer", 
                boxShadow: "0 10px 25px rgba(59, 130, 246, 0.4)",
                transition: "all 0.3s"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-3px)";
                e.currentTarget.style.boxShadow = "0 15px 30px rgba(59, 130, 246, 0.5)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 10px 25px rgba(59, 130, 246, 0.4)";
              }}
            >
              Mastered? Take the Quiz
            </button>
            <p style={{ marginTop: "1rem", color: "var(--text-muted)", fontSize: "14px", fontWeight: "500" }}>
              Your progress will be automatically synchronized.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TopicPage;
