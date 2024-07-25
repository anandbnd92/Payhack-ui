import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Clear all localStorage items
    localStorage.clear();

    // Redirect to the home page
    navigate("/");
  }, [navigate]);

  return <div>Logging out...</div>;
};

export default Logout;
