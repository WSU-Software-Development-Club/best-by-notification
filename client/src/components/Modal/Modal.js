import React, { useState } from "react";
import "./Modal.css";

const Modal = ({
  isOpen,
  toggleModal,
  handleSubmit,
  productName,
  setProductName,
  productCategory,
  setProductCategory,
  expirationDate,
  setExpirationDate,
}) => {
  if (!isOpen) return null; // Don't render if modal is closed

  return (
    <div className="modalOverlay">
      <div className="modalContainer">
        <h2 className="modalTitle">Add Food Product</h2>

        {/* Dropdown for Category */}
        <select
          // value={category}
          // onChange={(e) => setCategory(e.target.value)}
          className="inputField"
          value={productCategory}
          onChange={(e) => setProductCategory(e.target.value)}
        >
          <option value="" disabled>
            Select Product Category
          </option>
          <option value="poultry">Poultry</option>
          <option value="seafood">Seafood</option>
          <option value="dairy">Dairy</option>
          <option value="fruits">Fruits</option>
          <option value="vegetables">Vegetables</option>
          <option value="grains">Grains</option>
          <option value="snacks">Snacks</option>
          <option value="beverages">Beverages</option>
          <option value="frozen">Frozen</option>
          <option value="other">Other</option>
        </select>

        {/* Input Fields */}
        <input
          type="text"
          placeholder="Product Name"
          value={productName}
          onChange={(e) => setProductName(e.target.value)}
          className="inputField"
        />

        <input
          type="date"
          value={expirationDate}
          onChange={(e) => setExpirationDate(e.target.value)}
          className="inputField"
        />

        {/* Buttons for Modal */}
        <div className="modalButtons">
          <button className="modalActionButton" onClick={handleSubmit}>
            Submit
          </button>
          <button className="modalActionButton" onClick={toggleModal}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
