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
} from "chart.js";
import { Bar, Line } from "react-chartjs-2";
import Toast from "./Toast";
import ThemeToggle from "./ThemeToggle";
import { quizData } from "../data/quizData";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

const topics = [
  { name: "HTML", url: "https://www.w3schools.com/html/", icon: "🌐", color: "#E34F26" },
  { name: "CSS", url: "https://www.w3schools.com/css/", icon: "🎨", color: "#1572B6" },
  { name: "JavaScript", url: "https://www.w3schools.com/js/", icon: "🟨", color: "#F7DF1E" },
  { name: "SQL", url: "https://www.w3schools.com/sql/", icon: "🗃️", color: "#F29111" },
  { name: "Python", url: "https://www.w3schools.com/python/", icon: "🐍", color: "#FFD43B" },
  { name: "Java", url: "https://www.w3schools.com/java/", icon: "☕", color: "#F89820" },
  { name: "PHP", url: "https://www.w3schools.com/php/", icon: "🐘", color: "#777BB4" },
  { name: "C", url: "https://www.w3schools.com/c/", icon: "🔵", color: "#A8B9CC" },
  { name: "C++", url: "https://www.w3schools.com/cpp/", icon: "⚙️", color: "#00599C" },
  { name: "C#", url: "https://www.w3schools.com/cs/", icon: "💜", color: "#9B4F96" },
  { name: "Bootstrap", url: "https://www.w3schools.com/bootstrap5/", icon: "🅱️", color: "#7952B3" },
  { name: "React", url: "https://www.w3schools.com/react/", icon: "⚛️", color: "#61DAFB" },
  { name: "MySQL", url: "https://www.w3schools.com/mysql/", icon: "🐬", color: "#00758F" },
  { name: "jQuery", url: "https://www.w3schools.com/jquery/", icon: "🔵", color: "#0769AD" },
  { name: "Excel", url: "https://www.w3schools.com/excel/", icon: "📊", color: "#217346" },
  { name: "NumPy", url: "https://www.w3schools.com/python/numpy/", icon: "🔢", color: "#4DABCF" },
  { name: "Pandas", url: "https://www.w3schools.com/python/pandas/", icon: "🐼", color: "#150458" },
  { name: "Node.js", url: "https://www.w3schools.com/nodejs/", icon: "🟢", color: "#68A063" },
  { name: "DSA", url: "https://www.w3schools.com/dsa/", icon: "🌲", color: "#A29BFE" },
  { name: "TypeScript", url: "https://www.w3schools.com/typescript/", icon: "🔷", color: "#3178C6" },
  { name: "Angular", url: "https://www.w3schools.com/angular/", icon: "🔴", color: "#DD0031" },
  { name: "AngularJS", url: "https://www.w3schools.com/angularjs/", icon: "🅰️", color: "#E23237" },
  { name: "Git", url: "https://www.w3schools.com/git/", icon: "🌿", color: "#F05032" },
  { name: "PostgreSQL", url: "https://www.w3schools.com/postgresql/", icon: "🐘", color: "#336791" },
  { name: "MongoDB", url: "https://www.w3schools.com/mongodb/", icon: "🍃", color: "#4DB33D" },
  { name: "AI", url: "https://www.w3schools.com/ai/", icon: "🤖", color: "#FF6B6B" },
  { name: "R", url: "https://www.w3schools.com/r/", icon: "📉", color: "#276DC3" },
  { name: "Go", url: "https://www.w3schools.com/go/", icon: "🐹", color: "#00ACD7" },
  { name: "Kotlin", url: "https://www.w3schools.com/kotlin/", icon: "🟣", color: "#7F52FF" },
  { name: "Swift", url: "https://www.w3schools.com/swift/", icon: "🍎", color: "#FA7343" },
  { name: "SASS", url: "https://www.w3schools.com/sass/", icon: "💅", color: "#CC6699" },
  { name: "Vue", url: "https://www.w3schools.com/vue/", icon: "💚", color: "#4FC08D" },
  { name: "Gen AI", url: "https://www.w3schools.com/gen_ai/", icon: "✨", color: "#FF9F43" },
  { name: "SciPy", url: "https://www.w3schools.com/python/scipy/", icon: "🔬", color: "#8CAAE6" },
  { name: "AWS", url: "https://www.w3schools.com/aws/", icon: "☁️", color: "#FF9900" },
  { name: "Cybersecurity", url: "https://www.w3schools.com/cybersecurity/", icon: "🔒", color: "#E74C3C" },
  { name: "Data Science", url: "https://www.w3schools.com/datascience/", icon: "📈", color: "#9B59B6" },
  { name: "Bash", url: "https://www.w3schools.com/bash/", icon: "💻", color: "#4EAA25" },
  { name: "Rust", url: "https://www.w3schools.com/rust/", icon: "⚙️", color: "#DEA584" },
  { name: "XML", url: "https://www.w3schools.com/xml/", icon: "📄", color: "#FF6600" },
  { name: "Django", url: "https://www.w3schools.com/django/", icon: "🎸", color: "#092E20" },
  { name: "ASP", url: "https://www.w3schools.com/asp/", icon: "🔧", color: "#5C2D91" },
  { name: "Power BI", url: "https://learn.microsoft.com/en-us/power-bi/", icon: "📊", color: "#F2C811" },
  { name: "Intro to Programming", url: "https://www.w3schools.com/startcoding/", icon: "🚀", color: "#00B4D8" },
  { name: "HTML & CSS", url: "https://www.w3schools.com/html/html_css.asp", icon: "🎭", color: "#E44D26" },
];

// Professional SVG Icon Components
const IconBolt = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"></path></svg>
);
const IconTarget = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="6"></circle><circle cx="12" cy="12" r="2"></circle></svg>
);
const IconAward = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="8" r="7"></circle><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"></polyline></svg>
);
const IconBell = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>
);

function Dashboard() {
  const navigate = useNavigate();
  const [timers, setTimers] = useState({});
  const [activeTopics, setActiveTopics] = useState({});
  const [activityData, setActivityData] = useState([]);
  const [analyticsData, setAnalyticsData] = useState(null);
  const [toast, setToast] = useState(null);
  const studentId = localStorage.getItem("student_id") || localStorage.getItem("user_id");
  const studentName = localStorage.getItem("student_name");

  // Get current theme text color for charts
  const getThemeTextColor = () => {
    return localStorage.getItem("theme") === "light" ? "#475569" : "#f8fafc";
  };

  const showToast = (message, type) => {
    setToast({ message, type });
  };

  const fetchData = () => {
    if (studentId) {
      fetch(`http://127.0.0.1:5000/api/activity/${studentId}`)
        .then((res) => res.json())
        .then((data) => setActivityData(data))
        .catch(() => console.log("Fetch failed"));

      fetch(`http://127.0.0.1:5000/api/analytics/${studentId}`)
        .then((res) => res.json())
        .then((data) => setAnalyticsData(data))
        .catch(() => console.log("Analytics fetch failed"));
    }
  };

  useEffect(() => {
    fetchData();
  }, [studentId]);

  const formatTime = (seconds) => {
    if (!seconds) return "0s";
    if (seconds < 60) return `${seconds}s`;
    else if (seconds < 3600) {
      const mins = Math.floor(seconds / 60);
      const secs = seconds % 60;
      return `${mins}m ${secs}s`;
    } else {
      const hours = Math.floor(seconds / 3600);
      const mins = Math.floor((seconds % 3600) / 60);
      return `${hours}h ${mins}m`;
    }
  };

  const hasQuiz = (topicName) =>
    Boolean(
      quizData[topicName] ||
      quizData[topicName.toLowerCase()] ||
      quizData[topicName.toUpperCase()]
    );

  const handleTopicClick = (topic) => {
    const startTime = Date.now();
    if (activeTopics[topic.name]) return;

    setActiveTopics((prev) => ({ ...prev, [topic.name]: true }));
    setTimers((prev) => ({ ...prev, [topic.name]: 0 }));

    const newTab = window.open(topic.url, "_blank");

    const interval = setInterval(() => {
      setTimers((prev) => ({
        ...prev,
        [topic.name]: Math.floor((Date.now() - startTime) / 1000),
      }));

      if (newTab.closed) {
        const timeSpent = Math.floor((Date.now() - startTime) / 1000);

        fetch("http://127.0.0.1:5000/api/track", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            student_id: studentId,
            topic: topic.name,
            time_spent: timeSpent,
          }),
        }).then(() => {
          fetchData(); // Refresh data
        }).catch(() => console.log("Track failed"));

        clearInterval(interval);
        setActiveTopics((prev) => ({ ...prev, [topic.name]: false }));
        setTimers((prev) => ({ ...prev, [topic.name]: 0 }));

        showToast(`📚 "${topic.name}" — ${formatTime(timeSpent)} studied!`, "success");
      }
    }, 1000);
  };

  const handleLogout = () => {
    localStorage.removeItem("student_id");
    localStorage.removeItem("user_id");
    localStorage.removeItem("student_name");
    navigate("/");
  };

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "var(--bg-color)", color: "var(--text-main)" }} className="animate-fade">

      {/* Toast Notification */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      {/* Elite Navbar */}
      <nav style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "1rem 2.5rem",
        backgroundColor: "var(--bg-card)",
        borderBottom: "1px solid var(--border-color)",
        position: "sticky",
        top: 0,
        zIndex: 100,
        boxShadow: "0 10px 30px rgba(0,0,0,0.05)"
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div style={{ 
            width: "36px", height: "36px", 
            background: "var(--accent-gradient)", 
            borderRadius: "10px", 
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <IconBolt />
          </div>
          <span style={{ fontSize: "1.3rem", fontWeight: "900", letterSpacing: "-1px" }}>
            Cogni<span style={{ color: "var(--accent-color)" }}>Track</span>
          </span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "25px" }}>
          <ThemeToggle />
          <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
            <span style={{ 
              color: "var(--text-main)", 
              fontSize: "13px", 
              fontWeight: "800",
              textTransform: "uppercase",
              letterSpacing: "0.5px"
            }}>
              {studentName || "Guest User"}
            </span>
            <button
              onClick={handleLogout}
              style={{
                padding: "8px 16px",
                borderRadius: "10px",
                border: "1px solid var(--border-color)",
                backgroundColor: "var(--bg-color)",
                color: "var(--text-main)",
                fontSize: "12px",
                cursor: "pointer",
                fontWeight: "900",
                transition: "all 0.3s"
              }}
              onMouseEnter={(e) => e.currentTarget.style.borderColor = "var(--danger-color)"}
              onMouseLeave={(e) => e.currentTarget.style.borderColor = "var(--border-color)"}
            >
              SIGN OUT
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content Area */}
      <div style={{ padding: "2rem", maxWidth: "1500px", margin: "0 auto" }}>

        {/* Analytics Grid - Professional Layout */}
        {analyticsData && (
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "1.25rem",
            marginBottom: "2rem",
          }}>
            {[
              { label: "Velocity", value: `${analyticsData.avg_time}s`, color: "#3b82f6", icon: <IconBolt /> },
              { label: "Accuracy", value: `${analyticsData.avg_score}%`, color: "#10b981", icon: <IconTarget /> },
              { label: "Expertise", value: analyticsData.most_studied, color: "#8b5cf6", icon: <IconAward /> },
              { label: "Alerts", value: analyticsData.difficult_topics.length || "0", color: "#f59e0b", icon: <IconBell /> },
            ].map((stat, i) => (
              <div key={i} style={{
                backgroundColor: "var(--bg-card)",
                borderRadius: "20px",
                padding: "1.5rem",
                border: "1px solid var(--border-color)",
                boxShadow: "0 4px 6px -1px rgba(0,0,0,0.02), 0 2px 4px -1px rgba(0,0,0,0.01)",
                display: "flex",
                flexDirection: "column",
                gap: "1rem",
                position: "relative",
                overflow: "hidden"
              }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <div style={{ fontSize: "11px", color: "var(--text-muted)", fontWeight: "900", textTransform: "uppercase", letterSpacing: "1px" }}>{stat.label}</div>
                  <div style={{ color: stat.color, opacity: 0.8 }}>{stat.icon}</div>
                </div>
                <div style={{ fontSize: "1.8rem", fontWeight: "900", color: "var(--text-main)", letterSpacing: "-1px" }}>{stat.value}</div>
                <div style={{ position: "absolute", top: 0, right: 0, width: "100px", height: "100px", background: `radial-gradient(circle at top right, ${stat.color}08, transparent)`, zIndex: 0 }} />
              </div>
            ))}
          </div>
        )}

        {/* Charts & Insights Grid */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(450px, 1fr))",
          gap: "1.5rem",
          marginBottom: "2.5rem",
        }}>
          {/* Main Chart Card */}
          <div style={{
            backgroundColor: "var(--bg-card)", borderRadius: "24px",
            padding: "2rem", border: "1px solid var(--border-color)",
            boxShadow: "0 20px 25px -5px rgba(0,0,0,0.02)"
          }}>
            <div style={{ marginBottom: "2rem" }}>
              <div style={{ fontSize: "11px", fontWeight: "900", color: "var(--accent-color)", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "8px" }}>Performance Metrics</div>
              <h4 style={{ fontWeight: "900", fontSize: "1.4rem", margin: 0 }}>Accuracy Growth</h4>
            </div>
            {analyticsData && analyticsData.topic_stats.length > 0 ? (
              <div style={{ height: "320px" }}>
                <Line
                  data={{
                    labels: analyticsData.topic_stats.map((t) => t.lesson_name),
                    datasets: [{
                      label: "Accuracy %",
                      data: analyticsData.topic_stats.map((t) => t.avg_score),
                      borderColor: "#3b82f6",
                      backgroundColor: "rgba(59, 130, 246, 0.03)",
                      borderWidth: 4,
                      tension: 0.4,
                      fill: true,
                      pointRadius: 0,
                      pointHoverRadius: 6,
                      pointHoverBackgroundColor: "#3b82f6",
                      pointHoverBorderColor: "white",
                      pointHoverBorderWidth: 3,
                    }],
                  }}
                  options={{
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: { 
                      legend: { display: false },
                      tooltip: {
                        mode: 'index',
                        intersect: false,
                        backgroundColor: '#1e293b',
                        padding: 12,
                        cornerRadius: 8,
                        titleFont: { size: 12, weight: 'bold' }
                      }
                    },
                    scales: {
                      x: { ticks: { color: getThemeTextColor(), font: { size: 10, weight: '700' } }, grid: { display: false } },
                      y: { ticks: { color: getThemeTextColor(), font: { size: 10 } }, min: 0, max: 100, grid: { color: 'rgba(255,255,255,0.05)' } }
                    }
                  }}
                />
              </div>
            ) : <div style={{ height: "320px", display: "flex", alignItems: "center", justifyContent: "center", color: "var(--text-muted)", fontStyle: "italic" }}>Awaiting Data Stream...</div>}
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem" }}>
            {/* Efficiency Box */}
            <div style={{
              backgroundColor: "var(--bg-card)", borderRadius: "24px",
              padding: "2rem", border: "1px solid var(--border-color)",
              flex: 1
            }}>
              <div style={{ marginBottom: "1.5rem" }}>
                <div style={{ fontSize: "11px", fontWeight: "900", color: "#10b981", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "8px" }}>Resource Focus</div>
                <h4 style={{ fontWeight: "900", fontSize: "1.2rem", margin: 0 }}>Engagement by Domain</h4>
              </div>
              {analyticsData && analyticsData.topic_stats.length > 0 ? (
                <div style={{ height: "230px" }}>
                  <Bar
                    data={{
                      labels: analyticsData.topic_stats.map((t) => t.lesson_name),
                      datasets: [{
                        label: "Seconds spent",
                        data: analyticsData.topic_stats.map((t) => t.total_time),
                        backgroundColor: "#10b981",
                        borderRadius: 8,
                        barThickness: 10,
                      }],
                    }}
                    options={{
                      responsive: true,
                      maintainAspectRatio: false,
                      plugins: { legend: { display: false } },
                      scales: {
                        x: { ticks: { color: getThemeTextColor(), font: { size: 10 } }, grid: { display: false } },
                        y: { ticks: { color: getThemeTextColor(), font: { size: 10 } }, grid: { color: 'rgba(255,255,255,0.05)', borderDash: [5, 5] } }
                      }
                    }}
                  />
                </div>
              ) : <div style={{ height: "230px" }} />}
            </div>

            {/* Action Card */}
            {analyticsData && (
              <div style={{
                background: "var(--accent-gradient)",
                borderRadius: "24px",
                padding: "1.5rem 2rem",
                color: "white",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center"
              }}>
                <div>
                  <div style={{ fontSize: "12px", opacity: 0.8, fontWeight: "700", textTransform: "uppercase", marginBottom: "4px" }}>Recommendation</div>
                  <h5 style={{ margin: 0, fontSize: "1.1rem", fontWeight: "900" }}>Focus on {analyticsData.difficult_topics[0] || "Foundations"}</h5>
                </div>
                <button style={{ backgroundColor: "white", color: "var(--accent-color)", border: "none", padding: "10px 20px", borderRadius: "12px", fontWeight: "900", fontSize: "12px" }}>START SESSION</button>
              </div>
            )}
          </div>
        </div>

        {/* Modules Library - Professional Grid */}
        <div style={{ marginBottom: "5rem" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: "2rem" }}>
            <div>
              <div style={{ fontSize: "11px", fontWeight: "900", color: "var(--text-muted)", textTransform: "uppercase", letterSpacing: "1px", marginBottom: "8px" }}>Catalog Overview</div>
              <h3 style={{ fontWeight: "950", fontSize: "1.8rem", margin: 0, letterSpacing: "-0.5px" }}>Curriculum <span style={{ color: "var(--accent-color)" }}>Modules</span></h3>
            </div>
            <div style={{ padding: "8px 16px", backgroundColor: "var(--bg-card)", border: "1px solid var(--border-color)", borderRadius: "10px", fontSize: "12px", fontWeight: "700" }}>
              Total Units: {topics.length}
            </div>
          </div>
          
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
            gap: "1.25rem",
          }}>
            {topics.map((topic, index) => (
              <div key={index} style={{
                backgroundColor: "var(--bg-card)",
                borderRadius: "20px",
                border: "1px solid var(--border-color)",
                padding: "1.5rem",
                display: "flex",
                flexDirection: "column",
                gap: "1.5rem",
                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
                boxShadow: "0 1px 3px rgba(0,0,0,0.02)",
                position: "relative"
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-5px)";
                e.currentTarget.style.borderColor = "var(--accent-color)";
                e.currentTarget.style.boxShadow = "0 20px 25px -5px rgba(0,0,0,0.05)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.borderColor = "var(--border-color)";
                e.currentTarget.style.boxShadow = "0 1px 3px rgba(0,0,0,0.02)";
              }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
                  <div style={{ 
                    width: "48px", height: "48px", 
                    backgroundColor: "var(--bg-color)", 
                    borderRadius: "14px", 
                    display: "flex", alignItems: "center", justifyContent: "center",
                    fontSize: "22px",
                    border: "1px solid var(--border-color)"
                  }}>
                    {topic.icon}
                  </div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: "900", fontSize: "1.05rem", color: "var(--text-main)" }}>{topic.name}</div>
                    <div style={{ color: "var(--text-muted)", fontSize: "11px", fontWeight: "600" }}>Standardized Core</div>
                  </div>
                </div>

                <div style={{ display: "flex", gap: "10px" }}>
                  <button
                    onClick={() => handleTopicClick(topic)}
                    style={{
                      flex: 1.2, padding: "12px", borderRadius: "12px",
                      border: "none", backgroundColor: "var(--accent-color)",
                      color: "white", fontSize: "12px", fontWeight: "900",
                      boxShadow: "0 4px 12px rgba(59, 130, 246, 0.3)"
                    }}
                  >LAUNCH MODULE</button>
                  <button
                    onClick={() => hasQuiz(topic.name) ? navigate(`/quiz/${topic.name}`) : showToast("Quiz Locked", "error")}
                    style={{
                      flex: 1, padding: "12px", borderRadius: "12px",
                      border: "1px solid var(--border-color)", backgroundColor: "var(--bg-color)",
                      color: "var(--text-main)", fontSize: "11px", fontWeight: "800",
                    }}
                  >TEST SKILLS</button>
                </div>

                {activeTopics[topic.name] && (
                  <div style={{
                    position: "absolute", top: "15px", right: "15px",
                    display: "flex", alignItems: "center", gap: "6px",
                    backgroundColor: "#eff6ff", color: "#3b82f6", padding: "4px 10px",
                    borderRadius: "50px", fontSize: "10px", fontWeight: "900"
                  }}>
                    <span style={{ width: "6px", height: "6px", backgroundColor: "#3b82f6", borderRadius: "50%", animation: "pulse 1.5s infinite" }} />
                    {formatTime(timers[topic.name])}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}

export default Dashboard;
