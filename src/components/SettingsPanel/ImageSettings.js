import React, { useState, useEffect } from "react";
import { initializeApp } from "firebase/app";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

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
    <div>
      <h2>Customize Gallery</h2>
      {images.map((image, index) => (
        <div key={index} className="firebase-input-group">
          <label>Image {index + 1}</label>
          <div className="input-with-button">
            <input
              type="text"
              value={image}
              onChange={(e) => handleImageChange(index, e.target.value)}
            />
            <button
              className="remove-button"
              onClick={() => handleRemoveImage(index)}
            >
              -
            </button>
          </div>
        </div>
      ))}
      <div className="add-button">
        <button className="modern-plus-button" onClick={handleAddImage}>
          +
        </button>
      </div>
      <div className="upload-button">
        <input type="file" accept="image/*" onChange={handleFileChange} />
      </div>
    </div>
  );
};

export default ImageSettings;
