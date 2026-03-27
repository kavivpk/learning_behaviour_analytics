import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Toast from './Toast';

// ✅ Your existing question bank (keep all 25+ topics as-is)
const ALL_QUESTIONS = {
  "HTML": [
    { q: "What does HTML stand for?", options: ["Hyper Text Markup Language", "High Tech Modern Language", "Hyper Transfer Markup Language", "Home Tool Markup Language"], answer: 0 },
    // ... rest of your HTML questions
  ],
  "CSS": [
    // ... your CSS questions
  ],
  // ... all other topics
};

export default function QuizPage() {
  const [studiedTopics, setStudiedTopics] = useState([]);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [questions, setQuestions] = useState([]);
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [finished, setFinished] = useState(false);
  const [selected, setSelected] = useState(null);
  const [toast, setToast] = useState(null);
  const [loading, setLoading] = useState(true);

  const userId = localStorage.getItem('user_id');

  // 🔄 Fetch studied topics on mount
  useEffect(() => {
    axios.get(`http://localhost:5000/studied-topics?user_id=${userId}`)
      .then(res => {
        // Filter ALL_QUESTIONS keys to only studied ones
        const studied = res.data.studied_topics;
        const available = studied.filter(t => ALL_QUESTIONS[t]);
        setStudiedTopics(available);
        setLoading(false);
      })
      .catch(() => {
        setToast({ message: 'Failed to load studied topics', type: 'error' });
        setLoading(false);
      });
  }, []);

  const startQuiz = (topic) => {
    setSelectedTopic(topic);
    setQuestions(ALL_QUESTIONS[topic]);
    setCurrent(0);
    setScore(0);
    setFinished(false);
    setSelected(null);
  };

  const handleAnswer = (idx) => {
    setSelected(idx);
    if (idx === questions[current].answer) {
      setScore(prev => prev + 1);
    }
  };

  const handleNext = () => {
    if (current + 1 < questions.length) {
      setCurrent(prev => prev + 1);
      setSelected(null);
    } else {
      setFinished(true);
      // Save score to backend
      axios.post('http://localhost:5000/quiz-score', {
        user_id: userId,
        topic: selectedTopic,
        score: score,
        total: questions.length
      }).then(() => {
        setToast({ message: `Quiz saved! Score: ${score}/${questions.length}`, type: 'success' });
      });
    }
  };

  // ────────────── RENDER ──────────────

  if (loading) return <div className="text-center mt-5">Loading your studied topics...</div>;

  // 📋 Topic Selection Screen
  if (!selectedTopic) {
    return (
      <div className="container mt-4">
        {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
        <h2 className="mb-1">📝 Quiz — Studied Topics Only</h2>
        <p className="text-muted mb-4">Only topics you've visited are unlocked for quizzes.</p>

        {studiedTopics.length === 0 ? (
          <div className="alert alert-warning">
            <i className="bi bi-lock-fill me-2"></i>
            No topics studied yet! Go to the <a href="/dashboard">Dashboard</a> and explore some topics first.
          </div>
        ) : (
          <div className="row g-3">
            {studiedTopics.map(topic => (
              <div className="col-md-3 col-sm-4 col-6" key={topic}>
                <div
                  className="card h-100 text-center p-3 shadow-sm"
                  style={{ cursor: 'pointer', borderLeft: '4px solid #0d6efd' }}
                  onClick={() => startQuiz(topic)}
                >
                  <i className="bi bi-book-fill fs-3 text-primary mb-2"></i>
                  <strong>{topic}</strong>
                  <small className="text-muted d-block mt-1">{ALL_QUESTIONS[topic]?.length || 0} questions</small>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  }

  // ✅ Finished Screen
  if (finished) {
    const percent = Math.round((score / questions.length) * 100);
    return (
      <div className="container mt-5 text-center">
        {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
        <h2>🎉 Quiz Complete!</h2>
        <h4 className="mt-3">{selectedTopic}</h4>
        <div className="display-4 my-3 fw-bold text-primary">{score}/{questions.length}</div>
        <p className="fs-5">{percent}% — {percent >= 80 ? '🌟 Excellent!' : percent >= 50 ? '👍 Good effort!' : '📖 Keep studying!'}</p>
        <button className="btn btn-outline-primary me-2" onClick={() => startQuiz(selectedTopic)}>Retry</button>
        <button className="btn btn-primary" onClick={() => setSelectedTopic(null)}>Back to Topics</button>
      </div>
    );
  }

  // ❓ Question Screen
  const q = questions[current];
  return (
    <div className="container mt-4" style={{ maxWidth: 600 }}>
      <div className="d-flex justify-content-between mb-2">
        <span className="badge bg-primary fs-6">{selectedTopic}</span>
        <span className="text-muted">Question {current + 1}/{questions.length}</span>
      </div>

      {/* Progress Bar */}
      <div className="progress mb-3" style={{ height: 8 }}>
        <div
          className="progress-bar"
          style={{ width: `${((current + 1) / questions.length) * 100}%` }}
        />
      </div>

      <div className="card shadow p-4">
        <h5 className="mb-4">{q.q}</h5>
        <div className="d-grid gap-2">
          {q.options.map((opt, idx) => {
            let variant = 'outline-secondary';
            if (selected !== null) {
              if (idx === q.answer) variant = 'success';
              else if (idx === selected) variant = 'danger';
            }
            return (
              <button
                key={idx}
                className={`btn btn-${variant} text-start`}
                onClick={() => selected === null && handleAnswer(idx)}
                disabled={selected !== null && idx !== q.answer && idx !== selected}
              >
                {opt}
              </button>
            );
          })}
        </div>
        {selected !== null && (
          <button className="btn btn-primary mt-3 w-100" onClick={handleNext}>
            {current + 1 < questions.length ? 'Next →' : 'Finish Quiz'}
          </button>
        )}
      </div>
    </div>
  );
}