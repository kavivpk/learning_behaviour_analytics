import mysql.connector

# Use basic settings from db.py but connect without the target database first
def init_db():
    try:
        # Step 1: Connect to MySQL without specifying a database
        conn = mysql.connector.connect(
            host="localhost",
            user="root",
            password="Kavi@2006"
        )
        cursor = conn.cursor()
        
        # Step 2: Create the database if it doesn't exist
        print("Checking/Creating database 'web_analyzes'...")
        cursor.execute("CREATE DATABASE IF NOT EXISTS web_analyzes")
        cursor.execute("USE web_analyzes")
        
        # Step 3: Create Users table
        print("Checking/Creating table 'users'...")
        cursor.execute("""
            CREATE TABLE IF NOT EXISTS users (
                id INT AUTO_INCREMENT PRIMARY KEY,
                name VARCHAR(100) NOT NULL,
                email VARCHAR(150) NOT NULL UNIQUE,
                course VARCHAR(100) NOT NULL,
                password VARCHAR(255) NOT NULL,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        """)
        
        # Step 4: Create Activity table
        print("Checking/Creating table 'activity'...")
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
        
        conn.commit()
        print("\nSuccess: Database and tables are ready!")
        cursor.close()
        conn.close()
    except mysql.connector.Error as err:
        print(f"\nMySQL Error: {err}")
    except Exception as e:
        print(f"\nUnexpected Error: {e}")

if __name__ == "__main__":
    init_db()
