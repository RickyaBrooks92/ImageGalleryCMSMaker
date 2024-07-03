import React, { useState, useEffect, useCallback } from "react";
import "../css/ImageGallery.css";

const ImageGallery = ({ images, layout, flexSettings }) => {
  const [currentIndex, setCurrentIndex] = useState(null);

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === "ArrowRight") {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
      } else if (e.key === "ArrowLeft") {
        setCurrentIndex(
          (prevIndex) => (prevIndex - 1 + images.length) % images.length
        );
      } else if (e.key === "Escape") {
        setCurrentIndex(null);
        document.removeEventListener("keydown", handleKeyDown);
      }
    },
    [images.length]
  );

  const handleClick = (index) => {
    setCurrentIndex(index);
    document.addEventListener("keydown", handleKeyDown);
  };

  const handleClose = () => {
    setCurrentIndex(null);
    document.removeEventListener("keydown", handleKeyDown);
  };

  useEffect(() => {
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);

  return (
    <div
      className={`gallery ${layout}`}
      style={layout === "flex" ? flexSettings : {}}
    >
      {images.map(
        (image, index) =>
          image && (
            <div
              key={index}
              className="thumbnail"
              onClick={() => handleClick(index)}
            >
              <img src={image} alt={`Gallery item ${index + 1}`} />
            </div>
          )
      )}

      {currentIndex !== null && (
        <div className="lightbox" onClick={handleClose}>
          <span className="close" onClick={handleClose}>
            &times;
          </span>
          <img
            className="lightbox-image"
            src={images[currentIndex]}
            alt={`Gallery item ${currentIndex + 1}`}
          />
          <span
            className="prev"
            onClick={(e) => {
              e.stopPropagation();
              setCurrentIndex(
                (currentIndex - 1 + images.length) % images.length
              );
            }}
          >
            &#10094;
          </span>
          <span
            className="next"
            onClick={(e) => {
              e.stopPropagation();
              setCurrentIndex((currentIndex + 1) % images.length);
            }}
          >
            &#10095;
          </span>
        </div>
      )}
    </div>
  );
};

export default ImageGallery;
