import React, { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { RiAddLine } from "react-icons/ri";
import "./Sidebar.css"; // Import your CSS file for styling

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={`sidebar ${isOpen ? "open" : ""}`}>
      <div className="sidebar-header">
        <div className="hamburger-menu" onClick={toggleSidebar}>
          {isOpen ? <FaTimes /> : <FaBars />}
        </div>
        <h2>Menu</h2>
      </div>
      <button
        style={{
          display: isOpen ? "flex" : "none",
          transition: "all 0.5s ease",
        }}
        className="add-storage-btn"
      >
        <RiAddLine className="add-icon" />
        Add Storage
      </button>
      {isOpen && (
        <button className="close-btn" onClick={toggleSidebar}>
          <FaTimes />
          Close
        </button>
      )}
    </div>
  );
};

export default Sidebar;
