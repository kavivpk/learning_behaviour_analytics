import React, { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Toast from "./Toast";
import ThemeToggle from "./ThemeToggle";
import { quizData } from "../data/quizData";

const genericQuestions = [
  { question: "What is the primary purpose of this technology?", options: ["Data Processing", "UI Development", "System Management", "Problem Solving"], answer: 3, level: 1 },
  { question: "Which of these is a key benefit of learning this?", options: ["Better Logic", "High Demand", "Efficiency", "All of these"], answer: 3, level: 1 },
  { question: "How would you describe the learning curve?", options: ["Very Easy", "Moderate", "Challenging", "Complex"], answer: 1, level: 2 }
];

const getTopicQuestions = (topicName) => {
  if (!topicName) return [];
  
  const searchName = topicName.toLowerCase();
  const keys = Object.keys(quizData);
  const foundKey = keys.find(k => k.toLowerCase() === searchName);
  
  if (foundKey) return quizData[foundKey];
  
  // Return generic questions if specialized ones are missing
  return genericQuestions;
};

const isCorrectAnswer = (question, selectedIndex) => {
  if (typeof question.answer === "number") {
    return selectedIndex === question.answer;
  }

  return question.options[selectedIndex] === question.answer;
};

export default function QuizPage() {
  const navigate = useNavigate();
  const { name } = useParams();
  const [studiedTopics, setStudiedTopics] = useState([]); // Array of {name, time}
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [topicTime, setTopicTime] = useState(0);
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [selected, setSelected] = useState(null);
  const [toast, setToast] = useState(null);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);

  const studentId =
    localStorage.getItem("student_id") || localStorage.getItem("user_id");

  // Filter questions based on topic and study time
  const questions = useMemo(() => {
    if (!selectedTopic) return [];
    
    const allQuestions = getTopicQuestions(selectedTopic);
    
    // Behavioral Logic
    return allQuestions.filter(q => {
      const level = q.level || 1;
      if (level === 1) return topicTime >= 10;
      if (level === 2) return topicTime >= 60;
      if (level >= 3) return topicTime >= 180;
      return true;
    });
  }, [selectedTopic, topicTime]);

  useEffect(() => {
    if (!studentId) {
      setToast({ message: "Please login to take quizzes", type: "error" });
      setLoading(false);
      return;
    }

    axios
      .get(`http://127.0.0.1:5000/studied-topics?user_id=${studentId}`)
      .then((res) => {
        const studied = Array.isArray(res.data.studied_topics)
          ? res.data.studied_topics
          : [];
          
        setStudiedTopics(studied);

        if (name) {
          const matched = studied.find(t => t.name.toLowerCase() === name.toLowerCase());
          if (matched) {
            setSelectedTopic(matched.name);
            setTopicTime(matched.time);
          }
        }
      })
      .catch(() => {
        setToast({ message: "Failed to load behavior data", type: "error" });
      })
      .finally(() => {
        setLoading(false);
      });
  }, [name, studentId]);

  const startQuiz = (topicObj) => {
    setProcessing(true);
    // Simulate AI extraction and question generation from study session
    setTimeout(() => {
      setSelectedTopic(topicObj.name);
      setTopicTime(Number(topicObj.time) || 0);
      setCurrent(0);
      setScore(0);
      setFinished(false);
      setSelected(null);
      setProcessing(false);
    }, 1500);
  };

  const handleAnswer = (idx) => {
    setSelected(idx);

    if (isCorrectAnswer(questions[current], idx)) {
      setScore((prev) => prev + 1);
    }
  };

  const handleNext = async () => {
    if (current + 1 < questions.length) {
      setCurrent((prev) => prev + 1);
      setSelected(null);
      return;
    }

    const finalScore = score;
    const percentage = Math.round((finalScore / questions.length) * 100);
    setFinished(true);

    try {
      await axios.post("http://127.0.0.1:5000/api/quiz_score", {
        student_id: studentId,
        topic: selectedTopic,
        score: percentage,
      });
      setToast({
        message: `Learning Progress Updated: ${percentage}% Mastery`,
        type: "success",
      });
    } catch {
      setToast({ message: "Failed to sync progress", type: "error" });
    }
  };

  if (loading || processing) {
    return (
      <div style={{ 
        minHeight: "100vh", 
        display: "flex", 
        flexDirection: "column", 
        justifyContent: "center", 
        alignItems: "center",
        backgroundColor: "var(--bg-color)",
        color: "var(--text-main)"
      }}>
        <div style={{ width: "40px", height: "40px", border: "4px solid var(--border-color)", borderTopColor: "var(--accent-color)", borderRadius: "50%", animation: "spin 1s linear infinite", marginBottom: "20px" }} />
        <p style={{ fontWeight: "700", letterSpacing: "1px", textTransform: "uppercase", fontSize: "11px", color: "var(--accent-color)" }}>
          {processing ? "Extracting Concepts from Study Session..." : "Synchronizing Behavioral Cloud..."}
        </p>
        <p style={{ fontSize: "12px", color: "var(--text-secondary)", marginTop: "8px", fontWeight: "600" }}>
          {processing ? "Isolating key topics you focused on..." : "Fetching study time and engagement metrics..."}
        </p>
        <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      </div>
    );
  }

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

      <div style={{ padding: "40px 20px", maxWidth: "900px", margin: "0 auto" }}>
        {toast && (
          <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />
        )}

        {!selectedTopic ? (
          <div>
            <div style={{ marginBottom: "2rem" }}>
              <div style={{ display: "inline-block", backgroundColor: "rgba(59, 130, 246, 0.1)", color: "var(--accent-color)", padding: "6px 16px", borderRadius: "50px", fontSize: "12px", fontWeight: "800", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "1rem" }}>
                🎯 Proficiency Evaluations
              </div>
              <h1 style={{ fontSize: "2.5rem", fontWeight: "900", letterSpacing: "-1px", margin: 0 }}>Quiz Portal</h1>
              <p style={{ color: "var(--text-secondary)", marginTop: "8px" }}>
                Validate your understanding of completed learning modules.
              </p>
            </div>

            {studiedTopics.length === 0 ? (
              <div style={{
                padding: "4rem 2rem", backgroundColor: "var(--bg-surface)", borderRadius: "var(--radius-lg)",
                border: "1px solid var(--border-color)", textAlign: "center", boxShadow: "var(--shadow-md)"
              }}>
                <div style={{ fontSize: "40px", marginBottom: "1.5rem" }}>🔒</div>
                <h3 style={{ fontWeight: "800", marginBottom: "1rem" }}>No Behavioral Data Detected</h3>
                <p style={{ color: "var(--text-secondary)", maxWidth: "400px", margin: "0 auto 2rem" }}>
                  The system hasn't tracked enough study time yet. Select a module from the dashboard and spend at least 15 seconds reading to unlock its quiz.
                </p>
                <button onClick={() => navigate("/dashboard")} style={{ 
                  color: "white", backgroundColor: "var(--accent-color)", padding: "12px 30px", 
                  borderRadius: "12px", border: "none", fontWeight: "800", cursor: "pointer" 
                }}>
                  Return to Dashboard
                </button>
              </div>
            ) : (
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "20px" }}>
                {studiedTopics.map((topic) => {
                  const unlockedCount = (getTopicQuestions(topic.name) || []).filter(q => {
                    const level = q.level || 1;
                    if (level === 1) return topic.time >= 10;
                    if (level === 2) return topic.time >= 60;
                    if (level >= 3) return topic.time >= 180;
                    return true;
                  }).length;

                  return (
                    <div
                      key={topic.name}
                      style={{
                        padding: "1.5rem", 
                        backgroundColor: "var(--bg-surface)", 
                        borderRadius: "20px",
                        border: "1px solid var(--border-color)", 
                        cursor: unlockedCount > 0 ? "pointer" : "not-allowed",
                        textAlign: "left", 
                        transition: "all 0.3s",
                        boxShadow: "var(--shadow-sm)",
                        position: "relative",
                        opacity: unlockedCount > 0 ? 1 : 0.6
                      }}
                      onMouseEnter={(e) => {
                        if (unlockedCount > 0) {
                          e.currentTarget.style.transform = "translateY(-5px)";
                          e.currentTarget.style.borderColor = "var(--accent-color)";
                        }
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = "translateY(0)";
                        e.currentTarget.style.borderColor = "var(--border-color)";
                      }}
                      onClick={() => unlockedCount > 0 ? startQuiz(topic) : setToast({ message: "Keep studying to unlock questions!", type: "warning" })}
                    >
                      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "1rem" }}>
                        <div style={{ 
                          width: "32px", height: "32px", backgroundColor: "var(--bg-color)", 
                          borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center",
                          fontSize: "16px"
                        }}>
                          {unlockedCount > 0 ? "🔥" : "🔒"}
                        </div>
                        <div style={{ fontSize: "10px", fontWeight: "900", color: "var(--accent-color)", textTransform: "uppercase" }}>
                          {topic.time}s Session
                        </div>
                      </div>
                      <strong style={{ display: "block", fontSize: "1.1rem", fontWeight: "900", marginBottom: "4px" }}>{topic.name}</strong>
                      <div style={{ color: "var(--text-muted)", fontSize: "12px", fontWeight: "700" }}>
                        {unlockedCount} / {getTopicQuestions(topic.name).length} Questions Unlocked
                      </div>
                      
                      <div style={{ marginTop: "1rem", height: "4px", backgroundColor: "var(--border-color)", borderRadius: "10px", overflow: "hidden" }}>
                        <div style={{ 
                          width: `${(unlockedCount / getTopicQuestions(topic.name).length) * 100}%`,
                          height: "100%", backgroundColor: "var(--accent-color)"
                        }} />
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        ) : finished ? (
          <div style={{ 
            textAlign: "center", padding: "4rem 2rem", backgroundColor: "var(--bg-surface)", 
            borderRadius: "var(--radius-xl)", border: "1px solid var(--border-color)", boxShadow: "var(--shadow-lg)"
          }}>
            <div style={{ 
              width: "80px", height: "80px", background: "var(--accent-gradient)", 
              borderRadius: "24px", display: "inline-flex", alignItems: "center", justifyContent: "center",
              fontSize: "40px", marginBottom: "2rem", boxShadow: "0 15px 35px rgba(59, 130, 246, 0.4)"
            }}>
              { (score/questions.length) >= 0.8 ? "🏆" : "🎉" }
            </div>
            <h2 style={{ fontWeight: "900", fontSize: "2.5rem", letterSpacing: "-1px" }}>Evaluation Complete!</h2>
            <p style={{ color: "var(--accent-color)", fontWeight: "800", fontSize: "1.1rem", textTransform: "uppercase", letterSpacing: "1px", marginTop: "0.5rem" }}>
              {selectedTopic}
            </p>
            
            <div style={{ margin: "3rem 0" }}>
              <div style={{ fontSize: "14px", fontWeight: "700", color: "var(--text-secondary)", marginBottom: "1rem", textTransform: "uppercase" }}>Your Proficiency Score</div>
              <div style={{ fontSize: "6rem", fontWeight: "900", lineHeight: 1, color: "var(--text-main)", letterSpacing: "-5px" }}>
                {Math.round((score/questions.length)*100)}<span style={{ fontSize: "2rem", verticalAlign: "top", marginLeft: "4px" }}>%</span>
              </div>
              <p style={{ fontSize: "1.2rem", color: "var(--text-secondary)", marginTop: "1rem", fontWeight: "600" }}>
                You identified {score} out of {questions.length} concepts correctly.
              </p>
            </div>

            <div style={{ display: "flex", gap: "15px", justifyContent: "center" }}>
              <button 
                onClick={() => startQuiz(selectedTopic)}
                style={{
                  padding: "16px 35px", borderRadius: "14px", border: "1px solid var(--border-color)",
                  backgroundColor: "var(--bg-color)", color: "var(--text-main)", fontWeight: "800", cursor: "pointer",
                  transition: "all 0.2s"
                }}
              >
                Retry Evaluation
              </button>
              <button 
                onClick={() => setSelectedTopic(null)}
                style={{
                  padding: "16px 35px", borderRadius: "14px", border: "none",
                  backgroundColor: "var(--accent-color)", color: "white", fontWeight: "800", cursor: "pointer",
                  boxShadow: "0 10px 20px rgba(59, 130, 246, 0.3)",
                  transition: "all 0.2s"
                }}
              >
                Back to Portal
              </button>
            </div>
          </div>
        ) : (
          <div style={{ maxWidth: "700px", margin: "0 auto" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "1.5rem", alignItems: "flex-end" }}>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "4px" }}>
                  <div style={{ fontSize: "10px", fontWeight: "900", color: "var(--accent-color)", textTransform: "uppercase", letterSpacing: "1px" }}>
                    Behavioral Assessment
                  </div>
                  {questions[current]?.focus && (
                    <div style={{ 
                      fontSize: "9px", fontWeight: "800", backgroundColor: "rgba(59, 130, 246, 0.1)", 
                      color: "var(--accent-color)", padding: "2px 8px", borderRadius: "4px",
                      textTransform: "uppercase", border: "1px solid rgba(59, 130, 246, 0.2)"
                    }}>
                      Focus: {questions[current].focus}
                    </div>
                  )}
                </div>
                <h3 style={{ margin: 0, fontSize: "1.5rem", fontWeight: "900" }}>{selectedTopic}</h3>
              </div>
              <div style={{ textAlign: "right" }}>
                <span style={{ color: "var(--text-secondary)", fontSize: "14px", fontWeight: "700" }}>
                  PROGRESS: {current + 1} / {questions.length}
                </span>
              </div>
            </div>

            <div style={{ width: "100%", height: "6px", backgroundColor: "var(--border-color)", borderRadius: "10px", marginBottom: "3rem", overflow: "hidden" }}>
              <div style={{ 
                width: `${((current + 1) / questions.length) * 100}%`, 
                height: "100%", backgroundColor: "var(--accent-color)", transition: "width 0.5s cubic-bezier(0.4, 0, 0.2, 1)" 
              }} />
            </div>

            <div style={{ 
              padding: "4rem 3rem", backgroundColor: "var(--bg-surface)", borderRadius: "var(--radius-xl)", 
              border: "1px solid var(--border-color)", boxShadow: "var(--shadow-lg)"
            }}>
              {questions.length === 0 ? (
                <div style={{ textAlign: "center" }}>
                   <div style={{ fontSize: "40px", marginBottom: "1.5rem" }}>⏳</div>
                   <h3 style={{ fontWeight: "800", marginBottom: "1rem" }}>Insufficient Study Depth</h3>
                   <p style={{ color: "var(--text-secondary)", marginBottom: "2rem" }}>
                     You need to study "{selectedTopic}" for at least 60 seconds to unlock more evaluation objectives.
                   </p>
                   <button onClick={() => setSelectedTopic(null)} style={{ padding: "12px 25px", borderRadius: "10px", backgroundColor: "var(--accent-color)", color: "white", border: "none", fontWeight: "700", cursor: "pointer" }}>Select Other Topic</button>
                </div>
              ) : (
                <>
                  <h2 style={{ marginBottom: "3rem", lineHeight: "1.4", fontSize: "1.6rem", fontWeight: "800", letterSpacing: "-0.5px" }}>
                    {questions[current]?.question || questions[current]?.q || "Diagnostic Evaluation..."}
                  </h2>
                  <div style={{ display: "grid", gap: "12px" }}>
                    {questions[current]?.options?.map((opt, idx) => {
                  let bgColor = "var(--bg-color)";
                  let borderColor = "var(--border-color)";
                  let textColor = "var(--text-main)";
                  let transform = "none";

                  if (selected !== null) {
                    if (isCorrectAnswer(questions[current], idx)) {
                      bgColor = "rgba(34, 197, 94, 0.1)";
                      borderColor = "#22c55e";
                      textColor = "#22c55e";
                    } else if (idx === selected) {
                      bgColor = "rgba(239, 68, 68, 0.1)";
                      borderColor = "#ef4444";
                      textColor = "#ef4444";
                    }
                  } else {
                    // Hover state logic would be here if using CSS classes
                  }

                  return (
                    <button
                      key={idx}
                      onClick={() => selected === null && handleAnswer(idx)}
                      style={{
                        padding: "1.25rem 1.5rem", borderRadius: "14px", border: `2px solid ${borderColor}`,
                        backgroundColor: bgColor, color: textColor, textAlign: "left",
                        fontSize: "1rem", fontWeight: "700", cursor: selected === null ? "pointer" : "default",
                        transition: "all 0.2s", transform: transform,
                        display: "flex", alignItems: "center", gap: "12px"
                      }}
                    >
                      <div style={{ 
                        width: "28px", height: "28px", borderRadius: "8px", border: "1px solid", 
                        borderColor: textColor, opacity: 0.3, display: "flex", alignItems: "center", 
                        justifyContent: "center", fontSize: "12px" 
                      }}>
                        {String.fromCharCode(65 + idx)}
                      </div>
                      {opt}
                    </button>
                  );
                })}
              </div>

                  {selected !== null && (
                    <button 
                      onClick={handleNext}
                      className="animate-fade"
                      style={{
                        marginTop: "3rem", width: "100%", padding: "18px", borderRadius: "16px",
                        backgroundColor: "var(--accent-color)", color: "white", border: "none",
                        fontWeight: "900", fontSize: "16px", cursor: "pointer",
                        boxShadow: "0 10px 20px rgba(59, 130, 246, 0.3)",
                        transition: "all 0.3s"
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = "translateY(-3px)";
                        e.currentTarget.style.boxShadow = "0 15px 30px rgba(59, 130, 246, 0.4)";
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = "translateY(0)";
                        e.currentTarget.style.boxShadow = "0 10px 20px rgba(59, 130, 246, 0.3)";
                      }}
                    >
                      {current + 1 < questions.length ? "Proceed to Next Objective" : "View Final Performance"}
                    </button>
                  )}
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
