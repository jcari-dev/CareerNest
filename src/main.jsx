// src/main.jsx
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import { ThemeProvider, CssBaseline } from '@mui/material';
import useCustomTheme from './theme/theme'; // Import the custom theme hook

const root = createRoot(document.getElementById('root'));

function RootApp() {
  const theme = useCustomTheme(); // Get the theme with user preference detection

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  );
}

root.render(
  <StrictMode>
    <RootApp />
  </StrictMode>
);
