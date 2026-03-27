import pandas as pd
from db import get_db_connection

def get_analytics(student_id):
    conn = get_db_connection()
    cursor = conn.cursor()
    cursor.execute(
        "SELECT lesson_name, time_spent, quiz_score FROM activity WHERE user_id = %s",
        (student_id,)
    )
    rows = cursor.fetchall()
    cursor.close()
    conn.close()

    df = pd.DataFrame(rows, columns=["lesson_name", "time_spent", "quiz_score"])

    if df.empty:
        return {
            "avg_time": 0,
            "avg_score": 0,
            "topic_stats": [],
            "difficult_topics": [],
            "most_studied": None,
        }

    avg_time = round(float(df["time_spent"].mean()), 2)
    avg_score = round(float(df["quiz_score"].mean()), 2)

    topic_stats = df.groupby("lesson_name").agg(
        total_time=("time_spent", "sum"),
        avg_score=("quiz_score", "mean")
    ).reset_index()

    topic_stats["avg_score"] = topic_stats["avg_score"].round(2)

    # Convert to plain Python types
    topic_stats_list = []
    for _, row in topic_stats.iterrows():
        topic_stats_list.append({
            "lesson_name": str(row["lesson_name"]),
            "total_time": int(row["total_time"]),
            "avg_score": float(row["avg_score"]),
        })

    # Difficult topics
    difficult = []
    for row in topic_stats_list:
        if row["avg_score"] < 60 or row["total_time"] > 150:
            difficult.append(row["lesson_name"])

    # Most studied
    most_studied = str(topic_stats.loc[
        topic_stats["total_time"].idxmax(), "lesson_name"
    ])

    return {
        "avg_time": avg_time,
        "avg_score": avg_score,
        "topic_stats": topic_stats_list,
        "difficult_topics": difficult,
        "most_studied": most_studied,
    }
