import React from "react";
import "../css/Tab.css";

const Tab = ({ activeTab, onTabClick }) => {
  return (
    <div className="tab-container">
      <button
        className={`tab ${activeTab === "images" ? "active" : ""}`}
        onClick={() => onTabClick("images")}
      >
        Images
      </button>
      <button
        className={`tab ${activeTab === "settings" ? "active" : ""}`}
        onClick={() => onTabClick("settings")}
      >
        Settings
      </button>
      <button
        className={`tab ${activeTab === "export" ? "active" : ""}`}
        onClick={() => onTabClick("export")}
      >
        Exportt
      </button>
    </div>
  );
};

export default Tab;
