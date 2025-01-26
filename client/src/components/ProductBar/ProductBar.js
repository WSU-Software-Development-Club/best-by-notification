import React from "react";
import { formatDate } from "../../utils/dateFormatter";
import { getCategoryIcon } from "../../utils/icons"; // Use the centralized function
import "./ProductBar.css";

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

  const icons = getCategoryIcon(productCategory);

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
