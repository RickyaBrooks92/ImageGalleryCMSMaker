import React from "react";
import FlexSettings from "../FlexSettings";

const LayoutSettings = ({
  layout,
  handleLayoutChange,
  flexSettings,
  handleFlexSettingChange,
}) => {
  return (
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
  );
};

export default LayoutSettings;
