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
  const [answeredHistory, setAnsweredHistory] = useState([]);
  const [selectedSection, setSelectedSection] = useState(null);

  const studentId = localStorage.getItem("student_id") || localStorage.getItem("user_id");

  useEffect(() => {
    const fetchHistoryAndQuiz = async () => {
      try {
        setLoading(true);
        // 1. Fetch History first
        const historyRes = await axios.get(`http://127.0.0.1:5000/api/answered_questions?user_id=${studentId}&topic=${name}`);
        setAnsweredHistory(historyRes.data.answered || []);

        // 2. Fetch Quiz
        const storageKey = `study_content_${name.toLowerCase()}`;
        const studiedContent = localStorage.getItem(storageKey);
        
        const response = await axios.post("http://127.0.0.1:5000/api/generate_quiz", {
          student_id: studentId,
          topic: name,
          content: studiedContent || null
        });

        if (Array.isArray(response.data)) {
          setAiQuestions(response.data);
          setMode("AI");
        }
      } catch (err) {
        console.warn("Dedupe/Quiz fetch error, falling back:", err);
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
      fetchHistoryAndQuiz();
    }
  }, [name, studentId]);

  useEffect(() => {
    setAiQuestions([]);
    setCurrent(0);
    setScore(0);
    setFinished(false);
    setSelected(null);
  }, [selectedSection]);

  const questions = useMemo(() => {
    if (!selectedSection) return [];
    
    let pool = [];
    const topicKey = name.toLowerCase();
    const staticPool = defaultQuizData[topicKey] || defaultQuizData[name] || [];
    const filteredStatic = staticPool.filter(q => q.focus === selectedSection && !answeredHistory.includes(q.question));

    if (selectedSection === "AI") {
      pool = aiQuestions;
    } else if (filteredStatic.length > 0) {
      pool = staticPool.filter(q => q.focus === selectedSection);
    } else {
      // Fallback to AI questions if static are exhausted
      pool = aiQuestions;
    }

    // FILTER OUT ALREADY ANSWERED QUESTIONS
    // Also ensure AI questions match the focus if a specific section is selected
    return pool.filter(q => {
      const isNew = !answeredHistory.includes(q.question);
      const matchesFocus = selectedSection === "AI" || !q.focus || q.focus === selectedSection || q.focus === "AI";
      return isNew && matchesFocus;
    }).slice(0, 5);
  }, [aiQuestions, name, selectedSection, loading]);

  const sections = useMemo(() => {
    const topicKey = name.toLowerCase();
    const pool = defaultQuizData[topicKey] || defaultQuizData[name] || [];
    const unique = [...new Set(pool.map(q => q.focus))];
    return unique.filter(Boolean);
  }, [name]);

  const handleAnswer = (idx) => {
    setSelected(idx);
    const isCorrect = idx === questions[current]?.answer;
    if (isCorrect) setScore((prev) => prev + 1);
  };

  const handleNext = async () => {
    // Record that this question was completed
    try {
      const qText = questions[current].question;
      await axios.post("http://127.0.0.1:5000/api/mark_answered", {
        user_id: studentId,
        topic: name,
        question_text: qText
      });
      // UPDATE LOCAL STATE INSTANTLY TO PREVENT REPEATS IN SAME SESSION
      setAnsweredHistory(prev => [...prev, qText]);
    } catch (e) {
      console.log("Failed to record answer history");
    }

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
      setToast({ message: `Scored ${percentage}% in ${selectedSection || name}`, type: "success" });
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

  // NEW SECTION SELECTION SCREEN
  if (!selectedSection) {
    return (
      <div style={{ minHeight: "100vh", backgroundColor: "var(--bg-color)", color: "var(--text-main)" }}>
        <div style={{ padding: "16px 32px", borderBottom: "1px solid var(--border-color)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
           <span style={{ fontSize: "14px", fontWeight: "800" }}>{name.toUpperCase()} QUIZ SECTIONS</span>
           <button onClick={() => navigate("/dashboard")} style={{ border: "none", background: "none", color: "var(--text-muted)", cursor: "pointer", fontSize: "12px" }}>Back to Dashboard</button>
        </div>
        <div style={{ maxWidth: "800px", margin: "60px auto", padding: "0 20px" }}>
           <h2 style={{ fontSize: "24px", fontWeight: "700", marginBottom: "8px" }}>Choose an Assessment Area</h2>
           <p style={{ color: "var(--text-secondary)", marginBottom: "40px" }}>Select a specific section to test your knowledge or use AI Dynamic mode.</p>
           
           <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "20px" }}>
              <button 
                onClick={() => setSelectedSection("AI")}
                style={{
                  padding: "30px", borderRadius: "16px", border: "2px solid var(--accent-color)",
                  backgroundColor: "rgba(56, 189, 248, 0.05)", textAlign: "left", cursor: "pointer"
                }}
              >
                 <span style={{ display: "block", fontSize: "11px", fontWeight: "900", color: "var(--accent-color)", textTransform: "uppercase", marginBottom: "10px" }}>Most Advanced</span>
                 <h3 style={{ fontSize: "18px", fontWeight: "700", color: "var(--text-main)" }}>AI Performance Quiz</h3>
                 <p style={{ fontSize: "12px", color: "var(--text-muted)", marginTop: "10px" }}>Based on your recent study behavior.</p>
              </button>

              {sections.map(s => (
                <button 
                  key={s}
                  onClick={() => setSelectedSection(s)}
                  style={{
                    padding: "30px", borderRadius: "16px", border: "1px solid var(--border-color)",
                    backgroundColor: "var(--card-bg)", textAlign: "left", cursor: "pointer", transition: "transform 0.2s"
                  }}
                >
                   <span style={{ display: "block", fontSize: "11px", fontWeight: "700", color: "var(--text-muted)", textTransform: "uppercase", marginBottom: "10px" }}>Static Assessment</span>
                   <h3 style={{ fontSize: "18px", fontWeight: "700", color: "var(--text-main)" }}>{s}</h3>
                   <p style={{ fontSize: "12px", color: "var(--text-muted)", marginTop: "10px" }}>Standard level questions.</p>
                </button>
              ))}
           </div>
        </div>
      </div>
    )
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
            <h2 style={{ fontSize: "20px", marginBottom: "16px" }}>All Completed!</h2>
            <p style={{ color: "var(--text-secondary)", marginBottom: "20px" }}>You have answered all standard questions for <b>{selectedSection || name}</b>. Would you like AI to generate new ones for you?</p>
            <div style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
               <button 
                onClick={async () => {
                  try {
                    setLoading(true);
                    const storageKey = `study_content_${name.toLowerCase()}`;
                    const studiedContent = localStorage.getItem(storageKey);
                    const response = await axios.post("http://127.0.0.1:5000/api/generate_quiz", {
                      student_id: studentId,
                      topic: name,
                      focus: selectedSection !== "AI" ? selectedSection : null,
                      content: studiedContent || null
                    });
                    if (Array.isArray(response.data) && response.data.length > 0) {
                      setAiQuestions(response.data);
                      setMode("AI");
                      if (!selectedSection) setSelectedSection("AI");
                    } else {
                      setToast({ message: "AI needs more study data to generate new questions.", type: "error" });
                    }
                  } catch (e) {
                    setToast({ message: "Failed to generate AI questions.", type: "error" });
                  } finally {
                    setLoading(false);
                  }
                }}
                style={{ padding: "10px 24px", borderRadius: "8px", border: "none", backgroundColor: "var(--accent-color)", color: "#0f172a", fontWeight: "700", cursor: "pointer" }}
              >
                Generate 5 New Questions with AI
              </button>
              <button 
                onClick={() => navigate("/dashboard")} 
                style={{ padding: "10px 24px", borderRadius: "8px", border: "1px solid var(--border-color)", backgroundColor: "transparent", color: "var(--text-main)", fontWeight: "600", cursor: "pointer" }}
              >
                Back to Dashboard
              </button>
            </div>
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
              <span style={{ color: "var(--accent-color)", fontSize: "11px", fontWeight: "800", textTransform: "uppercase" }}>Analysis Mode: {selectedSection === "AI" ? "AI Dynamic" : "Standard"}</span>
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
