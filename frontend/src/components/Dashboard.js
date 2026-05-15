import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { Bar, Line, Pie } from "react-chartjs-2";
import Toast from "./Toast";
import ThemeToggle from "./ThemeToggle";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
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
  const [analyticsData, setAnalyticsData] = useState({ topic_stats: [], streak: 0, points: 0 });
  const [toast, setToast] = useState(null);
  const studentId = localStorage.getItem("student_id") || localStorage.getItem("user_id");
  const studentName = localStorage.getItem("student_name");

  const getThemeTextColor = () => {
    return localStorage.getItem("theme") === "light" ? "#475569" : "#94a3b8";
  };

  const showToast = (message, type) => {
    setToast({ message, type });
  };

  const formatTime = (totalSeconds) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = Math.floor(totalSeconds % 60);
    
    let result = "";
    if (hours > 0) result += `${hours}h `;
    if (minutes > 0 || hours > 0) result += `${minutes}m `;
    result += `${seconds}s`;
    return result;
  };

  const getKnowledgeLevel = (score) => {
    if (score >= 80) return "Advanced / Master";
    if (score >= 50) return "Intermediate / Proficient";
    return "Beginner / Learning";
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
    const startTime = Date.now();
    const studyWindow = window.open(topic.url, "_blank");
    sessionStorage.removeItem("current_study_content");

    showToast(`AI Tracking: Analyzing your session on ${topic.name}...`, "info");

    const checkWindow = setInterval(() => {
      if (studyWindow && studyWindow.closed) {
        clearInterval(checkWindow);
        const endTime = Date.now();
        const durationSeconds = Math.floor((endTime - startTime) / 1000);

        if (durationSeconds >= 3) {
          fetch("http://127.0.0.1:5000/api/track", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              student_id: studentId,
              topic: topic.name,
              time_spent: durationSeconds,
            }),
          }).then(() => {
            fetchData();
            showToast(`Earned 10 Points! Study session tracked for ${topic.name}.`, "success");
          });
        }
      }
    }, 1000);
  };

  const handleQuizClick = (topic) => {
    navigate(`/quiz/${topic.name}`);
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  const handleAIRecommendation = () => {
    const recommendedTopic = analyticsData?.difficult_topics?.[0] || "CSS";
    showToast(`AI Coach: Strengthening your knowledge in ${recommendedTopic}...`, "success");
    setTimeout(() => {
      navigate(`/quiz/${recommendedTopic}`);
    }, 1500);
  };

  const barOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: { 
      legend: { display: false }, 
      tooltip: { 
        backgroundColor: "#1e293b", 
        padding: 12, 
        titleFont: { size: 14 },
        callbacks: {
          label: (context) => {
            return `Time: ${formatTime(context.raw)}`;
          }
        }
      } 
    },
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
      y: { 
        min: 0, 
        max: 100,
        ticks: { color: getThemeTextColor(), font: { size: 10 }, stepSize: 20 }, 
        grid: { color: "rgba(0,0,0,0.05)" } 
      },
    },
    elements: { line: { tension: 0.4, borderColor: "var(--accent-color)" }, point: { radius: 4, backgroundColor: "var(--accent-color)" } },
  };

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "var(--bg-color)", color: "var(--text-main)" }}>
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

      {/* HEADER */}
      <div className="glass-card no-print" style={{
        display: "flex", justifyContent: "space-between", alignItems: "center",
        padding: "16px 32px", backgroundColor: "var(--nav-bg)", borderBottom: "1px solid var(--border-color)",
        position: "sticky", top: 10, zIndex: 100, margin: "10px 20px", borderRadius: "16px"
      }}>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <div style={{ width: "12px", height: "12px", borderRadius: "50%", background: "var(--accent-gradient)" }}></div>
          <span className="text-gradient" style={{ fontSize: "16px", letterSpacing: "0.15em" }}>ANALYTICA</span>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "24px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "15px", marginRight: "20px" }}>
             <div className="glass-card" style={{ padding: "6px 15px", borderRadius: "12px", fontSize: "13px", fontWeight: "700", display: "flex", alignItems: "center", gap: "8px" }}>
                <span style={{ color: "#f59e0b", fontSize: "16px" }}>●</span> {analyticsData?.streak || 0} Day Streak
             </div>
             <div className="glass-card" style={{ padding: "6px 15px", borderRadius: "12px", fontSize: "13px", fontWeight: "700", display: "flex", alignItems: "center", gap: "8px" }}>
                <span style={{ color: "#38bdf8", fontSize: "16px" }}>◆</span> {analyticsData?.points || 0} Pts
             </div>
          </div>
          <ThemeToggle />
          <span style={{ color: "var(--text-secondary)", fontSize: "13px", fontWeight: "600" }}>{studentName}</span>
          <button onClick={() => window.print()} className="glass-card" style={{ padding: "8px 16px", fontSize: "12px", fontWeight: "700", cursor: "pointer", border: "1px solid var(--accent-color)", color: "var(--accent-color)", backgroundColor: "transparent" }}>Download Report</button>
          <button onClick={handleLogout} className="premium-btn" style={{ padding: "8px 20px", fontSize: "12px" }}>Logout</button>
        </div>
      </div>

      <div className="no-print" style={{ padding: "0 20px 40px", maxWidth: "1800px", margin: "0 auto", width: "95%" }}>
        
        {/* WELCOME SECTION */}
        <div style={{ marginBottom: "40px", marginTop: "20px", display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
           <div>
              <h2 style={{ fontSize: "36px", fontWeight: "800", marginBottom: "8px" }}>Welcome back, {studentName.split(' ')[0]}!</h2>
              <p style={{ color: "var(--text-secondary)", fontSize: "16px" }}>Here's what's happening with your learning profile today.</p>
           </div>
           <div className="glass-card" style={{ padding: "12px 20px", display: "flex", alignItems: "center", gap: "12px" }}>
              <div style={{ textAlign: "right" }}>
                 <div style={{ fontSize: "10px", fontWeight: "800", color: "var(--text-muted)", textTransform: "uppercase" }}>Current Goal</div>
                 <div style={{ fontSize: "13px", fontWeight: "700" }}>30m Study / Day</div>
              </div>
              <div style={{ width: "40px", height: "40px", borderRadius: "50%", border: "3px solid var(--accent-color)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "11px", fontWeight: "800" }}>
                 45%
              </div>
           </div>
        </div>

        {/* TOP SECTION: CHARTS (GRID OF 3) */}
        <div style={{ display: "flex", flexDirection: "column", gap: "32px", marginBottom: "48px" }}>
          
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(400px, 1fr))", gap: "24px" }}>
            
            {/* LINE CHART: MONTHLY TIME SPENT */}
            <div className="glass-card animate-fade-in" style={{ padding: "28px" }}>
              <div style={{ marginBottom: "24px" }}>
                <h4 style={{ fontSize: "14px", fontWeight: "800", textTransform: "uppercase", color: "var(--accent-color)", letterSpacing: "0.1em" }}>Study Consistency</h4>
                <p style={{ fontSize: "12px", color: "var(--text-muted)" }}>Monthly time spent learning</p>
              </div>
              <div style={{ height: "300px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                {analyticsData?.time_trend?.length > 0 ? (
                  <Line 
                    data={{
                      labels: analyticsData?.time_trend?.map(t => t.date) || [],
                      datasets: [{
                        label: 'Time Spent (sec)',
                        data: analyticsData?.time_trend?.map(t => t.time_spent) || [],
                        borderColor: "rgba(56, 189, 248, 1)",
                        backgroundColor: "rgba(56, 189, 248, 0.1)",
                        fill: true,
                        borderWidth: 3,
                        tension: 0.4,
                      }]
                    }} 
                    options={lineOptions} 
                  />
                ) : (
                  <div style={{ textAlign: "center", color: "var(--text-muted)", fontSize: "13px" }}>
                     <div style={{ fontSize: "24px", marginBottom: "8px" }}>📅</div>
                     Keep studying to build your timeline
                  </div>
                )}
              </div>
            </div>

            {/* BAR CHART: QUIZ PERFORMANCE */}
            <div className="glass-card animate-fade-in" style={{ padding: "28px", animationDelay: "0.2s" }}>
              <div style={{ marginBottom: "24px" }}>
                <h4 style={{ fontSize: "14px", fontWeight: "800", textTransform: "uppercase", color: "#10b981", letterSpacing: "0.1em" }}>Quiz Performance</h4>
                <p style={{ fontSize: "12px", color: "var(--text-muted)" }}>Average score per course</p>
              </div>
              <div style={{ height: "300px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                {analyticsData?.topic_stats?.length > 0 ? (
                  <Bar 
                    data={{
                      labels: analyticsData?.topic_stats?.map(t => t.lesson_name) || [],
                      datasets: [{
                        data: analyticsData?.topic_stats?.map(t => t.avg_score) || [],
                        backgroundColor: "rgba(16, 185, 129, 0.6)",
                        hoverBackgroundColor: "rgba(16, 185, 129, 0.9)",
                        borderRadius: 6,
                      }]
                    }} 
                    options={{
                        ...barOptions,
                        scales: {
                            ...barOptions.scales,
                            y: { ...barOptions.scales.y, max: 100 }
                        }
                    }} 
                  />
                ) : (
                  <div style={{ textAlign: "center", color: "var(--text-muted)", fontSize: "13px" }}>
                     <div style={{ fontSize: "24px", marginBottom: "8px" }}>📊</div>
                     Complete a quiz to see your performance
                  </div>
                )}
              </div>
            </div>

            {/* PIE CHART: TIME DISTRIBUTION */}
            <div className="glass-card animate-fade-in" style={{ padding: "28px", animationDelay: "0.4s" }}>
              <div style={{ marginBottom: "24px" }}>
                <h4 style={{ fontSize: "14px", fontWeight: "800", textTransform: "uppercase", color: "#f59e0b", letterSpacing: "0.1em" }}>Time Distribution</h4>
                <p style={{ fontSize: "12px", color: "var(--text-muted)" }}>Course study time breakdown</p>
              </div>
              <div style={{ height: "300px", display: "flex", alignItems: "center", justifyContent: "center" }}>
                {analyticsData?.topic_stats?.length > 0 ? (
                  <Pie 
                    data={{
                      labels: analyticsData?.topic_stats?.map(t => t.lesson_name) || [],
                      datasets: [{
                        data: analyticsData?.topic_stats?.map(t => t.total_time) || [],
                        backgroundColor: [
                          '#38bdf8', '#10b981', '#f59e0b', '#8b5cf6', '#ef4444', 
                          '#06b6d4', '#f43f5e', '#84cc16', '#a855f7', '#0284c7'
                        ],
                        borderWidth: 0,
                      }]
                    }} 
                    options={{
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                            legend: {
                                position: 'right',
                                labels: { color: getThemeTextColor(), font: { size: 10 } }
                            }
                        }
                    }} 
                  />
                ) : (
                  <div style={{ textAlign: "center", color: "var(--text-muted)", fontSize: "13px" }}>
                     <div style={{ fontSize: "24px", marginBottom: "8px" }}>🥧</div>
                     Study topics to see your time breakdown
                  </div>
                )}
              </div>
            </div>

          </div>

          {/* ROW 2: COACH & INSIGHTS (HORIZONTAL) */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(350px, 1fr))", gap: "24px" }}>
             
             {/* AI COACH CARD */}
             <div className="glass-card animate-fade-in" style={{ padding: "24px", background: "linear-gradient(135deg, rgba(59, 130, 246, 0.1), rgba(139, 92, 246, 0.1))", border: "1px solid rgba(139, 92, 246, 0.2)", height: "100%" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "20px" }}>
                   <div style={{ display: "flex", alignItems: "center", justifyContent: "center", color: "var(--accent-color)" }}>
                      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="11" width="18" height="10" rx="2"></rect><circle cx="12" cy="5" r="2"></circle><path d="M12 7v4"></path><line x1="8" y1="16" x2="8" y2="16"></line><line x1="16" y1="16" x2="16" y2="16"></line></svg>
                   </div>
                   <h4 style={{ fontSize: "18px", fontWeight: "800" }}>AI Personal Coach</h4>
                </div>
                <p style={{ fontSize: "15px", color: "var(--text-main)", lineHeight: "1.6", marginBottom: "20px" }}>
                   "Based on your <b>{analyticsData?.most_studied || 'recent'}</b> activity, you're making great progress!
                   I recommend taking a quiz in <b>{analyticsData?.difficult_topics?.[0] || 'CSS'}</b> to strengthen your weak areas."
                </p>
                <button onClick={handleAIRecommendation} className="premium-btn" style={{ width: "100%", padding: "12px", fontSize: "14px" }}>Get AI Recommendations</button>
             </div>

             {/* STATS BREAKDOWN */}
             <div className="glass-card animate-fade-in" style={{ padding: "24px", animationDelay: "0.2s", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center" }}>
                <h4 style={{ fontSize: "14px", fontWeight: "800", marginBottom: "20px" }}>Quick Insights</h4>
                <div style={{ display: "grid", gap: "16px" }}>
                   {[
                     { label: "Focus Intensity", value: "High", color: "#10b981" },
                     { label: "Retention Rate", value: "84%", color: "#3b82f6" },
                     { label: "Consistency", value: "9/10", color: "#f59e0b" }
                   ].map((stat, i) => (
                     <div key={i} style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <span style={{ fontSize: "14px", color: "var(--text-secondary)" }}>{stat.label}</span>
                        <span style={{ fontSize: "15px", fontWeight: "700", color: stat.color }}>{stat.value}</span>
                     </div>
                   ))}
                </div>
             </div>

             {/* RECENT BADGES */}
             <div className="glass-card animate-fade-in" style={{ padding: "24px", animationDelay: "0.4s", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center" }}>
                <h4 style={{ fontSize: "14px", fontWeight: "800", marginBottom: "20px" }}>Achievements</h4>
                <div style={{ display: "flex", gap: "12px", justifyContent: "center" }}>
                   <div title="Fast Learner" style={{ width: "60px", height: "60px", borderRadius: "16px", backgroundColor: "rgba(245, 158, 11, 0.1)", display: "flex", alignItems: "center", justifyContent: "center", border: "1px solid rgba(245, 158, 11, 0.2)" }}>
                      <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon></svg>
                   </div>
                   <div title="Night Owl" style={{ width: "60px", height: "60px", borderRadius: "16px", backgroundColor: "rgba(139, 92, 246, 0.1)", display: "flex", alignItems: "center", justifyContent: "center", border: "1px solid rgba(139, 92, 246, 0.2)" }}>
                      <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#8b5cf6" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
                   </div>
                   <div title="Streak Master" style={{ width: "60px", height: "60px", borderRadius: "16px", backgroundColor: "rgba(59, 130, 246, 0.1)", display: "flex", alignItems: "center", justifyContent: "center", border: "1px solid rgba(59, 130, 246, 0.2)" }}>
                      <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M6 9H4.5a2.5 2.5 0 0 1 0-5H6"></path><path d="M18 9h1.5a2.5 2.5 0 0 0 0-5H18"></path><path d="M4 22h16"></path><path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22"></path><path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22"></path><path d="M18 2H6v7a6 6 0 0 0 12 0V2z"></path></svg>
                   </div>
                </div>
             </div>
          </div>
        </div>
        {/* END FLEX ROW */}

        {/* METRICS ROW */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "24px", marginBottom: "48px" }}>
          <div className="glass-card animate-fade-in" style={{ padding: "24px", borderLeftWidth: "4px", borderLeftStyle: "solid", borderLeftColor: "var(--accent-color)", animationDelay: "0.3s" }}>
            <span style={{ fontSize: "12px", color: "var(--text-muted)", fontWeight: "700", textTransform: "uppercase" }}>Mastery Score</span>
            <h2 style={{ fontSize: "32px", fontWeight: "800", marginTop: "8px" }}>{analyticsData?.avg_score || 0}%</h2>
          </div>
          <div className="glass-card animate-fade-in" style={{ padding: "24px", borderLeftWidth: "4px", borderLeftStyle: "solid", borderLeftColor: "#2dd4bf", animationDelay: "0.35s" }}>
            <span style={{ fontSize: "12px", color: "var(--text-muted)", fontWeight: "700", textTransform: "uppercase" }}>Learning Efficiency</span>
            <h2 style={{ fontSize: "32px", fontWeight: "800", marginTop: "8px" }}>{analyticsData?.overall_efficiency || 0} pts/m</h2>
          </div>
          <div className="glass-card animate-fade-in" style={{ padding: "24px", borderLeftWidth: "4px", borderLeftStyle: "solid", borderLeftColor: "#f59e0b", animationDelay: "0.4s" }}>
            <span style={{ fontSize: "12px", color: "var(--text-muted)", fontWeight: "700", textTransform: "uppercase" }}>Engagement Level</span>
            <h2 style={{ fontSize: "32px", fontWeight: "800", marginTop: "8px" }}>{analyticsData?.engagement_level || "Analyzing..."}</h2>
          </div>
          <div className="glass-card animate-fade-in" style={{ padding: "24px", borderLeftWidth: "4px", borderLeftStyle: "solid", borderLeftColor: "#a855f7", animationDelay: "0.45s" }}>
            <span style={{ fontSize: "12px", color: "var(--text-muted)", fontWeight: "700", textTransform: "uppercase" }}>Dominant Skill</span>
            <h2 style={{ fontSize: "26px", fontWeight: "800", marginTop: "8px" }}>{analyticsData?.most_studied || "N/A"}</h2>
          </div>
        </div>

        {/* OVERALL PROGRESS */}
        <div className="glass-card animate-fade-in" style={{ padding: "32px", marginBottom: "48px", animationDelay: "0.5s" }}>
           <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
              <div>
                 <h3 style={{ fontSize: "18px", fontWeight: "800" }}>Your Learning Journey</h3>
                 <p style={{ fontSize: "13px", color: "var(--text-secondary)" }}>Overall mastery across all enrolled modules</p>
              </div>
              <div style={{ fontSize: "24px", fontWeight: "800", color: "var(--accent-color)" }}>{analyticsData?.avg_score || 0}%</div>
           </div>
           <div style={{ width: "100%", height: "8px", backgroundColor: "var(--input-bg)", borderRadius: "4px", overflow: "hidden" }}>
              <div style={{ width: `${analyticsData?.avg_score || 0}%`, height: "100%", background: "var(--accent-gradient)", transition: "width 1s ease-out" }}></div>
           </div>
        </div>

        {/* BOTTOM SECTION: PATHS & MODULES (FULL WIDTH) */}
        <div style={{ marginTop: "40px" }}>
        
        {/* CURATED PATHS */}
        <h3 style={{ fontSize: "22px", fontWeight: "800", marginBottom: "24px", color: "var(--text-main)" }}>Curated Learning Paths</h3>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "24px", marginBottom: "60px" }}>
           {[
             { name: "Frontend Architecture", icon: "🌐", items: ["HTML", "CSS", "JavaScript", "React", "Bootstrap", "TypeScript"], color: "#3b82f6" },
             { name: "Backend & Systems", icon: "⚙️", items: ["Python", "Node.js", "Java", "C", "C++", "C#", "SQL", "PostgreSQL"], color: "#10b981" },
             { name: "Data Science & AI", icon: "🧠", items: ["Python", "NumPy", "Pandas", "AI", "Gen AI", "MySQL", "R"], color: "#8b5cf6" }
           ].map((path, idx) => (
             <div key={idx} className="glass-card animate-fade-in" style={{ padding: "28px", borderTop: `4px solid ${path.color}`, animationDelay: `${0.6 + (idx * 0.1)}s` }}>
                <div style={{ fontSize: "32px", marginBottom: "16px" }}>{path.icon}</div>
                <h4 style={{ fontSize: "18px", fontWeight: "800", marginBottom: "8px" }}>{path.name}</h4>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginTop: "16px" }}>
                   {path.items.map(item => (
                     <span key={item} onClick={() => {
                        const t = topics.find(tp => tp.name === item);
                        if (t) navigate(`/topic/${t.name}`);
                     }} style={{ padding: "4px 10px", backgroundColor: "var(--input-bg)", borderRadius: "6px", fontSize: "11px", fontWeight: "700", cursor: "pointer", border: "1px solid var(--border-color)" }}>
                        {item}
                     </span>
                   ))}
                </div>
             </div>
           ))}
        </div>

        {/* ALERTS SECTION */}
        {analyticsData?.difficult_topics?.length > 0 && (
          <div style={{ marginBottom: "48px", padding: "24px", backgroundColor: "rgba(239, 68, 68, 0.05)", borderRadius: "16px", border: "1px solid rgba(239, 68, 68, 0.2)" }}>
             <h4 style={{ color: "#ef4444", fontSize: "14px", fontWeight: "800", marginBottom: "12px", display: "flex", alignItems: "center", gap: "8px" }}>
                <span style={{ fontSize: "18px" }}>▲</span> ACTION REQUIRED: PERFORMANCE STRUGGLE DETECTED
             </h4>
             <p style={{ fontSize: "13px", color: "var(--text-secondary)", marginBottom: "16px" }}>The following areas show high study time but low retention. We recommend re-visiting the theory or taking a targeted AI quiz.</p>
             <div style={{ display: "flex", gap: "8px" }}>
                {analyticsData.difficult_topics.map(t => (
                  <span key={t} style={{ padding: "6px 14px", backgroundColor: "#ef4444", color: "white", borderRadius: "8px", fontSize: "11px", fontWeight: "700" }}>{t}</span>
                ))}
             </div>
          </div>
        )}

        {/* TOPICS GRID */}
        <div style={{ marginBottom: "32px", marginTop: "60px", display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
          <h3 style={{ fontSize: "22px", fontWeight: "800" }}>Explore All Modules</h3>
          <span style={{ fontSize: "12px", color: "var(--text-muted)" }}>{topics.length} specialized modules available</span>
        </div>

        <div style={{
          display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))", gap: "16px",
        }}>
          {topics.map((topic, index) => {
            const stats = analyticsData?.topic_stats?.find(s => s.lesson_name === topic.name);
            let statusColor = "var(--text-muted)";
            if (stats?.status === "Mastering") statusColor = "#2dd4bf";
            if (stats?.status === "Struggling") statusColor = "#ef4444";

            return (
              <div key={index} className="glass-card animate-fade-in" style={{
                padding: "20px",
                display: "flex", flexDirection: "column", gap: "16px",
                position: "relative", overflow: "hidden",
                animationDelay: `${0.4 + (index * 0.05)}s`
              }}>
                {stats && (
                    <div style={{ position: "absolute", top: 0, right: 0, padding: "4px 10px", backgroundColor: statusColor, color: "#fff", fontSize: "9px", fontWeight: "900", textTransform: "uppercase" }}>
                        {stats.status}
                    </div>
                )}
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
            );
          })}
        </div>
      </div>
      </div>
      {/* END no-print wrapper */}

      {/* FLOATING STUDY TIMER */}
      <div className="glass-card no-print" style={{ 
        position: "fixed", bottom: "30px", right: "30px", 
        padding: "12px 24px", display: "flex", alignItems: "center", gap: "12px",
        boxShadow: "0 10px 30px rgba(0,0,0,0.2)", border: "1px solid var(--accent-color)",
        zIndex: 1000
      }}>
         <div style={{ width: "10px", height: "10px", borderRadius: "50%", backgroundColor: "var(--accent-secondary)", animation: "pulse 2s infinite" }}></div>
         <span style={{ fontSize: "12px", fontWeight: "800", letterSpacing: "0.05em" }}>SESSION ACTIVE</span>
      </div>
      {/* HIDDEN PRINT-ONLY REPORT */}
      <div id="printable-report" className="print-only">
        <div style={{ textAlign: "center", marginBottom: "40px", borderBottom: "2px solid #333", paddingBottom: "20px" }}>
           <h1 style={{ fontSize: "28px", margin: "0 0 10px 0", color: "#333" }}>LEARNING BEHAVIOUR ANALYTICS REPORT</h1>
           <p style={{ fontSize: "16px", color: "#666" }}>Student: <b>{studentName}</b> | Date: {new Date().toLocaleDateString()}</p>
        </div>

        <div style={{ display: "flex", gap: "20px", marginBottom: "40px" }}>
           <div style={{ flex: 1, padding: "20px", border: "1px solid #ddd", borderRadius: "8px" }}>
              <div style={{ fontSize: "12px", color: "#666", textTransform: "uppercase" }}>Overall Mastery</div>
              <div style={{ fontSize: "24px", fontWeight: "bold", color: "#333" }}>{analyticsData?.avg_score || 0}%</div>
           </div>
           <div style={{ flex: 1, padding: "20px", border: "1px solid #ddd", borderRadius: "8px" }}>
              <div style={{ fontSize: "12px", color: "#666", textTransform: "uppercase" }}>Knowledge Level</div>
              <div style={{ fontSize: "20px", fontWeight: "bold", color: "#333" }}>{getKnowledgeLevel(analyticsData?.avg_score || 0)}</div>
           </div>
           <div style={{ flex: 1, padding: "20px", border: "1px solid #ddd", borderRadius: "8px" }}>
              <div style={{ fontSize: "12px", color: "#666", textTransform: "uppercase" }}>Study Streak</div>
              <div style={{ fontSize: "24px", fontWeight: "bold", color: "#333" }}>{analyticsData?.streak || 0} Days</div>
           </div>
        </div>

        <h3 style={{ borderBottom: "1px solid #eee", paddingBottom: "10px", marginBottom: "20px", color: "#333" }}>Module Activity Breakdown</h3>
        <table style={{ width: "100%", borderCollapse: "collapse", marginBottom: "40px" }}>
           <thead>
              <tr style={{ backgroundColor: "#f9f9f9" }}>
                 <th style={{ textAlign: "left", padding: "12px", borderBottom: "2px solid #ddd", color: "#333" }}>Topic Name</th>
                 <th style={{ textAlign: "center", padding: "12px", borderBottom: "2px solid #ddd", color: "#333" }}>Time Spent</th>
                 <th style={{ textAlign: "center", padding: "12px", borderBottom: "2px solid #ddd", color: "#333" }}>Quiz Score</th>
                 <th style={{ textAlign: "right", padding: "12px", borderBottom: "2px solid #ddd", color: "#333" }}>Status</th>
              </tr>
           </thead>
           <tbody>
              {analyticsData?.topic_stats?.map((topic, i) => (
                <tr key={i}>
                   <td style={{ padding: "12px", borderBottom: "1px solid #eee", color: "#444" }}>{topic.lesson_name}</td>
                   <td style={{ padding: "12px", borderBottom: "1px solid #eee", textAlign: "center", color: "#444" }}>{formatTime(topic.total_time)}</td>
                   <td style={{ padding: "12px", borderBottom: "1px solid #eee", textAlign: "center", color: "#444" }}>{topic.avg_score}%</td>
                   <td style={{ padding: "12px", borderBottom: "1px solid #eee", textAlign: "right", fontWeight: "bold", color: "#333" }}>{topic.status}</td>
                </tr>
              ))}
           </tbody>
        </table>

        <h3 style={{ borderBottom: "1px solid #eee", paddingBottom: "10px", marginBottom: "20px", color: "#333" }}>AI Learning Recommendations</h3>
        <div style={{ padding: "20px", backgroundColor: "#f4f7ff", borderRadius: "8px", borderLeft: "4px solid #3b82f6" }}>
           <p style={{ margin: 0, lineHeight: "1.6", color: "#333" }}>
              Based on the analytics, the student shows strong proficiency in <b>{analyticsData?.most_studied || "General Subjects"}</b>. 
              {analyticsData?.difficult_topics?.length > 0 ? (
                <> To reach the next level, focus should be shifted towards <b>{analyticsData.difficult_topics.join(", ")}</b> where retention scores are currently lower than average.</>
              ) : (
                <> Consistency is excellent. Recommend exploring more advanced topics to further challenge the knowledge base.</>
              )}
           </p>
        </div>

        <div style={{ marginTop: "60px", textAlign: "center", fontSize: "12px", color: "#999" }}>
           Report generated automatically by Learning Behaviour Analytics Platform.
        </div>
      </div>

      <style>{`
        @keyframes pulse {
          0% { transform: scale(0.95); opacity: 0.5; }
          50% { transform: scale(1.05); opacity: 1; }
          100% { transform: scale(0.95); opacity: 0.5; }
        }
        .print-only { display: none; }
        @media print {
           .print-only { display: block !important; }
           .no-print { display: none !important; }
           body { background: white !important; }
           * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
        }
      `}</style>
    </div>
  );
}

export default Dashboard;
