import { useParams, useNavigate } from "react-router-dom";
import React, { useState, useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";
import ThemeToggle from "./ThemeToggle";
import axios from "axios";

const topicContents = {
  html: {
    w3url: "https://www.w3schools.com/html/",
    sections: [
      { id: "Fundamentals", title: "HTML Fundamentals", content: "HTML stands for Hyper Text Markup Language. it is the standard markup language for creating Web pages. HTML describes the structure of a Web page semantically and originally included cues for the appearance of the document." },
      { id: "Tags", title: "Common HTML Tags", content: "HTML tags are element names surrounded by angle brackets like <html>. <h1> define most important headings. <p> defines a paragraph. <img> defines an image." },
      { id: "Navigation", title: "HTML Navigation", content: "Links are found in nearly all web pages. Links allow users to click their way from page to page. The HTML <a> tag defines a hyperlink. The href attribute is the most important attribute, which indicates the link's destination." }
    ]
  },
  css: {
    w3url: "https://www.w3schools.com/css/",
    sections: [
      { id: "Styling", title: "CSS Fundamentals", content: "CSS is the language we use to style an HTML document. CSS describes how HTML elements should be displayed. It saves a lot of work. It can control the layout of multiple web pages all at once." },
      { id: "Visuals", title: "Text & Colors", content: "Colors are specified using predefined color names, or RGB, HEX, HSL, RGBA, HSLA values. The text-color property is used to set the color of the text. The background-color property sets the background color of an element." }
    ]
  },
  javascript: {
    w3url: "https://www.w3schools.com/js/",
    sections: [
      { id: "Runtime", title: "JS Runtime & Hoisting", content: "JavaScript is a lightweight, interpreted, or just-in-time compiled programming language with first-class functions. Hoisting is a term used to explain how JS moves declarations to the top of their scope." },
      { id: "Async", title: "Asynchronous JS", content: "Asynchronous programming is a technique that enables your program to start a potentially long-running task and still be able to be responsive to other events while task runs. setTimeout is a commonly used async function." }
    ]
  },
  java: {
    w3url: "https://www.w3schools.com/java/",
    sections: [
      { id: "Basics", title: "Java Basics", content: "Java is a popular programming language, created in 1995. It is owned by Oracle, and more than 3 billion devices run Java. It is used for mobile apps, desktop apps, web apps, and much more. Java is platform independent (Write Once, Run Anywhere)." },
      { id: "OOPs", title: "Object Oriented Programming", content: "OOP stands for Object-Oriented Programming. Procedural programming is about writing procedures or methods that perform operations on the data, while object-oriented programming is about creating objects that contain both data and methods. Key principles: Inheritance, Abstraction, Encapsulation, Polymorphism." }
    ]
  },
  python: {
    w3url: "https://www.w3schools.com/python/",
    sections: [
      { id: "Basics", title: "Python Intro", content: "Python is a popular programming language. It was created by Guido van Rossum, and released in 1991. It is used for web development, software development, mathematics, and system scripting. Python works on different platforms (Windows, Mac, Linux, Raspberry Pi, etc)." },
      { id: "DataStructures", title: "Python Collections", content: "There are four collection data types in the Python: List is a collection which is ordered and changeable. Tuple is a collection which is ordered and unchangeable. Set is a collection which is unordered, unchangeable, and unindexed. Dictionary is a collection which is ordered and changeable. No duplicate members." }
    ]
  },
  c: {
    w3url: "https://www.w3schools.com/c/",
    sections: [
      { id: "Basics", title: "C Basics", content: "C is a general-purpose programming language that has been around for a long time. C is very fast, compared to other programming languages like Java and Python. C is very versatile; it can be used in both low-level and high-level applications." },
      { id: "Memory", title: "Pointers & Memory", content: "A pointer is a variable that stores the memory address of another variable as its value. Memory management is a crucial part of C programming. Primitives like int, float, and char have specific sizes in memory (e.g., int is usually 4 bytes)." }
    ]
  }
};

function TopicPage() {
  const { name } = useParams();
  const navigate = useNavigate();
  const [timeSpent, setTimeSpent] = useState(0);
  const [activeSection, setActiveSection] = useState(null);
  const [studiedSections, setStudiedSections] = useState([]);
  const timerRef = useRef(null);
  const studentId = localStorage.getItem("student_id") || localStorage.getItem("user_id");

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setTimeSpent((prev) => prev + 1);
    }, 1000);

    if (studentId) {
      axios.get(`http://127.0.0.1:5000/api/user_focus/${studentId}/${name}`)
        .then(res => setStudiedSections(res.data))
        .catch(err => console.log("Error fetching focus:", err));
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [name, studentId]);

  const handleSectionClick = (sectionId) => {
    setActiveSection(sectionId);
    if (!studiedSections.includes(sectionId)) {
      setStudiedSections(prev => [...prev, sectionId]);
      axios.post("http://127.0.0.1:5000/api/track_focus", {
        user_id: studentId,
        topic: name,
        focus: sectionId
      });
    }
  };

  const handleFinishTopic = async () => {
    try {
      if (!studentId) return;

      // Ensure we use the same topicData logic as the UI
      const currentTopicData = topicContents[name.toLowerCase()] || { 
        sections: [{ id: "General", title: name, content: `Study material for ${name} is being updated...` }] 
      };
      
      const studiedText = currentTopicData.sections
        .filter(s => studiedSections.includes(s.id))
        .map(s => s.content)
        .join("\n\n");

      // Using localStorage for better reliability across page transitions
      localStorage.setItem(`study_content_${name.toLowerCase()}`, studiedText);

      await axios.post("http://127.0.0.1:5000/api/track", {
        student_id: studentId,
        topic: name,
        time_spent: timeSpent,
      });
      navigate(`/quiz/${name.toLowerCase()}`);
    } catch (error) {
      console.error("Tracking Error:", error);
    }
  };

  const topicData = topicContents[name.toLowerCase()] || { w3url: `https://www.w3schools.com/${name}`, sections: [{ id: "General", title: name, content: `Study material for ${name} is being updated...` }] };

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "var(--bg-color)", color: "var(--text-main)" }}>
      <div className="glass-card" style={{
        display: "flex", justifyContent: "space-between", alignItems: "center",
        padding: "16px 32px", backgroundColor: "var(--nav-bg)", borderBottom: "1px solid var(--border-color)",
        position: "sticky", top: 10, zIndex: 100, margin: "10px 20px", borderRadius: "16px"
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px", cursor: "pointer" }} onClick={() => navigate("/dashboard")}>
          <span className="text-gradient" style={{ fontSize: "16px", fontWeight: "800", textTransform: "uppercase" }}>Learning: {name}</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "24px" }}>
          <ThemeToggle />
          <button onClick={() => navigate("/dashboard")} className="premium-btn" style={{ padding: "8px 20px", fontSize: "12px" }}>Dashboard</button>
        </div>
      </div>

      <div style={{ maxWidth: "1000px", margin: "40px auto", padding: "0 20px", display: "grid", gridTemplateColumns: "250px 1fr", gap: "30px" }}>
        <div className="glass-card animate-fade-in" style={{ padding: "20px", alignSelf: "start" }}>
          <h4 style={{ fontSize: "12px", textTransform: "uppercase", color: "var(--text-muted)", marginBottom: "16px" }}>Sections</h4>
          <div style={{ display: "grid", gap: "8px" }}>
            {topicData.sections.map(s => (
              <button
                key={s.id}
                onClick={() => handleSectionClick(s.id)}
                style={{
                  textAlign: "left", padding: "10px", borderRadius: "8px", border: "none",
                  backgroundColor: activeSection === s.id ? "var(--accent-color)" : "transparent",
                  color: activeSection === s.id ? "#0f172a" : "var(--text-main)",
                  fontSize: "14px", cursor: "pointer", fontWeight: "500"
                }}
              >
                {studiedSections.includes(s.id) ? "✓ " : "○ "} {s.title}
              </button>
            ))}
          </div>
        </div>

        <div className="glass-card animate-fade-in" style={{ padding: "40px", animationDelay: "0.2s" }}>
          {activeSection ? (
            <div>
              <h2 style={{ fontSize: "24px", fontWeight: "700", marginBottom: "20px" }}>
                {topicData.sections.find(s => s.id === activeSection)?.title}
              </h2>
              <div style={{ lineHeight: "1.8", color: "var(--text-secondary)" }}>
                {topicData.sections.find(s => s.id === activeSection)?.content}
              </div>
            </div>
          ) : (
            <div style={{ textAlign: "center", padding: "40px" }}>
              <p style={{ color: "var(--text-secondary)" }}>Select a section to begin. You can also visit W3Schools for more details.</p>
            </div>
          )}

          <div style={{ textAlign: "center", marginTop: "60px", borderTop: "1px solid var(--border-color)", paddingTop: "40px" }}>
            <p style={{ fontSize: "12px", color: "var(--text-muted)", marginBottom: "16px" }}>
              Time Spent: {Math.floor(timeSpent/60)}m {timeSpent%60}s
            </p>
            <div style={{ display: "flex", gap: "16px", justifyContent: "center" }}>
              <button 
                onClick={handleFinishTopic} 
                disabled={studiedSections.length === 0}
                className={studiedSections.length > 0 ? "premium-btn" : ""}
                style={{
                  padding: "12px 24px", fontSize: "14px",
                  backgroundColor: studiedSections.length > 0 ? "" : "var(--border-color)", 
                  color: studiedSections.length > 0 ? "" : "var(--text-muted)", 
                  cursor: studiedSections.length > 0 ? "pointer" : "not-allowed"
                }}
              >
                Generate AI Quiz
              </button>
              <a 
                href={topicData.w3url}
                target="_blank"
                rel="noreferrer"
                className="glass-card"
                style={{
                  padding: "12px 24px", fontSize: "14px", fontWeight: "700",
                  textDecoration: "none", color: "var(--text-main)", 
                  display: "inline-block"
                }}
              >
                External Reference ↗
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TopicPage;
