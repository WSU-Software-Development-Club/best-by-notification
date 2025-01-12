import React, { useState } from "react";
import Logo from "../../components/Logo/Logo";
import { Form, Button, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./index.css";

function ResetForm() {
  const [email, setEmail] = useState("");

  const handleEmailChange = (event) => setEmail(event.target.value);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_BASE_URL}/forgot-password`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email }),
        }
      );

      const data = await response.json();
      if (response.ok) {
        alert("Password reset link sent to your email!");
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
      <h2 className="resetTitleStyle">RESET PASSWORD</h2>
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
            Send Reset Link
          </Button>
          <div className="loginLinkStyle">
            <Link to="/LoginForm" className="loginLink">
              Go to back Login Page
            </Link>
          </div>
        </Form>
      </Container>
    </div>
  );
}

export default ResetForm;