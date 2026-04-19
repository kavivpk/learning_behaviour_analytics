import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { Bar, Line } from "react-chartjs-2";
import Toast from "./Toast";
import ThemeToggle from "./ThemeToggle";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const topics = [
  { name: "HTML", url: "https://www.w3schools.com/html/", symbol: "</>", color: "#E34F26" },
  { name: "CSS", url: "https://www.w3schools.com/css/", symbol: "#", color: "#1572B6" },
  { name: "JavaScript", url: "https://www.w3schools.com/js/", symbol: "JS", color: "#F7DF1E" },
  { name: "SQL", url: "https://www.w3schools.com/sql/", symbol: "DB", color: "#F29111" },
  { name: "Python", url: "https://www.w3schools.com/python/", symbol: "Py", color: "#FFD43B" },
  { name: "Java", url: "https://www.w3schools.com/java/", symbol: "J", color: "#F89820" },
  { name: "PHP", url: "https://www.w3schools.com/php/", symbol: "P", color: "#777BB4" },
  { name: "C", url: "https://www.w3schools.com/c/", symbol: "C", color: "#A8B9CC" },
  { name: "C++", url: "https://www.w3schools.com/cpp/", symbol: "C++", color: "#00599C" },
  { name: "C#", url: "https://www.w3schools.com/cs/", symbol: "C#", color: "#9B4F96" },
  { name: "Bootstrap", url: "https://www.w3schools.com/bootstrap5/", symbol: "B", color: "#7952B3" },
  { name: "React", url: "https://www.w3schools.com/react/", symbol: "R", color: "#61DAFB" },
  { name: "MySQL", url: "https://www.w3schools.com/mysql/", symbol: "My", color: "#00758F" },
  { name: "jQuery", url: "https://www.w3schools.com/jquery/", symbol: "$", color: "#0769AD" },
  { name: "Excel", url: "https://www.w3schools.com/excel/", symbol: "Ex", color: "#217346" },
  { name: "NumPy", url: "https://www.w3schools.com/python/numpy/", symbol: "Nu", color: "#4DABCF" },
  { name: "Pandas", url: "https://www.w3schools.com/python/pandas/", symbol: "Pd", color: "#150458" },
  { name: "Node.js", url: "https://www.w3schools.com/nodejs/", symbol: "N", color: "#68A063" },
  { name: "DSA", url: "https://www.w3schools.com/dsa/", symbol: "[]", color: "#A29BFE" },
  { name: "TypeScript", url: "https://www.w3schools.com/typescript/", symbol: "TS", color: "#3178C6" },
  { name: "Angular", url: "https://www.w3schools.com/angular/", symbol: "A", color: "#DD0031" },
  { name: "AngularJS", url: "https://www.w3schools.com/angularjs/", symbol: "A", color: "#E23237" },
  { name: "Git", url: "https://www.w3schools.com/git/", symbol: "G", color: "#F05032" },
  { name: "PostgreSQL", url: "https://www.w3schools.com/postgresql/", symbol: "Ps", color: "#336791" },
  { name: "MongoDB", url: "https://www.w3schools.com/mongodb/", symbol: "M", color: "#4DB33D" },
  { name: "AI", url: "https://www.w3schools.com/ai/", symbol: "AI", color: "#FF6B6B" },
  { name: "R", url: "https://www.w3schools.com/r/", symbol: "R", color: "#276DC3" },
  { name: "Go", url: "https://www.w3schools.com/go/", symbol: "Go", color: "#00ACD7" },
  { name: "Kotlin", url: "https://www.w3schools.com/kotlin/", symbol: "K", color: "#7F52FF" },
  { name: "Swift", url: "https://www.w3schools.com/swift/", symbol: "S", color: "#FA7343" },
  { name: "SASS", url: "https://www.w3schools.com/sass/", symbol: "Sa", color: "#CC6699" },
  { name: "Vue", url: "https://www.w3schools.com/vue/", symbol: "V", color: "#4FC08D" },
  { name: "Gen AI", url: "https://www.w3schools.com/gen_ai/", symbol: "GA", color: "#FF9F43" },
  { name: "SciPy", url: "https://www.w3schools.com/python/scipy/", symbol: "Sp", color: "#8CAAE6" },
  { name: "AWS", url: "https://www.w3schools.com/aws/", symbol: "☁", color: "#FF9900" },
  { name: "Cybersecurity", url: "https://www.w3schools.com/cybersecurity/", symbol: "🔐", color: "#E74C3C" },
  { name: "Data Science", url: "https://www.w3schools.com/datascience/", symbol: "Ds", color: "#9B59B6" },
  { name: "Bash", url: "https://www.w3schools.com/bash/", symbol: "$_", color: "#4EAA25" },
  { name: "Rust", url: "https://www.w3schools.com/rust/", symbol: "Rs", color: "#DEA584" },
  { name: "XML", url: "https://www.w3schools.com/xml/", symbol: "{X}", color: "#FF6600" },
  { name: "Django", url: "https://www.w3schools.com/django/", symbol: "Dj", color: "#092E20" },
  { name: "ASP", url: "https://www.w3schools.com/asp/", symbol: "As", color: "#5C2D91" },
  { name: "Power BI", url: "https://learn.microsoft.com/en-us/power-bi/", symbol: "Pb", color: "#F2C811" },
  { name: "Intro to Programming", url: "https://www.w3schools.com/startcoding/", symbol: "P+", color: "#00B4D8" },
  { name: "HTML & CSS", url: "https://www.w3schools.com/html/html_css.asp", symbol: "H#", color: "#E44D26" },
];

function Dashboard() {
  const navigate = useNavigate();
  const [analyticsData, setAnalyticsData] = useState(null);
  const [toast, setToast] = useState(null);
  const studentId = localStorage.getItem("student_id") || localStorage.getItem("user_id");
  const studentName = localStorage.getItem("student_name");

  const getThemeTextColor = () => {
    return localStorage.getItem("theme") === "light" ? "#475569" : "#94a3b8";
  };

  const showToast = (message, type) => {
    setToast({ message, type });
  };

  const fetchData = () => {
    if (studentId) {
      fetch(`http://127.0.0.1:5000/api/analytics/${studentId}`)
        .then((res) => res.json())
        .then((data) => setAnalyticsData(data))
        .catch(() => console.log("Analytics fetch failed"));
    }
  };

  useEffect(() => {
    fetchData();
  }, [studentId]);

  const handleStudyClick = (topic) => {
    window.open(topic.url, "_blank");
    sessionStorage.removeItem("current_study_content");

    fetch("http://127.0.0.1:5000/api/track", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        student_id: studentId,
        topic: topic.name,
        time_spent: 300, 
      }),
    }).then(() => {
      fetchData();
      showToast(`AI Tracking: Study session for ${topic.name} saved!`, "success");
    });
  };

  const handleQuizClick = (topic) => {
    navigate(`/quiz/${topic.name}`);
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false }, tooltip: { backgroundColor: "#1e293b", padding: 12, titleFont: { size: 14 } } },
    scales: {
      x: { ticks: { color: getThemeTextColor(), font: { size: 10, weight: "600" } }, grid: { display: false } },
      y: { beginAtZero: true, ticks: { color: getThemeTextColor(), font: { size: 10 } }, grid: { color: "rgba(0,0,0,0.05)", borderDash: [4, 4] } },
    },
  };

  const lineOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { legend: { display: false } },
    scales: {
      x: { ticks: { color: getThemeTextColor(), font: { size: 10 } }, grid: { display: false } },
      y: { ticks: { color: getThemeTextColor(), font: { size: 10 } }, grid: { color: "rgba(0,0,0,0.05)" } },
    },
    elements: { line: { tension: 0.4 }, point: { radius: 0 } },
  };

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "var(--bg-color)", color: "var(--text-main)" }}>
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

      {/* HEADER */}
      <div style={{
        display: "flex", justifyContent: "space-between", alignItems: "center",
        padding: "16px 32px", backgroundColor: "var(--nav-bg)", borderBottom: "1px solid var(--border-color)",
        position: "sticky", top: 0, zIndex: 100,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div style={{ width: "8px", height: "8px", borderRadius: "50%", backgroundColor: "var(--accent-color)" }}></div>
          <span style={{ fontSize: "14px", fontWeight: "800", textTransform: "uppercase", letterSpacing: "0.15em" }}>ANALYTICA</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "24px" }}>
          <ThemeToggle />
          <span style={{ color: "var(--text-secondary)", fontSize: "13px", fontWeight: "600" }}>{studentName}</span>
          <button onClick={handleLogout} style={{
            padding: "8px 20px", borderRadius: "10px", border: "1px solid var(--border-color)",
            backgroundColor: "var(--card-bg)", color: "var(--text-main)", fontSize: "12px", fontWeight: "700", cursor: "pointer",
          }}>Logout</button>
        </div>
      </div>

      <div style={{ padding: "32px", maxWidth: "1400px", margin: "0 auto" }}>
        
        {/* ANALYTICS SECTION TOP */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(450px, 1fr))", gap: "24px", marginBottom: "40px" }}>
          
          {/* BAR CHART */}
          <div style={{ padding: "28px", backgroundColor: "var(--card-bg)", borderRadius: "20px", border: "1px solid var(--border-color)", boxShadow: "0 4px 20px rgba(0,0,0,0.02)" }}>
            <div style={{ marginBottom: "24px" }}>
              <h4 style={{ fontSize: "12px", fontWeight: "800", textTransform: "uppercase", color: "var(--accent-color)", letterSpacing: "0.1em" }}>Learning distribution</h4>
              <p style={{ fontSize: "11px", color: "var(--text-muted)" }}>Time spent per topic (seconds)</p>
            </div>
            <div style={{ height: "240px" }}>
              {analyticsData && (
                <Bar 
                  data={{
                    labels: analyticsData.topic_stats.map(t => t.lesson_name),
                    datasets: [{
                      data: analyticsData.topic_stats.map(t => t.total_time),
                      backgroundColor: "rgba(56, 189, 248, 0.6)",
                      hoverBackgroundColor: "rgba(56, 189, 248, 0.9)",
                      borderRadius: 6,
                    }]
                  }} 
                  options={barOptions} 
                />
              )}
            </div>
          </div>

          {/* LINE CHART */}
          <div style={{ padding: "28px", backgroundColor: "var(--card-bg)", borderRadius: "20px", border: "1px solid var(--border-color)", boxShadow: "0 4px 20px rgba(0,0,0,0.02)" }}>
            <div style={{ marginBottom: "24px" }}>
              <h4 style={{ fontSize: "12px", fontWeight: "800", textTransform: "uppercase", color: "var(--accent-color)", letterSpacing: "0.1em" }}>Performance Trend</h4>
              <p style={{ fontSize: "11px", color: "var(--text-muted)" }}>Quiz accuracy over time</p>
            </div>
            <div style={{ height: "240px" }}>
              {analyticsData && (
                <Line 
                  data={{
                    labels: analyticsData.topic_stats.map(t => t.lesson_name),
                    datasets: [{
                      data: analyticsData.topic_stats.map(t => t.quiz_score || 0),
                      borderColor: "rgba(45, 212, 191, 1)",
                      backgroundColor: "rgba(45, 212, 191, 0.1)",
                      fill: true,
                      borderWidth: 3,
                    }]
                  }} 
                  options={lineOptions} 
                />
              )}
            </div>
          </div>

        </div>

        {/* METRICS ROW */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "24px", marginBottom: "48px" }}>
          <div style={{ padding: "24px", backgroundColor: "var(--card-bg)", borderRadius: "16px", border: "1px solid var(--border-color)", borderLeft: "4px solid var(--accent-color)" }}>
            <span style={{ fontSize: "11px", color: "var(--text-muted)", fontWeight: "700", textTransform: "uppercase" }}>Total Study Time</span>
            <h2 style={{ fontSize: "28px", fontWeight: "800", marginTop: "8px" }}>{analyticsData?.avg_time || 0}s</h2>
          </div>
          <div style={{ padding: "24px", backgroundColor: "var(--card-bg)", borderRadius: "16px", border: "1px solid var(--border-color)", borderLeft: "4px solid #2dd4bf" }}>
            <span style={{ fontSize: "11px", color: "var(--text-muted)", fontWeight: "700", textTransform: "uppercase" }}>Quiz Accuracy</span>
            <h2 style={{ fontSize: "28px", fontWeight: "800", marginTop: "8px" }}>{analyticsData?.avg_score || 0}%</h2>
          </div>
          <div style={{ padding: "24px", backgroundColor: "var(--card-bg)", borderRadius: "16px", border: "1px solid var(--border-color)", borderLeft: "4px solid #a855f7" }}>
            <span style={{ fontSize: "11px", color: "var(--text-muted)", fontWeight: "700", textTransform: "uppercase" }}>Dominant Topic</span>
            <h2 style={{ fontSize: "22px", fontWeight: "800", marginTop: "8px" }}>{analyticsData?.most_studied || "N/A"}</h2>
          </div>
        </div>

        {/* TOPICS GRID */}
        <div style={{ marginBottom: "32px", display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
          <h3 style={{ fontSize: "18px", fontWeight: "800" }}>Curated Learning Paths</h3>
          <span style={{ fontSize: "12px", color: "var(--text-muted)" }}>Explore {topics.length} specialized modules</span>
        </div>

        <div style={{
          display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))", gap: "16px",
        }}>
          {topics.map((topic, index) => (
            <div key={index} style={{
              backgroundColor: "var(--card-bg)", borderRadius: "16px", border: "1px solid var(--border-color)", padding: "20px",
              display: "flex", flexDirection: "column", gap: "16px", transition: "transform 0.2s",
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <div style={{ padding: "6px 10px", backgroundColor: "var(--input-bg)", borderRadius: "8px", fontSize: "12px", fontWeight: "900", color: "var(--accent-color)" }}>{topic.symbol}</div>
                <span style={{ fontWeight: "700", fontSize: "14px" }}>{topic.name}</span>
              </div>
              <div style={{ display: "flex", gap: "10px" }}>
                <button onClick={() => handleStudyClick(topic)} style={{
                  flex: 1, padding: "10px", borderRadius: "10px", border: "1px solid var(--border-color)",
                  backgroundColor: "transparent", color: "var(--text-main)", fontSize: "12px", fontWeight: "700", cursor: "pointer",
                }}>Study</button>
                <button onClick={() => handleQuizClick(topic)} style={{
                  flex: 1, padding: "10px", borderRadius: "10px", border: "none",
                  backgroundColor: "var(--accent-color)", color: "#0f172a", fontSize: "12px", fontWeight: "800", cursor: "pointer",
                }}>Quiz</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
