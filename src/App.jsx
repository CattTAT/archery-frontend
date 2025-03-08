import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import Home from "./pages/Home";
import Scoresheets from "./pages/Scoresheets";
import Personal from "./pages/Personal";
import { CssBaseline, ThemeProvider } from "@mui/material";
import theme from "./lib/theme";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <div className="app">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/scoresheets" element={<Scoresheets />} />
            <Route path="/personal" element={<Personal />} />
          </Routes>
        </div>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
