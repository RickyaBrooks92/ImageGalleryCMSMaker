import React, { useState } from "react";
import ImageGallery from "./components/ImageGallery";
import Sidebar from "./components/SideBar";
import "./css/App.css";

const App = () => {
  const [galleryProps, setGalleryProps] = useState({
    images: [""], // Start with one blank image
    layout: "flex", // Default layout
    flexSettings: {
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "flex-start",
      alignItems: "stretch",
      gap: "10px",
      alignContent: "center", // Always center content
    },
  });

  const handleUpdate = (newProps) => {
    setGalleryProps((prevProps) => ({ ...prevProps, ...newProps }));
  };

  return (
    <div className="App">
      <Sidebar onUpdate={handleUpdate} />
      <div className="content">
        <ImageGallery
          images={galleryProps.images}
          layout={galleryProps.layout}
          flexSettings={
            galleryProps.layout === "flex" ? galleryProps.flexSettings : {}
          }
        />
      </div>
    </div>
  );
};

export default App;
