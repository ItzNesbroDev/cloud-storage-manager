import React, { useEffect, useState } from "react";
import { FaPlus, FaGoogleDrive, FaMicrosoft } from "react-icons/fa";
import AddStorage from "./addStorage";

const Sidebar = () => {
  const [storages, setStorages] = useState([]);

  const handlePopup = () => {
    localStorage.setItem('showPopup', true)
  }

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
        {storages.map((storage, index) => (
          <div key={index} className="flex items-center text-white mb-4">
            {storage.type === "drive" && <FaGoogleDrive className="mr-2" />}
            {storage.type === "onedrive" && <FaMicrosoft className="mr-2" />}
            <span>{storage.name}</span>
          </div>
        ))}
      </div>
      <AddStorage onStorageAdded={handleStorageAdd} />
    </>
  );
};

export default Sidebar;

