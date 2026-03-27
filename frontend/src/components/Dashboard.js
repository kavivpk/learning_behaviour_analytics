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

function Dashboard() {
  const navigate = useNavigate();
  const [timers, setTimers] = useState({});
  const [activeTopics, setActiveTopics] = useState({});
  const [activityData, setActivityData] = useState([]);
  const [analyticsData, setAnalyticsData] = useState(null);
  const [toast, setToast] = useState(null);
  const studentId = localStorage.getItem("student_id");
  const studentName = localStorage.getItem("student_name");

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

        // Alert illama Toast kaatum ✅
        showToast(`📚 "${topic.name}" — ${formatTime(timeSpent)} studied!`, "success");
      }
    }, 1000);
  };

  const handleLogout = () => {
    localStorage.removeItem("student_id");
    localStorage.removeItem("student_name");
    navigate("/");
  };

  return (
    <div style={{ minHeight: "100vh", color: "white" }}>

      {/* Toast Notification */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      {/* Navbar */}
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "15px 30px",
        backgroundColor: "rgba(0,0,0,0.4)",
        backdropFilter: "blur(10px)",
        borderBottom: "1px solid rgba(255,255,255,0.1)",
        position: "sticky",
        top: 0,
        zIndex: 100,
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <span style={{ fontSize: "24px" }}>📊</span>
          <span style={{ fontSize: "18px", fontWeight: "bold", color: "white" }}>
            Learning Analytics
          </span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "15px" }}>
          <span style={{ color: "#00ff99", fontSize: "14px" }}>
            👋 Welcome, {studentName || "Student"}
          </span>
          <button
            onClick={handleLogout}
            style={{
              padding: "8px 20px",
              borderRadius: "20px",
              border: "1px solid #ff6b6b",
              backgroundColor: "transparent",
              color: "#ff6b6b",
              fontSize: "14px",
              cursor: "pointer",
              fontWeight: "bold",
            }}
          >
            🚪 Logout
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ padding: "30px" }}>

        {/* Welcome Banner */}
        <div style={{
          background: "linear-gradient(135deg, rgba(14,165,233,0.3), rgba(0,255,153,0.2))",
          borderRadius: "16px",
          padding: "25px 30px",
          marginBottom: "30px",
          border: "1px solid rgba(255,255,255,0.15)",
          backdropFilter: "blur(10px)",
        }}>
          <h1 style={{ color: "white", fontSize: "26px", margin: 0 }}>
            🎓 Student Learning Dashboard
          </h1>
          <p style={{ color: "rgba(255,255,255,0.7)", margin: "8px 0 0", fontSize: "14px" }}>
            Track your learning progress, take quizzes, and improve your skills!
          </p>
        </div>

        {/* Topics Section */}
        <h3 style={{ color: "white", marginBottom: "15px", fontSize: "18px" }}>
          📚 Select Topic to Learn
        </h3>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
          gap: "12px",
          marginBottom: "35px",
        }}>
          {topics.map((topic, index) => (
            <div key={index} style={{
              backgroundColor: "rgba(255,255,255,0.07)",
              borderRadius: "12px",
              border: activeTopics[topic.name]
                ? `2px solid ${topic.color}`
                : "1px solid rgba(255,255,255,0.15)",
              padding: "16px",
              display: "flex",
              flexDirection: "column",
              gap: "10px",
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <span style={{ fontSize: "24px" }}>{topic.icon}</span>
                <div>
                  <div style={{ color: "white", fontWeight: "bold", fontSize: "16px" }}>
                    {topic.name}
                  </div>
                  <div style={{ color: "rgba(255,255,255,0.5)", fontSize: "12px" }}>
                    Click to start learning
                  </div>
                </div>
                {activeTopics[topic.name] && (
                  <span style={{
                    marginLeft: "auto",
                    backgroundColor: topic.color,
                    color: "#000",
                    padding: "4px 10px",
                    borderRadius: "20px",
                    fontSize: "12px",
                    fontWeight: "bold",
                  }}>
                    ⏱ {formatTime(timers[topic.name])}
                  </span>
                )}
              </div>
              <div style={{ display: "flex", gap: "8px" }}>
                <button
                  onClick={() => handleTopicClick(topic)}
                  style={{
                    flex: 1, padding: "10px", borderRadius: "8px",
                    border: `1px solid ${topic.color}`, backgroundColor: "transparent",
                    color: topic.color, fontSize: "13px", fontWeight: "bold", cursor: "pointer",
                  }}
                >
                  📖 Study
                </button>
                <button
                  onClick={() => navigate(`/quiz/${topic.name}`)}
                  style={{
                    flex: 1, padding: "10px", borderRadius: "8px",
                    border: "none", backgroundColor: topic.color,
                    color: "#000", fontSize: "13px", fontWeight: "bold", cursor: "pointer",
                  }}
                >
                  📝 Quiz
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Analytics Section */}
        <h3 style={{ color: "white", marginBottom: "15px", fontSize: "18px" }}>
          📊 Your Learning Analytics
        </h3>

        {/* Summary Cards */}
        {analyticsData && (
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: "12px",
            marginBottom: "25px",
          }}>
            <div style={{
              backgroundColor: "rgba(14,165,233,0.2)", borderRadius: "12px",
              padding: "20px", textAlign: "center", border: "1px solid #0EA5E9",
            }}>
              <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "13px", margin: 0 }}>⏱ Avg Time Spent</p>
              <p style={{ color: "#0EA5E9", fontSize: "28px", fontWeight: "bold", margin: "8px 0 0" }}>
                {analyticsData.avg_time}s
              </p>
            </div>

            <div style={{
              backgroundColor: "rgba(0,255,153,0.15)", borderRadius: "12px",
              padding: "20px", textAlign: "center", border: "1px solid #00ff99",
            }}>
              <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "13px", margin: 0 }}>🎯 Avg Quiz Score</p>
              <p style={{ color: "#00ff99", fontSize: "28px", fontWeight: "bold", margin: "8px 0 0" }}>
                {analyticsData.avg_score}%
              </p>
            </div>

            <div style={{
              backgroundColor: "rgba(162,155,254,0.2)", borderRadius: "12px",
              padding: "20px", textAlign: "center", border: "1px solid #A29BFE",
            }}>
              <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "13px", margin: 0 }}>📚 Most Studied</p>
              <p style={{ color: "#A29BFE", fontSize: "20px", fontWeight: "bold", margin: "8px 0 0" }}>
                {analyticsData.most_studied}
              </p>
            </div>

            <div style={{
              backgroundColor: "rgba(255,107,107,0.2)", borderRadius: "12px",
              padding: "20px", textAlign: "center", border: "1px solid #ff6b6b",
            }}>
              <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "13px", margin: 0 }}>⚠️ Difficult Topics</p>
              <p style={{ color: "#ff6b6b", fontSize: "16px", fontWeight: "bold", margin: "8px 0 0" }}>
                {analyticsData.difficult_topics.length > 0
                  ? analyticsData.difficult_topics.join(", ")
                  : "None 🎉"}
              </p>
            </div>
          </div>
        )}

        {/* Bar Chart */}
        {analyticsData && analyticsData.topic_stats.length > 0 && (
          <div style={{
            backgroundColor: "rgba(255,255,255,0.07)", borderRadius: "16px",
            padding: "20px", marginBottom: "20px", border: "1px solid rgba(255,255,255,0.1)",
          }}>
            <h4 style={{ color: "white", marginBottom: "15px" }}>📊 Time Spent per Topic (seconds)</h4>
            <Bar
              data={{
                labels: analyticsData.topic_stats.map((t) => t.lesson_name),
                datasets: [{
                  label: "Time Spent (s)",
                  data: analyticsData.topic_stats.map((t) => t.total_time),
                  backgroundColor: analyticsData.topic_stats.map((t) =>
                    analyticsData.difficult_topics.includes(t.lesson_name)
                      ? "rgba(255,107,107,0.8)"
                      : "rgba(14,165,233,0.8)"
                  ),
                  borderRadius: 8,
                }],
              }}
              options={{
                responsive: true,
                plugins: { legend: { labels: { color: "white" } } },
                scales: {
                  x: { ticks: { color: "white" }, grid: { color: "rgba(255,255,255,0.1)" } },
                  y: { ticks: { color: "white" }, grid: { color: "rgba(255,255,255,0.1)" } },
                },
              }}
            />
          </div>
        )}

        {/* Line Chart */}
        {analyticsData && analyticsData.topic_stats.length > 0 && (
          <div style={{
            backgroundColor: "rgba(255,255,255,0.07)", borderRadius: "16px",
            padding: "20px", marginBottom: "20px", border: "1px solid rgba(255,255,255,0.1)",
          }}>
            <h4 style={{ color: "white", marginBottom: "15px" }}>📈 Quiz Score per Topic (%)</h4>
            <Line
              data={{
                labels: analyticsData.topic_stats.map((t) => t.lesson_name),
                datasets: [{
                  label: "Quiz Score (%)",
                  data: analyticsData.topic_stats.map((t) => t.avg_score),
                  borderColor: "#00ff99",
                  backgroundColor: "rgba(0,255,153,0.2)",
                  borderWidth: 2,
                  pointBackgroundColor: analyticsData.topic_stats.map((t) =>
                    analyticsData.difficult_topics.includes(t.lesson_name)
                      ? "#ff6b6b" : "#00ff99"
                  ),
                  pointRadius: 6,
                  tension: 0.4,
                }],
              }}
              options={{
                responsive: true,
                plugins: { legend: { labels: { color: "white" } } },
                scales: {
                  x: { ticks: { color: "white" }, grid: { color: "rgba(255,255,255,0.1)" } },
                  y: {
                    ticks: { color: "white" }, grid: { color: "rgba(255,255,255,0.1)" },
                    min: 0, max: 100,
                  },
                },
              }}
            />
          </div>
        )}

        {/* Difficult Topics */}
        {analyticsData && analyticsData.difficult_topics.length > 0 && (
          <div style={{
            backgroundColor: "rgba(255,107,107,0.15)", borderRadius: "12px",
            padding: "20px", border: "1px solid #ff6b6b", marginBottom: "20px",
          }}>
            <h4 style={{ color: "#ff6b6b", margin: "0 0 10px" }}>⚠️ Topics Need More Attention:</h4>
            {analyticsData.difficult_topics.map((topic, i) => (
              <span key={i} style={{
                display: "inline-block",
                backgroundColor: "rgba(255,107,107,0.3)",
                color: "#ff6b6b", padding: "6px 16px", borderRadius: "20px",
                marginRight: "8px", marginBottom: "8px", fontSize: "14px", fontWeight: "bold",
              }}>
                🔴 {topic}
              </span>
            ))}
          </div>
        )}

        {/* Activity Cards */}
        {activityData.length === 0 ? (
          <div style={{
            backgroundColor: "rgba(255,255,255,0.07)", borderRadius: "12px",
            padding: "30px", textAlign: "center",
          }}>
            <p style={{ color: "rgba(255,255,255,0.5)" }}>
              📭 No activity yet. Start studying!
            </p>
          </div>
        ) : (
          <div style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "12px",
          }}>
            {activityData.map((item, index) => {
              const score = parseFloat(item.quiz_score) || 0;
              const topicInfo = topics.find((t) => t.name === item.topic);
              const color = topicInfo ? topicInfo.color : "#0EA5E9";
              const isDifficult = analyticsData?.difficult_topics?.includes(item.topic);

              return (
                <div key={index} style={{
                  backgroundColor: isDifficult ? "rgba(255,107,107,0.1)" : "rgba(255,255,255,0.07)",
                  borderRadius: "12px", padding: "20px",
                  border: isDifficult ? "1px solid #ff6b6b" : `1px solid ${color}40`,
                }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "15px" }}>
                    <span style={{ fontSize: "20px" }}>{topicInfo ? topicInfo.icon : "📖"}</span>
                    <span style={{ color: "white", fontWeight: "bold", fontSize: "16px" }}>{item.topic}</span>
                    {isDifficult && (
                      <span style={{ marginLeft: "auto", color: "#ff6b6b", fontSize: "12px" }}>⚠️ Needs Work</span>
                    )}
                  </div>

                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
                    <span style={{ color: "rgba(255,255,255,0.6)", fontSize: "13px" }}>⏱ Time</span>
                    <span style={{ color: color, fontWeight: "bold", fontSize: "13px" }}>
                      {formatTime(item.time_spent)}
                    </span>
                  </div>

                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
                    <span style={{ color: "rgba(255,255,255,0.6)", fontSize: "13px" }}>🎯 Score</span>
                    <span style={{ color: score >= 60 ? "#00ff99" : "#ff6b6b", fontWeight: "bold", fontSize: "13px" }}>
                      {score > 0 ? `${score}%` : "Not taken"}
                    </span>
                  </div>

                  {score > 0 && (
                    <div style={{ backgroundColor: "rgba(255,255,255,0.1)", borderRadius: "10px", height: "6px" }}>
                      <div style={{
                        width: `${score}%`, height: "100%",
                        backgroundColor: score >= 60 ? "#00ff99" : "#ff6b6b",
                        borderRadius: "10px",
                      }} />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

export default Dashboard;