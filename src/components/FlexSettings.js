import React from "react";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    padding: "10px",
    width: "100%",
    boxSizing: "border-box",
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
  textField: {
    marginBottom: "10px",
    width: "100%",
    boxSizing: "border-box",
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

const FlexSettings = ({ flexSettings, handleFlexSettingChange }) => {
  return (
    <Box sx={styles.container}>
      <Typography sx={styles.typography}>Flex Settings</Typography>
      <FormControl variant="outlined" sx={styles.formControl} size="small">
        <InputLabel sx={styles.label}>Flex Direction</InputLabel>
        <Select
          name="flexDirection"
          value={flexSettings.flexDirection}
          onChange={handleFlexSettingChange}
          label="Flex Direction"
          sx={styles.select}
          size="small"
        >
          <MenuItem value="row">Row</MenuItem>
          <MenuItem value="row-reverse">Row Reverse</MenuItem>
          <MenuItem value="column">Column</MenuItem>
          <MenuItem value="column-reverse">Column Reverse</MenuItem>
        </Select>
      </FormControl>
      <FormControl variant="outlined" sx={styles.formControl} size="small">
        <InputLabel sx={styles.label}>Flex Wrap</InputLabel>
        <Select
          name="flexWrap"
          value={flexSettings.flexWrap}
          onChange={handleFlexSettingChange}
          label="Flex Wrap"
          sx={styles.select}
          size="small"
        >
          <MenuItem value="nowrap">No Wrap</MenuItem>
          <MenuItem value="wrap">Wrap</MenuItem>
          <MenuItem value="wrap-reverse">Wrap Reverse</MenuItem>
        </Select>
      </FormControl>
      <FormControl variant="outlined" sx={styles.formControl} size="small">
        <InputLabel sx={styles.label}>Justify Content</InputLabel>
        <Select
          name="justifyContent"
          value={flexSettings.justifyContent}
          onChange={handleFlexSettingChange}
          label="Justify Content"
          sx={styles.select}
          size="small"
        >
          <MenuItem value="flex-start">Flex Start</MenuItem>
          <MenuItem value="flex-end">Flex End</MenuItem>
          <MenuItem value="center">Center</MenuItem>
          <MenuItem value="space-between">Space Between</MenuItem>
          <MenuItem value="space-around">Space Around</MenuItem>
          <MenuItem value="space-evenly">Space Evenly</MenuItem>
        </Select>
      </FormControl>
      <FormControl variant="outlined" sx={styles.formControl} size="small">
        <InputLabel sx={styles.label}>Align Items</InputLabel>
        <Select
          name="alignItems"
          value={flexSettings.alignItems}
          onChange={handleFlexSettingChange}
          label="Align Items"
          sx={styles.select}
          size="small"
        >
          <MenuItem value="stretch">Stretch</MenuItem>
          <MenuItem value="flex-start">Flex Start</MenuItem>
          <MenuItem value="flex-end">Flex End</MenuItem>
          <MenuItem value="center">Center</MenuItem>
          <MenuItem value="baseline">Baseline</MenuItem>
        </Select>
      </FormControl>
      <TextField
        label="Gap"
        name="gap"
        value={flexSettings.gap}
        onChange={handleFlexSettingChange}
        variant="outlined"
        size="small"
        sx={styles.textField}
        placeholder="e.g., 10px"
      />
    </Box>
  );
};

export default FlexSettings;
