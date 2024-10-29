import React, { useState, useEffect, useMemo } from "react";
import { AgGridReact } from "ag-grid-react";
import CompanyNotesDrawer from "./CompanyNotesDrawer";
import getColumnDefs from "../data/columnDefs";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import "../styles/DataGrid.css";
import "@fortawesome/fontawesome-free/css/all.min.css";
import data from "../data/data.json"; // Import your default data
import { ThemeProvider, createTheme, CssBaseline } from "@mui/material";
import Footer from "./Footer";

const DataGrid = ({ preferredSearchEngine }) => {
  const messages = [
    "Remember to stay hydrated! 😊💧",
    "You're doing amazing, keep it up! 💪✨",
    "Believe in yourself and all that you are! 🌟💖",
    "Every day is a new beginning, embrace it! 🌅🌻",
    "You've got this! Keep pushing forward! 🚀🔥",
    "Success is the sum of small efforts, repeated daily! 🏆📈",
    "Stay positive, work hard, and make it happen! 💼💯",
    "Keep smiling, because life is a beautiful thing! 😊🌼",
    "You're capable of incredible things! 🌠💥",
    "Stay strong, you're stronger than you think! 🦾💪",
    "Every step forward is a step closer to your goals! 🛤️🚶‍♂️",
    "Take a deep breath; you're exactly where you need to be! 🌬️🧘‍♀️",
    "Embrace challenges—they make you stronger! 🧗‍♂️💪",
    "Keep learning, growing, and evolving! 📚🧠",
    "Good things take time, stay patient and keep going! ⏳💫",
    "Your hard work is inspiring! 🛠️🏅",
    "Be kind to yourself; you're doing the best you can! 💞🤗",
    "You have the power to create change! ⚡🌍",
    "Choose to be optimistic, it feels better! ☀️😊",
    "Small steps every day make a big difference! 🐢🏆",
    "Believe in the power of positive thinking! 💭💖",
    "You're stronger than any storm you face! 🌩️💪",
    "Celebrate your small victories! 🎉🥳",
    "Stay curious, keep learning! 🔍🧠",
    "Your potential is endless! 🚀💫",
    "Today is a fresh start, make the most of it! 🌅✨",
    "Keep your face towards the sunshine! 🌞🌻",
    "Progress is progress, no matter how small! 📈🌱",
    "Stay focused on your goals; you're closer than you think! 🎯🏁",
    "You are enough, just as you are! 🌼💖",
  ];

  const randomMessage = messages[Math.floor(Math.random() * messages.length)];

  const [mode, setMode] = useState(
    window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
  );

  // Watch for system changes in theme preference and update
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = (e) => setMode(e.matches ? "dark" : "light");

    mediaQuery.addEventListener("change", handleChange);
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);

  // Define your custom theme
  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          ...(mode === "light"
            ? {
                background: {
                  default: "#f0f2f5",
                  paper: "#ffffff",
                },
                text: {
                  primary: "#333333",
                  secondary: "#555555",
                },
                primary: {
                  main: "#1976d2",
                },
                secondary: {
                  main: "#d32f2f",
                },
              }
            : {
                background: {
                  default: "#121212",
                  paper: "#101316", // Extremely dark color for the drawer in dark mode
                },
                text: {
                  primary: "#ffffff",
                  secondary: "#b0b0b0",
                },
                primary: {
                  main: "#90caf9",
                },
                secondary: {
                  main: "#f48fb1",
                },
              }),
        },
        components: {
          MuiDrawer: {
            styleOverrides: {
              paper: {
                backgroundColor: mode === "dark" ? "#101316" : "#ffffff", // Set to a very dark color
                color: mode === "dark" ? "#e0e0e0" : "#333333",
                borderLeft: `1px solid ${
                  mode === "dark" ? "#333333" : "#eeeeee"
                }`,
                padding: "20px", // Optional: add padding to keep content organized
              },
            },
          },
          MuiTextField: {
            styleOverrides: {
              root: {
                "& .MuiOutlinedInput-root": {
                  backgroundColor: mode === "dark" ? "#2b2f31" : "#ffffff", // Slightly lighter for contrast
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
                borderRadius: "8px",
                padding: "8px 16px",
                fontWeight: "bold",
                boxShadow: "none",
                "&:hover": {
                  boxShadow: "none",
                  backgroundColor: mode === "dark" ? "#1e88e5" : "#1565c0",
                },
              },
            },
          },
        },
      }),
    [mode]
  );

  const [rowData, setRowData] = useState([]);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState(null);

  // Load data from local storage or fallback to initial data on mount
  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("companyData")) || data;
    setRowData(storedData);
  }, []);

  const updateLastVisited = (company, field) => {
    const updatedRowData = rowData.map((row) => {
      if (row.name === company.name) {
        const currentDate = new Date();
        const formattedDate = `${currentDate.toLocaleDateString()} ${currentDate.toLocaleTimeString()}`;
        return { ...row, lastVisited: formattedDate };
      }
      return row;
    });
    setRowData(updatedRowData);
    localStorage.setItem("companyData", JSON.stringify(updatedRowData));
  };

  // Function to update the Notes count for a company
  const updateNotesCount = (companyName, count) => {
    const updatedRowData = rowData.map((row) => {
      if (row.name === companyName) {
        return { ...row, Notes: count };
      }
      return row;
    });
    setRowData(updatedRowData);
    localStorage.setItem("companyData", JSON.stringify(updatedRowData)); // Persist the updated data
  };

  // Toggle Drawer and Set Company
  const toggleDrawer = (companyName) => {
    console.log("Toggling drawer for company:", companyName); // Debugging line
    setSelectedCompany(companyName);
    setDrawerOpen((prevOpen) => !prevOpen);
  };

  // Add the `Notes` column and drawer toggle icon to column definitions
  const getColumnDefsWithDrawer = () => [
    {
      field: "expand",
      headerName: "",
      width: 50,
      sortable: false,
      filter: false,
      cellRenderer: (params) => (
        <i
          className={`fas fa-chevron-${
            drawerOpen && selectedCompany === params.data.name
              ? "left"
              : "right"
          }`}
          style={{ cursor: "pointer" }}
          onClick={() => toggleDrawer(params.data.name)}
        ></i>
      ),
    },
    ...getColumnDefs(preferredSearchEngine, updateLastVisited).slice(1), // Spread the rest of the column definitions
    {
      field: "Notes",
      headerName: "Notes #",
      width: 110,
      sortable: true,
      filter: true,
    },
  ];

  return (
    <div>
      <div
        className="ag-theme-alpine-auto-dark data-grid-container"
        style={{
          display: "flex",
          flexDirection: "column",
          height: "100%",
          overflow: "hidden", // Prevents overflow beyond rounded borders
          borderRadius: "10px", // Adjust the radius as needed
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)", // Optional: shadow for better contrast
        }}
      >
        <div style={{ flexGrow: 1 }}>
          <AgGridReact
            rowData={rowData}
            columnDefs={getColumnDefsWithDrawer()}
            defaultColDef={{
              sortable: true,
              filter: true,
              resizable: true,
            }}
            pagination={true}
            paginationPageSize={50}
          />
        </div>
        <footer
          style={{
            textAlign: "center",
            padding: "10px 0",
            backgroundColor: "#1E1E1E",
            color: "white",
            borderTop: "1px solid rgba(255, 255, 255, 0.1)",
            width: "100%",
            borderBottomLeftRadius: "10px",
            borderBottomRightRadius: "10px",
          }}
        >
          <span style={{ fontSize: "1.3em", opacity: 0.8 }}>{randomMessage}</span>
          <span
            style={{
              marginLeft: "8px",
              fontSize: "1em",
              opacity: 0.8,
            }}
          >
            BETA v0.4
          </span>
        </footer>
      </div>

      {/* Drawer Component */}
      <ThemeProvider theme={theme}>
        <CssBaseline /> {/* This sets the global background color */}
        <CompanyNotesDrawer
          isOpen={drawerOpen}
          onClose={() => setDrawerOpen(false)}
          companyName={selectedCompany}
          onUpdateNotes={updateNotesCount} // Pass the updateNotesCount function to the drawer
        />
      </ThemeProvider>
    </div>
  );
};

export default DataGrid;
