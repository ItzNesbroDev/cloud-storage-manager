import React, { useState, useEffect } from "react";
import { API_URL } from "../api";

const ChatSection = ({ selectedRemote }) => {
  const [files, setFiles] = useState([]);
  const [isLoading, setIsLoading] = useState(false); // New state for loading indicator

  const fetchFiles = async () => {
    setIsLoading(true); // Set loading state to true before fetching
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
      setIsLoading(false); // Set loading state to false after fetching
    }
  };

  useEffect(() => {
    if (selectedRemote) {
      fetchFiles();
    } else {
      setFiles([]);
    }
  }, [selectedRemote]);

  const getFileIcon = (fileName) => {
    if (fileName.endsWith("/")) {
      return "/folder.png";
    } else {
      return "/file.png";
    }
  };

  return (
    <div className="flex flex-col ml-64 w-full">
      <div className="flex-grow p-6">
        {!selectedRemote && (
          <div className="text-lg font-bold mb-4">Chat Section</div>
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
                <img
                  src={getFileIcon(file)}
                  alt={file}
                  className="w-16 h-16 mb-2"
                />
                <span>{file}</span>
              </div>
            ))}
          </div>
        )}
      </div>
      {!selectedRemote && (
        <div className="p-4">
          <input
            type="text"
            placeholder="Type your message..."
            className="w-full p-2 rounded-lg border"
          />
        </div>
      )}
    </div>
  );
};

export default ChatSection;
