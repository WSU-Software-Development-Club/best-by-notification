import React, { useState } from "react";
import Stylesheet from "reactjs-stylesheet";
import "./../../assets/fonts/fonts.css";
import Logo from "../../components/Logo";
import { Form, Button, Container } from "react-bootstrap";

function EmailForm() {
  const [email, setEmail] = useState("");

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("http://localhost:5000/set-recipient", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (response.ok) {
        alert("Email submitted successfully!");
      } else {
        alert("Failed to submit email. Please try again.");
      }
    } catch (error) {
      alert("Error sending email address: " + error);
    }
  };
  return (
    <div style={styles.containerStyle}>
      <h1 style={styles.titleStyle}>BEST BY NOTIFICATION</h1>
      <Logo />
      <Container style={{ paddingTop: "5vh", width: "75%" }}>
        <Form onSubmit={handleSubmit}>
          <Form.Group style={styles.emailGroupStyle} controlId="formBasicEmail">
            <Form.Label style={styles.emailLabelStyle}>
              Enter your email:{" "}
            </Form.Label>
            <Form.Control
              style={styles.emailFormStyle}
              type="email"
              placeholder="emailaddress@mail.com"
              value={email}
              onChange={handleEmailChange}
              required
            />
          </Form.Group>
          <Button style={styles.buttonStyle} variant="primary" type="submit">
            Submit
          </Button>
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
    width: "100%",
    borderRadius: "12px",
    border: "1px solid #ccc",
    fontSize: "4vw",
    marginTop: "2vh",
    backgroundColor: "#000",
    color: "#FFF",
  },
  emailFormStyle: {
    height: "3.5vh",
    width: "100%",
    padding: "1.3vh",
    borderRadius: "12px",
    border: "1px solid #ccc",
    fontSize: "4vw",
    paddingLeft: "4vw",
  },
  emailGroupStyle: {
    display: "flex",
    justifyContent: "center",
    alignItems: "start",
    flexDirection: "column",
    marginLeft: "-5vw",
    marginTop: "2vh",
  },
  emailLabelStyle: {
    fontFamily: "GothicA1-Regular",
    fontSize: "5vw",
    paddingBottom: "0.8vh",
  },
  titleStyle: {
    fontFamily: "GothicA1-Regular",
    borderBottom: "3px solid black", // Adds a black underline
    // paddingBottom: "1px", // Adds some space between the text and the underline
    marginBottom: "5vh",
    fontSize: "8vw",
  },
  containerStyle: {
    alignItems: "center",
    flexDirection: "column",
    display: "flex",
    justifyContent: "center",
    marginTop: "4vh",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
});

export default EmailForm;
