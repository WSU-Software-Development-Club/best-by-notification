import React, { useState } from "react";
import Stylesheet from "reactjs-stylesheet";
import "./../../assets/fonts/fonts.css";
import Logo from "../../components/Logo/Logo";
import { Form, Button, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import EyeOpen from "./../../assets/images/eye-open.png";
import EyeClose from "./../../assets/images/eye-close.png";
import "./index.css";

function SignupForm() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [isPasswordInvisible, setIsPasswordInvisible] = useState(false);
  const [isConfirmPasswordInvisible, setIsConfirmPasswordInvisible] =
    useState(false);

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
    <div className="signupContainerStyle">
      <h1 className="appTitleStyle">BEST BY NOTIFICATION</h1>
      <h2 className="signupTitleStyle">SIGN UP</h2>
      <Logo />
      <Container style={{ paddingTop: "5vh", width: "75%" }}>
        <Form onSubmit={handleSubmit} className="signupFormStyle">
          <Form.Group className="formGroupStyle" controlId="formBasicEmail">
            <Form.Control
              className="inputStyle"
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={handleEmailChange}
              required
            />
            <div className="passwordContainer">
              <Form.Control
                className="inputStyle"
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
                className="toggleImage"
              />
            </div>
            <div className="confirmPasswordContainer">
              <Form.Control
                className="inputStyle"
                type={isConfirmPasswordInvisible ? "text" : "password"}
                placeholder="Confirm password"
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
            Sign Up
          </Button>
          <div className="loginLinkStyle">
            <Link to="/LoginForm" className="loginLink">
              Have an account? Login!
            </Link>
          </div>
        </Form>
      </Container>
    </div>
  );
}

// const styles = Stylesheet.create({
//   buttonStyle: {
//     padding: "1.3vw",
//     paddingTop: "1.6vh",
//     paddingBottom: "1.6vh",
//     width: "110%",
//     borderRadius: "12px",
//     border: "1px solid #ccc",
//     fontSize: "4vw",
//     marginTop: "0.7vh",
//     backgroundColor: "#000",
//     color: "#FFF",
//   },
//   inputStyle: {
//     height: "3.5vh",
//     width: "100%",
//     padding: "1.3vh",
//     borderRadius: "12px",
//     border: "1px solid #ccc",
//     fontSize: "4vw",
//     paddingLeft: "4vw",
//     paddingBottom: "0.8vh",
//     marginBottom: "1.7vh",
//   },
//   signupFormStyle: {
//     display: "flex",
//     justifyContent: "center",
//     alignItems: "center",
//     flexDirection: "column",
//   },
//   formGroupStyle: {
//     display: "flex",
//     justifyContent: "center",
//     flexDirection: "column",
//     marginLeft: "-7vw",
//     marginTop: "2vh",
//     width: "100%",
//   },
//   appTitleStyle: {
//     fontFamily: "GothicA1-Regular",
//     borderBottom: "3px solid black", // Adds a black underline
//     // paddingBottom: "1px", // Adds some space between the text and the underline
//     fontSize: "8vw",
//   },
//   signupTitleStyle: {
//     fontFamily: "GothicA1-Regular",
//     // paddingBottom: "1px", // Adds some space between the text and the underline
//     marginBottom: "5vh",
//     marginTop: "-1vh",
//     fontSize: "8vw",
//   },
//   signupContainerStyle: {
//     alignItems: "center",
//     flexDirection: "column",
//     display: "flex",
//     justifyContent: "center",
//     marginTop: "4vh",
//     whiteSpace: "nowrap",
//     overflow: "hidden",
//     textOverflow: "ellipsis",
//   },
//   loginLinkStyle: {
//     marginTop: "1rem",
//     textAlign: "end",
//     color: "#1877F2",
//   },
//   loginLink: {
//     textDecoration: "none",
//     color: "inherit",
//     "&:hover": {
//       textDecoration: "underline",
//     },
//   },
//   loginLinkHover: {
//     textDecoration: "underline",
//   },
//   buttonHover: {
//     backgroundColor: "#333333",
//     color: "#FFF",
//   },
//   passwordContainer: {
//     position: "relative",
//     width: "100%",
//   },
//   confirmPasswordContainer: {
//     position: "relative",
//     width: "100%",
//   },
//   toggleImage: {
//     position: "absolute",
//     right: "-4.5vw",
//     top: "43.5%",
//     transform: "translateY(-56%)",
//     cursor: "pointer",
//     width: "22px",
//     height: "22px",
//   },
// });

export default SignupForm;
