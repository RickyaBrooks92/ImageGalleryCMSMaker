import React, { useState } from "react";
import ImageGalleryEditor from "./ImageGalleryEditor";
import ImageGallery from "./ImageGallery";
import "../css/HomePage.css";

const HomePage = () => {
  const [galleryProps, setGalleryProps] = useState({
    images: [""],
    layout: "flex",
    flexSettings: {
      flexDirection: "row",
      flexWrap: "wrap",
      justifyContent: "flex-start",
      alignItems: "stretch",
      gap: "10px",
      alignContent: "center",
    },
  });

  const handleUpdate = (newProps) => {
    setGalleryProps((prevProps) => ({ ...prevProps, ...newProps }));
  };

  return (
    <div className="HomePage">
      <ImageGalleryEditor onUpdate={handleUpdate} />
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
