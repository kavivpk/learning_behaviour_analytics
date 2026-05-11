import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Report() {
  const [analytics, setAnalytics] = useState(null);
  const [error, setError] = useState(null);
  const studentId = localStorage.getItem("student_id") || localStorage.getItem("user_id");

  useEffect(() => {
    if (!studentId) return;
    fetch(`http://127.0.0.1:5000/api/analytics/${studentId}`)
      .then(res => res.json())
      .then(data => setAnalytics(data))
      .catch(err => setError(err.message));
  }, [studentId]);

  if (error) {
    return <div className="report-page"><p className="error">Failed to load analytics: {error}</p></div>;
  }

  if (!analytics) {
    return <div className="report-page"><p>Loading analytics...</p></div>;
  }

  return (
    <div className="report-page" style={{ padding: "32px", maxWidth: "1200px", margin: "0 auto", color: "var(--text-main)" }}>
      <h2 style={{ fontSize: "24px", fontWeight: "800", marginBottom: "16px" }}>Learning Analytics Report</h2>
      <section style={{ marginBottom: "24px" }}>
        <p><strong>Total Study Time:</strong> {analytics.avg_time}s</p>
        <p><strong>Average Quiz Score:</strong> {analytics.avg_score}%</p>
        <p><strong>Learning Efficiency:</strong> {analytics.overall_efficiency} pts/min</p>
        <p><strong>Dominant Topic:</strong> {analytics.most_studied}</p>
      </section>
      <section>
        <h3>Topic Breakdown</h3>
        <ul>
          {analytics.topic_stats.map((t, idx) => (
            <li key={idx} style={{ marginBottom: "8px" }}>
              <strong>{t.lesson_name}</strong> – Time: {t.total_time}s, Avg Score: {t.avg_score}%
              {analytics.difficult_topics.includes(t.lesson_name) && (
                <span style={{ color: "#ef4444", marginLeft: "8px" }}>⚠️ Difficult</span>
              )}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

export default Report;
