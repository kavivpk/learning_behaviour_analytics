# 🤖 AI Integration & Model Migration

This document explains the technical details of the AI-powered adaptive quiz engine, prompt engineering parameters, response parsing strategies, and the migration to the new LLM.

---

## 🔌 Groq API Integration

We integrate with the **Groq API Cloud Service** using the official Python `groq` SDK. 
*   **Initialization**: The client is initialized in `backend/app.py` on startup by reading `GROQ_API_KEY` from the environment `.env` file.
*   **Performance**: Groq utilizes custom LPU (Language Processing Unit) accelerators, providing token response times (time-to-first-token) far faster than standard GPU clouds. This makes it ideal for real-time quiz generation.

---

## 📝 Dynamic Prompt Engineering

The quiz generator endpoint `/api/generate_quiz` dynamically constructs a prompt containing:
1.  **Subject Topic**: The subject (e.g. "C Programming").
2.  **Context Instruction**:
    *   *If the student has studied custom content*: Instructs the model to base questions **strictly** on the provided studied text to test comprehension of specific concepts.
    *   *If they haven't studied custom content yet*: Falls back to general foundational beginner concepts for that topic.
3.  **Focus Area**: Guides the model to emphasize a specific sub-topic (e.g. "Pointers" or "Data Types").
4.  **Deduplication Constraint**: Fetches up to 20 previously generated questions from the `question_history` database table and appends a `DO NOT generate any of these previous questions` warning to prevent repetition.
5.  **Output Format Constraints**: Directs the LLM to output raw JSON matching a specified structure, prohibiting markdown wrapping or conversational preambles.

### System Prompt Example:
```text
You are a professional academic assessment agent.
TASK: Generate a high-quality technical quiz of exactly 5 multiple choice questions for the subject: Python Programming.
SOURCE: The questions should be strictly and ONLY based on the specific concepts from this user-studied text: ...
IMPORTANT: DO NOT generate any of these previous questions:
- What is a list comprehension?
- How do you write a generator?

OUTPUT SPECIFICATION:
1. Return ONLY valid JSON.
2. Format: [
   {"question": "What is...", "options": ["A", "B", "C", "D"], "answer": 0, "focus": "Basics"},
   ...
]
3. 'answer' is the 0-indexed position of the correct option.
4. NO markdown, NO code blocks, NO preamble. Raw text JSON only.
```

---

## 🧼 Resilient JSON Response Cleaning

LLMs frequently wrap JSON responses in markdown code blocks (e.g. ` ```json ... ``` `) or include conversational preambles like "Here is your quiz:". To prevent parsing crashes, the backend executes a multi-stage cleaning pipeline:

1.  **Preamble Stripping / Split**:
    Checks if ` ```json` or generic ` ``` ` blocks exist. If found, it splits the response text and extracts the content between the blocks:
    ```python
    if "```json" in raw_text:
        raw_text = raw_text.split("```json")[1].split("```")[0].strip()
    elif "```" in raw_text:
        raw_text = raw_text.split("```")[1].split("```")[0].strip()
    ```
2.  **Deep Regex Extraction Fallback**:
    If a simple string split fails to isolate the JSON array, a regular expression extractor searches for the outermost JSON array `[ { ... } ]` using a dotall flag (matching newlines):
    ```python
    json_match = re.search(r'\[\s*\{.*\}\s*\]', raw_text, re.DOTALL)
    if json_match:
        raw_text = json_match.group(0)
    ```
3.  **JSON Load**:
    Calls `json.loads(raw_text)` to deserialize the cleaned string into a Python list. This list is then returned to the client as a clean JSON API payload with HTTP 200.

---

## 🔄 Model Migration: `llama-3.3-70b-versatile` ➡️ `openai/gpt-oss-120b`

### 1. Reason for Migration
*   **Deprecation**: Groq deprecated the older `llama-3.3-70b-versatile` model. Requests using deprecated models fail or return error messages.
*   **Accuracy & Reasoning**: The new `openai/gpt-oss-120b` model offers superior technical reasoning capabilities, generating more accurate academic questions, clear distractors (incorrect options), and adhering more strictly to JSON formats.

### 2. Migration Execution
We updated the model identifier in `backend/app.py` inside the `client.chat.completions.create` invocation:

```python
chat_completion = client.chat.completions.create(
    messages=[{"role": "user", "content": prompt}],
    model="openai/gpt-oss-120b",  # Updated from llama-3.3-70b-versatile
    temperature=0.7
)
```

We verified that:
- The Groq API client works immediately with `openai/gpt-oss-120b` without requiring a change to the client SDK setup.
- The existing `GROQ_API_KEY` is fully compatible and authenticated under the new model.
