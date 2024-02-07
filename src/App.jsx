import React from "react";
import Sidebar from "./components/Sidebar";
import "./app.css";

const App = () => {
  return (
    <div>
      <Sidebar />
      <div className="center">
        <div className="input-container">
          <input
            className="input"
            type="text"
            placeholder="Type your command messages."
          />
          <button className="send-btn">Send</button>
        </div>
      </div>
    </div>
  );
};

export default App;
