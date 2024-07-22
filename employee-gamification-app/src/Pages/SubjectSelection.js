import React from "react";
import { Link } from "react-router-dom";
import { FaReact, FaNodeJs, FaJava } from "react-icons/fa";
import "../Styles/SubjectSelection.css";

const subjects = [
  { name: "React", icon: <FaReact /> },
  { name: "Node.js", icon: <FaNodeJs /> },
  { name: "Java", icon: <FaJava /> },
];

function SubjectSelection() {
  return (
    <div>
      <h2 className="blink-move">Select a Subject</h2>
      <div className="subject-cards">
        {subjects.map((subject, index) => (
          <Link
            to={`/quiz/${subject.name.toLowerCase()}`}
            key={index}
            style={{ textDecoration: "none" }}
          >
            <div className="subject-card">
              <div className="icon-container">{subject.icon}</div>
              <h2>{subject.name}</h2>
              <p>Click to start quiz</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default SubjectSelection;
