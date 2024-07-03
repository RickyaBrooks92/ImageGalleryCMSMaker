import React from "react";

const FlexSettings = ({ flexSettings, handleFlexSettingChange }) => {
  return (
    <>
      <div className="input-group">
        <label>Flex Direction</label>
        <select
          name="flexDirection"
          value={flexSettings.flexDirection}
          onChange={handleFlexSettingChange}
        >
          <option value="row">Row</option>
          <option value="row-reverse">Row Reverse</option>
          <option value="column">Column</option>
          <option value="column-reverse">Column Reverse</option>
        </select>
      </div>
      <div className="input-group">
        <label>Flex Wrap</label>
        <select
          name="flexWrap"
          value={flexSettings.flexWrap}
          onChange={handleFlexSettingChange}
        >
          <option value="nowrap">No Wrap</option>
          <option value="wrap">Wrap</option>
          <option value="wrap-reverse">Wrap Reverse</option>
        </select>
      </div>
      <div className="input-group">
        <label>Justify Content</label>
        <select
          name="justifyContent"
          value={flexSettings.justifyContent}
          onChange={handleFlexSettingChange}
        >
          <option value="flex-start">Flex Start</option>
          <option value="flex-end">Flex End</option>
          <option value="center">Center</option>
          <option value="space-between">Space Between</option>
          <option value="space-around">Space Around</option>
          <option value="space-evenly">Space Evenly</option>
        </select>
      </div>
      <div className="input-group">
        <label>Align Items</label>
        <select
          name="alignItems"
          value={flexSettings.alignItems}
          onChange={handleFlexSettingChange}
        >
          <option value="stretch">Stretch</option>
          <option value="flex-start">Flex Start</option>
          <option value="flex-end">Flex End</option>
          <option value="center">Center</option>
          <option value="baseline">Baseline</option>
        </select>
      </div>
      <div className="input-group">
        <label>Gap</label>
        <input
          type="text"
          name="gap"
          value={flexSettings.gap}
          onChange={handleFlexSettingChange}
          placeholder="e.g., 10px"
        />
      </div>
    </>
  );
};

export default FlexSettings;
