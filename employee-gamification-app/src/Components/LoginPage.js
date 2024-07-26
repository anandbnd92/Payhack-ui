import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import "../Styles/LoginPage.css";

function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isUserExists, setIsUserExists] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:8081/userlogin", {
        username,
        password,
      });
      console.log("response", response);
      if (response.data.status === "s02") {
        Swal.fire({
          title: "Login Failed!",
          text: response.data.message,
          icon: "error",
          confirmButtonText: "OK",
        });
      } else if (response.data.status === "s01") {
        localStorage.setItem("authToken", response.data.token);
        localStorage.setItem("username", response.data.username);
        if (response.data.status === "s01") {
          Swal.fire({
            title: "Login Successful!",
            text: response.data.message,
            icon: "success",
            confirmButtonText: "OK",
          }).then(() => {
            navigate("/subjects");
          });
        }
      } else if (response.data.status === "s02") {
        Swal.fire({
          title: "Login Failed!",
          text: response.data.message,
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    } catch (error) {
      console.error("Login error:", error);
      Swal.fire({
        title: "Login Failed!",
        text: "Invalid Username and Password",
        icon: "error",
        confirmButtonText: "OK",
      });
    }
  };

  const handleRegister = () => {
    navigate("/register"); // Redirect to registration page
  };

  const checkUserExists = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8081/users/${username}`
      );
      setIsUserExists(response.data.exists);
    } catch (error) {
      console.error("Error checking user existence:", error);
      setIsUserExists(false);
    }
  };

  return (
    <div className="form-container">
      <div className="form-box">
        <h2>Login</h2>
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              onBlur={checkUserExists}
              placeholder="Username"
              required
            />
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              required
            />
          </div>
          <div className="button-container">
            <button type="submit">Login</button>
            <button
              onClick={handleRegister}
              className="register-button"
              disabled={!isUserExists} // Enable register button only if user exists
            >
              Register
            </button>
          </div>
        </form>
        {isUserExists && <p>User already exists, please login.</p>}
      </div>
    </div>
  );
}

export default LoginPage;
