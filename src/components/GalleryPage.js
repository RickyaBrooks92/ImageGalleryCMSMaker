import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

const GalleryPage = () => {
  const { id } = useParams();

  useEffect(() => {
    // Assuming you have some way to fetch or load the gallery data based on ID
    const galleryData = {
      images: [
        "https://example.com/image1.jpg",
        "https://example.com/image2.jpg",
      ],
      layout: "flex",
      flexSettings: {
        flexDirection: "row",
        flexWrap: "wrap",
        justifyContent: "center",
        alignItems: "center",
        gap: "10px",
      },
    };

    if (window.initializeGallery) {
      window.initializeGallery(
        id,
        galleryData.images,
        galleryData.layout,
        galleryData.flexSettings
      );
    }
  }, [id]);

  return <div className={`gallery-container ${id}`}></div>;
};

export default GalleryPage;
