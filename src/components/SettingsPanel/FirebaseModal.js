import React, { useState } from "react";
import {
  Modal,
  Box,
  Typography,
  TextField,
  Button,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { toast } from "react-toastify";
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";

const styles = {
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  modalContent: {
    backgroundColor: "#fff",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
    width: "80%",
    maxWidth: "500px",
  },
  title: {
    marginBottom: "20px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  formGroup: {
    marginBottom: "15px",
  },
  input: {
    width: "100%",
  },
  saveButton: {
    marginTop: "20px",
    display: "flex",
    justifyContent: "center",
  },
};

const FirebaseModal = ({
  firebaseConfig,
  handleFirebaseConfigChange,
  onClose,
  onSave,
}) => {
  const [config, setConfig] = useState(firebaseConfig);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setConfig((prevConfig) => ({ ...prevConfig, [name]: value }));
  };

  const handleSave = () => {
    try {
      const app = initializeApp(config);
      getStorage(app); // Try initializing storage to check the config
      toast.success("Connected to Firebase!");
      onSave(config);
      onClose();
    } catch (error) {
      toast.error("Error connecting to Firebase. Please check your config.");
    }
  };

  return (
    <Modal open onClose={onClose} sx={styles.modal}>
      <Box sx={styles.modalContent}>
        <Box sx={styles.title}>
          <Typography variant="h6">Firebase Configuration</Typography>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Box>
        {Object.keys(firebaseConfig).map((key) => (
          <Box key={key} sx={styles.formGroup}>
            <TextField
              label={key}
              name={key}
              value={config[key]}
              onChange={handleChange}
              variant="outlined"
              size="small"
              sx={styles.input}
            />
          </Box>
        ))}
        <Box sx={styles.saveButton}>
          <Button variant="contained" color="primary" onClick={handleSave}>
            Save
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default FirebaseModal;
