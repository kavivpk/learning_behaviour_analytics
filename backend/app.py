from flask import Flask, request, jsonify
from flask_cors import CORS
from db import get_db_connection
from analytics import get_analytics
from groq import Groq
import os
import json
import re
from werkzeug.security import generate_password_hash, check_password_hash
from datetime import datetime, date, timedelta
from dotenv import load_dotenv

load_dotenv()
groq_api_key = os.environ.get("GROQ_API_KEY")
client = None
if groq_api_key:
    client = Groq(api_key=groq_api_key)

app = Flask(__name__)
CORS(app)

def migrate_db():
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        # Add missing columns to users table
        cursor.execute("SHOW COLUMNS FROM users LIKE 'points'")
        if not cursor.fetchone():
            cursor.execute("ALTER TABLE users ADD COLUMN points INT DEFAULT 0")
        
        cursor.execute("SHOW COLUMNS FROM users LIKE 'streak_count'")
        if not cursor.fetchone():
            cursor.execute("ALTER TABLE users ADD COLUMN streak_count INT DEFAULT 0")
            
        cursor.execute("SHOW COLUMNS FROM users LIKE 'last_activity'")
        if not cursor.fetchone():
            cursor.execute("ALTER TABLE users ADD COLUMN last_activity DATE")
            
        # Add quiz_score to activity if missing
        cursor.execute("SHOW COLUMNS FROM activity LIKE 'quiz_score'")
        if not cursor.fetchone():
            cursor.execute("ALTER TABLE activity ADD COLUMN quiz_score DECIMAL(5,2) DEFAULT 0")

        conn.commit()
        cursor.close()
        conn.close()
        print("Database schema migration completed.")
    except Exception as e:
        print(f"Migration Error: {e}")

# Run migration on startup
migrate_db()

@app.route("/")
def home():
    return "Learning Behavior Analytics Backend (Groq Powered) Running"

@app.route('/api/register', methods=['POST'])
def register():
    data = request.json
    name = data['name']
    email = data['email']
    password = data['password']

    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT id FROM users WHERE email=%s", (email,))
    existing = cursor.fetchone()

    if existing:
        return jsonify({"success": False, "message": "Email already exists"})

    hashed_password = generate_password_hash(password)
    cursor.execute(
        "INSERT INTO users (name, email, password, course) VALUES (%s, %s, %s, %s)",
        (name, email, hashed_password, "General")
    )
    conn.commit()
    new_user_id = cursor.lastrowid
    cursor.close()
    conn.close()

    return jsonify({"success": True, "user_id": new_user_id, "name": name})

@app.route('/api/login', methods=['POST'])
def login():
    data = request.json
    email = data['email']
    password = data['password']

    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT id, name, password FROM users WHERE email=%s", (email,))
    user = cursor.fetchone()
    cursor.close()
    conn.close()

    if user:
        user_id, name, stored_password = user
        # 1. Check if it's a valid hash
        if check_password_hash(stored_password, password):
            return jsonify({"success": True, "user_id": user_id, "name": name})
        
        # 2. Fallback for legacy plain-text passwords (migration logic)
        if stored_password == password:
            # Upgrade this user to hashed password immediately
            new_hash = generate_password_hash(password)
            conn = get_db_connection()
            cursor = conn.cursor()
            cursor.execute("UPDATE users SET password=%s WHERE id=%s", (new_hash, user_id))
            conn.commit()
            cursor.close()
            conn.close()
            return jsonify({"success": True, "user_id": user_id, "name": name})
            
    return jsonify({"success": False})

@app.route('/api/track', methods=['POST'])
def track_activity():
    try:
        data = request.json
        student_id = data['student_id']
        topic = data['topic']
        time_spent = data['time_spent']

        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute(
            "SELECT id, time_spent FROM activity WHERE user_id=%s AND lesson_name=%s",
            (student_id, topic)
        )
        existing = cursor.fetchone()

        if existing:
            new_time = existing[1] + time_spent
            cursor.execute("UPDATE activity SET time_spent=%s WHERE id=%s", (new_time, existing[0]))
        else:
            cursor.execute(
                "INSERT INTO activity (user_id, lesson_name, time_spent) VALUES (%s, %s, %s)",
                (student_id, topic, time_spent)
            )

        # Update Points and Streak
        today = date.today()
        cursor.execute("SELECT last_activity, streak_count, points FROM users WHERE id=%s", (student_id,))
        user_data = cursor.fetchone()
        
        if user_data:
            last_activity, streak, points = user_data
            new_streak = streak
            
            if last_activity:
                # If last activity was yesterday, increment streak
                if last_activity == today - timedelta(days=1):
                    new_streak += 1
                # If last activity was before yesterday, reset streak
                elif last_activity < today - timedelta(days=1):
                    new_streak = 1
            else:
                new_streak = 1
                
            # Add points (e.g., 10 points for a study session)
            new_points = (points or 0) + 10
            cursor.execute(
                "UPDATE users SET points=%s, streak_count=%s, last_activity=%s WHERE id=%s",
                (new_points, new_streak, today, student_id)
            )

        conn.commit()
        cursor.close()
        conn.close()
        return jsonify({"message": "Activity tracked!", "points_added": 10}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/quiz_score', methods=['POST'])
def save_quiz_score():
    try:
        data = request.json
        student_id = data['student_id']
        topic = data['topic']
        score = data['score']

        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute(
            "SELECT id FROM activity WHERE user_id=%s AND lesson_name=%s ORDER BY id DESC LIMIT 1",
            (student_id, topic)
        )
        existing = cursor.fetchone()

        if existing:
            cursor.execute("UPDATE activity SET quiz_score=%s WHERE id=%s", (score, existing[0]))
        else:
            cursor.execute(
                "INSERT INTO activity (user_id, lesson_name, quiz_score, time_spent) VALUES (%s, %s, %s, %s)",
                (student_id, topic, score, 0)
            )
        conn.commit()
        cursor.close()
        conn.close()
        return jsonify({"message": "Score saved!"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/generate_quiz', methods=['POST'])
def generate_quiz():
    data = request.json
    topic = data.get('topic')
    custom_content = data.get('content')
    focus = data.get('focus')
    
    if not client:
        print("Backend Error: GROQ_API_KEY Missing")
        return jsonify({"error": "Groq API key missing in .env"}), 500

    # Behavioral Guard: Only generate if user has actually studied
    student_id = data.get('student_id')
    print(f"DEBUG: Generating quiz for Student:{student_id}, Topic:{topic}, Focus:{focus}")
    
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT SUM(time_spent) FROM activity WHERE user_id=%s AND lesson_name=%s", (student_id, topic))
    total_time = cursor.fetchone()[0] or 0
    # 1. Fetch previously answered questions to avoid duplicates
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute("SELECT question_text FROM question_history WHERE user_id=%s AND topic=%s", (student_id, topic))
    past_questions = [row[0] for row in cursor.fetchall()]
    cursor.close()
    conn.close()

    duplicates_instruction = ""
    if past_questions:
        # Limit to last 20 to avoid prompt bloat
        past_list = "\n- ".join(past_questions[-20:])
        duplicates_instruction = f"IMPORTANT: DO NOT generate any of these previous questions:\n- {past_list}"

    if not custom_content or len(custom_content.strip()) < 20:
        # Fallback to general knowledge if user hasn't studied specific content yet
        context_instruction = f"based on general foundational concepts of {topic} for a beginner level."
        if focus:
            context_instruction += f" Specifically focus on {focus}."
        context_instruction += " Ensure questions are clear and educational."
    else:
        # Strictly use provided content
        context_instruction = f"strictly and ONLY based on the specific concepts from this user-studied text: {custom_content}. Do not include external knowledge or general foundational concepts not mentioned in the text."
        if focus:
            context_instruction += f" Specifically focus on the area of {focus} mentioned in the text."
    
    prompt = f"""
    You are a professional academic assessment agent.
    TASK: Generate a high-quality technical quiz of exactly 5 multiple choice questions for the subject: {topic}.
    SOURCE: The questions should be {context_instruction}.
    {duplicates_instruction}
    
    OUTPUT SPECIFICATION:
    1. Return ONLY valid JSON.
    2. Format: [
       {{"question": "What is...", "options": ["A", "B", "C", "D"], "answer": 0, "focus": "{focus if focus else 'AI'}"}},
       ...
    ]
    3. 'answer' is the 0-indexed position of the correct option.
    4. NO markdown, NO code blocks, NO preamble. Raw text JSON only.
    """

    try:
        chat_completion = client.chat.completions.create(
            messages=[{"role": "user", "content": prompt}],
            model="llama-3.3-70b-versatile",
            temperature=0.7
        )
        raw_text = chat_completion.choices[0].message.content.strip()
        print(f"DEBUG - Raw LLM Response for {topic}: {raw_text[:200]}...") # Log start of response
        
        # Resilient JSON cleaning
        if "```json" in raw_text:
            raw_text = raw_text.split("```json")[1].split("```")[0].strip()
        elif "```" in raw_text:
            raw_text = raw_text.split("```")[1].split("```")[0].strip()
            
        # Regex fallback for deep extraction
        json_match = re.search(r'\[\s*\{.*\}\s*\]', raw_text, re.DOTALL)
        if json_match:
            raw_text = json_match.group(0)
            
        quiz_data = json.loads(raw_text)
        return jsonify(quiz_data), 200
    except Exception as e:
        print("Groq/JSON Exception:", str(e))
        return jsonify({"error": str(e)}), 500

@app.route('/api/analytics/<int:student_id>', methods=['GET'])
def analytics(student_id):
    try:
        data = get_analytics(student_id)
        return jsonify(data), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/studied-topics', methods=['GET'])
def studied_topics():
    user_id = request.args.get('user_id')
    if not user_id:
        return jsonify({'studied_topics': []})
    
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute("""
            SELECT lesson_name, SUM(time_spent) as total_time 
            FROM activity WHERE user_id = %s GROUP BY lesson_name HAVING total_time > 0
        """, (user_id,))
        rows = cursor.fetchall()
        cursor.close()
        conn.close()
        return jsonify({'studied_topics': [{"name": row[0], "time": row[1]} for row in rows]})
    except Exception as e:
        return jsonify({'studied_topics': [], 'error': str(e)}), 500

@app.route('/api/mark_answered', methods=['POST'])
def mark_answered():
    try:
        data = request.json
        user_id = data['user_id']
        topic = data['topic']
        question_text = data['question_text']
        
        conn = get_db_connection()
        cursor = conn.cursor()
        # Create table if not exists (in case init_db wasn't run)
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS question_history (
                id INT AUTO_INCREMENT PRIMARY KEY,
                user_id INT NOT NULL,
                topic VARCHAR(100) NOT NULL,
                question_text TEXT NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        """)
        cursor.execute(
            "INSERT INTO question_history (user_id, topic, question_text) VALUES (%s, %s, %s)",
            (user_id, topic, question_text)
        )
        conn.commit()
        cursor.close()
        conn.close()
        return jsonify({"message": "Question recorded"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/answered_questions', methods=['GET'])
def get_answered():
    try:
        user_id = request.args.get('user_id')
        topic = request.args.get('topic')
        conn = get_db_connection()
        cursor = conn.cursor()
        cursor.execute("SELECT question_text FROM question_history WHERE user_id=%s AND topic=%s", (user_id, topic))
        rows = cursor.fetchall()
        cursor.close()
        conn.close()
        return jsonify({"answered": [r[0] for r in rows]}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)
