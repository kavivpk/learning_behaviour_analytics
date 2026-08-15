# 🎓 Analytica: Technical Interview Preparation Guide

Welcome to the **Analytica** Interview Preparation Guide! This guide was curated specifically to help you explain this project in depth, address system design choices, talk about database schemas, discuss the AI-powered adaptive quiz engine, and answer recruiters' questions confidently.

Use the links below to navigate the guides. Each file focuses on a distinct aspect of the project.

---

## 🗂️ Table of Contents

### 1. 🚀 [Project Overview & Elevator Pitch](file:///e:/Project/learning_behaviour_analytics/docs/project_overview.md)
*   **Pitching the project**: How to explain Analytica in 2 minutes to a non-technical recruiter or a technical hiring manager.
*   **Core business value**: What problems does this project solve?
*   **Key features**: Detailed breakdown of activity tracking, adaptive quizzes, gamification, and dashboard.

### 2. 🏗️ [System Design & Database Architecture](file:///e:/Project/learning_behaviour_analytics/docs/system_design.md)
*   **Tech Stack Choices**: Why React, Flask, and MySQL were selected.
*   **Database Schema**: Detailed look at tables (`users`, `activity`, `question_history`), relations, and indexing.
*   **Backend Flow**: Authentication flow, password hashing security (`werkzeug.security`), and gamification streak logic.

### 3. 🤖 [AI Engine & Model Migration](file:///e:/Project/learning_behaviour_analytics/docs/ai_integration.md)
*   **Quiz Generation Mechanics**: How the prompt is constructed dynamically.
*   **Resilient JSON Parsing**: How raw model outputs are safely converted to Python dictionaries (handling markdown code blocks, regex extractors, and fallbacks).
*   **Model Migration**: Explaining the migration from `llama-3.3-70b-versatile` to `openai/gpt-oss-120b` on the Groq API.

### 4. 💬 [Interview Q&A (Cracking the Recruiter's Questions)](file:///e:/Project/learning_behaviour_analytics/docs/interview_qa.md)
*   **Common Technical Questions**: Deep-dive questions about concurrency, database scaling, API design, security, and exception handling.
*   **Behavioral & Project Questions**: Questions like "What was the most challenging part?", "What would you improve?", and "How did you debug performance bottlenecks?"

---

## 💡 How to Prepare (One Day Before the Interview)
1.  **Read the Pitch**: Read the first section of [project_overview.md](file:///e:/Project/learning_behaviour_analytics/docs/project_overview.md) to practice speaking naturally about the project's purpose and business value.
2.  **Memorize the Schema**: Open [system_design.md](file:///e:/Project/learning_behaviour_analytics/docs/system_design.md) and make sure you can describe the relations between users, activities, and quiz history. Recruiters love database questions!
3.  **Explain the AI Architecture**: Read [ai_integration.md](file:///e:/Project/learning_behaviour_analytics/docs/ai_integration.md) to explain how you integrated the Groq API, how you engineered prompts, and how you recently migrated models seamlessly.
4.  **Practice Q&As**: Go through [interview_qa.md](file:///e:/Project/learning_behaviour_analytics/docs/interview_qa.md) and practice answering out loud to prepare for typical and edge-case questions.
