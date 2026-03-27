
import mysql.connector

def get_db_connection():
    conn = mysql.connector.connect(
        host="localhost",
        user="root",
        password="Kavi@2006",
        database="web_analyzes"
    )
    return conn