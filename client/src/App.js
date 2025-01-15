import React from "react";
import Welcome from "./pages/Welcome";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SignupForm from "./pages/SignupForm";
import LoginForm from "./pages/LoginForm";
import InputForm from "./pages/InputForm";
import ResetForm from "./pages/ResetForm";
import History from "./pages/History";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/Welcome" element={<Welcome />} />
        <Route path="/Home" element={<Home />} />
        <Route path="/SignupForm" element={<SignupForm />} />
        <Route path="/LoginForm" element={<LoginForm />} />
        <Route path="InputForm" element={<InputForm />} />
        <Route path="/ResetForm" element={<ResetForm />} />
        <Route path="/History" element={<History />} />
      </Routes>
    </Router>
  );
}

export default App;
