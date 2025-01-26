import React from "react";
import { useNavigate } from "react-router-dom";
import eggIcon from "../../assets/images/fried-egg.png"; // Import the icon
import "./Navbar.css"; // Assuming you are using the same CSS file for Navbar

const Navbar = ({ toggleModal, toggleIngredientModal }) => {
  const navigate = useNavigate();

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
    <div className="bottomNavbar">
      {/* Icon for navigating to home */}
      <img
        src={eggIcon}
        alt="Home"
        className="homeIcon"
        onClick={() => navigate("/InputForm")} // Clicking icon takes to home page
      />
      <button className="navbarButton" onClick={toggleModal}>
        Add Product
      </button>
      <button className="navbarButton" onClick={() => navigate("/History")}>
        View Your Products
      </button>
      <button className="navbarButton" onClick={toggleIngredientModal}>
        Find Recipes
      </button>
      <button className="navbarButton" onClick={handleLogout}>
        {/* <Link className="signoutLink">Sign Out</Link> */}
        Sign Out
      </button>
    </div>
  );
};

export default Navbar;
