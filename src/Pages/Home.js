import React from "react";
import { Link } from "react-router-dom";
import "../App.css";
import {
  FaUsers,
  FaStar,
  FaChartLine,
  FaBook,
  FaHeartbeat,
} from "react-icons/fa";

function Home() {
  return (
    <div>
      {/* Header Section */}
      <div className="header">
        <img src="/images/logo1.jpeg" alt="Logo" className="logo" />
        <h1>
          Welcome to Extra-Milers{" "}
          <sub style={{ fontSize: "15px" }}>
            Your Partner in Employee Engagement
          </sub>
        </h1>
        <div className="nav-links">
          <Link to="/login">Login</Link>
          <Link to="/register" className="register-link">
            Register
          </Link>
        </div>
      </div>

      {/* Body Section */}
      <div className="body">
        <p>
          At Extra-Milers, we provide innovative solutions to enhance employee
          satisfaction, boost morale, and foster a positive work environment.
          Our platform offers a range of features designed to engage and
          motivate your team:
        </p>

        {/* Key Features Overview */}
        <div className="features">
          <div className="feature-item">
            <FaUsers size={50} />
            <h3>Communication Tools</h3>
            <p>
              Facilitate seamless communication with chat, team channels, and
              announcements.
            </p>
          </div>
          <div className="feature-item">
            <FaStar size={50} />
            <h3>Recognition & Rewards</h3>
            <p>
              Celebrate achievements and boost morale with recognition programs
              and rewards.
            </p>
          </div>
          <div className="feature-item">
            <FaChartLine size={50} />
            <h3>Performance Management</h3>
            <p>
              Set goals, track progress, and conduct performance reviews to
              drive success.
            </p>
          </div>
          <div className="feature-item">
            <FaBook size={50} />
            <h3>Learning & Development</h3>
            <p>
              Access training programs, webinars, and resources for continuous
              learning.
            </p>
          </div>
          <div className="feature-item">
            <FaHeartbeat size={50} />
            <h3>Wellness Programs</h3>
            <p>
              Promote health and well-being with wellness initiatives and
              work-life balance support.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
