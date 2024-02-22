import React from "react";
import Sidebar from "./components/Sidebar";
import ChatSection from "./components/Chat";
import AddStorage from "./components/addStorage";

const App = () => {
  return (
    <div className="flex h-screen">
      <Sidebar />
      <ChatSection />
    </div>
  );
};

export default App;
