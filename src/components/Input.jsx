import React from "react";
import "./Input.css";

const Input = () => {
  return (
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
  );
};

export default Input;
