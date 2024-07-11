import React, { useState } from "react";
import Sidebar from "./SideBar";
import ImageGallery from "./ImageGallery";
import "../css/HomePage.css";
const HomePage = () => {
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
    <div className="HomePage">
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

export default HomePage;
