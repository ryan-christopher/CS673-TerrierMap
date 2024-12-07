import React from "react";

const ModeToggle = ({ currentMode, onChange }) => {
  return (
    <div className="mode-toggle">
      <button
        className={`toggle-button ${
          currentMode === "routed-foot" ? "active" : ""
        }`}
        onClick={() => onChange("routed-foot")}
      >
        🦶
      </button>
      <button
        className={`toggle-button ${
          currentMode === "routed-car" ? "active" : ""
        }`}
        onClick={() => onChange("routed-car")}
      >
        🚗
      </button>
      <style jsx>{`
        .mode-toggle {
          position: absolute;
          bottom: 100px;
          right: 10px;
          background-color: white;
          border-radius: 8px;
          box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
          padding: 10px;
          display: flex;
          flex-direction: column;
          gap: 8px;
          z-index: 400;
        }
        .toggle-button {
          background: none;
          border: none;
          border-radius: 500px;
          color: #bf6862;
          font-size: 14px;
          cursor: pointer;
          padding: 8px 8px;
          transition: background-color 0.3s, color 0.3s;
        }
        .toggle-button:hover {
          background-color: #bf6862;
          color: white;
        }
        .active {
          background-color: #bf6862;
          color: white;
        }
      `}</style>
    </div>
  );
};

export default ModeToggle;
