import React from 'react'
import ReactDOM from 'react-dom/client'
import CssBaseline from '@mui/material/CssBaseline';
import { ThemeProvider, createTheme, responsiveFontSizes } from '@mui/material/styles';
import { AuthProvider } from './features/AuthManager.jsx';
import App from './App.jsx'
import './index.css'

const eliaTheme = createTheme({
  palette: {
    mode: 'light',
  },
  typography: {
    fontFamily: "Roboto, Arial, sans-serif",
  },
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          "& input:-webkit-autofill": {
            WebkitBoxShadow: "0 0 0px 1000px white inset",
            transition: "background-color 5000s ease-in-out 0s",
            color: "#000 !important", // Force text to black
            WebkitTextFillColor: "#000 !important", // Force autofill text to black
            caretColor: "#000 !important", // Make cursor black
            borderColor: "#000 !important", // Ensure borders remain visible
          },
          "& input:-webkit-autofill:hover": {
            caretColor: "#000 !important",
          },
          "& input:-webkit-autofill:focus": {
            caretColor: "#000 !important",
          },
          "& input:-webkit-autofill:active": {
            caretColor: "#000 !important",
          },
        },
      },
    },
  },
});

const currentTheme = responsiveFontSizes(eliaTheme);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <CssBaseline />
    <ThemeProvider theme={currentTheme}>
      <AuthProvider>
        <App />
      </AuthProvider>
    </ThemeProvider>
  </React.StrictMode>,
)
