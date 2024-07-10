import React, { useState } from "react";
import "../css/SideBar.css";
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

  const handleExport = () => {
    const exportHtml = `
<div class="gallery ${layout}">
  ${images
    .map((image, index) =>
      image
        ? `<div class="thumbnail"><img src="${image}" alt="Gallery item ${
            index + 1
          }" /></div>`
        : ""
    )
    .join("")}
</div>`;

    const exportCss = `
<style>
.gallery {
  display: ${layout === "flex" ? "flex" : "grid"};
  ${layout === "flex" ? `flex-direction: ${flexSettings.flexDirection};` : ""}
  ${layout === "flex" ? `flex-wrap: ${flexSettings.flexWrap};` : ""}
  gap: ${flexSettings.gap};
  justify-content: ${flexSettings.justifyContent};
  align-items: ${flexSettings.alignItems};
  height: 100vh; /* Ensure enough height to demonstrate alignContent */
  align-content: center; /* Always center content */
}
.thumbnail {
  position: relative;
  cursor: pointer;
  overflow: hidden;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s;
  flex: 0 1 200px; /* Adjust width to ensure multiple items per row */
  height: 200px; /* Adjust height to ensure multiple rows */
}
.thumbnail img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: transform 0.3s ease;
}
.thumbnail:hover img {
  transform: scale(1.1);
}
.thumbnail:hover {
  transform: translateY(-5px);
}
</style>`;

    const exportJs = `
<script>
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.thumbnail').forEach((thumbnail, index) => {
    thumbnail.addEventListener('click', () => {
      const lightbox = document.createElement('div');
      lightbox.className = 'lightbox';
      lightbox.innerHTML = \`
        <span class="close">&times;</span>
        <img src="\${thumbnail.querySelector('img').src}" class="lightbox-image" alt="Gallery item \${index + 1}" />
      \`;
      document.body.appendChild(lightbox);

      document.querySelector('.close').addEventListener('click', () => {
        document.body.removeChild(lightbox);
      });
    });
  });
});
</script>`;

    const fullExportCode = `${exportHtml}\n${exportCss}\n${exportJs}`;

    setExportCode(fullExportCode);
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
