from flask import Flask, request, jsonify
from flask_cors import CORS
from db import get_db_connection
from analytics import get_analytics
from groq import Groq
import os
import json
import re
from dotenv import load_dotenv

load_dotenv()
groq_api_key = os.environ.get("GROQ_API_KEY")
client = None
if groq_api_key:
    client = Groq(api_key=groq_api_key)

app = Flask(__name__)
CORS(app)

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

    cursor.execute(
        "INSERT INTO users (name, email, password) VALUES (%s, %s, %s)",
        (name, email, password)
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
    cursor.execute("SELECT id, name FROM users WHERE email=%s AND password=%s", (email, password))
    user = cursor.fetchone()
    cursor.close()
    conn.close()

    if user:
        return jsonify({"success": True, "user_id": user[0], "name": user[1]})
    else:
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

        conn.commit()
        cursor.close()
        conn.close()
        return jsonify({"message": "Activity tracked!"}), 200
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
    
    if not client:
        return jsonify({"error": "Groq API key missing in .env"}), 500

    prompt_content = f"Generate a quiz about {topic}."
    if custom_content:
        prompt_content = f"Generate a quiz strictly based on this content: {custom_content}"
    
    prompt = f"""
    You are an expert technical Quiz Generator.
    Subject: {topic}
    Requirement: Generate exactly 5 multiple choice questions.
    Instructions:
    * Focus ONLY on {topic} concepts.
    * Return ONLY a raw JSON array.
    * Format: [{{"question": "...", "options": ["...", "...", "...", "..."], "answer": 0}}]
    * answer must be the index of the correct option (0-3).
    * No preamble or markdown code blocks.
    
    Context: {prompt_content}
    """

    try:
        chat_completion = client.chat.completions.create(
            messages=[{"role": "user", "content": prompt}],
            model="llama-3.3-70b-versatile",
        )
        raw_text = chat_completion.choices[0].message.content.strip()
        
        # Robust JSON extraction
        json_match = re.search(r'\[.*\]', raw_text, re.DOTALL)
        if json_match:
            raw_text = json_match.group(0)
            
        return jsonify(json.loads(raw_text)), 200
    except Exception as e:
        print("Groq Error:", str(e))
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

if __name__ == "__main__":
    app.run(debug=True)
