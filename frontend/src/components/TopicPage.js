import { useParams, useNavigate } from "react-router-dom";
import React, { useState, useEffect, useRef } from "react";
import ReactMarkdown from "react-markdown";

function TopicPage() {
  const { name } = useParams();
  const navigate = useNavigate();
  const [timeSpent, setTimeSpent] = useState(0);
  const [content, setContent] = useState("");
  const timerRef = useRef(null);

  useEffect(() => {
    // Start the timer when the component mounts
    timerRef.current = setInterval(() => {
      setTimeSpent((prev) => prev + 1);
    }, 1000);

    // Fetch topic content
    const fetchContent = async () => {
      try {
        const response = await fetch(`/topics/${name.toLowerCase()}.md`);
        if (response.ok) {
          const text = await response.text();
          setContent(text);
        } else {
          setContent(`# Content not found\n\nSorry, the content for ${name} could not be found.`);
        }
      } catch (err) {
        setContent(`# Error\n\nFailed to load content.`);
      }
    };
    fetchContent();

    // Clean up timer when leaving page
    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [name]);

  const handleFinishTopic = async () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    try {
      // Read user_id from localStorage (set by Login.jsx)
      const user_id = localStorage.getItem("user_id") || 1; 

      // Send tracking data to backend
      const response = await fetch("http://127.0.0.1:5000/save_activity", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: user_id,
          topic_id: name, // Using topic name as ID for now
          time_spent: timeSpent, // in seconds
          quiz_score: 0 // Default for now
        }),
      });

      if (response.ok) {
        console.log("Activity saved successfully");
        navigate(`/quiz/${name.toLowerCase()}`); // Go to Quiz!
      } else {
        console.error("Failed to save activity");
      }
    } catch (error) {
      console.error("Error saving activity:", error);
    }
  };

  return (
    <div style={{ maxWidth: "800px", margin: "50px auto", padding: "0 20px" }}>
      <div style={{ textAlign: "right" }}>
        <p style={{ color: "gray", fontSize: "14px", margin: 0 }}>⏱ Time spent: {timeSpent} seconds</p>
      </div>
      
      <div style={{marginTop: "20px", textAlign: "left", lineHeight: "1.6"}}>
        <ReactMarkdown>{content}</ReactMarkdown>
      </div>
      
      <div style={{textAlign: "center", marginTop: "40px"}}>
        <button 
          onClick={handleFinishTopic} 
          style={{padding:"10px 20px",fontSize:"16px", cursor: "pointer"}}
        >
          Finish Topic
        </button>
      </div>
    </div>
  );
}

// return (
//     <div style={{ 
//       padding: "30px",
//       minHeight: "100vh",
//       color: "white"
//     }}>
      
//       {/* Time spent - top right */}
//       <div style={{ 
//         textAlign: "right", 
//         color: "white",
//         fontSize: "14px"
//       }}>
//         ⏱ Time spent: {timeSpent} seconds
//       </div>

//       {/* Topic content */}
//       <h1 style={{ color: "white", fontSize: "32px" }}>
//         {topicName}
//       </h1>

//       {/* Content text */}
//       <div style={{ 
//         color: "white",
//         fontSize: "16px",
//         lineHeight: "1.8"
//       }}>
//         {content}
//       </div>

//       {/* Code blocks */}
//       <pre style={{ 
//         backgroundColor: "rgba(0,0,0,0.5)",
//         color: "#00ff99",
//         padding: "15px",
//         borderRadius: "8px",
//         fontSize: "14px"
//       }}>
//       </pre>

//       {/* Back button */}
//       <button
//         onClick={() => navigate("/dashboard")}
//         style={{
//           marginTop: "30px",
//           padding: "10px 30px",
//           borderRadius: "50px",
//           border: "2px solid white",
//           backgroundColor: "transparent",
//           color: "white",
//           fontSize: "16px",
//           cursor: "pointer",
//         }}
//       >
//         Back to Dashboard
//       </button>

//     </div>
//   );
// }
export default TopicPage;