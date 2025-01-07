import React from "react";
import "./ProductBar.css";

const ProductBar = ({
  productName,
  expirationDate,
  productCategory,
  handleDelete,
}) => {
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
      <button className="deleteButton" onClick={handleDelete}>
        Delete
      </button>
    </div>
  );
};

export default ProductBar;
