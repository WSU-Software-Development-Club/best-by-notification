import React, { useState, useEffect } from "react";
import Logo from "../../components/Logo/Logo";
import { Form, Button, Container } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import "./index.css";

function TokenVerifyForm() {
  const [token, setToken] = useState("");
  const [email, setEmail] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    // Retrieve the email from localStorage saved from ForgotPasswordForm
    const savedEmail = localStorage.getItem("userEmail");
    if (savedEmail) {
      setEmail(savedEmail);
    }
  }, []);

  const handleTokenChange = (event) => setToken(event.target.value);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_BASE_URL}/reset_password`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, token }),
        }
      );

      const data = await response.json();
      if (response.ok) {
        alert("Token verified successfully!");
        navigate("/ResetPasswordForm");
      } else {
        alert(`Invalid token: ${data.error}`);
      }
    } catch (error) {
      alert("Error verifying token: " + error.message);
    }
  };

  return (
    <div className="resetContainerStyle">
      <h1 className="appTitleStyle">BEST BY NOTIFICATION</h1>
      <h2 className="resetTitleStyle">ENTER SECURITY TOKEN</h2>
      <Logo />
      <Container style={{ paddingTop: "5vh", width: "75%" }}>
        <Form onSubmit={handleSubmit} className="resetFormStyle">
          <Form.Group className="formGroupStyle" controlId="formBasicEmail">
            <Form.Control
              className="inputStyle"
              type="text"
              placeholder="Enter Your Security Token"
              value={token}
              onChange={handleTokenChange}
              required
            />
          </Form.Group>
          <Button className="buttonStyle" variant="primary" type="submit">
            Verify Security Token
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

export default TokenVerifyForm;
