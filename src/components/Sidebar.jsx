import React, { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import "./Sidebar.css";
import Center from "./Center";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("input");

  const toggleSidebar = () => {
    setIsOpen((prevIsOpen) => !prevIsOpen);
  };

  const handleOptionChange = (option) => {
    setSelectedOption(option);
    setIsOpen(false); // Close sidebar after selecting an option
  };

  const handleGdriveClick = () => {
    setSelectedOption("gdrive");
    setIsOpen(false);
  };

  const handleOnedriveClick = () => {
    setSelectedOption("onedrive");
    setIsOpen(false);
  };

  const handleInputClick = () => {
    setSelectedOption("input");
    setIsOpen(false);
  };

  return (
    <>
      <div className={`sidebar ${isOpen ? "open" : ""}`}>
        <div className="sidebar-header">
          <div className="hamburger-menu" onClick={toggleSidebar}>
            {isOpen ? <FaTimes /> : <FaBars />}
          </div>
          <h2>Menu</h2>
        </div>
        <div
          className="cloud-storages"
          style={{ display: isOpen ? "flex" : "none" }}
        >
          <button className="gdrive" onClick={() => handleGdriveClick()}>
            <img
              src="https://img.icons8.com/color/48/000000/google-drive.png"
              alt="Google Drive"
              className="gdrive-icon"
            />
            <h2>Google Drive</h2>
          </button>
          <button className="onedrive" onClick={() => handleOnedriveClick()}>
            <img
              src="https://img.icons8.com/color/13638/000000/skydrive.png"
              alt="OneDrive"
              className="onedrive-icon"
            />
            <h2>OneDrive</h2>
          </button>
          {(selectedOption === "onedrive" || selectedOption === "gdrive") && (
            <button className="chat" onClick={() => handleInputClick()}>
              <img
                src="https://img.icons8.com/color/48/000000/chat.png"
                alt="Go Back"
                className="chat-icon"
              />
              <h2>Go Back To Chat</h2>
            </button>
          )}
        </div>
        {isOpen && (
          <button className="close-btn" onClick={toggleSidebar}>
            <FaTimes />
            Close
          </button>
        )}
      </div>
      <Center selectedOption={selectedOption} />
    </>
  );
};

export default Sidebar;
