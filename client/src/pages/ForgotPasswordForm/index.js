import React, { useState } from "react";
import Logo from "../../components/Logo/Logo";
import { Form, Button, Container } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import "./index.css";

function ForgotPasswordForm() {
  const [email, setEmail] = useState("");

  const handleEmailChange = (event) => setEmail(event.target.value);

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_BASE_URL}/forgot_password`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        }
      );

      const data = await response.json();
      if (response.ok) {
        // Save email to localStorage to reuse it in TokenVerifyForm
        localStorage.setItem("userEmail", email);
        alert("Password reset token sent to your email!");
        navigate("/TokenVerifyForm");
      } else {
        alert(`Failed to send reset link: ${data.error}`);
      }
    } catch (error) {
      alert("Error sending reset link: " + error.message);
    }
  };

  return (
    <div className="resetContainerStyle">
      <h1 className="appTitleStyle">BEST BY NOTIFICATION</h1>
      <h2 className="resetTitleStyle">FIND YOUR ACCOUNT</h2>
      <Logo />
      <Container style={{ paddingTop: "5vh", width: "75%" }}>
        <Form onSubmit={handleSubmit} className="resetFormStyle">
          <Form.Group className="formGroupStyle" controlId="formBasicEmail">
            <Form.Control
              className="inputStyle"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={handleEmailChange}
              required
            />
          </Form.Group>
          <Button className="buttonStyle" variant="primary" type="submit">
            Send Reset Token
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

export default ForgotPasswordForm;
