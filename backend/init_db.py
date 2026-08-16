import os
import mysql.connector


def init_db():
    try:
        conn = mysql.connector.connect(
            host=os.getenv("DB_HOST"),
            port=int(os.getenv("DB_PORT", "3306")),
            user=os.getenv("DB_USER"),
            password=os.getenv("DB_PASSWORD"),
            database=os.getenv("DB_NAME"),
            ssl_disabled=False,
            ssl_verify_cert=False,
            ssl_verify_identity=False
        )

        cursor = conn.cursor()

        # Users table
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS users (
                id INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(100) NOT NULL,
                email VARCHAR(150) NOT NULL UNIQUE,
                course VARCHAR(100) NOT NULL,
                password VARCHAR(255) NOT NULL,
                points INT DEFAULT 0,
                streak_count INT DEFAULT 0,
                last_activity DATE,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        """)

        # Activity table
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS activity (
                id INT AUTO_INCREMENT PRIMARY KEY,
                user_id INT NOT NULL,
                lesson_name VARCHAR(150) NOT NULL,
                time_spent INT NOT NULL,
                quiz_score DECIMAL(5,2) DEFAULT 0,
                device VARCHAR(50),
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                CONSTRAINT fk_activity_user
                    FOREIGN KEY (user_id) REFERENCES users(id)
                    ON DELETE CASCADE
            )
        """)

        # Question history table
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS question_history (
                id INT AUTO_INCREMENT PRIMARY KEY,
                user_id INT NOT NULL,
                topic VARCHAR(100) NOT NULL,
                question_text TEXT NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                CONSTRAINT fk_history_user
                    FOREIGN KEY (user_id) REFERENCES users(id)
                    ON DELETE CASCADE
            )
        """)

        conn.commit()

        cursor.close()
        conn.close()

        print("Database tables created successfully!")

    except Exception as e:
        print(f"Database initialization error: {e}")


if __name__ == "__main__":
    init_db()