import React from "react";
import { storage } from "../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const ImageSettings = ({
  images,
  handleImageChange,
  handleAddImage,
  handleRemoveImage,
}) => {
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      console.log("File selected:", file);

      try {
        const storageRef = ref(storage, `images/${file.name}`);
        console.log("Storage reference created:", storageRef);

        const uploadTask = uploadBytesResumable(storageRef, file);
        console.log("Upload task created:", uploadTask);

        uploadTask.on(
          "state_changed",
          (snapshot) => {
            console.log("Upload progress:", snapshot);
          },
          (error) => {
            console.error("Upload error:", error);
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
              console.log("File available at:", downloadURL);
              handleAddImage(downloadURL);
            });
          }
        );
      } catch (error) {
        console.error("Error creating storage reference:", error);
      }
    }
  };

  return (
    <div>
      <h2>Customize Gallery</h2>
      {images.map((image, index) => (
        <div key={index} className="input-group">
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
