import React, { useState, useEffect } from "react";
import "../Styles/Quiz.css";

const Quiz = ({ questions, subject, onSubmit }) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showNextButton, setShowNextButton] = useState(false);
  const [score, setScore] = useState(0);
  const [showScore, setShowScore] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null);

  useEffect(() => {
    const savedScore = localStorage.getItem(`${subject}_score`);
    const isCompleted = localStorage.getItem(`${subject}_completed`);

    if (isCompleted) {
      setScore(parseInt(savedScore));
      setShowScore(true);
    }
  }, [subject]);

  const handleAnswerOptionClick = (isCorrect, index) => {
    if (selectedOption === null) {
      if (isCorrect) {
        setScore(score + 1);
      }
      setSelectedOption(index);
      setShowNextButton(true);
    }
  };

  const handleNextQuestion = () => {
    const nextQuestion = currentQuestion + 1;
    if (nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
      setSelectedOption(null);
      setShowNextButton(false);
    } else {
      handleSubmit();
    }
  };

  const handleSubmit = () => {
    setShowScore(true);
    localStorage.setItem(`${subject}_score`, score);
    localStorage.setItem(`${subject}_completed`, true);
    onSubmit(score);
  };

  return (
    <div className="quiz-container">
      {showScore ? (
        <div className="score-section">
          You scored {score} out of {questions.length}
        </div>
      ) : (
        <>
          <h2 className="quiz-question">
            {questions[currentQuestion].questionText}
          </h2>
          <div className="quiz-options">
            {questions[currentQuestion].answerOptions.map((option, index) => (
              <div key={index} className="quiz-option">
                <button
                  className={`option-button ${
                    selectedOption === index ? "selected" : ""
                  }`}
                  onClick={() =>
                    handleAnswerOptionClick(option.isCorrect, index)
                  }
                  disabled={selectedOption !== null}
                >
                  {option.answerText}
                </button>
              </div>
            ))}
          </div>
          {showNextButton &&
            (currentQuestion < questions.length - 1 ? (
              <button className="next-button" onClick={handleNextQuestion}>
                Next
              </button>
            ) : (
              <button className="next-button" onClick={handleSubmit}>
                Submit
              </button>
            ))}
        </>
      )}
    </div>
  );
};

export default Quiz;
