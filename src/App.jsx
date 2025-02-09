import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import Home from "./pages/Home";
import Scoresheets from "./pages/Scoresheets";
function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/scoresheets" element={<Scoresheets />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
