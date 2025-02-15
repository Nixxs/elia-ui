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
