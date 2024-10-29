// src/theme/theme.js
import { createTheme } from "@mui/material";
import { useMemo } from "react";

// Function to detect system preference
const getSystemThemeMode = () => {
  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
};

const useCustomTheme = () => {
  const mode = getSystemThemeMode();

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          ...(mode === "light"
            ? {
                primary: {
                  main: "#1976d2",
                },
                secondary: {
                  main: "#d32f2f",
                },
                background: {
                  default: "#f5f5f5",
                  paper: "#ffffff",
                },
                text: {
                  primary: "#333333",
                  secondary: "#555555",
                },
              }
            : {
                primary: {
                  main: "#90caf9",
                },
                secondary: {
                  main: "#f48fb1",
                },
                background: {
                  default: "#121212",
                  paper: "#1d1d1d",
                },
                text: {
                  primary: "#ffffff",
                  secondary: "#b0b0b0",
                },
              }),
        },
        components: {
          MuiPaper: {
            styleOverrides: {
              root: {
                color: mode === "dark" ? "#e0e0e0" : "#333333",
                backgroundColor: mode === "dark" ? "#1d1d1d" : "#ffffff",
              },
            },
          },
          MuiTextField: {
            styleOverrides: {
              root: {
                "& .MuiOutlinedInput-root": {
                  backgroundColor: mode === "dark" ? "#2b2f31" : "#ffffff",
                  "& fieldset": {
                    borderColor: mode === "dark" ? "#555555" : "#cccccc",
                  },
                  "&:hover fieldset": {
                    borderColor: mode === "dark" ? "#90caf9" : "#1976d2",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: mode === "dark" ? "#90caf9" : "#1976d2",
                  },
                },
              },
            },
          },
          MuiButton: {
            styleOverrides: {
              root: {
                fontWeight: "bold",
                textTransform: "none", // Avoids all-uppercase, more readable
                borderRadius: "8px", // Slightly rounded for a modern look
              },
              contained: {
                backgroundColor: mode === "dark" ? "#1976d2" : "#1976d2", // Dark gray for dark mode, blue for light
                color: mode === "dark" ? "#ffffff" : "#ffffff", // White text in both modes
                "&:hover": {
                  backgroundColor: mode === "dark" ? "#1565c0" : "#1565c0", // Slightly lighter for dark mode, darker blue for light mode
                },
              },
              outlined: {
                color: mode === "dark" ? "#90caf9" : "#1976d2", // Light blue text for dark mode, standard blue for light
                borderColor: mode === "dark" ? "#90caf9" : "#1976d2", // Border to match text color
                "&:hover": {
                  backgroundColor:
                    mode === "dark"
                      ? "rgba(144, 202, 249, 0.1)"
                      : "rgba(25, 118, 210, 0.1)", // Light hover effect based on theme
                  borderColor: mode === "dark" ? "#90caf9" : "#1976d2",
                },
              },
            },
          },
        },
      }),
    [mode]
  );

  return theme;
};

export default useCustomTheme;
