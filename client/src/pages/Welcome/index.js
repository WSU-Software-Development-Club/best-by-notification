import React, { useEffect } from "react";
import "./../../assets/fonts/fonts.css";
import Stylesheet from "reactjs-stylesheet";
import { useNavigate } from "react-router-dom";
import Logo from "../../components/Logo";

function Welcome() {
  let navigate = useNavigate();
  const routeChange = () => {
    let path = `./../SignupForm/`;
    navigate(path);
  };
  useEffect(() => {
    // Apply global styles to prevent scroll and remove margin/padding
    document.body.style.margin = 0;
    document.body.style.padding = 0;
    document.body.style.overflow = "hidden"; // Prevents scrolling
    return () => {
      // Clean up to restore the body styles when the component is unmounted
      document.body.style.overflow = "auto";
    };
  }, []);
  const handleMouseOver = (e) => {
    e.target.style.backgroundColor = "#FFB86C"; // Change color on hover
  };

  const handleMouseOut = (e) => {
    e.target.style.backgroundColor = "#FFDAC1"; // Revert color on mouse out
  };
  return (
    <div style={styles.welcomeStyle}>
      <div style={styles.circleStyle}>
        <Logo />
      </div>
      <div style={styles.textStyle}>
        <h1>Welcome!</h1>
        <button
          type="button"
          style={styles.buttonStyle}
          onMouseOver={handleMouseOver}
          onMouseOut={handleMouseOut}
          onClick={routeChange}
        >
          Start Scanning!
        </button>
      </div>
    </div>
  );
}

const styles = Stylesheet.create({
  welcomeStyle: {
    backgroundColor: "#F0B289", // Background color
    height: "100vh", // Full viewport height
    width: "100vw", // Full viewport width
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center",
  },
  circleStyle: {
    width: "200px", // Diameter of the circle
    height: "200px", // Diameter of the circle
    backgroundColor: "white", // Circle background color
    borderRadius: "50%", // Make it circular
    display: "flex", // Use flexbox to center the logo inside the circle
    justifyContent: "center",
    alignItems: "center",
    border: "5px solid #AC8266",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)", // Optional shadow for depth
  },
  textStyle: {
    fontFamily: "Rubik Doodle Shadow",
    color: "#FFFBFB",
    fontSize: "32px",
    alignItems: "center",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
  },
  buttonStyle: {
    padding: "10px 20px", // Vertical and horizontal padding
    borderRadius: "30px", // Rounded corners
    border: "none", // Remove default border
    backgroundColor: "#FFDAC1", // Button background color
    color: "#985C35", // Text color
    fontSize: "32px", // Font size
    cursor: "pointer", // Change cursor on hover
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.5)", // Darker shadow for depth
    transition: "background-color 0.3s, box-shadow 0.3s", // Smooth transition on hover
  },
});

export default Welcome;
