import React from "react";
import Welcome from "./pages/Welcome";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import SignupForm from "./pages/SignupForm";
import LoginForm from "./pages/LoginForm";
import InputForm from "./pages/InputForm";
import ForgotPasswordForm from "./pages/ForgotPasswordForm";
import History from "./pages/History";
import TokenVerifyForm from "./pages/TokenVerifyForm";
import ResetPasswordForm from "./pages/ResetPasswordForm";
import RecipeDetail from "./pages/RecipeDetail";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Welcome />} />
        <Route path="/Welcome" element={<Welcome />} />
        <Route path="/SignupForm" element={<SignupForm />} />
        <Route path="/LoginForm" element={<LoginForm />} />
        <Route path="InputForm" element={<InputForm />} />
        <Route path="/ForgotPasswordForm" element={<ForgotPasswordForm />} />
        <Route path="/TokenVerifyForm" element={<TokenVerifyForm />} />
        <Route path="/ResetPasswordForm" element={<ResetPasswordForm />} />
        <Route path="/History" element={<History />} />
        <Route path="/recipe/:id" element={<RecipeDetail />} />
      </Routes>
    </Router>
  );
}

export default App;
