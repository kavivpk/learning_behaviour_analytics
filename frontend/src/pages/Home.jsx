// import React from "react";
// import { useNavigate } from "react-router-dom";

// function Home() {
//   const navigate = useNavigate();

//   return (
//     <div style={{ minHeight: "100vh", color: "white" }}>

//       {/* Navbar */}
//       <div style={{
//         display: "flex",
//         justifyContent: "space-between",
//         alignItems: "center",
//         padding: "15px 40px",
//         backgroundColor: "rgba(0,0,0,0.3)",
//         backdropFilter: "blur(10px)",
//         borderBottom: "1px solid rgba(255,255,255,0.1)",
//       }}>
//         <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
//           <span style={{ fontSize: "24px" }}>📊</span>
//           <span style={{ fontSize: "18px", fontWeight: "bold" }}>Learning Analytics</span>
//         </div>
//         <div style={{ display: "flex", gap: "10px" }}>
//           <button onClick={() => navigate("/login")} style={{
//             padding: "8px 24px", borderRadius: "20px",
//             border: "1px solid white", backgroundColor: "transparent",
//             color: "white", cursor: "pointer", fontSize: "14px",
//           }}>
//             Login
//           </button>
//           <button onClick={() => navigate("/register")} style={{
//             padding: "8px 24px", borderRadius: "20px",
//             border: "none", backgroundColor: "#0EA5E9",
//             color: "white", cursor: "pointer", fontSize: "14px", fontWeight: "bold",
//           }}>
//             Register
//           </button>
//         </div>
//       </div>

//       {/* Hero Section */}
//       <div style={{ textAlign: "center", padding: "80px 40px 50px" }}>
//         <div style={{
//           display: "inline-block",
//           backgroundColor: "rgba(14,165,233,0.2)",
//           border: "1px solid #0EA5E9",
//           borderRadius: "20px",
//           padding: "6px 20px",
//           fontSize: "13px",
//           color: "#0EA5E9",
//           marginBottom: "20px",
//         }}>
//           Smart Learning Platform
//         </div>

//         <h1 style={{
//           fontSize: "42px", fontWeight: "bold",
//           lineHeight: "1.3", marginBottom: "20px",
//           maxWidth: "700px", margin: "0 auto 20px",
//         }}>
//           Web-Based Learning Behaviour<br />
//           <span style={{ color: "#0EA5E9" }}>Data Analytics</span> System
//         </h1>

//         <p style={{
//           fontSize: "16px", color: "rgba(255,255,255,0.7)",
//           maxWidth: "500px", margin: "0 auto 40px", lineHeight: "1.7",
//         }}>
//           Track your learning progress, analyze study patterns,
//           take quizzes and improve your academic performance with
//           data-driven insights.
//         </p>

//         <div style={{ display: "flex", gap: "15px", justifyContent: "center", marginBottom: "60px" }}>
//           <button onClick={() => navigate("/register")} style={{
//             padding: "14px 40px", borderRadius: "50px",
//             border: "none", backgroundColor: "#0EA5E9",
//             color: "white", fontSize: "16px", fontWeight: "bold",
//             cursor: "pointer",
//           }}>
//             Get Started
//           </button>
//           <button onClick={() => navigate("/login")} style={{
//             padding: "14px 40px", borderRadius: "50px",
//             border: "2px solid white", backgroundColor: "transparent",
//             color: "white", fontSize: "16px", cursor: "pointer",
//           }}>
//             Login
//           </button>
//         </div>
//       </div>

//       {/* Features Section */}
//       <div style={{ padding: "0 40px 60px" }}>
//         <h2 style={{ textAlign: "center", marginBottom: "30px", fontSize: "24px" }}>
//           ✨ Key Features
//         </h2>

//         <div style={{
//           display: "grid",
//           gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
//           gap: "20px",
//           maxWidth: "1000px",
//           margin: "0 auto",
//         }}>
//           {[
//             // { icon: "⏱", title: "Time Tracking", desc: "Track time spent on each topic automatically", color: "#0EA5E9" },
//             // { icon: "📝", title: "Quiz System", desc: "Test your knowledge with topic-wise quizzes", color: "#00ff99" },
//             // { icon: "📊", title: "Analytics Charts", desc: "Visual charts showing your learning patterns", color: "#A29BFE" },
//             // { icon: "🔴", title: "Difficulty Alert", desc: "Identifies topics where you need more focus", color: "#ff6b6b" },
//             // { icon: "📚", title: "45+ Topics", desc: "Learn from HTML to AI with W3Schools content", color: "#FFD43B" },
//             // { icon: "🎯", title: "Score Analysis", desc: "Track quiz scores and monitor improvement", color: "#FD79A8" },
            
//             // Emoji replace pannu
// { icon: <i className="bi bi-clock-fill"></i>, title: "Time Tracking", ... },
// { icon: <i className="bi bi-pencil-fill"></i>, title: "Quiz System", ... },
// { icon: <i className="bi bi-bar-chart-fill"></i>, title: "Analytics", ... },
//           ].map((feature, i) => (
//             <div key={i} style={{
//               backgroundColor: "rgba(255,255,255,0.07)",
//               borderRadius: "16px",
//               padding: "25px 20px",
//               textAlign: "center",
//               border: `1px solid ${feature.color}40`,
//               backdropFilter: "blur(10px)",

//             }}>
//               <div style={{ fontSize: "36px", marginBottom: "12px" }}>{feature.icon}</div>
//               <h3 style={{ color: feature.color, fontSize: "16px", marginBottom: "8px" }}>
//                 {feature.title}
//               </h3>
//               <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "13px", lineHeight: "1.6" }}>
//                 {feature.desc}
//               </p>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Stats Section */}
//       <div style={{
//         backgroundColor: "rgba(0,0,0,0.3)",
//         padding: "40px",
//         textAlign: "center",
//         borderTop: "1px solid rgba(255,255,255,0.1)",
//       }}>
//         <div style={{
//           display: "flex",
//           justifyContent: "center",
//           gap: "60px",
//           flexWrap: "wrap",
//         }}>
//           {[
//             { number: "45+", label: "Topics Available" },
//             { number: "200+", label: "Quiz Questions" },
//             { number: "100%", label: "Free to Use" },
//             { number: "24/7", label: "Available" },
//           ].map((stat, i) => (
//             <div key={i}>
//               <p style={{ fontSize: "36px", fontWeight: "bold", color: "#0EA5E9", margin: 0 }}>
//                 {stat.number}
//               </p>
//               <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "14px", margin: "5px 0 0" }}>
//                 {stat.label}
//               </p>
//             </div>
//           ))}
//         </div>
//       </div>

//       {/* Footer */}
//       <div style={{
//         textAlign: "center",
//         padding: "20px",
//         color: "rgba(255,255,255,0.4)",
//         fontSize: "13px",
//         borderTop: "1px solid rgba(255,255,255,0.1)",
//       }}>
//         © 2026 Web-Based Learning Behaviour Data Analytics System
//       </div>

//     </div>
//   );
// }

// export default Home;













import React from "react";
import { useNavigate } from "react-router-dom";
import 'bootstrap-icons/font/bootstrap-icons.css';

function Home() {
  const navigate = useNavigate();

  return (
    <div style={{ minHeight: "100vh", color: "white" }}>

      {/* Navbar */}
      <div style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "15px 40px",
        backgroundColor: "rgba(0,0,0,0.3)",
        backdropFilter: "blur(10px)",
        borderBottom: "1px solid rgba(255,255,255,0.1)",
        position: "sticky",
        top: 0,
        zIndex: 100,
      }}>
        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <i className="bi bi-graph-up-arrow" style={{ fontSize: "24px", color: "#0EA5E9" }}></i>
          <span style={{ fontSize: "18px", fontWeight: "bold" }}>Learning Analytics</span>
        </div>

        {/* Nav Buttons */}
        <div style={{ display: "flex", gap: "10px" }}>
          <button onClick={() => navigate("/login")} style={{
            padding: "8px 24px", borderRadius: "20px",
            border: "1px solid white", backgroundColor: "transparent",
            color: "white", cursor: "pointer", fontSize: "14px",
            display: "flex", alignItems: "center", gap: "6px",
          }}>
            <i className="bi bi-box-arrow-in-right"></i> Login
          </button>
          <button onClick={() => navigate("/register")} style={{
            padding: "8px 24px", borderRadius: "20px",
            border: "none", backgroundColor: "#0EA5E9",
            color: "white", cursor: "pointer", fontSize: "14px",
            fontWeight: "bold", display: "flex", alignItems: "center", gap: "6px",
          }}>
            <i className="bi bi-person-plus-fill"></i> Register
          </button>
        </div>
      </div>

      {/* Hero Section */}
      <div style={{ textAlign: "center", padding: "80px 40px 50px" }}>

        {/* Badge */}
        <div style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "6px",
          backgroundColor: "rgba(14,165,233,0.2)",
          border: "1px solid #0EA5E9",
          borderRadius: "20px",
          padding: "6px 20px",
          fontSize: "13px",
          color: "#0EA5E9",
          marginBottom: "25px",
        }}>
          <i className="bi bi-rocket-takeoff-fill"></i>
          Smart Learning Platform
        </div>

        {/* Title */}
        <h1 style={{
          fontSize: "42px", fontWeight: "bold",
          lineHeight: "1.3", marginBottom: "20px",
          maxWidth: "700px", margin: "0 auto 20px",
        }}>
          Web-Based Learning Behaviour <br />
          <span style={{ color: "#0EA5E9" }}>Data Analytics</span> System
        </h1>

        {/* Subtitle */}
        <p style={{
          fontSize: "16px", color: "rgba(255,255,255,0.7)",
          maxWidth: "520px", margin: "0 auto 40px", lineHeight: "1.8",
        }}>
          Track your learning progress, analyze study patterns,
          take quizzes and improve your academic performance
          with data-driven insights.
        </p>

        {/* CTA Buttons */}
        <div style={{ display: "flex", gap: "15px", justifyContent: "center", marginBottom: "70px" }}>
          <button onClick={() => navigate("/register")} style={{
            padding: "14px 40px", borderRadius: "50px",
            border: "none", backgroundColor: "#0EA5E9",
            color: "white", fontSize: "16px", fontWeight: "bold",
            cursor: "pointer", display: "flex", alignItems: "center", gap: "8px",
          }}>
            <i className="bi bi-rocket-takeoff-fill"></i> Get Started
          </button>
          <button onClick={() => navigate("/login")} style={{
            padding: "14px 40px", borderRadius: "50px",
            border: "2px solid white", backgroundColor: "transparent",
            color: "white", fontSize: "16px", cursor: "pointer",
            display: "flex", alignItems: "center", gap: "8px",
          }}>
            <i className="bi bi-box-arrow-in-right"></i> Login
          </button>
        </div>

        {/* Hero Stats Row */}
        <div style={{
          display: "flex",
          justifyContent: "center",
          gap: "40px",
          flexWrap: "wrap",
          marginBottom: "70px",
        }}>
          {[
            { icon: "bi-book-fill", number: "45+", label: "Topics", color: "#0EA5E9" },
            { icon: "bi-patch-question-fill", number: "200+", label: "Quiz Questions", color: "#00ff99" },
            { icon: "bi-people-fill", number: "100%", label: "Free to Use", color: "#A29BFE" },
            { icon: "bi-lightning-charge-fill", number: "24/7", label: "Available", color: "#FFD43B" },
          ].map((stat, i) => (
            <div key={i} style={{
              textAlign: "center",
              backgroundColor: "rgba(255,255,255,0.07)",
              borderRadius: "16px",
              padding: "20px 30px",
              border: `1px solid ${stat.color}40`,
              minWidth: "130px",
            }}>
              <i className={`bi ${stat.icon}`} style={{ fontSize: "28px", color: stat.color }}></i>
              <p style={{ fontSize: "28px", fontWeight: "bold", color: stat.color, margin: "8px 0 4px" }}>
                {stat.number}
              </p>
              <p style={{ color: "rgba(255,255,255,0.6)", fontSize: "13px", margin: 0 }}>
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Features Section */}
      <div style={{
        padding: "20px 40px 60px",
        backgroundColor: "rgba(0,0,0,0.2)",
        borderTop: "1px solid rgba(255,255,255,0.08)",
      }}>
        <h2 style={{ textAlign: "center", marginBottom: "10px", fontSize: "26px" }}>
          ✨ Key Features
        </h2>
        <p style={{
          textAlign: "center", color: "rgba(255,255,255,0.5)",
          marginBottom: "35px", fontSize: "14px",
        }}>
          Everything you need to improve your learning
        </p>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "20px",
          maxWidth: "1100px",
          margin: "0 auto",
        }}>
          {[
            { icon: "bi-clock-fill", title: "Time Tracking", desc: "Automatically tracks time spent on each topic and session", color: "#0EA5E9" },
            { icon: "bi-pencil-square", title: "Quiz System", desc: "Topic-wise quizzes to test and evaluate your knowledge", color: "#00ff99" },
            { icon: "bi-bar-chart-fill", title: "Bar Charts", desc: "Visual bar charts showing time spent per topic clearly", color: "#A29BFE" },
            { icon: "bi-graph-up", title: "Line Graphs", desc: "Track quiz score progress with smooth line graphs", color: "#FFD43B" },
            { icon: "bi-exclamation-triangle-fill", title: "Difficulty Alert", desc: "Identifies topics that need more attention and focus", color: "#ff6b6b" },
            { icon: "bi-trophy-fill", title: "Score Analysis", desc: "Detailed quiz score analysis with pass/fail indicators", color: "#FD79A8" },
            { icon: "bi-shield-check", title: "Secure Login", desc: "Safe registration and login system for each student", color: "#00ADB5" },
            { icon: "bi-globe", title: "45+ Languages", desc: "From HTML to AI — all major programming languages covered", color: "#F29111" },
          ].map((feature, i) => (
            <div key={i} style={{
              backgroundColor: "rgba(255,255,255,0.06)",
              borderRadius: "16px",
              padding: "25px 20px",
              textAlign: "center",
              border: `1px solid ${feature.color}30`,
              backdropFilter: "blur(10px)",
              transition: "transform 0.2s",
            }}>
              <div style={{
                width: "55px", height: "55px",
                backgroundColor: `${feature.color}20`,
                borderRadius: "50%",
                display: "flex", alignItems: "center", justifyContent: "center",
                margin: "0 auto 15px",
                border: `1px solid ${feature.color}40`,
              }}>
                <i className={`bi ${feature.icon}`} style={{ fontSize: "22px", color: feature.color }}></i>
              </div>
              <h3 style={{ color: "white", fontSize: "15px", marginBottom: "8px" }}>
                {feature.title}
              </h3>
              <p style={{ color: "rgba(255,255,255,0.55)", fontSize: "13px", lineHeight: "1.6", margin: 0 }}>
                {feature.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* How it works Section */}
      <div style={{ padding: "50px 40px", textAlign: "center" }}>
        <h2 style={{ fontSize: "26px", marginBottom: "10px" }}>
          🔄 How It Works
        </h2>
        <p style={{ color: "rgba(255,255,255,0.5)", marginBottom: "40px", fontSize: "14px" }}>
          Simple 4 steps to start learning
        </p>

        <div style={{
          display: "flex",
          justifyContent: "center",
          gap: "20px",
          flexWrap: "wrap",
          maxWidth: "900px",
          margin: "0 auto",
        }}>
          {[
            { step: "01", icon: "bi-person-plus-fill", title: "Register", desc: "Create your free student account", color: "#0EA5E9" },
            { step: "02", icon: "bi-book-fill", title: "Select Topic", desc: "Choose from 45+ programming topics", color: "#00ff99" },
            { step: "03", icon: "bi-pencil-square", title: "Take Quiz", desc: "Test your knowledge with quizzes", color: "#A29BFE" },
            { step: "04", icon: "bi-bar-chart-fill", title: "View Analytics", desc: "See your progress in charts", color: "#FFD43B" },
          ].map((step, i) => (
            <div key={i} style={{
              backgroundColor: "rgba(255,255,255,0.06)",
              borderRadius: "16px",
              padding: "25px 20px",
              width: "190px",
              border: `1px solid ${step.color}30`,
            }}>
              <div style={{
                fontSize: "12px", color: step.color,
                fontWeight: "bold", marginBottom: "12px",
                letterSpacing: "2px",
              }}>
                STEP {step.step}
              </div>
              <i className={`bi ${step.icon}`} style={{ fontSize: "30px", color: step.color }}></i>
              <h3 style={{ color: "white", fontSize: "15px", margin: "10px 0 6px" }}>{step.title}</h3>
              <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "12px", margin: 0 }}>{step.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* CTA Bottom Section */}
      <div style={{
        textAlign: "center",
        padding: "50px 40px",
        background: "linear-gradient(135deg, rgba(14,165,233,0.2), rgba(0,255,153,0.1))",
        borderTop: "1px solid rgba(255,255,255,0.1)",
        borderBottom: "1px solid rgba(255,255,255,0.1)",
      }}>
        <h2 style={{ fontSize: "28px", marginBottom: "15px" }}>
          🎓 Ready to Start Learning?
        </h2>
        <p style={{ color: "rgba(255,255,255,0.6)", marginBottom: "30px", fontSize: "15px" }}>
          Join now and track your learning journey with smart analytics!
        </p>
        <button onClick={() => navigate("/register")} style={{
          padding: "15px 50px", borderRadius: "50px",
          border: "none", backgroundColor: "#0EA5E9",
          color: "white", fontSize: "18px", fontWeight: "bold",
          cursor: "pointer", display: "inline-flex",
          alignItems: "center", gap: "10px",
        }}>
          <i className="bi bi-rocket-takeoff-fill"></i>
          Start Now — It's Free!
        </button>
      </div>

      {/* Footer */}
      <div style={{
        textAlign: "center",
        padding: "20px",
        color: "rgba(255,255,255,0.3)",
        fontSize: "13px",
      }}>
        <i className="bi bi-graph-up-arrow" style={{ color: "#0EA5E9", marginRight: "6px" }}></i>
        © 2026 Web-Based Learning Behaviour Data Analytics System
      </div>

    </div>
  );
}

export default Home;