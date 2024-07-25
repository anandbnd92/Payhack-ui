import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./Pages/Home";
import SubjectSelection from "./Pages/SubjectSelection";
import QuizPage from "./Pages/QuizPage";
import ScoreboardPage from "./Pages/ScoreboardPage";
import Sidebar from "./Components/Sidebar";
import "./App.css";
import SpinWheel from "./Components/SpinWheel";
import LoginPage from "./Components/LoginPage";
function App() {
  return (
    <Router>
      <div>
        <Sidebar />
        <div className="content-container">
          <Routes>
            {/* <Route path="/login" element={<LoginPage />} /> */}
            <Route path="/home" element={<Home />} />
            <Route path="/subjects" element={<SubjectSelection />} />
            <Route path="/quiz/:subject" element={<QuizPage />} />
            <Route path="/scoreboard" element={<ScoreboardPage />} />
            <Route path="/spinwheel" element={<SpinWheel />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
