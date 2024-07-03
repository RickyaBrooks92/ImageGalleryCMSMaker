import React, { useState, useEffect } from "react";
import "../css/ImageSlider.css";

const ImageSlider = ({ images, interval = 3000, layout = "default" }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (layout === "default") {
      const timer = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
      }, interval);
      return () => clearInterval(timer);
    }
  }, [images, interval, layout]);

  const handleThumbnailClick = (index) => {
    setCurrentIndex(index);
  };

  return (
    <div className={`slider ${layout}`}>
      {layout === "default" &&
        images.map((image, index) => (
          <div
            key={index}
            className={`slide ${index === currentIndex ? "active" : ""}`}
            style={{ backgroundImage: `url(${image})` }}
          ></div>
        ))}
      {layout === "thumbnails" && (
        <div>
          <div
            className="main-image"
            style={{ backgroundImage: `url(${images[currentIndex]})` }}
          ></div>
          <div className="thumbnails">
            {images.map((image, index) => (
              <div
                key={index}
                className={`thumbnail ${
                  index === currentIndex ? "active" : ""
                }`}
                style={{ backgroundImage: `url(${image})` }}
                onClick={() => handleThumbnailClick(index)}
              ></div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ImageSlider;
