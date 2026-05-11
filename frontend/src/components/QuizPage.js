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
  const [userAnswers, setUserAnswers] = useState([]);
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
    setUserAnswers([...userAnswers, idx]);
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
      setToast({ message: `Scored ${percentage}%! Earned 20 Points in ${selectedSection || name}.`, type: "success" });
    } catch {
      console.log("Score save error");
    }
  };

  if (loading) {
    return (
      <div style={{ minHeight: "100vh", backgroundColor: "var(--bg-color)", display: "flex", justifyContent: "center", alignItems: "center" }}>
        <div className="glass-card animate-fade-in" style={{ padding: "40px", textAlign: "center", maxWidth: "400px" }}>
          <div style={{ width: "40px", height: "40px", border: "3px solid var(--accent-color)", borderTopColor: "transparent", borderRadius: "50%", margin: "0 auto 20px", animation: "spin 1s linear infinite" }}></div>
          <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
          <h2 style={{ fontSize: "20px", marginBottom: "8px" }}>Generating AI Quiz...</h2>
          <p style={{ color: "var(--text-secondary)", fontSize: "14px" }}>Analyzing your study behavior for {name}.</p>
        </div>
      </div>
    );
  }

  // NEW SECTION SELECTION SCREEN
  if (!selectedSection) {
    return (
      <div style={{ minHeight: "100vh", backgroundColor: "var(--bg-color)", color: "var(--text-main)" }}>
        <div className="glass-card" style={{ padding: "16px 32px", borderBottom: "1px solid var(--border-color)", display: "flex", justifyContent: "space-between", alignItems: "center", margin: "10px 20px", position: "sticky", top: 10, zIndex: 100 }}>
           <span className="text-gradient" style={{ fontSize: "16px", letterSpacing: "0.1em" }}>{name.toUpperCase()} ASSESSMENT</span>
           <button onClick={() => navigate("/dashboard")} className="premium-btn" style={{ padding: "8px 16px", fontSize: "12px" }}>Dashboard</button>
        </div>
        <div style={{ maxWidth: "800px", margin: "60px auto", padding: "0 20px" }}>
           <h2 style={{ fontSize: "24px", fontWeight: "700", marginBottom: "8px" }}>Choose an Assessment Area</h2>
           <p style={{ color: "var(--text-secondary)", marginBottom: "40px" }}>Select a specific section to test your knowledge or use AI Dynamic mode.</p>
           
           <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "20px" }}>
              <button 
                onClick={() => setSelectedSection("AI")}
                className="glass-card"
                style={{
                  padding: "30px", border: "2px solid var(--accent-color)",
                  textAlign: "left", cursor: "pointer"
                }}
              >
                 <span style={{ display: "block", fontSize: "11px", fontWeight: "900", color: "var(--accent-color)", textTransform: "uppercase", marginBottom: "10px" }}>Dynamic Analysis</span>
                 <h3 style={{ fontSize: "20px", fontWeight: "800", color: "var(--text-main)" }}>AI Performance Quiz</h3>
                 <p style={{ fontSize: "13px", color: "var(--text-secondary)", marginTop: "10px" }}>Custom questions generated from your study session.</p>
              </button>

              {sections.map(s => (
                <button 
                  key={s}
                  onClick={() => setSelectedSection(s)}
                  className="glass-card"
                  style={{
                    padding: "30px", textAlign: "left", cursor: "pointer"
                  }}
                >
                   <span style={{ display: "block", fontSize: "11px", fontWeight: "700", color: "var(--text-muted)", textTransform: "uppercase", marginBottom: "10px" }}>Standard Module</span>
                   <h3 style={{ fontSize: "20px", fontWeight: "800", color: "var(--text-main)" }}>{s}</h3>
                   <p style={{ fontSize: "13px", color: "var(--text-secondary)", marginTop: "10px" }}>Foundational technical questions.</p>
                </button>
              ))}
           </div>
        </div>
      </div>
    )
  }

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "var(--bg-color)", color: "var(--text-main)" }}>
      <div className="glass-card" style={{
        display: "flex", justifyContent: "space-between", alignItems: "center",
        padding: "16px 32px", backgroundColor: "var(--nav-bg)", borderBottom: "1px solid var(--border-color)",
        position: "sticky", top: 10, zIndex: 100, margin: "10px 20px", borderRadius: "16px"
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px", cursor: "pointer" }} onClick={() => navigate("/dashboard")}>
          <span className="text-gradient" style={{ fontSize: "16px", fontWeight: "800", textTransform: "uppercase" }}>Quiz Portal</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "24px" }}>
          <ThemeToggle />
          <button onClick={() => navigate("/dashboard")} className="premium-btn" style={{ padding: "8px 20px", fontSize: "12px" }}>Dashboard</button>
        </div>
      </div>

      <div style={{ padding: "60px 20px", maxWidth: "700px", margin: "0 auto" }}>
        {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

        {questions.length === 0 ? (
          <div className="glass-card animate-fade-in" style={{ textAlign: "center", padding: "60px" }}>
            <h2 style={{ fontSize: "24px", marginBottom: "16px" }}>All Completed!</h2>
            <p style={{ color: "var(--text-secondary)", marginBottom: "32px" }}>You have mastered all standard questions for <b>{selectedSection || name}</b>. Ready for an AI challenge?</p>
            <div style={{ display: "flex", gap: "16px", justifyContent: "center" }}>
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
                className="premium-btn"
              >
                Generate AI Quiz
              </button>
              <button 
                onClick={() => navigate("/dashboard")} 
                className="glass-card"
                style={{ padding: "12px 24px", fontSize: "14px", fontWeight: "700", cursor: "pointer" }}
              >
                Back home
              </button>
            </div>
          </div>
        ) : finished ? (
          <div className="animate-fade-in" style={{ padding: "20px" }}>
            <div className="glass-card" style={{ textAlign: "center", padding: "60px 40px", marginBottom: "32px" }}>
              <h2 className="text-gradient" style={{ fontSize: "24px", marginBottom: "32px" }}>Evaluation Complete</h2>
              <div style={{ fontSize: "72px", fontWeight: "800", marginBottom: "16px", color: "var(--accent-color)" }}>
                {score}/{questions.length}
              </div>
              <p style={{ color: "var(--text-secondary)", marginBottom: "40px", fontSize: "14px" }}>Behavior mapping shows you are {score === questions.length ? "Mastering" : "Progressing"} in this area.</p>
              <button onClick={() => navigate("/dashboard")} className="premium-btn" style={{ padding: "12px 48px" }}>Finish Assessment</button>
            </div>

            <h3 style={{ fontSize: "18px", fontWeight: "800", marginBottom: "24px", color: "var(--text-main)" }}>Performance Review</h3>
            <div style={{ display: "grid", gap: "16px" }}>
              {questions.map((q, idx) => (
                <div key={idx} className="glass-card" style={{ padding: "24px", borderLeft: `4px solid ${userAnswers[idx] === q.answer ? "var(--accent-secondary)" : "#f87171"}` }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "12px" }}>
                    <span style={{ fontSize: "11px", fontWeight: "800", color: "var(--text-muted)" }}>QUESTION {idx + 1}</span>
                    <span style={{ fontSize: "11px", fontWeight: "800", color: userAnswers[idx] === q.answer ? "var(--accent-secondary)" : "#f87171" }}>
                      {userAnswers[idx] === q.answer ? "CORRECT" : "INCORRECT"}
                    </span>
                  </div>
                  <p style={{ fontSize: "15px", fontWeight: "600", marginBottom: "16px", color: "var(--text-main)" }}>{q.question}</p>
                  <div style={{ fontSize: "13px" }}>
                    <div style={{ color: "var(--accent-secondary)", fontWeight: "700", marginBottom: "4px" }}>Correct Answer: {q.options[q.answer]}</div>
                    {userAnswers[idx] !== q.answer && (
                      <div style={{ color: "#f87171" }}>Your Answer: {q.options[userAnswers[idx]]}</div>
                    )}
                  </div>
                </div>
              ))}
            </div>
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

            <div className="glass-card animate-fade-in" style={{ padding: "40px" }}>
              <h3 style={{ fontSize: "20px", fontWeight: "700", marginBottom: "32px", lineHeight: "1.6" }}>{questions[current]?.question}</h3>
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
                <button onClick={handleNext} className="premium-btn" style={{ marginTop: "32px", width: "100%", padding: "14px" }}>
                  {current + 1 < questions.length ? "Continue Assessment" : "Generate Analysis"}
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
