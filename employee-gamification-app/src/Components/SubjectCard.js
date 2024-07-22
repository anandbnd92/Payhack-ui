import React from "react";
import { Link } from "react-router-dom";

function SubjectCard({ subject }) {
  return (
    <Link to={`/quiz/${subject.toLowerCase()}`}>
      <div
        style={{
          border: "1px solid #ccc",
          padding: "20px",
          borderRadius: "8px",
          textAlign: "center",
        }}
      >
        <h2>{subject}</h2>
      </div>
    </Link>
  );
}

export default SubjectCard;
