import React, { useState, useEffect } from "react";
import {
  Drawer,
  TextField,
  Button,
  List,
  ListItem,
  IconButton,
  useTheme, // Import useTheme to access the current theme
  Divider,
  Typography
} from "@mui/material";

const CompanyNotesDrawer = ({
  isOpen,
  onClose,
  companyName,
  onUpdateNotes,
}) => {
  const theme = useTheme(); // Get the current theme
  const [notes, setNotes] = useState([]);
  const [noteTitle, setNoteTitle] = useState("");
  const [noteBody, setNoteBody] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDate, setSelectedDate] = useState("");

  useEffect(() => {
    const storedNotes = JSON.parse(localStorage.getItem("companyNotes")) || {};
    setNotes(storedNotes[companyName] || []);
  }, [companyName]);

  const handleAddNote = () => {
    const newNote = {
      title: noteTitle,
      body: noteBody,
      date: new Date().toLocaleDateString("en-US"),
    };
    const updatedNotes = [...notes, newNote];
    setNotes(updatedNotes);
    localStorage.setItem(
      "companyNotes",
      JSON.stringify({
        ...JSON.parse(localStorage.getItem("companyNotes") || "{}"),
        [companyName]: updatedNotes,
      })
    );

    onUpdateNotes(companyName, updatedNotes.length);

    setNoteTitle("");
    setNoteBody("");
  };

  const handleDeleteNote = (index) => {
    const updatedNotes = notes.filter((_, i) => i !== index);
    setNotes(updatedNotes);
    localStorage.setItem(
      "companyNotes",
      JSON.stringify({
        ...JSON.parse(localStorage.getItem("companyNotes") || "{}"),
        [companyName]: updatedNotes,
      })
    );

    onUpdateNotes(companyName, updatedNotes.length);
  };

  const filteredNotes = notes.filter((note) => {
    const searchLower = searchTerm.toLowerCase();
    const matchesText =
      note.title.toLowerCase().includes(searchLower) ||
      note.body.toLowerCase().includes(searchLower);

    const matchesDate =
      !selectedDate ||
      note.date === new Date(selectedDate).toLocaleDateString("en-US");

    return matchesText && matchesDate;
  });

  return (
    <Drawer
      anchor="right"
      open={isOpen}
      onClose={onClose}
      PaperProps={{
        sx: (theme) => ({
          width: "35%",
          maxWidth: "700px",
          bgcolor: theme.palette.background.paper, // Use theme color for background
          color: theme.palette.text.primary, // Use theme color for text
          borderLeft: `1px solid ${theme.palette.divider}`, // Use theme divider color
          padding: "20px",
          boxShadow: "none", // Remove shadow
          backgroundImage: "none", // Ensure no gradient/overlay

          "& .MuiTypography-root, & .MuiListItemText-root, & .MuiTextField-root":
            {
              color: theme.palette.text.primary, // Use primary text color for inner components
            },
        }),
      }}
    >
      <div style={{ padding: "20px", width: "100%" }}>
        <Typography
          variant="h5" // Sets a predefined size and weight
          sx={{
            textAlign: "center",
            marginBottom: "16px",
            color: theme.palette.primary.main, // Uses theme color
          }}
        >
          {`${companyName}'s Notes`}
        </Typography>

        <Divider>Note Search</Divider>

        {/* Search Input */}
        <TextField
          label="Search Notes (Title or Body)"
          variant="outlined"
          fullWidth
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{ marginBottom: "20px", maxWidth: "650px" }}
        />

        {/* Date Input for filtering by date */}
        <TextField
          label="Filter by Date"
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          fullWidth
          style={{ marginBottom: "20px", maxWidth: "650px" }}
          InputLabelProps={{
            shrink: true,
          }}
        />
        <Divider>New Note</Divider>
        {/* Add Note Inputs */}
        <TextField
          label="Note Title"
          value={noteTitle}
          onChange={(e) => setNoteTitle(e.target.value)}
          fullWidth
          style={{ marginBottom: "12px", maxWidth: "650px" }}
          autoComplete="off"
        />
        <TextField
          label="Note Body"
          value={noteBody}
          onChange={(e) => setNoteBody(e.target.value)}
          multiline
          rows={4}
          fullWidth
          style={{ marginBottom: "16px", maxWidth: "650px" }}
          autoComplete="off"
        />
        <Button
          onClick={handleAddNote}
          variant="contained"
          color="primary"
          fullWidth
          style={{ marginBottom: "20px", maxWidth: "650px" }}
          autoComplete="off"
        >
          Add New Note
        </Button>
        <Divider>Note List</Divider>

        {/* Notes List (Filtered) */}
        <List sx={{ maxHeight: "50vh", overflowY: "auto", maxWidth: "650px" }}>
          {filteredNotes.map((note, index) => (
            <ListItem
              key={index}
              divider
              sx={{ alignItems: "flex-start", paddingBottom: "10px" }}
            >
              <div style={{ flex: 1 }}>
                <strong style={{ display: "block", marginBottom: "4px" }}>
                  {note.title}
                </strong>
                <span
                  style={{
                    fontSize: "0.875rem",
                    color: theme.palette.text.secondary,
                  }}
                >
                  {note.date}
                </span>
                <p style={{ margin: "8px 0" }}>{note.body}</p>
              </div>
              <IconButton
                onClick={() => handleDeleteNote(index)}
                sx={{
                  color: theme.palette.primary.main, // Set main color for the icon
                  "&:hover": {
                    color: theme.palette.primary.dark, // Darker shade on hover
                  },
                }}
              >
                <i className="fas fa-trash-alt"></i> {/* Font Awesome Icon */}
              </IconButton>
            </ListItem>
          ))}
        </List>
      </div>
    </Drawer>
  );
};

export default CompanyNotesDrawer;
