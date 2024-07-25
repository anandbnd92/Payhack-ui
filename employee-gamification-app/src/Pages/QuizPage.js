import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import "../Styles/QuizPage.css";

function QuizPage() {
  const { subject } = useParams(); // Iam Retrieving the selected subject from URL
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptions, setSelectedOptions] = useState({});
  const [correctCount, setCorrectCount] = useState(0);

  useEffect(() => {
    const completedQuizzes =
      JSON.parse(localStorage.getItem("completedQuizzes")) || {};
    if (completedQuizzes[subject]) {
      navigate("/scoreboard"); // Redirect to scoreboard if quiz is completed
      return;
    }

    axios
      .get(`http://localhost:8081/questions/${subject}`)
      .then((response) => {
        setQuestions(response.data[subject] || []);
      })
      .catch((error) => {
        console.error("Error fetching questions:", error);
      });
  }, [subject, navigate]);

  const handleOptionSelect = (option, isCorrect) => {
    if (selectedOptions[currentQuestionIndex] === undefined) {
      // Only update if no option has been selected yet
      setSelectedOptions((prev) => ({
        ...prev,
        [currentQuestionIndex]: option,
      }));
      if (isCorrect) {
        setCorrectCount((prev) => prev + 1);
      }
      setTimeout(() => {
        if (currentQuestionIndex < questions.length - 1) {
          setCurrentQuestionIndex((prev) => prev + 1);
        }
      }, 100);
    }
  };

  const handleSubmit = () => {
    const results = JSON.parse(localStorage.getItem("quizResults")) || {};
    results[subject] = {
      correctCount,
      totalQuestions: questions.length,
      subject: subject,
    };
    localStorage.setItem("quizResults", JSON.stringify(results));

    const completedQuizzes =
      JSON.parse(localStorage.getItem("completedQuizzes")) || {};
    completedQuizzes[subject] = true;
    localStorage.setItem("completedQuizzes", JSON.stringify(completedQuizzes));

    const submissionData = {
      subject,
      totalQuestions: questions.length,
      correctCount,
      submittedUser: "user123", // I took sample user here
    };

    axios
      .post("http://localhost:8081/scores", submissionData)
      .then((response) => {
        Swal.fire({
          title: "Quiz Submitted!",
          text: `You got ${correctCount} out of ${questions.length} correct.`,
          icon: "success",
          confirmButtonText: "OK",
        }).then((result) => {
          if (result.isConfirmed) {
            navigate("/scoreboard"); // Redirect to scoreboard page
          }
        });
      })
      .catch((error) => {
        console.error("Error submitting score:", error);
        Swal.fire({
          title: "Error!",
          text: "There was an error submitting your score. Please try again.",
          icon: "error",
          confirmButtonText: "OK",
        });
      });
  };

  function handleCurrentQuestion(currentIndex) {
    return questions[currentIndex];
  }

  if (questions.length === 0) return <p>Loading questions...</p>;
  const currentQuestion = handleCurrentQuestion(currentQuestionIndex);
  const isLastQuestion = currentQuestionIndex === questions.length - 1;

  return (
    <div className="quiz-page">
      <h2>{subject} Quiz</h2>
      <div className="question-container">
        <p className="question-text">{currentQuestion.questionText}</p>
        <div className="options-container">
          {currentQuestion.answerOptions.map((option, index) => (
            <button
              key={index}
              onClick={() =>
                handleOptionSelect(option.answerText, option.correct)
              }
              className={`option-button ${
                selectedOptions[currentQuestionIndex] === option.answerText
                  ? "selected"
                  : ""
              }`}
              disabled={!!selectedOptions[currentQuestionIndex]}
            >
              {option.answerText}
            </button>
          ))}
        </div>
        <div className="navigation-buttons">
          {!isLastQuestion && (
            <button
              onClick={() => {
                if (currentQuestionIndex < questions.length - 1) {
                  setCurrentQuestionIndex((prev) => prev + 1);
                }
              }}
            >
              Next
            </button>
          )}
          {isLastQuestion && <button onClick={handleSubmit}>Submit</button>}
        </div>
      </div>
    </div>
  );
}

export default QuizPage;
