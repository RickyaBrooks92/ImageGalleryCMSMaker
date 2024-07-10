import React, { useState } from "react";
import "./Sidebar.css";
import Tab from "./Tab";
import FlexSettings from "./FlexSettings";

const Sidebar = ({ onUpdate }) => {
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

  const handleAddImage = () => {
    const newImages = [...images, ""];
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
    const exportCode = `
<script src="https://your-cdn.com/your-script.js" defer></script>
<div class="${uniqueId}"></div>
<script>
document.addEventListener('DOMContentLoaded', () => {
  const galleryContainer = document.querySelector('.${uniqueId}');
  if (galleryContainer) {
    galleryContainer.innerHTML = \`
      <div class="gallery ${layout}" style="
        display: ${layout === "flex" ? "flex" : "grid"};
        ${
          layout === "flex"
            ? `flex-direction: ${flexSettings.flexDirection}; flex-wrap: ${flexSettings.flexWrap};`
            : ""
        }
        gap: ${flexSettings.gap};
        justify-content: ${flexSettings.justifyContent};
        align-items: ${flexSettings.alignItems};
        height: 100vh;
        align-content: center;
      ">
        ${images
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
          .join("")}
      </div>
    \`;
    
    document.querySelectorAll('.thumbnail').forEach((thumbnail, index) => {
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

        document.querySelector('.close').addEventListener('click', () => {
          document.body.removeChild(lightbox);
        });

        document.querySelector('.prev').addEventListener('click', (e) => {
          e.stopPropagation();
          const prevIndex = (index - 1 + images.length) % images.length;
          document.querySelector('.lightbox-image').src = document.querySelectorAll('.thumbnail img')[prevIndex].src;
          index = prevIndex;
        });

        document.querySelector('.next').addEventListener('click', (e) => {
          e.stopPropagation();
          const nextIndex = (index + 1) % images.length;
          document.querySelector('.lightbox-image').src = document.querySelectorAll('.thumbnail img')[nextIndex].src;
          index = nextIndex;
        });
      });
    });
  }
});
</script>
`;

    setExportCode(exportCode);
  };

  const [exportCode, setExportCode] = useState("");

  return (
    <div className="sidebar">
      <Tab activeTab={activeTab} onTabClick={setActiveTab} />
      {activeTab === "images" ? (
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
        </div>
      ) : activeTab === "settings" ? (
        <div>
          <h2>Layout Settings</h2>
          <div className="input-group">
            <label>Layout</label>
            <select value={layout} onChange={handleLayoutChange}>
              <option value="flex">Flex</option>
              <option value="grid">Grid</option>
            </select>
          </div>
          {layout === "flex" && (
            <FlexSettings
              flexSettings={flexSettings}
              handleFlexSettingChange={handleFlexSettingChange}
            />
          )}
        </div>
      ) : activeTab === "export" ? (
        <div>
          <h2>Export Code</h2>
          <button onClick={handleExport}>Export</button>
          {exportCode && (
            <div>
              <p>Copy the following code to implement in your CMS:</p>
              <textarea readOnly value={exportCode} rows="10" cols="30" />
            </div>
          )}
        </div>
      ) : null}
    </div>
  );
};

export default Sidebar;
