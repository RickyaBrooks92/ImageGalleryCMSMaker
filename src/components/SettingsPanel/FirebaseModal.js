import React, { useState } from "react";
import { toast } from "react-toastify";
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import "../../css/FirebaseModal.css";
import "react-toastify/dist/ReactToastify.css";

const FirebaseModal = ({
  firebaseConfig,
  handleFirebaseConfigChange,
  onClose,
  onSave,
}) => {
  const [loading, setLoading] = useState(false);

  const handleSave = async () => {
    setLoading(true);
    try {
      const app = initializeApp(firebaseConfig);
      // We don't need to assign storage to a variable if it's not used
      getStorage(app);
      // If we reach this point, the configuration is valid
      toast.success("Connected to Firebase successfully!", {
        position: "top-right",
      });
      setLoading(false);
      onSave(firebaseConfig); // Pass the valid configuration back to the parent component
      onClose();
    } catch (error) {
      toast.error(
        "Failed to connect to Firebase. Please check your configuration.",
        { position: "top-right" }
      );
      setLoading(false);
    }
  };

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
        <button
          className="firebase-modal-save"
          onClick={handleSave}
          disabled={loading}
        >
          {loading ? "Connecting..." : "Save"}
        </button>
      </div>
    </div>
  );
};

export default FirebaseModal;
