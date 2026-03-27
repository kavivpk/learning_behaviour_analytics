import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./components/Dashboard";
import TopicPage from "./components/TopicPage";
import QuizPage from "./components/QuizPage";

function App() {
  return (
    <Router>

      <Routes>

        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/topic/:name" element={<TopicPage />} />

        <Route path="/quiz/:name" element={<QuizPage />} />

      </Routes>

    </Router>
  );
}

export default App;