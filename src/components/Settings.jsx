import React from 'react';
import { Box, Typography, Select, MenuItem, TextField, Button, FormControl, InputLabel, useTheme } from '@mui/material';

const Settings = ({ settings, updateSetting, resetToDefaults, onClose }) => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        padding: "24px",
        maxWidth: "400px",
        margin: "auto",
        backgroundColor: theme.palette.background.paper, // Matches theme background
        color: theme.palette.text.primary,
        borderRadius: "12px",
        border: `1px solid ${theme.palette.divider}`, // Add a subtle border if needed
      }}
    >
      <Typography variant="h5" gutterBottom>
        Settings
      </Typography>

      {/* Preferred Search Engine */}
      <FormControl fullWidth margin="normal">
        <InputLabel>Preferred Search Engine</InputLabel>
        <Select
          value={settings.preferredSearchEngine}
          onChange={(e) => updateSetting("preferredSearchEngine", e.target.value)}
          label="Preferred Search Engine"
          sx={{
            backgroundColor: theme.palette.background.default,
            borderRadius: "4px",
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: theme.palette.divider,
            },
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: theme.palette.primary.main,
            },
          }}
        >
          <MenuItem value="Google">Google</MenuItem>
          <MenuItem value="Bing">Bing</MenuItem>
          <MenuItem value="Yahoo">Yahoo</MenuItem>
          <MenuItem value="DuckDuckGo">DuckDuckGo</MenuItem>
        </Select>
      </FormControl>

      {/* Other Setting */}
      {/* <TextField
        label="Other Setting"
        value={settings.otherSetting}
        onChange={(e) => updateSetting("otherSetting", e.target.value)}
        fullWidth
        margin="normal"
        sx={{
          backgroundColor: theme.palette.background.default,
          borderRadius: "4px",
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: theme.palette.divider,
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: theme.palette.primary.main,
          },
        }}
      /> */}

      {/* Buttons */}
      <Box sx={{ marginTop: "20px", display: "flex", gap: "10px", justifyContent: "center" }}>
        <Button variant="outlined" color="primary" onClick={resetToDefaults} sx={{ fontWeight: "bold" }}>
          Default Settings
        </Button>
        <Button variant="contained" color="primary" onClick={onClose} sx={{ fontWeight: "bold" }}>
          Save & Exit
        </Button>
      </Box>
    </Box>
  );
};

export default Settings;
