import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faImage,
  faCogs,
  faDatabase,
  faFileExport,
} from "@fortawesome/free-solid-svg-icons";

const Tab = ({ activeTab, onTabClick }) => {
  return (
    <div className="tab-container">
      <button
        className={`tab ${activeTab === "images" ? "active" : ""}`}
        onClick={() => onTabClick("images")}
      >
        <FontAwesomeIcon icon={faImage} />
      </button>
      <button
        className={`tab ${activeTab === "settings" ? "active" : ""}`}
        onClick={() => onTabClick("settings")}
      >
        <FontAwesomeIcon icon={faCogs} />
      </button>
      <button
        className={`tab ${activeTab === "firebase" ? "active" : ""}`}
        onClick={() => onTabClick("firebase")}
      >
        <FontAwesomeIcon icon={faDatabase} />
      </button>
      <button
        className={`tab ${activeTab === "export" ? "active" : ""}`}
        onClick={() => onTabClick("export")}
      >
        <FontAwesomeIcon icon={faFileExport} />
      </button>
    </div>
  );
};

export default Tab;
