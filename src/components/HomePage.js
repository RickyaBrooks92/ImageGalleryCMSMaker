import React, { useState, useEffect } from "react";
import SidePanel from "./SettingsPanel/SidePanel";
import ImageGallery from "./ImageGallery";

const styles = {
  body: {
    overflow: "hidden",
  },
  homePage: {
    display: "flex",
    height: "100vh",
  },
  sidePanel: {
    width: "250px",
  },
  content: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px",
  },
};

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

  useEffect(() => {
    document.body.style.overflow = styles.body.overflow;
    return () => {
      document.body.style.overflow = "auto"; // Reset overflow when component unmounts
    };
  }, []);

  return (
    <div style={styles.homePage}>
      <div style={styles.sidePanel}>
        <SidePanel onUpdate={handleUpdate} />
      </div>
      <div style={styles.content}>
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
