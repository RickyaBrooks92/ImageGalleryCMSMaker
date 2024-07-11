import React, { useState } from "react";
import "../css/ImageGalleryEditor.css";
import Tab from "./Tab";
import ImageSettings from "./ImageSettings";
import LayoutSettings from "./LayoutSettings";
import ExportSettings from "./ExportSettings";

const ImageGalleryEditor = ({ onUpdate }) => {
  const [images, setImages] = useState([""]); // Start with one blank image
  const [activeTab, setActiveTab] = useState("images");
  const [layout, setLayout] = useState("flex"); // Default layout
  const [flexSettings, setFlexSettings] = useState({
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
    alignItems: "stretch",
    gap: "10px",
    alignContent: "center", // Always center content
  });

  const handleImageChange = (index, value) => {
    const newImages = [...images];
    newImages[index] = value;
    setImages(newImages);
    onUpdate({ images: newImages, layout, flexSettings });
  };

  const handleAddImage = (image) => {
    const newImages = [...images, image || ""];
    setImages(newImages);
    onUpdate({ images: newImages, layout, flexSettings });
  };

  const handleRemoveImage = (index) => {
    const newImages = images.filter((_, i) => i !== index);
    setImages(newImages);
    onUpdate({ images: newImages, layout, flexSettings });
  };

  const handleLayoutChange = (e) => {
    setLayout(e.target.value);
    onUpdate({ images, layout: e.target.value, flexSettings });
  };

  const handleFlexSettingChange = (e) => {
    const { name, value } = e.target;
    const newFlexSettings = { ...flexSettings, [name]: value };
    setFlexSettings(newFlexSettings);
    onUpdate({ images, layout, flexSettings: newFlexSettings });
  };

  const generateUniqueId = () => {
    return "pid-" + Math.random().toString(36).substr(2, 16);
  };

  const handleExport = () => {
    const uniqueId = generateUniqueId();
    const imagesHtml = images
      .map((image, index) =>
        image
          ? `<div class="thumbnail" style="
        position: relative;
        cursor: pointer;
        overflow: hidden;
        border-radius: 8px;
        box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        transition: transform 0.2s;
        flex: 0 1 200px;
        height: 200px;
      "><img src="${image}" alt="Gallery item ${index + 1}" style="
        width: 100%;
        height: 100%;
        object-fit: cover;
        display: block;
        transition: transform 0.3s ease;
      "/></div>`
          : ""
      )
      .join("");

    const galleryHtml = `
      <div class="${uniqueId}" style="
        display: ${layout === "flex" ? "flex" : "grid"};
        ${
          layout === "flex"
            ? `flex-direction: ${flexSettings.flexDirection}; flex-wrap: ${flexSettings.flexWrap};`
            : ""
        }
        gap: ${flexSettings.gap};
        justify-content: ${flexSettings.justifyContent};
        align-items: ${flexSettings.alignItems};
        align-content: center;
        height: 100vh;
      ">
        ${imagesHtml}
      </div>
    `;

    const galleryCss = `
      <style>
        .${uniqueId} .thumbnail {
          position: relative;
          cursor: pointer;
          overflow: hidden;
          border-radius: 8px;
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
          transition: transform 0.2s;
        }
        .${uniqueId} .thumbnail img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          display: block;
          transition: transform 0.3s ease;
        }
        .${uniqueId} .thumbnail:hover {
          transform: scale(1.05);
        }
        .lightbox {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.8);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 9999;
        }
        .lightbox img {
          max-width: 90%;
          max-height: 90%;
        }
        .lightbox .close {
          position: absolute;
          top: 20px;
          right: 20px;
          font-size: 30px;
          color: #fff;
          cursor: pointer;
        }
        .lightbox .prev, .lightbox .next {
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          font-size: 30px;
          color: #fff;
          cursor: pointer;
        }
        .lightbox .prev {
          left: 20px;
        }
        .lightbox .next {
          right: 20px;
        }
      </style>
    `;

    const galleryJs = `
      <script>
        document.querySelectorAll('.${uniqueId} .thumbnail').forEach((thumbnail, index) => {
          thumbnail.addEventListener('click', () => {
            const lightbox = document.createElement('div');
            lightbox.className = 'lightbox';
            lightbox.innerHTML = \`
              <span class="close">&times;</span>
              <img src="\${thumbnail.querySelector('img').src}" class="lightbox-image" alt="Gallery item \${index + 1}" />
              <span class="prev">&#10094;</span>
              <span class="next">&#10095;</span>
            \`;
            document.body.appendChild(lightbox);

            const closeLightbox = () => {
              document.body.removeChild(lightbox);
              document.removeEventListener('keydown', handleKeydown);
            };

            const handleKeydown = (e) => {
              if (e.key === 'Escape') {
                closeLightbox();
              } else if (e.key === 'ArrowLeft') {
                const prevIndex = (index - 1 + ${images.length}) % ${images.length};
                lightbox.querySelector('.lightbox-image').src = document.querySelectorAll('.${uniqueId} .thumbnail img')[prevIndex].src;
                index = prevIndex;
              } else if (e.key === 'ArrowRight') {
                const nextIndex = (index + 1) % ${images.length};
                lightbox.querySelector('.lightbox-image').src = document.querySelectorAll('.${uniqueId} .thumbnail img')[nextIndex].src;
                index = nextIndex;
              }
            };

            document.addEventListener('keydown', handleKeydown);
            lightbox.querySelector('.close').addEventListener('click', closeLightbox);
            lightbox.querySelector('.prev').addEventListener('click', (e) => {
              e.stopPropagation();
              const prevIndex = (index - 1 + ${images.length}) % ${images.length};
              lightbox.querySelector('.lightbox-image').src = document.querySelectorAll('.${uniqueId} .thumbnail img')[prevIndex].src;
              index = prevIndex;
            });

            lightbox.querySelector('.next').addEventListener('click', (e) => {
              e.stopPropagation();
              const nextIndex = (index + 1) % ${images.length};
              lightbox.querySelector('.lightbox-image').src = document.querySelectorAll('.${uniqueId} .thumbnail img')[nextIndex].src;
              index = nextIndex;
            });
          });
        });
      </script>
    `;

    const exportCode = `
      ${galleryHtml}
      ${galleryCss}
      ${galleryJs}
    `;

    setExportCode(exportCode);
  };

  const [exportCode, setExportCode] = useState("");

  return (
    <div className="sidebar">
      <Tab activeTab={activeTab} onTabClick={setActiveTab} />
      {activeTab === "images" && (
        <ImageSettings
          images={images}
          handleImageChange={handleImageChange}
          handleAddImage={handleAddImage}
          handleRemoveImage={handleRemoveImage}
        />
      )}
      {activeTab === "settings" && (
        <LayoutSettings
          layout={layout}
          handleLayoutChange={handleLayoutChange}
          flexSettings={flexSettings}
          handleFlexSettingChange={handleFlexSettingChange}
        />
      )}
      {activeTab === "export" && (
        <ExportSettings handleExport={handleExport} exportCode={exportCode} />
      )}
    </div>
  );
};

export default ImageGalleryEditor;
