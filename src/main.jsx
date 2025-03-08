import { StrictMode } from 'react'
import { createRoot } from "react-dom/client";
import App from './App.jsx'
import "@fontsource/jersey-25";

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
