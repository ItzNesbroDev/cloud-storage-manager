import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { API_URL } from "../api";

const SubDir = () => {
  const [files, setFiles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { remote_name, file_name } = useParams();

  useEffect(() => {
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

    fetchFiles();
  }, [remote_name, file_name]);

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

  return (
    <div>
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
        <div className="mt-5 grid grid-cols-4 gap-6">
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
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SubDir;
