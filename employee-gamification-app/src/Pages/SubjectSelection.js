import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaReact, FaNodeJs, FaJava } from "react-icons/fa";
import axios from "axios";
import "../Styles/SubjectSelection.css";

// Define icons separately
const icons = {
  React: <FaReact />,
  Nodejs: <FaNodeJs />,
  Java: <FaJava />,
};

function SubjectSelection() {
  const [subjects, setSubjects] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8081/subjects")
      .then((response) => {
        setSubjects(response.data);
      })
      .catch((error) => {
        console.error("Error fetching subjects:", error);
      });
  }, []);

  const handleSubjectClick = (subjectName) => {
    localStorage.setItem("selectedSubject", subjectName);
  };

  return (
    <div>
      <h2 className="blink-move">Select a Subject</h2>
      <div className="subject-cards">
        {subjects.map((subject, index) => (
          <Link
            to={`/quiz/${subject.title}`}
            key={index}
            style={{ textDecoration: "none" }}
            onClick={() => handleSubjectClick(subject.title)}
          >
            <div className="subject-card">
              <div className="icon-container">
                {icons[subject.title] || <FaReact />} {/* Default icon */}
              </div>
              <h2>{subject.title}</h2>
              <p>Click to start quiz</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default SubjectSelection;
