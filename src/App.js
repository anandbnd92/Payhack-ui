import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
  useLocation,
} from "react-router-dom";
import Home from "./Pages/Home";
import SubjectSelection from "./Pages/SubjectSelection";
import QuizPage from "./Pages/QuizPage";
import ScoreboardPage from "./Pages/ScoreboardPage";
import Sidebar from "./Components/Sidebar";
import "./App.css";
import SpinWheel from "./Components/SpinWheel";
import LoginPage from "./Components/LoginPage";
import RegistrationForm from "./Components/RegistrationForm";
import Logout from "./Components/Logout";

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

function AppContent() {
  const token = localStorage.getItem("authToken");
  const location = useLocation();
  const hideSidebarPaths = ["/", "/login", "/register"];

  return (
    <div>
      {!hideSidebarPaths.includes(location.pathname) && <Sidebar />}
      <div className="content-container">
        <Routes>
          <Route path="/register" element={<RegistrationForm />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/" element={<Home />} />
          <Route
            path="/subjects"
            element={
              <PrivateRoute token={token}>
                <SubjectSelection />
              </PrivateRoute>
            }
          />
          <Route
            path="/quiz/:subject"
            element={
              <PrivateRoute token={token}>
                <QuizPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/scoreboard"
            element={
              <PrivateRoute token={token}>
                <ScoreboardPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/spinwheel"
            element={
              <PrivateRoute token={token}>
                <SpinWheel />
              </PrivateRoute>
            }
          />
          <Route
            path="/logout"
            element={
              <PrivateRoute token={token}>
                <Logout />
              </PrivateRoute>
            }
          />
        </Routes>
      </div>
    </div>
  );
}

function PrivateRoute({ token, children }) {
  return token ? children : <Navigate to="/login" />;
}

export default App;
