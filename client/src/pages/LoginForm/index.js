import React, { useState } from "react";
import Stylesheet from "reactjs-stylesheet";
import "./../../assets/fonts/fonts.css";
import Logo from "../../components/Logo";
import { Form, Button, Container } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import EyeOpen from "./../../assets/eye-open.png";
import EyeClose from "./../../assets/eye-close.png";

function LoginForm() {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [isLinkHovered, setIsLinkHovered] = useState(false);
  const [isButtonHovered, setIsButtonHovered] = useState(false);
  const [isPasswordInvisible, setIsPasswordInvisible] = useState(false);
  const navigate = useNavigate();

  const handlePasswordChange = (event) => setPassword(event.target.value);
  const handleEmailChange = (event) => setEmail(event.target.value);

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_BASE_URL}/login`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        }
      );

      const data = await response.json();
      if (response.ok) {
        alert("Login successful!");
        navigate("/Home");
      } else {
        alert(`Failed to login: ${data.error}`);
      }
    } catch (error) {
      alert("Error logging in: " + error.message);
    }
  };
  return (
    <div style={styles.loginContainerStyle}>
      <h1 style={styles.appTitleStyle}>BEST BY NOTIFICATION</h1>
      <h2 style={styles.loginTitleStyle}>LOGIN</h2>
      <Logo />
      <Container style={{ paddingTop: "5vh", width: "75%" }}>
        <Form onSubmit={handleSubmit} style={styles.loginFormStyle}>
          <Form.Group style={styles.formGroupStyle} controlId="formBasicEmail">
            <Form.Control
              style={styles.inputStyle}
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={handleEmailChange}
              required
            />
            <div style={styles.passwordContainer}>
              <Form.Control
                style={styles.inputStyle}
                type={isPasswordInvisible ? "text" : "password"}
                placeholder="Enter your password"
                value={password}
                onChange={handlePasswordChange}
                required
              />
              <img
                src={isPasswordInvisible ? EyeOpen : EyeClose}
                alt={isPasswordInvisible ? "Show Password" : "Hide Password"}
                onClick={() => setIsPasswordInvisible(!isPasswordInvisible)}
                style={styles.toggleImage}
              />
            </div>
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
            Login
          </Button>
          <div style={styles.signupLinkStyle}>
            <Link
              to="/SignupForm"
              style={{
                ...styles.signupLink,
                ...(isLinkHovered ? styles.signupLinkHover : {}),
              }}
              onMouseEnter={() => setIsLinkHovered(true)}
              onMouseLeave={() => setIsLinkHovered(false)}
            >
              Don't have an account? Sign up here!
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
  loginFormStyle: {
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
  loginTitleStyle: {
    fontFamily: "GothicA1-Regular",
    // paddingBottom: "1px", // Adds some space between the text and the underline
    marginBottom: "5vh",
    marginTop: "-1vh",
    fontSize: "8vw",
  },
  loginContainerStyle: {
    alignItems: "center",
    flexDirection: "column",
    display: "flex",
    justifyContent: "center",
    marginTop: "4vh",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  signupLinkStyle: {
    marginTop: "1rem",
    textAlign: "end",
    color: "#1877F2",
  },
  signupLink: {
    textDecoration: "none",
    color: "inherit",
    "&:hover": {
      textDecoration: "underline",
    },
  },
  signupLinkHover: {
    textDecoration: "underline",
  },
  buttonHover: {
    backgroundColor: "#333333",
    color: "#FFF",
  },
  passwordContainer: {
    position: "relative",
    width: "100%",
  },
  toggleImage: {
    position: "absolute",
    right: "-4.5vw",
    top: "43.5%",
    transform: "translateY(-56%)",
    cursor: "pointer",
    width: "22px",
    height: "22px",
  },
});

export default LoginForm;
