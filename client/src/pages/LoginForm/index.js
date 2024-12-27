import React, { useState } from "react";
import Stylesheet from "reactjs-stylesheet";
import "./../../assets/fonts/fonts.css";
import Logo from "../../components/Logo";
import EyeOpen from "./../../assets/eye.png";
import EyeClosed from "./../../assets/hidden.png";
import { Form, Button, Container } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import "./../../passtoggle.css";
function LoginForm() {
  const [password, setPassword] = useState("");
  const[visible, setVisible] = useState(false);
  const [email, setEmail] = useState("");
  const [isLinkHovered, setIsLinkHovered] = useState(false);
  const [isButtonHovered, setIsButtonHovered] = useState(false);
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
            <Form.Group style={styles.formGroupStyle} controlId="formBasicPassword">
              <div style={styles.passwordInputContainer}>
            <Form.Control
              style={styles.inputStyle}
              type={visible ? "text" : "password"}
              placeholder="Enter your password"
              value={password}
              onChange={handlePasswordChange}
              required
            />
           <img src={visible ? EyeOpen : EyeClosed}
            alt={visible ? "Show Password" : "Hide Password"}
            onClick = {() => setVisible(!visible)}
            style={styles.toggleImage}
            />

             </div>
             </Form.Group>
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
  passwordInputContainer: {
    position: "relative",
    display: "flex",
    alignItems: "center",
    justifyContent: "center", // Center horizontally within its container
    marginBottom: "1.7vh", // Same as other input fields
    width: "100%", // Ensure it matches the container width
  },
  inputStyle: {
    height: "6.0vh",
    width: "100%",
    padding: "1.5vh",
    borderRadius: "12px",
    border: "1px solid #ccc",
    fontSize: "5vw",
    padding: "1.3vh",
    paddingRight: "3.5vh",
    paddingBottom: "0.8vh",
    marginBottom: "2vh",
    boxSizing: "border-box",
  },
  toggleImage: {
    position: "absolute",
    right: "1vh", // Adjust for alignment
    top: "40%",
    transform: "translateY(-50%)", // Center vertically
    width: "30px",
    height: "30px",
    cursor: "pointer",
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
});

export default LoginForm;
