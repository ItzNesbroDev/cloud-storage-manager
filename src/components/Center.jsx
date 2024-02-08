import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Center.css";
import Input from "./Input";

const Center = ({ selectedOption }) => {
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    let drive = "";
    if (selectedOption === "gdrive") {
      drive = "gdrive";
    } else if (selectedOption === "onedrive") {
      drive = "onedrive";
    }
    if (drive) {
      setLoading(true);
      axios
        .get(`http://localhost:3000/listFiles?drive=${drive}`)
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

  return (
    <div className="center-container">
      {selectedOption !== "input" && (
        <div className="center-grid">
          {renderFolders()}
          {renderFiles()}
        </div>
      )}
      {selectedOption === "input" && <Input />}
    </div>
  );
};

export default Center;
