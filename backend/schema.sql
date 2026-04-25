CREATE DATABASE IF NOT EXISTS web_analyzes;
USE web_analyzes;

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
);

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
);
