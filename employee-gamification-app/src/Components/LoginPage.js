// import React, { useState } from "react";
// import axios from "axios";
// import Swal from "sweetalert2";
// import "../Styles/LoginPage.css"; // Add your CSS for styling

// function LoginPage() {
//   const [username, setUsername] = useState("");
//   const [password, setPassword] = useState("");

//   const handleLogin = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await axios.post("http://localhost:8081/login", {
//         username,
//         password,
//       });
//       localStorage.setItem("authToken", response.data.token); // Save JWT or session token
//       Swal.fire({
//         title: "Login Successful!",
//         text: "You are now logged in.",
//         icon: "success",
//         confirmButtonText: "OK",
//       }).then(() => {
//         window.location.href = "/"; // Redirect to home or dashboard
//       });
//     } catch (error) {
//       console.error("Login error:", error);
//       Swal.fire({
//         title: "Login Failed!",
//         text: "Invalid username or password.",
//         icon: "error",
//         confirmButtonText: "OK",
//       });
//     }
//   };

//   return (
//     <div className="login-page">
//       <h2>Login</h2>
//       <form onSubmit={handleLogin}>
//         <label>
//           Username:
//           <input
//             type="text"
//             value={username}
//             onChange={(e) => setUsername(e.target.value)}
//             required
//           />
//         </label>
//         <label>
//           Password:
//           <input
//             type="password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             required
//           />
//         </label>
//         <button type="submit">Login</button>
//       </form>
//     </div>
//   );
// }

// export default LoginPage;
