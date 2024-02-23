import React, { useState, useEffect } from "react";

const ChatSection = ({ selectedRemote }) => {
  const [files, setFiles] = useState([]);

  const fetchFiles = async () => {
    try {
      const response = await fetch("http://127.0.0.1:3000/list_remote", {
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
        {selectedRemote && (
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
