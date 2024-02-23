import React, { useEffect, useState } from "react";
import {
  FaPlus,
  FaGoogleDrive,
  FaMicrosoft,
  FaBackward,
  FaTrash,
} from "react-icons/fa";
import AddStorage from "./addStorage";
import ChatSection from "./Chat";
import axios from "axios";

const Sidebar = () => {
  const [storages, setStorages] = useState([]);
  const [selectedRemote, setSelectedRemote] = useState(null);

  const handlePopup = () => {
    localStorage.setItem("showPopup", true);
  };

  useEffect(() => {
    const storedStorages = JSON.parse(localStorage.getItem("storages"));
    if (storedStorages) {
      setStorages(storedStorages);
    }
  }, []);

  const handleStorageAdd = (name, type) => {
    const newStorage = { name, type };
    const updatedStorages = [...storages, newStorage];
    setStorages(updatedStorages);
    localStorage.setItem("storages", JSON.stringify(updatedStorages));
  };

  const handleRemoteClick = (remote) => {
    setSelectedRemote(remote);
  };

  const handleGoBack = () => {
    setSelectedRemote(null);
  };

  const handleStorageDelete = (index, name) => {
    const updatedStorages = [...storages];
    updatedStorages.splice(index, 1);
    setStorages(updatedStorages);
    localStorage.setItem("storages", JSON.stringify(updatedStorages));
    axios
      .post(
        `http://127.0.0.1:3000/delete_remote`,
        { remote_name: name },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        if (response.status === 200) {
          alert(`Deleted ${storages[index].name} Successfully`);
        } else {
          alert(response.data);
        }
      })
      .catch((error) => console.error("Error:", error));
  };

  return (
    <>
      <div className="fixed inset-y-0 left-0 bg-slate-800 w-64 py-6 px-4">
        <h1 className="text-2xl font-bold text-white mb-8">Storages</h1>
        <button
          onClick={handlePopup}
          className="flex items-center text-white mb-4 font-bold"
        >
          <FaPlus className="mr-2" />
          Add Storage
        </button>
        {selectedRemote && (
          <button
            onClick={handleGoBack}
            className="text-white mb-4 flex items-center font-bold"
          >
            <FaBackward className="mr-2" />
            <span>Go Back to Chat</span>
          </button>
        )}
        {storages.map((storage, index) => (
          <div
            key={index}
            className="flex items-center text-white mb-4"
            onClick={() => handleRemoteClick(storage)}
          >
            {storage.type === "drive" && <FaGoogleDrive className="mr-2" />}
            {storage.type === "onedrive" && <FaMicrosoft className="mr-2" />}
            <span>{storage.name}</span>
            <FaTrash
              className="ml-auto cursor-pointer"
              onClick={() => handleStorageDelete(index, storage.name)}
            />
          </div>
        ))}
      </div>
      <ChatSection selectedRemote={selectedRemote} />
      <AddStorage onStorageAdded={handleStorageAdd} />
    </>
  );
};

export default Sidebar;
