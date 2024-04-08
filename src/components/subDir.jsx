import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { API_URL } from "../api";
import { FaTimes, FaBars } from "react-icons/fa";

const SubDir = () => {
  const [files, setFiles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [action, setAction] = useState(null); // track selected action (move, copy, delete)
  const [moveToRemote, setMoveToRemote] = useState("");
  const [moveToPath, setMoveToPath] = useState("");
  const [copyToPath, setCopyToPath] = useState("");
  const [copyToRemote, setCopyToRemote] = useState("");
  const navigate = useNavigate();
  const { remote_name, file_name } = useParams();

  const fetchFiles = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${API_URL}/list_directory`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ remote_name, file_name }),
      });
      const data = await response.json();
      if (Array.isArray(data.files_and_folders)) {
        setFiles(data.files_and_folders);
      } else {
        setFiles([data.files_and_folders]);
      }
    } catch (error) {
      console.error("Error fetching files:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleMove = async () => {
    if (action === "move" && selectedFile) {
      try {
        const response = await fetch(`${API_URL}/subdir/move_file`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            remote_name,
            file_name,
            selected_file: selectedFile,
            destination_remote: moveToRemote,
            destination_path: moveToPath || "",
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
    if (action === "copy" && selectedFile) {
      try {
        const response = await fetch(`${API_URL}/subdir/copy_file`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            remote_name,
            file_name,
            selected_file: selectedFile,
            destination_remote: copyToRemote,
            destination_path: copyToPath || "",
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

  const getFileIcon = (fileName) => {
    if (fileName && fileName.endsWith("/")) {
      return "/folder.png";
    } else {
      return "/file.png";
    }
  };

  const handleGoBack = () => {
    navigate("/");
  };

  const shortenFileName = (fileName) => {
    if (fileName && fileName.length > 20) {
      return fileName.slice(0, 20) + "...";
    } else {
      return fileName;
    }
  };

  const handleBarsClick = (file) => {
    setSelectedFile(file);
  };

  const handleActionClick = (action) => {
    setAction(action);
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
    fetchFiles();
  }, [remote_name, file_name]);

  return (
    <div className="h-screen">
      <div className="p-5">
        <button
          onClick={handleGoBack}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Go Back
        </button>
      </div>
      {isLoading ? (
        <div className="flex items-center justify-center h-screen">
          <div
            className="text-black flex items-center justify-center h-32 w-32 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-black"
            role="status"
          >
            <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
              Loading...
            </span>
          </div>
        </div>
      ) : (
        <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {files.map((file, index) => (
            <div
              key={index}
              className="flex flex-col items-center transition duration-300 ease-in-out"
            >
              <img
                src={getFileIcon(file)}
                alt={file}
                className="w-20 h-20 rounded-lg mb-4 cursor-pointer hover:opacity-80"
              />
              <span className="text-lg text-center">
                {shortenFileName(file)}
              </span>
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
                    className="absolute right-0 mt-4 bg-white border border-gray-200 rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-10"
                    style={{
                      width: "300px",
                      left: "50%",
                      transform: "translateX(-50%)",
                    }}
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
  );
};

export default SubDir;
