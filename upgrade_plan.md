# Project Upgrade Plan: Learning Behaviour Analytics

We are upgrading the project to a premium, production-ready state with a focus on **Security**, **Gamification**, and **Stunning UI**.

## 1. Backend Upgrades

### A. Security (Password Hashing)
- Update `backend/app.py` to use `werkzeug.security` for `generate_password_hash` and `check_password_hash`.

### B. Gamification & Advanced Analytics
- Update `backend/schema.sql` to track:
    - `streak_count`: Number of consecutive study days.
    - `last_study_date`: To calculate streaks.
    - `points`: Rewards for activity.
- Update `backend/analytics.py` to calculate these new metrics.

## 2. Frontend Upgrades (Premium UI)

### A. Global Design System
- Update `frontend/src/index.css` with:
    - Glassmorphism utility classes.
    - Vibrant, harmonious color palette.

### B. Dashboard Overhaul
- Implement a "Glassmorphic" header and cards.
- Add a **Streak Counter** and **Badge Section**.
- Add "AI Recommended Path".
- Smooth animations.

## 3. Implementation Steps

1.  **Database Update:** Add gamification columns.
2.  **Backend Logic:** Implement hashing and streak calculation.
3.  **Styles:** Revamp CSS.
4.  **Dashboard:** Update UI components.
