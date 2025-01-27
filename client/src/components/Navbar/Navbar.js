import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import eggIcon from "../../assets/images/fried-egg.png"; // Import the icon
import menuToggleIcon from "../../assets/images/line-angle-left-icon.png";
import addIcon from "../../assets/images/plus-round-line-icon.png";       
import historyIcon from "../../assets/images/notebook-line-icon.png";
import recipeIcon from "../../assets/images/text-document-add-icon.png";
import logoutIcon from "../../assets/images/logout-line-icon.png";
import "./Navbar.css"; // Assuming you are using the same CSS file for Navbar

const Navbar = ({ toggleModal, toggleIngredientModal }) => {
  const navigate = useNavigate();
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Logout handler
  const handleLogout = async () => {
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_BASE_URL}/logout`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      );

      if (response.ok) {
        const data = await response.json();
        alert(data.message);
        navigate("/LoginForm");
      } else {
        alert("Logout failed: ", response.statusText);
      }
    } catch (error) {
      alert("Error logging out: ", error);
    }
  };

  return (
    <div className={`bottomNavbar ${isCollapsed ? "collapsed" : ""}`}>
      <div className="logoContainer">
        <img
          src={eggIcon}
          alt="Home"
          className="homeIcon"
          onClick={() => navigate("/InputForm")}
        />
        {!isCollapsed && <span className="logoText">Best by Notification</span>}
      </div>

      <div className="navItems">
        <button className="navbarButton" onClick={toggleModal}>
          <img src={addIcon} alt="Add" className="navIcon" />
          <span>Add Product</span>
        </button>
        <button className="navbarButton" onClick={() => navigate("/History")}>
          <img src={historyIcon} alt="History" className="navIcon" />
          <span>View History</span>
        </button>
        <button className="navbarButton" onClick={toggleIngredientModal}>
          <img src={recipeIcon} alt="Recipes" className="navIcon" />
          <span>Recipes</span>
        </button>
        <button className="navbarButton" onClick={handleLogout}>
          <img src={logoutIcon} alt="Logout" className="navIcon" />
          <span>Logout</span>
        </button>
      </div>

      <button 
        className="toggleButton"
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        <img src={menuToggleIcon} alt="Toggle menu" />
      </button>
    </div>
  );
};

export default Navbar;
