import React, { useState, useCallback, useEffect } from "react";
import "./../../assets/fonts/fonts.css";
import Logo from "../../components/Logo/Logo";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import Modal from "../../components/Modal/Modal";
import IngredientModal from "../../components/IngredientModal/IngredientModal";
import "./index.css";

function InputForm() {
  // const [isLinkHovered, setIsLinkHovered] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isIngredientModalOpen, setIsIngredientModalOpen] = useState(false);
  const [productName, setProductName] = useState("");
  const [expirationDate, setExpirationDate] = useState("");
  const [productCategory, setProductCategory] = useState("");
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  const fetchProducts = useCallback(async () => {
    const userId = sessionStorage.getItem("userId");
    const apiUrl = `${process.env.REACT_APP_API_BASE_URL}/user/${userId}/get_products`;

    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      console.log("API Response:", data); // Check the structure of the response
      if (response.ok) {
        if (data) {
          setProducts(data);
        } else {
          console.log("No products found.");
        }
      } else {
        alert(`Error: ${data.error}`);
      }
    } catch (error) {
      console.log("Error fetching products:", error);
      alert(
        "Failed to fetch products. Please try again later. Error: " + error
      );
    }
  }, []);

  // Fetch products when the ingredient modal is opened
  useEffect(() => {
    if (isIngredientModalOpen) {
      fetchProducts();
    }
  }, [isIngredientModalOpen, fetchProducts]);

  // Handles opening/closing the modal
  const toggleModal = () => {
    if (isIngredientModalOpen) {
      setIsIngredientModalOpen(!isIngredientModalOpen);
    }
    setIsModalOpen(!isModalOpen);
  };

  const toggleIngredientModal = () => {
    if (isModalOpen) {
      setIsModalOpen(!isModalOpen);
    }
    setIsIngredientModalOpen(!isIngredientModalOpen);
  };

  // Handles form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    // Validate inputs:
    if (!productName || !expirationDate || !productCategory) {
      alert("Please fill out all fields.");
      return;
    }

    // Get user ID
    const userId = sessionStorage.getItem("userId");

    // API URL for adding product
    const apiUrl = `${process.env.REACT_APP_API_BASE_URL}/user/${userId}/add_product`;

    // Prepare request payload
    const requestBody = {
      name: productName,
      category: productCategory,
      expiration_date: expirationDate,
    };

    try {
      // Send POST request to backend
      const response = await fetch(apiUrl, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      const data = await response.json();

      if (response.ok) {
        alert(data.message); // Success message
        fetchProducts();
      } else {
        alert(`Error: ${data.error}`); // Error message
      }
    } catch (error) {
      console.log("Error adding product:", error);
      alert("Failed to add product. Please try again later. Error: " + error);
    }

    // Clear inputs after submission
    setProductName("");
    setExpirationDate("");
    setProductCategory("");

    // Close the modal
    // toggleModal();
  };

  return (
    <div className="homeContainerStyle">
      <h1 className="appTitleStyle">BEST BY NOTIFICATION</h1>
      <h2 className="homeTitleStyle">HOME</h2>
      <Logo />

      {/* Buttons for Actions */}
      <div className="buttonContainer">
        <button className="actionButton" onClick={toggleModal}>
          Add Product
        </button>
        <button className="actionButton" onClick={() => navigate("/History")}>
          View Your Products
        </button>
      </div>

      {/* Modal Component */}
      <Modal
        isOpen={isModalOpen}
        toggleModal={toggleModal}
        handleSubmit={handleSubmit}
        productName={productName}
        setProductName={setProductName}
        productCategory={productCategory}
        setProductCategory={setProductCategory}
        expirationDate={expirationDate}
        setExpirationDate={setExpirationDate}
      />

      {/* Ingredient Modal Component*/}
      <IngredientModal
        isOpen={isIngredientModalOpen}
        toggleIngredientModal={toggleIngredientModal}
        products={products}
      />

      {/* Bottom Navbar */}
      <Navbar
        toggleModal={toggleModal}
        toggleIngredientModal={toggleIngredientModal}
      />
    </div>
  );
}

export default InputForm;
