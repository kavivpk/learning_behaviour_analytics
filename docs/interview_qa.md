# 💬 Technical Interview Q&A Guide

Prepare for your recruiter and technical manager rounds with these detailed questions and answers customized specifically for the **Analytica** project.

---

## 🙋 Architectural & System Design Questions

### Q1: Can you walk me through the system architecture and explaining how a request flows?
> **Answer:** "Certainly. The system follows a decoupled three-tier client-server architecture:
> 1.  **Client Tier**: React SPA that handles routing, captures time spent using timers, and renders the analytics interface.
> 2.  **Logic Tier**: Python Flask REST API running on a WSGI server, exposing endpoints for user management, activity logging, and quiz generation.
> 3.  **Data Tier**: MySQL database that maintains schemas for relational entities.
>
> When a student completes a study session and requests a quiz:
> *   The React client sends a `POST` request to `/api/generate_quiz` with the topic, focus area, student ID, and custom content.
> *   The Flask backend authenticates the call, fetches the student's study history to avoid generating duplicate questions, and creates a prompt.
> *   It sends this prompt to the Groq API using the `openai/gpt-oss-120b` model.
> *   Once the response is received, the backend extracts the raw JSON, parses it, records it in the history table, and returns it to the React client."

### Q2: Why did you choose Python/Flask for the backend instead of Node.js or Django?
> **Answer:** "I chose Python primarily because it has a mature ecosystem for data science, analytics, and AI integrations (like `pandas`, `numpy`, and the `groq` SDK). 
> 
> I selected **Flask** over **Django** because of its lightweight, micro-framework nature. Analytica's core value is API-driven and analytical. Flask allows me to define clean, explicit REST endpoints without the overhead of Django’s built-in opinionated modules (like the Django admin or forms), keeping the backend fast and maintainable."

### Q3: Why did you choose MySQL over MongoDB or other NoSQL databases?
> **Answer:** "The data in Analytica is highly relational and structured. A student has multiple activity logs, and activity logs refer back to a user. We also have foreign key constraints (e.g. deleting a user deletes their activity logs). 
>
> Using a relational database like **MySQL** guarantees **ACID compliance** (Atomicity, Consistency, Isolation, Durability) out of the box, ensuring that transactions—like updating a user's points and recording their quiz score simultaneously—never leave the database in an inconsistent state. MySQL's indexing capabilities also allow us to easily run aggregation queries (like sum of time spent) very efficiently."

---

## 🤖 AI & LLM Questions

### Q4: Large Language Models are notorious for returning inconsistent output formats. How does your backend guarantee that the React client receives valid JSON?
> **Answer:** "I built a **resilient multi-stage parsing and cleaning pipeline** in the backend:
> 1.  **Prompt Constraints**: The prompt explicitly commands the model to return raw JSON and prohibits code block wrappers (like ` ```json `) or natural language preambles.
> 2.  **Block Extraction**: If the LLM still returns markdown code blocks, the code splits the string using the backticks as delimiters to isolate the inner text.
> 3.  **Regex Search**: If the split fails, a regular expression (`re.search(r'\[\s*\{.*\}\s*\]', text, re.DOTALL)`) extracts the outermost JSON array structure from the response.
> 4.  **Parsing Fallback**: Finally, the cleaned text is passed to `json.loads()`. If parsing fails, the system catches the exception and returns a structured JSON error instead of crashing the server."

### Q5: You recently migrated the Groq API model. Can you explain why and how you did it?
> **Answer:** "The Groq cloud API deprecated the older model `llama-3.3-70b-versatile` in favor of recommended models. I migrated the codebase to the recommended `openai/gpt-oss-120b` model.
> 
> To perform the migration:
> 1.  I searched the workspace to find all instances of the deprecated string.
> 2.  I modified the `client.chat.completions.create` call in `backend/app.py` to target `openai/gpt-oss-120b`.
> 3.  I verified that the existing `GROQ_API_KEY` was fully compatible with this model on the Groq gateway.
> 4.  I ran automated integration tests via a Flask test client to verify that the generated quiz returned valid multiple-choice questions matching our schema.
> 5.  Finally, I updated the README documentation."

---

## 🔒 Security & Database Aggregation Questions

### Q6: How does the system handle user password security?
> **Answer:** "Passwords are never stored in plain text. The application uses **salted password hashing** via Python’s `werkzeug.security` module. 
> *   When a user registers, `generate_password_hash` combines their password with a random salt and runs it through a scrypt hashing function. This produces a secure hash string stored in the database.
> *   When logging in, `check_password_hash` retrieves the stored hash, hashes the input password with the salt extracted from that hash, and compares them. This is done in constant time to prevent timing analysis attacks."

### Q7: How does the daily streak calculation work on the database level?
> **Answer:** "The daily streak calculation is computed dynamically in the database:
> *   We track `last_activity` (as a `DATE` field) and `streak_count` in the `users` table.
> *   When a student completes a study session, we calculate the difference in days between `today` and their `last_activity`.
> *   If the difference is exactly `1` day, the streak is incremented: `streak_count = streak_count + 1`.
> *   If the difference is `0` (they already studied today), the streak remains unchanged.
> *   If the difference is greater than `1` (or `last_activity` is `NULL`), the streak has broken, so it resets to `1`.
> *   We then update `last_activity` to `today`."

---

## 📈 Scalability & Optimization (Advanced Questions)

### Q8: If this app grows to 100,000 active students, the database queries aggregating study times might slow down. How would you optimize this?
> **Answer:** "If the application scales, I would apply three optimization strategies:
> 1.  **Indexing**: I would add a composite index on the `activity` table for `(user_id, lesson_name)`. Since our quiz generator frequently queries `SUM(time_spent) WHERE user_id = %s AND lesson_name = %s`, this index makes the lookup time $O(1)$ instead of performing full table scans.
> 2.  **Caching**: I would implement a cache layer using **Redis**. Daily or active study durations can be cached in memory and flushed to MySQL asynchronously in batches, reducing write loads on our relational database.
> 3.  **Read Replicas**: For generating analytical reports or dashboards, I would use MySQL read replicas to isolate heavy read-aggregation traffic from the primary transactional database."
