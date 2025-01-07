import React from "react";
import logo from "./../../assets/images/fried-egg.png";
import Stylesheet from "reactjs-stylesheet";
import "./Logo.css";

function Logo() {
  return <img src={logo} alt="Logo" className="logoStyle" />;
}

const styles = Stylesheet.create({
  logoStyle: {
    width: "17.61vh",
    height: "auto",
  },
});

export default Logo;
