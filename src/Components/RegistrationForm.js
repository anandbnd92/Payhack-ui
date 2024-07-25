import React, { useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import "../Styles/RegistrationForm.css";

const RegistrationForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length === 0) {
      try {
        const response = await axios.post("http://localhost:8081/register", {
          username,
          password,
        });

        if (response.status === 200) {
          Swal.fire({
            title: "Registration Successful!",
            text: "You can now log in with your credentials.",
            icon: "success",
            confirmButtonText: "OK",
          }).then(() => {
            // Redirect to login page after successful registration
            window.location.href = "/login";
          });
        }
      } catch (error) {
        console.error("Registration error:", error);
        Swal.fire({
          title: "Registration Failed!",
          text: "An error occurred while registering. Please try again.",
          icon: "error",
          confirmButtonText: "OK",
        });
      }
    } else {
      setErrors(validationErrors);
    }
  };

  const validateForm = () => {
    const errors = {};
    if (!username) errors.username = "Username is required";
    if (!password) errors.password = "Password is required";
    return errors;
  };

  return (
    <div className="registration-form-container">
      <div className="registration-form-box">
        <h2>Register</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Username</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            {errors.username && <p className="error">{errors.username}</p>}
          </div>
          <div className="form-group">
            <label>Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            {errors.password && <p className="error">{errors.password}</p>}
          </div>
          <button type="submit">Register</button>
        </form>
      </div>
    </div>
  );
};

export default RegistrationForm;
