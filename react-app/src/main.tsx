import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import { BrowserRouter } from 'react-router-dom'
import { createTheme, responsiveFontSizes, ThemeProvider } from '@mui/material'
import { SnackbarProvider } from 'notistack'

let theme = createTheme();
theme = responsiveFontSizes(theme);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <SnackbarProvider>
          <App />
        </SnackbarProvider>
      </BrowserRouter>
    </ThemeProvider>
  </StrictMode>,
)
