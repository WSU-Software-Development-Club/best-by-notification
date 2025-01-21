import React, { useState, useEffect } from "react";
import Logo from "../../components/Logo/Logo";
import { Form, Button, Container } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import EyeOpen from "./../../assets/images/eye-open.png";
import EyeClose from "./../../assets/images/eye-close.png";
import "./index.css";

function ResetPasswordForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isPasswordInvisible, setIsPasswordInvisible] = useState(false);
  const [isConfirmPasswordInvisible, setIsConfirmPasswordInvisible] =
    useState(false);

  const navigate = useNavigate();

  const handlePasswordChange = (event) => setPassword(event.target.value);

  const handleConfirmPasswordChange = (event) =>
    setConfirmPassword(event.target.value);

  useEffect(() => {
    // Retrieve the email from localStorage saved from ForgotPasswordForm
    const savedEmail = localStorage.getItem("userEmail");
    if (savedEmail) {
      setEmail(savedEmail);
    }
  }, []);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_BASE_URL}/set_new_password`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        }
      );

      const data = await response.json();
      if (response.ok) {
        alert("Password reset successfully!");
        navigate("/LoginForm");
      } else {
        alert(`Invalid password: ${data.error}`);
      }
    } catch (error) {
      alert("Error resetting password: " + error.message);
    }
  };

  return (
    <div className="resetContainerStyle">
      <h1 className="appTitleStyle">BEST BY NOTIFICATION</h1>
      <h2 className="resetTitleStyle">SET NEW PASSWORD</h2>
      <Logo />
      <Container style={{ paddingTop: "5vh", width: "75%" }}>
        <Form onSubmit={handleSubmit} className="resetFormStyle">
          <Form.Group className="formGroupStyle" controlId="formBasicEmail">
            <div className="passwordContainer">
              <Form.Control
                className="inputStyle"
                type={isPasswordInvisible ? "text" : "password"}
                placeholder="Enter your new Password"
                value={password}
                onChange={handlePasswordChange}
                required
              />
              <img
                src={isPasswordInvisible ? EyeOpen : EyeClose}
                alt={isPasswordInvisible ? "Show Password" : "Hide Password"}
                onClick={() => setIsPasswordInvisible(!isPasswordInvisible)}
                className="toggleImage"
              />
            </div>
            <div className="confirmPasswordContainer">
              <Form.Control
                className="inputStyle"
                type={isConfirmPasswordInvisible ? "text" : "password"}
                placeholder="Confirm your new Password"
                value={confirmPassword}
                onChange={handleConfirmPasswordChange}
                required
              />
              <img
                src={isConfirmPasswordInvisible ? EyeOpen : EyeClose}
                alt={
                  isConfirmPasswordInvisible ? "Show Password" : "Hide Password"
                }
                onClick={() =>
                  setIsConfirmPasswordInvisible(!isConfirmPasswordInvisible)
                }
                className="toggleImage"
              />
            </div>
          </Form.Group>
          <Button className="buttonStyle" variant="primary" type="submit">
            Set New Password
          </Button>
          <div className="loginLinkStyle">
            <Link to="/LoginForm" className="loginLink">
              Go back to Login Page
            </Link>
          </div>
        </Form>
      </Container>
    </div>
  );
}

export default ResetPasswordForm;
