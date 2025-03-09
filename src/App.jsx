import React from "react";
import { BrowserRouter, Routes, Route } from "react-router";
import Scoresheets from "./pages/Scoresheets";
import Login from "./pages/Login";
import Personal from "./pages/Personal";
import { CssBaseline, ThemeProvider } from "@mui/material";
import theme from "./lib/theme";
import Home from "./pages/Home";
import NewScoresheet from "./pages/NewScoresheet";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <div className="app">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/home" element={<Home />} />
            <Route path="/scoresheets" element={<Scoresheets />} />
            <Route
              path="/personal"
              element={<Personal isRegistration={false} />}
            />
          </Routes>
        </div>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
