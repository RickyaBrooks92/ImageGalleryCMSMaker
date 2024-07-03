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
      ) : (
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
      )}
    </div>
  );
};

export default Sidebar;
