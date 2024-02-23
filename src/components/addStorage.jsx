import axios from "axios";
import React, { useEffect } from "react";
import { FaTimes } from "react-icons/fa";

const addStorage = ({ onStorageAdded }) => {
  const [show, setShow] = React.useState(false);
  const [remoteName, setRemoteName] = React.useState("");
  const [type, setType] = React.useState("drive");
  const [response, setResponse] = React.useState();

  useEffect(() => {
    const interval = setInterval(() => {
      const showPopup = localStorage.getItem("showPopup");
      if (showPopup === "true") {
        setShow(true);
      } else if (showPopup === "false") {
        setShow(false);
      }
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleClick = () => {
    if (!remoteName) {
      return;
    }
    axios
      .post("http://127.0.0.1:3000/create_remote", {
        remote_name: remoteName,
        remote_type: type,
      })
      .then((response) => {
        setResponse(response.data);
        if (response.status === 200) {
          setShow(false);
          localStorage.setItem("showPopup", false);
          alert(`Created ${remoteName} Successfully`);
          onStorageAdded(remoteName, type);
        } else {
          alert(response.data);
        }
      })
      .catch((error) => console.error("Error:", error));
  };

  const handleType = (e) => {
    setType(e.target.value);
  };

  return (
    <div>
      {show && (
        <div className="fixed z-10 inset-0 overflow-y-auto">
          <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
            <div
              className="fixed inset-0 transition-opacity"
              aria-hidden="true"
            >
              <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
            </div>
            <div
              className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6"
              role="dialog"
              aria-modal="true"
              aria-labelledby="modal-headline"
            >
              <div>
                <div className="mt-3 text-center sm:mt-5">
                  <h3
                    className="text-lg leading-6 font-medium text-gray-900"
                    id="modal-headline"
                  >
                    Add New Remote
                  </h3>
                  <button
                    onClick={() => {
                      localStorage.setItem("showPopup", false);
                      setShow(false);
                    }}
                    className="absolute top-0 right-0 mt-4 mr-4"
                  >
                    <FaTimes />
                  </button>
                  <div className="mt-2">
                    <input
                      type="text"
                      value={remoteName}
                      onChange={(e) => setRemoteName(e.target.value)}
                      className="w-full p-2 rounded-lg border"
                    />
                  </div>
                  <div className="mt-2">
                    <select
                      className="p-2 w-full"
                      value={type}
                      onChange={handleType}
                    >
                      <option value="drive">GDrive</option>
                      <option value="onedrive">OneDrive</option>
                    </select>
                    <p>{type}</p>
                  </div>
                  <div className="mt-5 sm:mt-6">
                    <button
                      onClick={handleClick}
                      type="button"
                      className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none sm:text-sm"
                    >
                      Add
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default addStorage;
