import React, { useEffect, useState } from "react";
import { FaStar, FaCoins, FaMedal } from "react-icons/fa";
import "../Styles/ScoreboardPage.css";
import { useNavigate } from "react-router-dom";

const quizSubjects = ["react", "node.js", "java"];

function ScoreboardPage() {
  const [scores, setScores] = useState({});
  const [totalScore, setTotalScore] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchedScores = {};
    let total = 0;
    let allQuizzesCompleted = true;

    quizSubjects.forEach((subject) => {
      const score = parseInt(localStorage.getItem(`${subject}_score`)) || 0;
      fetchedScores[subject] = score;
      total += score;
      if (score === 0) {
        allQuizzesCompleted = false;
      }
    });

    setScores(fetchedScores);
    setTotalScore(total);

    if (allQuizzesCompleted) {
      localStorage.setItem("quizzes_completed", "true");
    } else {
      localStorage.setItem("quizzes_completed", "false");
    }
  }, []);

  const renderBadge = (score) => {
    return score >= 5
      ? "Gold Badge"
      : score >= 3
      ? "Silver Badge"
      : "Bronze Badge";
  };

  const attemptQuiz = (subject) => {
    alert(`Attempting ${subject} quiz!`);
    navigate(`/quiz/${subject.toLowerCase()}`);
  };

  const spins = Math.floor(totalScore / 4);
  localStorage.setItem("spin_count", spins);

  return (
    <div className="scoreboard-container">
      <div className="scoreboard-card">
        <h1>Scoreboard</h1>
        {quizSubjects.map((subject) => (
          <div key={subject} className="scoreboard-item">
            <FaStar className="scoreboard-icon" />
            <p>{`${subject.charAt(0).toUpperCase() + subject.slice(1)} score: ${
              scores[subject]
            }`}</p>
            <FaCoins className="scoreboard-icon" />
            <p>Gold Coins: {scores[subject] * 10}</p>
            <FaMedal className="scoreboard-icon" />
            <p>Badge: {renderBadge(scores[subject])}</p>
            {scores[subject] === 0 && (
              <button onClick={() => attemptQuiz(subject)}>Attempt Quiz</button>
            )}
          </div>
        ))}
        <hr />
        <div>
          <FaStar className="scoreboard-icon-total" />
          <p>Total score: {totalScore}</p>
          <FaCoins className="scoreboard-icon-total" />
          <p>Total Gold Coins: {totalScore * 10}</p>
        </div>
      </div>
    </div>
  );
}

export default ScoreboardPage;
