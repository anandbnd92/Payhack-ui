import React, { useState } from "react";
import { FaHome, FaPencilAlt, FaBars } from "react-icons/fa";
import "../Styles/Sidebar.css";
import { GiTargetPrize } from "react-icons/gi";
import { PiSpinnerBallBold } from "react-icons/pi";
import { useNavigate } from "react-router-dom";
import { IoMdLogOut } from "react-icons/io";
const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/home");
  };
  const handleClickskill = () => {
    navigate("/subjects");
  };
  const handleClicksb = () => {
    navigate("/scoreboard");
  };
  const handleClicklogout = () => {
    navigate("/logout");
  };
  return (
    <div className={`sidebar ${isOpen ? "open" : ""}`}>
      <div className="toggle-btn" onClick={toggleSidebar}>
        <FaBars />
      </div>
      <div className="sidebar-content">
        <ul>
          <li onClick={handleClick}>
            <FaHome />

            <span> Home</span>
          </li>
          <li onClick={handleClickskill}>
            <FaPencilAlt />

            <span>Skills</span>
          </li>
          <li onClick={handleClicksb}>
            <GiTargetPrize />

            <span>Badges</span>
          </li>
          <li onClick={handleClicklogout}>
            <IoMdLogOut />

            <span>Logout</span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
