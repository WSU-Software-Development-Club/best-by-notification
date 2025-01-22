import React, { useState } from "react";
import "./IngredientModal.css";

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

const handleSubmit = () => {};

const IngredientModal = ({ isOpen, toggleIngredientModal, products }) => {
  const [selectedProducts, setSelectedProducts] = useState([]);

  const handleSelectProduct = (product) => {
    setSelectedProducts((prevSelected) => {
      if (prevSelected.includes(product)) {
        // If the product is already selected, remove it
        return prevSelected.filter((item) => item !== product);
      } else {
        // Otherwise, add the product to the selected list
        return [...prevSelected, product];
      }
    });
  };
  if (!isOpen) return null; // Don't render if modal is closed

  return (
    <div className="modalOverlay">
      <div className="modalContainer">
        <h2 className="modalTitle">Pick Ingredients</h2>
        <div className="productBars">
          {products.length > 0 ? (
            products.map((product, index) => (
              <div
                className={`productBar ${
                  selectedProducts.includes(product) ? "selected" : ""
                }`}
                key={index}
                onClick={() => handleSelectProduct(product)}
              >
                <img
                  src={getCategoryIcons(product.category)}
                  alt={product.category}
                  className="categoryIcon"
                />
                <div className="productInfo">
                  <h3>{product.name}</h3>
                  <p>Category: {product.category}</p>
                  <p>Expires: {product.expiration_date}</p>
                  {/* Add more product details if needed */}
                </div>
              </div>
            ))
          ) : (
            <p>No products found.</p>
          )}
        </div>

        {/* Buttons for Modal */}
        <div className="modalButtons">
          <button className="modalActionButton" onClick={handleSubmit}>
            Find recipes!
          </button>
          <button className="modalActionButton" onClick={toggleIngredientModal}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default IngredientModal;
