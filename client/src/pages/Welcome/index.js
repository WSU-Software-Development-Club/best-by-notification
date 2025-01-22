import React, { useEffect } from "react";
import "./../../assets/fonts/fonts.css";
import { useNavigate } from "react-router-dom";
import Logo from "../../components/Logo/Logo";
import "./index.css";

function Welcome() {
  let navigate = useNavigate();
  const routeChange = () => {
    let path = `./../LoginForm/`;
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
  return (
    <div className="welcomeStyle">
      <div className="circleStyle">
        <Logo />
      </div>
      <div className="textStyle">
        <h1>Welcome!</h1>
        <button
          type="button"
          className="startButtonStyle"
          onClick={routeChange}
        >
          Start Scanning!
        </button>
      </div>
    </div>
  );
}

export default Welcome;
