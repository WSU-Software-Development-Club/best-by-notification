import React from "react";
import Welcome from "./pages/Welcome";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import EmailForm from "./pages/EmailForm";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/home" element={<Home />} />
        <Route path="/emailform" element={<EmailForm />} />
      </Routes>
    </Router>
  );
}

export default App;
