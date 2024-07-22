import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Quiz from "../Components/Quiz";

const questions = {
  react: [
    {
      questionText: "What is JSX?",
      answerOptions: [
        { answerText: "A JavaScript syntax extension", isCorrect: true },
        { answerText: "A type of CSS", isCorrect: false },
        { answerText: "A version of HTML", isCorrect: false },
        { answerText: "None of the above", isCorrect: false },
      ],
    },
    {
      questionText: "What is a React component?",
      answerOptions: [
        { answerText: "A part of a React application", isCorrect: true },
        { answerText: "A type of variable", isCorrect: false },
        { answerText: "A database query", isCorrect: false },
        { answerText: "None of the above", isCorrect: false },
      ],
    },
    {
      questionText: "What is the use of useState in React?",
      answerOptions: [
        { answerText: "To manage component state", isCorrect: true },
        { answerText: "To fetch data from an API", isCorrect: false },
        { answerText: "To style components", isCorrect: false },
        { answerText: "None of the above", isCorrect: false },
      ],
    },
    {
      questionText: "What is a React hook?",
      answerOptions: [
        {
          answerText: "A special function to manage state and side effects",
          isCorrect: true,
        },
        { answerText: "A type of React component", isCorrect: false },
        { answerText: "A CSS class", isCorrect: false },
        { answerText: "None of the above", isCorrect: false },
      ],
    },
    {
      questionText: "What is the virtual DOM?",
      answerOptions: [
        {
          answerText: "A representation of the actual DOM in memory",
          isCorrect: true,
        },
        { answerText: "A type of database", isCorrect: false },
        { answerText: "A part of a React component", isCorrect: false },
        { answerText: "None of the above", isCorrect: false },
      ],
    },
  ],
  "node.js": [
    {
      questionText: "What is Node.js?",
      answerOptions: [
        { answerText: "A JavaScript runtime", isCorrect: true },
        { answerText: "A type of database", isCorrect: false },
        { answerText: "A front-end framework", isCorrect: false },
        { answerText: "None of the above", isCorrect: false },
      ],
    },
    {
      questionText: "What does npm stand for?",
      answerOptions: [
        { answerText: "Node Package Manager", isCorrect: true },
        { answerText: "New Programming Method", isCorrect: false },
        { answerText: "Network Protocol Manager", isCorrect: false },
        { answerText: "None of the above", isCorrect: false },
      ],
    },
    {
      questionText: "What is the purpose of the package.json file?",
      answerOptions: [
        {
          answerText: "To manage project dependencies and scripts",
          isCorrect: true,
        },
        { answerText: "To configure a web server", isCorrect: false },
        { answerText: "To style a web page", isCorrect: false },
        { answerText: "None of the above", isCorrect: false },
      ],
    },
    {
      questionText: "What is Express.js?",
      answerOptions: [
        {
          answerText: "A web application framework for Node.js",
          isCorrect: true,
        },
        { answerText: "A type of database", isCorrect: false },
        { answerText: "A CSS framework", isCorrect: false },
        { answerText: "None of the above", isCorrect: false },
      ],
    },
    {
      questionText: "How do you import a module in Node.js?",
      answerOptions: [
        { answerText: "Using the require function", isCorrect: true },
        { answerText: "Using the import statement", isCorrect: false },
        { answerText: "Using the include function", isCorrect: false },
        { answerText: "None of the above", isCorrect: false },
      ],
    },
  ],
  java: [
    {
      questionText: "What is Java?",
      answerOptions: [
        { answerText: "A programming language", isCorrect: true },
        { answerText: "A type of coffee", isCorrect: false },
        { answerText: "An operating system", isCorrect: false },
        { answerText: "None of the above", isCorrect: false },
      ],
    },
    {
      questionText: "What is JVM?",
      answerOptions: [
        { answerText: "Java Virtual Machine", isCorrect: true },
        { answerText: "Java Version Manager", isCorrect: false },
        { answerText: "Java Virtual Memory", isCorrect: false },
        { answerText: "None of the above", isCorrect: false },
      ],
    },
    {
      questionText: "What is inheritance in Java?",
      answerOptions: [
        {
          answerText:
            "A mechanism where one class acquires the properties of another",
          isCorrect: true,
        },
        { answerText: "A process of overriding a method", isCorrect: false },
        { answerText: "A type of exception", isCorrect: false },
        { answerText: "None of the above", isCorrect: false },
      ],
    },
    {
      questionText: "What is a constructor?",
      answerOptions: [
        {
          answerText: "A special method used to initialize objects",
          isCorrect: true,
        },
        { answerText: "A function to destroy objects", isCorrect: false },
        { answerText: "A type of variable", isCorrect: false },
        { answerText: "None of the above", isCorrect: false },
      ],
    },
    {
      questionText: "What is polymorphism?",
      answerOptions: [
        {
          answerText: "The ability of an object to take on many forms",
          isCorrect: true,
        },
        { answerText: "The process of creating an object", isCorrect: false },
        { answerText: "A type of inheritance", isCorrect: false },
        { answerText: "None of the above", isCorrect: false },
      ],
    },
  ],
};

const QuizPage = () => {
  const { subject } = useParams();
  const [previousScore, setPreviousScore] = useState(null);
  const navigate = useNavigate();

  const subjectQuestions = questions[subject];

  useEffect(() => {
    const savedScore = localStorage.getItem(`${subject}_score`);
    if (savedScore) {
      setPreviousScore(savedScore);
    }
  }, [subject]);

  if (!subjectQuestions) {
    return <div>Invalid subject selected.</div>;
  }

  const handleQuizSubmit = (score) => {
    alert(`Quiz submitted! Your score is ${score}.`);
    navigate("/scoreboard", { state: { score } });
  };

  if (previousScore !== null) {
    return (
      <div>
        <h2>You have already attempted this quiz.</h2>
        <p>Your previous score: {previousScore}</p>
        <button
          onClick={() =>
            navigate("/scoreboard", { state: { score: previousScore } })
          }
        >
          Go to Scoreboard
        </button>
      </div>
    );
  }

  return (
    <div>
      <Quiz
        questions={subjectQuestions}
        subject={subject}
        onSubmit={handleQuizSubmit}
      />
    </div>
  );
};

export default QuizPage;
