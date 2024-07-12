import React from "react";
import "../../css/FirebaseModal.css";

const FirebaseModal = ({
  firebaseConfig,
  handleFirebaseConfigChange,
  onClose,
}) => {
  return (
    <div className="firebase-modal">
      <div className="firebase-modal-content">
        <span className="firebase-modal-close" onClick={onClose}>
          &times;
        </span>
        <h2>Firebase Configuration</h2>
        <div className="firebase-input-group">
          <label>API Key</label>
          <input
            type="text"
            name="apiKey"
            value={firebaseConfig.apiKey}
            onChange={handleFirebaseConfigChange}
          />
        </div>
        <div className="firebase-input-group">
          <label>Auth Domain</label>
          <input
            type="text"
            name="authDomain"
            value={firebaseConfig.authDomain}
            onChange={handleFirebaseConfigChange}
          />
        </div>
        <div className="firebase-input-group">
          <label>Project ID</label>
          <input
            type="text"
            name="projectId"
            value={firebaseConfig.projectId}
            onChange={handleFirebaseConfigChange}
          />
        </div>
        <div className="firebase-input-group">
          <label>Storage Bucket</label>
          <input
            type="text"
            name="storageBucket"
            value={firebaseConfig.storageBucket}
            onChange={handleFirebaseConfigChange}
          />
        </div>
        <div className="firebase-input-group">
          <label>Messaging Sender ID</label>
          <input
            type="text"
            name="messagingSenderId"
            value={firebaseConfig.messagingSenderId}
            onChange={handleFirebaseConfigChange}
          />
        </div>
        <div className="firebase-input-group">
          <label>App ID</label>
          <input
            type="text"
            name="appId"
            value={firebaseConfig.appId}
            onChange={handleFirebaseConfigChange}
          />
        </div>
        <div className="firebase-input-group">
          <label>Measurement ID</label>
          <input
            type="text"
            name="measurementId"
            value={firebaseConfig.measurementId}
            onChange={handleFirebaseConfigChange}
          />
        </div>
        <button className="firebase-modal-save" onClick={onClose}>
          Save
        </button>
      </div>
    </div>
  );
};

export default FirebaseModal;
