import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Center.css";
import Input from "./Input";
import { FaTimes } from "react-icons/fa";

const Center = ({ selectedOption }) => {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [popupOpen, setPopupOpen] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    let drive = "";
    if (selectedOption === "gdrive") {
      drive = "gdrive";
    } else if (selectedOption === "onedrive") {
      drive = "onedrive";
    } else if (selectedOption === "addStorage") {
      setPopupOpen(true);
    }
    if (drive) {
      setLoading(true);
      axios
        .get(
          `https://3000-itznesbrode-cloudstorag-tr37zxmuz1g.ws-us108.gitpod.io/listFiles?drive=${drive}`
        )
        .then((response) => {
          setFiles(response.data);
          setLoading(false);
        })
        .catch((error) => {
          console.error("There was a problem fetching the files:", error);
          setError(error.message);
          setLoading(false);
        });
    }
  }, [selectedOption]);

  const isFolder = (fileName) => {
    return fileName.includes("/");
  };

  const renderFolders = () => {
    let renderedFolders = {};
    return files.map((file, index) => {
      if (isFolder(file)) {
        const folderName = file.split("/")[0];
        if (!renderedFolders[folderName]) {
          renderedFolders[folderName] = true;
          return (
            <div key={index} className="file-item folder">
              <img src="folder.png" alt="Folder" className="file-icon" />
              <span>{folderName}</span>
            </div>
          );
        } else {
          return null;
        }
      } else {
        return null;
      }
    });
  };

  const renderFiles = () => {
    return files.map((file, index) => {
      if (!isFolder(file)) {
        return (
          <div key={index} className="file-item file">
            <img src="file.png" alt="File" className="file-icon" />
            <span>{file}</span>
          </div>
        );
      } else {
        return null;
      }
    });
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error">Error: {error}</div>;
  }

  const handleGdriveClick = () => {
    axios
      .get(
        "https://3000-itznesbrode-cloudstorag-tr37zxmuz1g.ws-us108.gitpod.io/createGDriveConfig"
      )
      .then((response) => {
        // Handle success
        console.log("Auth URL:", response.data);
      })
      .catch((error) => {
        // Handle error
        console.error("Error while fetching auth URL:", error);
      });
  };
  const handleOnedriveClick = () => {};

  return (
    <div className="center-container">
      {selectedOption !== "input" ||
        ("addStorage" && (
          <div className="center-grid">
            {renderFolders()}
            {renderFiles()}
          </div>
        ))}
      {selectedOption === "input" && <Input />}
      <div style={{ display: popupOpen ? "flex" : "none" }} className="popup">
        <div className="popup-content">
          <div className="popup-header">
            <h2>Add New Storage</h2>
            <button
              className="popup-close-btn"
              onClick={() => setPopupOpen(false)}
            >
              <FaTimes />
            </button>
          </div>
          <button className="gdrive-add-btn" onClick={handleGdriveClick}>
            Google Drive
          </button>
          <button className="onedrive-add-btn" onClick={handleOnedriveClick}>
            OneDrive
          </button>
        </div>
      </div>
    </div>
  );
};

export default Center;
