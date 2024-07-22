import React from "react";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import FlexSettings from "../FlexSettings";

const styles = {
  container: {
    padding: "10px",
    backgroundColor: "#f4f4f4",
    borderRadius: "8px",
    boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    width: "175px", // '200px' -> '100%
    boxSizing: "border-box",
    margin: "auto",
  },
  formControl: {
    marginBottom: "10px",
    width: "100%",
    boxSizing: "border-box",
  },
  label: {
    color: "#1D2F6F",
    fontSize: "14px",
  },
  select: {
    "& .MuiOutlinedInput-notchedOutline": {
      borderColor: "#1D2F6F",
    },
    "&:hover .MuiOutlinedInput-notchedOutline": {
      borderColor: "#8390FA",
    },
    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
      borderColor: "#8390FA",
    },
  },
  typography: {
    fontSize: "14px",
    marginBottom: "10px",
    color: "#1D2F6F",
  },
};

const LayoutSettings = ({
  layout,
  handleLayoutChange,
  flexSettings,
  handleFlexSettingChange,
}) => {
  return (
    <Box sx={styles.container}>
      <Typography sx={styles.typography}>Layout Settings</Typography>
      <FormControl variant="outlined" sx={styles.formControl} size="small">
        <InputLabel sx={styles.label}>Layout</InputLabel>
        <Select
          value={layout}
          onChange={handleLayoutChange}
          label="Layout"
          sx={styles.select}
          size="small"
        >
          <MenuItem value="flex">Flex</MenuItem>
          <MenuItem value="grid">Grid</MenuItem>
        </Select>
      </FormControl>
      {layout === "flex" && (
        <FlexSettings
          flexSettings={flexSettings}
          handleFlexSettingChange={handleFlexSettingChange}
        />
      )}
    </Box>
  );
};

export default LayoutSettings;
