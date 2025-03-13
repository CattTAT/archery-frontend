import React from "react";
import { BrowserRouter, Routes, Route } from "react-router";
import Scoresheets from "./pages/Scoresheets";
import Login from "./pages/Login";
import Personal from "./pages/Personal";
import { CssBaseline, ThemeProvider } from "@mui/material";
import theme from "./lib/theme";
import Home from "./pages/Home";
import NewScoresheet from "./pages/NewScoresheet";
import Statistics from "./pages/Statistics";
import Equipment from "./pages/Equipment";
import EquipmentDetail from "./pages/EquipmentDetail";

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
            <Route path="/new-scoresheet" element={<NewScoresheet />} />
            <Route path="/statistics" element={<Statistics />} />
            <Route path="/equipment/:type" element={<Equipment />} />
            <Route path="/new-equipment" element={<EquipmentDetail />} />
            <Route path="/edit-equipment/:id" element={<EquipmentDetail />} />

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
