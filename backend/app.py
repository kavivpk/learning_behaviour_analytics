from flask import Flask, request, jsonify
from flask_cors import CORS
from db import get_db_connection
from analytics import get_analytics

app = Flask(__name__)
CORS(app)

@app.route("/")
def home():
    return "Web Analyzes Backend Running"

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

    return jsonify({
        "success": True,
        "user_id": new_user_id,
        "name": name
    })

@app.route('/api/login', methods=['POST'])
def login():
    data = request.json
    email = data['email']
    password = data['password']

    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute(
        "SELECT id, name FROM users WHERE email=%s AND password=%s",
        (email, password)
    )
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
            cursor.execute(
                "UPDATE activity SET time_spent=%s WHERE id=%s",
                (new_time, existing[0])
            )
        else:
            cursor.execute(
                "INSERT INTO activity (user_id, lesson_name, time_spent) VALUES (%s, %s, %s)",
                (student_id, topic, time_spent)
            )

        conn.commit()
        cursor.close()
        conn.close()
        return jsonify({"message": "Activity saved!"}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/activity/<int:student_id>', methods=['GET'])
def get_activity(student_id):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute(
        "SELECT lesson_name, time_spent, quiz_score FROM activity WHERE user_id=%s",
        (student_id,)
    )
    rows = cursor.fetchall()
    cursor.close()
    conn.close()

    data = []
    for row in rows:
        data.append({
            "topic": row[0],
            "time_spent": row[1],
            "quiz_score": str(row[2]),
        })
    return jsonify(data)

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
            "INSERT INTO activity (user_id, lesson_name, quiz_score, time_spent) VALUES (%s, %s, %s, %s)",
            (student_id, topic, score, 0)
        )
        conn.commit()
        cursor.close()
        conn.close()
        return jsonify({"message": "Score saved!"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/api/analytics/<int:student_id>', methods=['GET'])
def analytics(student_id):
    try:
        data = get_analytics(student_id)
        return jsonify(data), 200
    except Exception as e:
        print("Analytics error:", str(e))
        return jsonify({"error": str(e)}), 500
    
@app.route('/studied-topics', methods=['GET'])
def studied_topics():
    user_id = request.args.get('user_id')
    
    if not user_id:
        return jsonify({'studied_topics': []})
    
    try:
        conn = get_db_connection()  # ← mysql.connector use பண்றோம்
        cursor = conn.cursor()
        cursor.execute("""
            SELECT DISTINCT topic FROM activity 
            WHERE user_id = %s AND time_spent > 0
        """, (user_id,))
        rows = cursor.fetchall()
        cursor.close()
        conn.close()
        topics = [row[0] for row in rows]
        return jsonify({'studied_topics': topics})
    except Exception as e:
        print("Error:", e)  # ← terminal la error பாக்கலாம்
        return jsonify({'studied_topics': [], 'error': str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)
