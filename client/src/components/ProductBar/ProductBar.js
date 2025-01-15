import React from "react";
import "./ProductBar.css";

const ProductBar = ({
  productID,
  productName,
  expirationDate,
  productCategory,
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
  return (
    <div className="productBar">
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
