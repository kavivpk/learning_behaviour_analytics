import pandas as pd
import numpy as np
from db import get_db_connection

def get_analytics(student_id):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute(
        "SELECT lesson_name, time_spent, quiz_score, created_at FROM activity WHERE user_id = %s",
        (student_id,)
    )
    rows = cursor.fetchall()
    cursor.execute(
        "SELECT points, streak_count FROM users WHERE id = %s",
        (student_id,)
    )
    user_meta = cursor.fetchone()
    
    cursor.close()
    conn.close()

    points = user_meta[0] if user_meta else 0
    streak = user_meta[1] if user_meta else 0

    df = pd.DataFrame(rows, columns=["lesson_name", "time_spent", "quiz_score", "created_at"])

    if df.empty:
        return {
            "avg_time": 0,
            "avg_score": 0,
            "topic_stats": [],
            "time_trend": [],
            "difficult_topics": [],
            "most_studied": "None",
            "overall_efficiency": 0,
            "points": points,
            "streak": streak,
            "engagement_level": "New Student"
        }

    # 1. Topic Aggregation
    topic_stats = df.groupby("lesson_name").agg(
        total_time=("time_spent", "sum"),
        avg_score=("quiz_score", "mean"),
        attempts=("lesson_name", "count")
    ).reset_index()

    # 2. Time Trend (Monthly)
    df['date'] = pd.to_datetime(df['created_at']).dt.strftime('%b %Y')
    time_trend = df.groupby('date')['time_spent'].sum().reset_index().to_dict('records')

    # 3. Efficiency Metric (Score per minute of study)
    topic_stats["efficiency"] = topic_stats.apply(
        lambda x: round(x["avg_score"] / (x["total_time"] / 60), 2) if x["total_time"] > 0 else 0, axis=1
    )

    # 4. Behavior Status Labeling
    def determine_status(row):
        if row["avg_score"] >= 80: return "Mastering"
        if row["avg_score"] < 50 and row["total_time"] > 300: return "Struggling"
        if row["total_time"] < 60: return "Low Engagement"
        return "Learning"

    topic_stats["status"] = topic_stats.apply(determine_status, axis=1)

    # 5. Filter Specific Insights
    difficult = topic_stats[topic_stats["status"] == "Struggling"]["lesson_name"].tolist()
    
    # 6. Global Metrics
    avg_time = round(float(df["time_spent"].mean()), 2)
    avg_score = round(float(df["quiz_score"].mean()), 2)
    overall_efficiency = round(float(topic_stats["efficiency"].mean()), 2)
    
    most_studied = str(topic_stats.loc[topic_stats["total_time"].idxmax(), "lesson_name"])

    # Finalize List for Dashboard
    stats_list = topic_stats.to_dict('records')
    
    return {
        "avg_time": avg_time,
        "avg_score": avg_score,
        "overall_efficiency": overall_efficiency,
        "topic_stats": stats_list,
        "time_trend": time_trend,
        "difficult_topics": difficult,
        "most_studied": most_studied,
        "engagement_level": "High" if avg_time > 120 else "Moderate",
        "points": points,
        "streak": streak
    }
