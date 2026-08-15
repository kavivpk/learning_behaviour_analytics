# Analytica: Learning Behaviour Analytics Platform

Analytica is a state-of-the-art web application designed to track, analyze, and optimize student learning patterns. By leveraging AI-powered assessments and real-time behavioral tracking, it provides personalized insights that help students master technical subjects more efficiently.

## 📝 Project Abstract

In modern education systems, student performance is usually measured using marks and attendance. However, these traditional methods do not provide insights into how students interact with learning materials.

This project proposes a Web-Based Learning Behaviour Data Analytics System for Students that collects and analyzes student interaction data such as time spent on topics, topic visit frequency, and quiz performance.

The system stores this data in a database and applies data analytics techniques to identify learning patterns and detect difficult topics. A dashboard is provided to visualize insights using charts and graphs, helping students understand their learning behaviour and improve performance.

This approach enables a more data-driven method to support academic learning and performance analysis.

## 🚀 Key Features

- **Real-time Activity Tracking**: Monitors time spent on specific study modules to build a behavioral profile.
- **AI-Powered Adaptive Quizzes**: Uses the **Groq AI (openai/gpt-oss-120b)** to generate unique questions based on the student's actual study sessions.
- **Dynamic Performance Dashboard**: Beautifully visualized analytics using Chart.js to show mastery trends, time distribution, and learning efficiency.
- **Personalized AI Coach**: Intelligent recommendations that guide students to focus on their weakest areas.
- **Gamification System**: Earn points and maintain day streaks to stay motivated.
- **Professional Reports**: Downloadable PDF reports for academic review and performance tracking.

## 🛠️ Technology Stack

- **Frontend**: React.js, Chart.js, React Router
- **Backend**: Python (Flask), MySQL
- **AI Engine**: Groq API (openai/gpt-oss-120b)
- **Styling**: Vanilla CSS with modern Glassmorphism & Dark Mode aesthetics

## 📦 Installation & Setup

### Prerequisites
- Python 3.x
- Node.js & npm
- MySQL Server

### 1. Database Setup
Execute the `backend/schema.sql` script in your MySQL environment to create the necessary database and tables:
```sql
SOURCE backend/schema.sql;
```

### 2. Backend Setup
1. Navigate to the `backend` directory.
2. Install dependencies:
   ```bash
   pip install flask flask-cors mysql-connector-python pandas numpy groq python-dotenv
   ```
3. Create a `.env` file in the `backend` folder and add your Groq API Key:
   ```env
   GROQ_API_KEY=your_actual_key_here
   ```
4. Run the server:
   ```bash
   python app.py
   ```

### 3. Frontend Setup
1. Navigate to the `frontend` directory.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm start
   ```

## 📊 Project Architecture

The system follows a modern client-server architecture:
- **Client**: A responsive SPA that captures user interactions and displays data-driven visualizations.
- **Server**: A RESTful API that handles authentication, database persistence, and communicates with the LLM for quiz generation.
- **Database**: A structured MySQL schema for tracking users, granular activity logs, and quiz history.

---
© 2026 Analytica Learning Behaviour Systems
