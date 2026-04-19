import React, { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Toast from "./Toast";
import ThemeToggle from "./ThemeToggle";
import { quizData as defaultQuizData } from "../data/quizData";

export default function QuizPage() {
  const navigate = useNavigate();
  const { name } = useParams();
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [selected, setSelected] = useState(null);
  const [toast, setToast] = useState(null);
  const [loading, setLoading] = useState(true);
  const [aiQuestions, setAiQuestions] = useState([]);
  const [mode, setMode] = useState("AI"); 

  const studentId = localStorage.getItem("student_id") || localStorage.getItem("user_id");

  useEffect(() => {
    const generateQuiz = async () => {
      const studiedContent = sessionStorage.getItem("current_study_content");
      
      try {
        setLoading(true);
        // AI generation call
        const response = await axios.post("http://127.0.0.1:5000/api/generate_quiz", {
          topic: name,
          content: studiedContent || null
        });

        if (Array.isArray(response.data) && response.data.length > 0) {
          setAiQuestions(response.data);
          setMode("AI");
        } else {
          throw new Error("Invalid format");
        }
      } catch (err) {
        console.warn("AI Generation fallback to static data:", err);
        setMode("DEFAULT");
      } finally {
        setLoading(false);
      }
    };

    if (name) {
      setCurrent(0);
      setScore(0);
      setFinished(false);
      setSelected(null);
      generateQuiz();
    }
  }, [name]);

  const questions = useMemo(() => {
    if (mode === "AI" && aiQuestions.length > 0) return aiQuestions;
    
    // Normalize mapping for fallback
    const topicKey = name.toLowerCase();
    const fallback = defaultQuizData[topicKey] || defaultQuizData[name] || [];
    return fallback;
  }, [mode, aiQuestions, name]);

  const handleAnswer = (idx) => {
    setSelected(idx);
    const isCorrect = idx === questions[current]?.answer;
    if (isCorrect) setScore((prev) => prev + 1);
  };

  const handleNext = async () => {
    if (current + 1 < questions.length) {
      setCurrent((prev) => prev + 1);
      setSelected(null);
      return;
    }

    const percentage = Math.round((score / questions.length) * 100);
    setFinished(true);

    try {
      await axios.post("http://127.0.0.1:5000/api/quiz_score", {
        student_id: studentId,
        topic: name,
        score: percentage,
      });
      setToast({ message: `Scored ${percentage}%`, type: "success" });
    } catch {
      console.log("Score save error");
    }
  };

  if (loading) {
    return (
      <div style={{ minHeight: "100vh", backgroundColor: "var(--bg-color)", display: "flex", justifyContent: "center", alignItems: "center" }}>
        <div style={{ padding: "40px", backgroundColor: "var(--card-bg)", borderRadius: "12px", border: "1px solid var(--border-color)", textAlign: "center" }}>
          <h2 style={{ fontSize: "18px", marginBottom: "8px" }}>Generating AI Quiz...</h2>
          <p style={{ color: "var(--text-secondary)", fontSize: "14px" }}>Analying your study behavior for {name}.</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "var(--bg-color)", color: "var(--text-main)" }}>
      <div style={{
        display: "flex", justifyContent: "space-between", alignItems: "center",
        padding: "16px 32px", backgroundColor: "var(--nav-bg)", borderBottom: "1px solid var(--border-color)",
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px", cursor: "pointer" }} onClick={() => navigate("/dashboard")}>
          <span style={{ fontSize: "14px", fontWeight: "700", textTransform: "uppercase" }}>Quiz Portal</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "24px" }}>
          <ThemeToggle />
          <button onClick={() => navigate("/dashboard")} style={{
            padding: "6px 16px", borderRadius: "6px", backgroundColor: "transparent",
            color: "var(--text-main)", border: "1px solid var(--border-color)", fontWeight: "600",
            fontSize: "12px", cursor: "pointer"
          }}>
            Dashboard
          </button>
        </div>
      </div>

      <div style={{ padding: "60px 20px", maxWidth: "700px", margin: "0 auto" }}>
        {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

        {questions.length === 0 ? (
          <div style={{ textAlign: "center", padding: "60px", backgroundColor: "var(--card-bg)", borderRadius: "12px", border: "1px solid var(--border-color)" }}>
            <p style={{ color: "var(--text-secondary)", marginBottom: "20px" }}>Quiz questions are currently being updated for this topic.</p>
            <button onClick={() => navigate("/dashboard")} style={{ padding: "10px 24px", borderRadius: "8px", border: "none", backgroundColor: "var(--accent-color)", color: "#0f172a", fontWeight: "600", cursor: "pointer" }}>Back to Dashboard</button>
          </div>
        ) : finished ? (
          <div style={{ textAlign: "center", padding: "60px 40px", backgroundColor: "var(--card-bg)", borderRadius: "12px", border: "1px solid var(--border-color)" }}>
            <h2 style={{ fontSize: "20px", fontWeight: "700", marginBottom: "32px" }}>Evaluation Complete: {name}</h2>
            <div style={{ fontSize: "64px", fontWeight: "800", marginBottom: "16px", color: "var(--accent-color)" }}>
              {score}/{questions.length}
            </div>
            <p style={{ color: "var(--text-secondary)", marginBottom: "40px" }}>Performance analysis generated by AI behavior mapping.</p>
            <button onClick={() => navigate("/dashboard")} style={{ padding: "12px 32px", borderRadius: "8px", border: "none", backgroundColor: "var(--accent-color)", color: "#0f172a", fontWeight: "600", fontSize: "14px", cursor: "pointer" }}>Done</button>
          </div>
        ) : (
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "12px", alignItems: "center" }}>
              <span style={{ color: "var(--accent-color)", fontSize: "11px", fontWeight: "800", textTransform: "uppercase" }}>Analysis Mode: {mode === "AI" ? "AI Dynamic" : "Standard"}</span>
              <span style={{ color: "var(--text-muted)", fontSize: "12px" }}>Item {current + 1} of {questions.length}</span>
            </div>

            <div style={{ width: "100%", height: "4px", backgroundColor: "var(--input-bg)", borderRadius: "2px", marginBottom: "48px" }}>
              <div style={{ width: `${((current + 1) / questions.length) * 100}%`, height: "100%", backgroundColor: "var(--accent-color)" }} />
            </div>

            <div style={{ padding: "40px", backgroundColor: "var(--card-bg)", borderRadius: "12px", border: "1px solid var(--border-color)" }}>
              <h3 style={{ fontSize: "18px", fontWeight: "600", marginBottom: "32px", lineHeight: "1.5" }}>{questions[current]?.question}</h3>
              <div style={{ display: "grid", gap: "12px" }}>
                {questions[current]?.options.map((opt, idx) => {
                  let borderColor = "var(--border-color)";
                  let bgColor = "transparent";
                  if (selected !== null) {
                    if (idx === questions[current].answer) {
                      borderColor = "var(--accent-secondary)";
                      bgColor = "rgba(45, 212, 191, 0.05)";
                    } else if (idx === selected) {
                      borderColor = "#f87171";
                    }
                  }

                  return (
                    <button key={idx} onClick={() => selected === null && handleAnswer(idx)} style={{
                      padding: "16px 20px", borderRadius: "10px", border: `1px solid ${borderColor}`,
                      backgroundColor: bgColor, color: "var(--text-main)", textAlign: "left", fontSize: "14px", cursor: selected === null ? "pointer" : "default"
                    }}>
                      {opt}
                    </button>
                  );
                })}
              </div>

              {selected !== null && (
                <button onClick={handleNext} style={{ marginTop: "32px", width: "100%", padding: "14px", borderRadius: "8px", backgroundColor: "var(--accent-color)", color: "#0f172a", border: "none", fontWeight: "700", fontSize: "14px", cursor: "pointer" }}>
                  {current + 1 < questions.length ? "Confirm Answer" : "See Analysis"}
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
