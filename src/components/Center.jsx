import React, { useState, useEffect } from "react";
import { API_URL } from "../api";
import { useNavigate } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";

const CenterSection = ({ selectedRemote }) => {
  const [files, setFiles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [action, setAction] = useState(null); // track selected action (move, copy, delete)
  const [moveToRemote, setMoveToRemote] = useState("");
  const [moveToPath, setMoveToPath] = useState("");
  const [copyToPath, setCopyToPath] = useState("");
  const [copyToRemote, setCopyToRemote] = useState("");
  const navigate = useNavigate();

  const fetchFiles = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${API_URL}/list_remote`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ remote_name: selectedRemote.name }),
      });
      const data = await response.json();
      setFiles(data.files_and_folders);
    } catch (error) {
      console.error("Error fetching files:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const getFileIcon = (fileName) => {
    return fileName.endsWith("/") ? "/folder.png" : "/file.png";
  };

  const handleFileClick = (file) => {
    if (file.endsWith("/")) {
      navigate(`/${selectedRemote.name}/${file}`);
    } else {
      setSelectedFile(file);
    }
  };

  const handleBarsClick = (file) => {
    setSelectedFile(file);
  };

  const handleActionClick = (action) => {
    setAction(action);
  };

  const handleMove = async () => {
    if (action === "move") {
      try {
        let destinationPath = "";
        if (moveToPath.trim() !== "") {
          destinationPath = moveToPath.trim();
          if (!destinationPath.endsWith("/")) {
            destinationPath += "/";
          }
        }
        if (destinationPath === "") {
          destinationPath = "/";
        }
        const response = await fetch(`${API_URL}/move_file`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            source_remote: selectedRemote.name,
            source_path: selectedFile,
            destination_remote: moveToRemote,
            destination_path:
              destinationPath +
              (selectedFile.endsWith("/") ? selectedFile.split("/").pop() : ""),
          }),
        });
        const data = await response.json();
        console.log(data.message);
        alert(data.message);
        setSelectedFile(null);
        setMoveToRemote("");
        setMoveToPath("");
        setAction(null);
        fetchFiles();
      } catch (error) {
        console.error("Error moving file:", error);
        alert("An error occurred while moving the file.");
      }
    }
  };

  const handleCopy = async () => {
    if (action === "copy") {
      try {
        let destinationPath = "";
        if (copyToPath.trim() !== "") {
          destinationPath = copyToPath.trim();
          if (!destinationPath.endsWith("/")) {
            destinationPath += "/";
          }
        }
        if (destinationPath === "") {
          destinationPath = "/";
        }
        const response = await fetch(`${API_URL}/copy_file`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            source_remote: selectedRemote.name,
            source_path: selectedFile,
            destination_remote: copyToRemote,
            destination_path:
              destinationPath +
              (selectedFile.endsWith("/") ? selectedFile.split("/").pop() : ""),
          }),
        });
        const data = await response.json();
        console.log(data.message);
        alert(data.message);
        setSelectedFile(null);
        setCopyToRemote("");
        setCopyToPath("");
        setAction(null);
        fetchFiles();
      } catch (error) {
        console.error("Error copying file:", error);
        alert("An error occurred while copying the file.");
      }
    }
  };

  const handleMoveToRemoteChange = (e) => {
    setMoveToRemote(e.target.value);
  };

  const handleMoveToPathChange = (e) => {
    setMoveToPath(e.target.value);
  };

  const handleCopyToRemoteChange = (e) => {
    setCopyToRemote(e.target.value);
  };

  const handleCopyToPathChange = (e) => {
    setCopyToPath(e.target.value);
  };

  useEffect(() => {
    if (selectedRemote) {
      fetchFiles();
    } else {
      setFiles([]);
    }
  }, [selectedRemote]);

  return (
    <div className="flex flex-col ml-64 w-full">
      <div className="flex-grow p-6">
        {!selectedRemote && (
          <div className="flex flex-col items-center justify-center space-y-4 text-center text-lg">
            <p className="font-light">
              Select a remote from the left sidebar to browse files
            </p>
            <p className="font-light">
              If this is your first time using the app, try creating a new
              storage
            </p>
          </div>
        )}
        {isLoading && (
          <div
            className="inline-block h-12 w-12 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"
            role="status"
          >
            <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
              Loading...
            </span>
          </div>
        )}
        {selectedRemote && !isLoading && (
          <div className="grid grid-cols-3 gap-4">
            {files.map((file, index) => (
              <div key={index} className="flex flex-col items-center">
                <div
                  onClick={() => handleFileClick(file)}
                  className="flex flex-col items-center"
                >
                  <img
                    src={getFileIcon(file)}
                    alt={file}
                    className="w-12 h-12 mb-2 cursor-pointer"
                  />
                  <span>{file}</span>
                </div>
                <div className="relative">
                  {selectedFile === file && (
                    <button
                      className="text-gray-600 mt-1 mr-2"
                      onClick={() => setSelectedFile(null)}
                    >
                      <FaTimes />
                    </button>
                  )}
                  {selectedFile !== file && (
                    <button
                      className="text-gray-600 mt-1 mr-2"
                      onClick={() => handleBarsClick(file)}
                    >
                      <FaBars />
                    </button>
                  )}
                  {selectedFile === file && (
                    <div
                      className="absolute right-0 mt-4 bg-white border border-gray-200 rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                      style={{ width: "400px" }}
                    >
                      <div className="py-4 px-6">
                        {action === "move" && (
                          <>
                            <input
                              type="text"
                              placeholder="Destination Remote"
                              value={moveToRemote}
                              onChange={handleMoveToRemoteChange}
                              className="w-full mb-4 px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                            />
                            <input
                              type="text"
                              placeholder="Destination Path | Optional"
                              value={moveToPath}
                              onChange={handleMoveToPathChange}
                              className="w-full mb-4 px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                            />
                          </>
                        )}
                        {action === "copy" && (
                          <>
                            <input
                              type="text"
                              placeholder="Destination Remote"
                              value={copyToRemote}
                              onChange={handleCopyToRemoteChange}
                              className="w-full mb-4 px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                            />
                            <input
                              type="text"
                              placeholder="Destination Path | Optional"
                              value={copyToPath}
                              onChange={handleCopyToPathChange}
                              className="w-full mb-4 px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                            />
                          </>
                        )}
                        <button
                          className="inline-block w-auto px-4 py-2 mr-2 text-sm text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none"
                          onClick={() => handleActionClick("move")}
                        >
                          Move
                        </button>
                        <button
                          className="inline-block w-auto px-4 py-2 mr-2 text-sm text-white bg-green-500 rounded-md hover:bg-green-600 focus:outline-none"
                          onClick={() => handleActionClick("copy")}
                        >
                          Copy
                        </button>
                        {action === "move" && (
                          <button
                            className="inline-block w-auto px-4 py-2 ml-2 text-sm text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none"
                            onClick={handleMove}
                          >
                            Confirm Move
                          </button>
                        )}
                        {action === "copy" && (
                          <button
                            className="inline-block w-auto px-4 py-2 ml-2 text-sm text-white bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none"
                            onClick={handleCopy}
                          >
                            Confirm Copy
                          </button>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default CenterSection;
