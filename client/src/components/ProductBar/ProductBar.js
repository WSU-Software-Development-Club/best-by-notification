import React from "react";
import "./ProductBar.css";

import poultry from "./../../assets/icons/chicken-leg-icon.png";
import seafood from "./../../assets/icons/seafood-icon.png";
import dairy from "./../../assets/icons/milk-icon.png";
import fruits from "./../../assets/icons/fruit-basket-icon.png";
import vegetables from "./../../assets/icons/carrot-vegetable-icon.png";
import grains from "./../../assets/icons/rice-icon.png";
import snacks from "./../../assets/icons/snacks-icon.png";
import beverages from "./../../assets/icons/soda-with-straw-icon.png";
import frozen from "./../../assets/icons/snowflake-icon.png";
import other from "./../../assets/icons/image-photography-icon.png";

const getCategoryIcons = (category) => {
  const icons = {
    poultry: poultry,
    seafood: seafood,
    dairy: dairy,
    fruits: fruits,
    vegetables: vegetables,
    grains: grains,
    snacks: snacks,
    beverages: beverages,
    frozen: frozen,
    other: other,
  };
  return icons[category];
};

const ProductBar = ({
  productID,
  productName,
  expirationDate,
  productCategory,
  onDeletion,
}) => {
  const handleDeletion = async (event) => {
    event.preventDefault();

    // Get user ID
    // const userId = sessionStorage.getItem("userId");
    // const productId = event.target.getAttribute("productID");

    if (!productID) {
      alert("Product ID not found.");
      return;
    }

    try {
      // API URL for deleting a product
      const apiUrl = `${process.env.REACT_APP_API_BASE_URL}/delete_product/${productID}`;

      const response = await fetch(apiUrl, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const result = await response.json();

      if (response.ok) {
        alert(result.message);
        onDeletion(); // Refresh the list of products
      } else {
        alert(`Error: ${result.error}`);
        console.log("Error deleting product:", result.error);
      }
    } catch (error) {
      console.log("Error deleting product:", error);
      alert(
        "Failed to delete product. Please try again later. Error: " + error
      );
    }
  };
  const formatDate = (dateString) => {
    if (!dateString) {
      // stuck here after parsing
      return "No date provided";
    }
    // Try parsing the date using Date object
    const date = new Date(Date.parse(dateString)); // Convert to valid format
    if (isNaN(date)) {
      return "Invalid Date"; // Handle errors
    }
    return date.toLocaleDateString("en-US", {
      weekday: "short", // 'Tue'
      year: "numeric", // '2025'
      month: "short", // 'Jan'
      day: "2-digit", // '07'
    });
  };

  const icons = getCategoryIcons(productCategory);

  return (
    <div className="productBar">
      <img src={icons} alt={productCategory} className="categoryIcon" />
      <div className="productInfo">
        <h3>{productName}</h3>
        <p>Category: {productCategory}</p>
        <p>Expires: {formatDate(expirationDate)}</p>
      </div>
      <button className="deleteButton" onClick={handleDeletion}>
        Delete
      </button>
    </div>
  );
};

export default ProductBar;
