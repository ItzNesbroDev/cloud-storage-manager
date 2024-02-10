import React from "react";
import { FaPlus, FaGoogleDrive, FaMicrosoft } from "react-icons/fa";

const Sidebar = () => {
  const handleLoginClick = () => {
    localStorage.setItem("showLogin", true);
  };
  return (
    <div className="fixed inset-y-0 left-0 bg-slate-800 w-64 py-6 px-4">
      <h1 className="text-2xl font-bold text-white mb-8">Storages</h1>
      <button
        onClick={handleLoginClick}
        className="flex items-center text-white mb-4 font-bold"
      >
        <FaPlus className="mr-2" />
        Add Storage
      </button>
      <div className="flex items-center text-white mb-4">
        <FaGoogleDrive className="mr-2" />
        Google Drive
      </div>
      <div className="flex items-center text-white">
        <FaMicrosoft className="mr-2" />
        OneDrive
      </div>
    </div>
  );
};

export default Sidebar;
