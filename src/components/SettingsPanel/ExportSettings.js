import React from "react";

const ExportSettings = ({ handleExport, exportCode }) => {
  return (
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
  );
};

export default ExportSettings;
