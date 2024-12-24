import React, { useState } from "react";
import Stylesheet from "reactjs-stylesheet";
import "./../../assets/fonts/fonts.css";
import Logo from "../../components/Logo";
import { Form, Button, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

function SignupForm() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [isLinkHovered, setIsLinkHovered] = useState(false);
  const [isButtonHovered, setIsButtonHovered] = useState(false);

  const handlePasswordChange = (event) => setPassword(event.target.value);

  const handleConfirmPasswordChange = (event) =>
    setConfirmPassword(event.target.value);

  const handleEmailChange = (event) => setEmail(event.target.value);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_BASE_URL}/signup`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        }
      );

      const data = await response.json();
      if (response.ok) {
        alert("Email submitted successfully!");
      } else {
        alert(`Failed to signup: ${data.error}`);
      }
    } catch (error) {
      alert("Error signing up: " + error.message);
    }
  };
  return (
    <div style={styles.signupContainerStyle}>
      <h1 style={styles.appTitleStyle}>BEST BY NOTIFICATION</h1>
      <h2 style={styles.signupTitleStyle}>SIGN UP</h2>
      <Logo />
      <Container style={{ paddingTop: "5vh", width: "75%" }}>
        <Form onSubmit={handleSubmit} style={styles.signupFormStyle}>
          <Form.Group style={styles.formGroupStyle} controlId="formBasicEmail">
            <Form.Control
              style={styles.inputStyle}
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={handleEmailChange}
              required
            />
            <Form.Control
              style={styles.inputStyle}
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={handlePasswordChange}
              required
            />
            <Form.Control
              style={styles.inputStyle}
              type="password"
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={handleConfirmPasswordChange}
              required
            />
          </Form.Group>
          <Button
            style={{
              ...styles.buttonStyle,
              ...(isButtonHovered ? styles.buttonHover : {}),
            }}
            onMouseEnter={() => setIsButtonHovered(true)}
            onMouseLeave={() => setIsButtonHovered(false)}
            variant="primary"
            type="submit"
          >
            Sign Up
          </Button>
          <div style={styles.loginLinkStyle}>
            <Link
              to="/LoginForm"
              style={{
                ...styles.loginLink,
                ...(isLinkHovered ? styles.loginLinkHover : {}),
              }}
              onMouseEnter={() => setIsLinkHovered(true)}
              onMouseLeave={() => setIsLinkHovered(false)}
            >
              Have an account? Login!
            </Link>
          </div>
        </Form>
      </Container>
    </div>
  );
}

const styles = Stylesheet.create({
  buttonStyle: {
    padding: "1.3vw",
    paddingTop: "1.6vh",
    paddingBottom: "1.6vh",
    width: "110%",
    borderRadius: "12px",
    border: "1px solid #ccc",
    fontSize: "4vw",
    marginTop: "0.7vh",
    backgroundColor: "#000",
    color: "#FFF",
  },
  inputStyle: {
    height: "3.5vh",
    width: "100%",
    padding: "1.3vh",
    borderRadius: "12px",
    border: "1px solid #ccc",
    fontSize: "4vw",
    paddingLeft: "4vw",
    paddingBottom: "0.8vh",
    marginBottom: "1.7vh",
  },
  signupFormStyle: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "column",
  },
  formGroupStyle: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    marginLeft: "-7vw",
    marginTop: "2vh",
    width: "100%",
  },
  appTitleStyle: {
    fontFamily: "GothicA1-Regular",
    borderBottom: "3px solid black", // Adds a black underline
    // paddingBottom: "1px", // Adds some space between the text and the underline
    fontSize: "8vw",
  },
  signupTitleStyle: {
    fontFamily: "GothicA1-Regular",
    // paddingBottom: "1px", // Adds some space between the text and the underline
    marginBottom: "5vh",
    marginTop: "-1vh",
    fontSize: "8vw",
  },
  signupContainerStyle: {
    alignItems: "center",
    flexDirection: "column",
    display: "flex",
    justifyContent: "center",
    marginTop: "4vh",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  loginLinkStyle: {
    marginTop: "1rem",
    textAlign: "end",
    color: "#1877F2",
  },
  loginLink: {
    textDecoration: "none",
    color: "inherit",
    "&:hover": {
      textDecoration: "underline",
    },
  },
  loginLinkHover: {
    textDecoration: "underline",
  },
  buttonHover: {
    backgroundColor: "#333333",
    color: "#FFF",
  },
});

export default SignupForm;
