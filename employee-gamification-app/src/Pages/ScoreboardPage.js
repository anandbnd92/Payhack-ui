import React, { useEffect, useState } from "react";
import { FaStar, FaCoins, FaMedal } from "react-icons/fa";
import "../Styles/ScoreboardPage.css";
import { useNavigate } from "react-router-dom";

const quizSubjects = ["react", "nodejs", "java"];

function ScoreboardPage() {
  const [scores, setScores] = useState({});
  const [totalScore, setTotalScore] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:8081/getscore")
      .then((response) => response.json())
      .then((data) => {
        const fetchedScores = {};
        let total = 0;

        data.forEach((scoreEntry) => {
          const subject = scoreEntry.subject.toLowerCase();
          fetchedScores[subject] = scoreEntry.correctcount;
          total += scoreEntry.correctcount;
        });

        setScores(fetchedScores);
        setTotalScore(total);
      })
      .catch((error) => {
        console.error("Error fetching scores:", error);
      });
  }, []);

  const handleSpinClick = () => {
    console.log("totalScore type:", typeof totalScore); // Check type
    console.log("totalScore value:", totalScore); // Check value
    navigate("/spinwheel", { state: { totalScore } });
  };

  const renderBadge = (score) => {
    if (score > 8) return "Gold Badge";
    if (score > 6) return "Silver Badge";
    return "Bronze Badge";
  };

  return (
    <div className="scoreboard-container">
      <div className="scoreboard-card">
        <h1>Scoreboard</h1>
        {quizSubjects.map((subject) => (
          <div key={subject} className="scoreboard-item">
            <FaStar className="scoreboard-icon" />
            <p>{`${subject.charAt(0).toUpperCase() + subject.slice(1)} score: ${
              scores[subject] || 0
            }`}</p>
            <FaCoins className="scoreboard-icon" />
            <p>Gold Coins: {scores[subject] * 10 || 0}</p>
            <FaMedal className="scoreboard-icon" />
            <p>Badge: {renderBadge(scores[subject] || 0)}</p>
          </div>
        ))}
        <hr />
        <div>
          <FaStar className="scoreboard-icon-total" />
          <p>Total score: {totalScore}</p>
          <FaCoins className="scoreboard-icon-total" />
          <p>Total Gold Coins: {totalScore * 10}</p>
        </div>
        <button onClick={handleSpinClick}>Go to Spin Wheel</button>
      </div>
    </div>
  );
}

export default ScoreboardPage;
