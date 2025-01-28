import React, { useState } from "react";
import "./../../assets/fonts/fonts.css";
import Logo from "../../components/Logo/Logo";
import { Form, Button, Container } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import EyeOpen from "./../../assets/images/eye-open.png";
import EyeClose from "./../../assets/images/eye-close.png";
import "./index.css";

function LoginForm() {
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
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
          credentials: "include", // Allow cookies
          body: JSON.stringify({ email, password }),
        }
      );
      const data = await response.json();
      if (response.ok) {
        // Save user details in localStorage
        sessionStorage.setItem("userId", data.user.id);
        sessionStorage.setItem("userEmail", data.user.email);

        alert("Login successful!");
        navigate("/InputForm");
      } else {
        alert(`Failed to login: ${data.error}`);
      }
    } catch (error) {
      alert("Error logging in: " + error.message);
    }
  };
  return (
    <div className="loginContainerStyle">
      <h1 className="appTitleStyle">BEST BY NOTIFICATION</h1>
      <h2 className="loginTitleStyle">LOGIN</h2>
      <Logo />
      <Container style={{ paddingTop: "5vh", width: "75%" }}>
        <Form onSubmit={handleSubmit} className="loginFormStyle">
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
          </Form.Group>
          <Button className="buttonStyle" variant="primary" type="submit">
            Login
          </Button>
          <div className="signupLinkStyle">
            <Link to="/SignupForm" className="signupLink">
              Don't have an account? Sign up here!
            </Link>
          </div>
          <div className="forgotPasswordLinkStyle">
            <Link to="/ForgotPasswordForm" className="forgotPasswordLink">
              Forgot password?
            </Link>
          </div>
        </Form>
      </Container>
    </div>
  );
}

export default LoginForm;
