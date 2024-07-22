import React, { useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { TextField, IconButton, Button, Box } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import UploadIcon from "@mui/icons-material/Upload";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    alignSelf: "center",
  },
  inputContainer: {
    marginLeft: "auto",
    display: "flex",
    alignItems: "center",
    gap: "5px",
    marginBottom: "10px",
  },
  uploadButton: {
    display: "flex",
    justifyContent: "center",
    marginTop: "10px",
  },
  addButton: {
    display: "flex",
    justifyContent: "center",
    marginTop: "20px",
  },
  button: {
    backgroundColor: "#1D2F6F",
    color: "#F9E9EC",
    "&:hover": {
      backgroundColor: "#8390FA",
    },
  },
  iconButton: {
    color: "#1D2F6F",
    "&:hover": {
      color: "#8390FA",
    },
  },
};

const ImageSettings = ({
  images,
  handleImageChange,
  handleAddImage,
  handleRemoveImage,
  firebaseConfig,
}) => {
  const [storage, setStorage] = useState(null);

  useEffect(() => {
    if (firebaseConfig.apiKey) {
      try {
        const app = initializeApp(firebaseConfig);
        const storage = getStorage(app);
        setStorage(storage);
      } catch (error) {
        console.error("Firebase initialization error:", error);
      }
    }
  }, [firebaseConfig]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file && storage) {
      const storageRef = ref(storage, `images/${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Progress function ...
        },
        (error) => {
          // Error function ...
          console.error("Upload error:", error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            handleAddImage(downloadURL);
          });
        }
      );
    }
  };

  return (
    <Box sx={styles.container}>
      {images.map((image, index) => (
        <Box key={index} sx={styles.inputContainer}>
          <TextField
            variant="outlined"
            size="small"
            value={image}
            onChange={(e) => handleImageChange(index, e.target.value)}
            fullWidth
          />
          <IconButton
            sx={styles.iconButton}
            onClick={() => handleRemoveImage(index)}
          >
            <DeleteIcon />
          </IconButton>
        </Box>
      ))}
      <Box sx={styles.uploadButton}>
        <Button sx={styles.button} variant="contained" component="label">
          <UploadIcon />
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            hidden
          />
        </Button>
      </Box>
      <Box sx={styles.addButton}>
        <IconButton sx={styles.iconButton} onClick={() => handleAddImage("")}>
          <FontAwesomeIcon icon={faPlus} />
        </IconButton>
      </Box>
    </Box>
  );
};

export default ImageSettings;
