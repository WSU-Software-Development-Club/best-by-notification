import React, { useEffect, useState } from "react";
import "./../../assets/fonts/fonts.css";
import Navbar from "../../components/Navbar/Navbar";
import Modal from "../../components/Modal/Modal";
import ProductBar from "../../components/ProductBar/ProductBar";
import IngredientModal from "../../components/IngredientModal/IngredientModal";
import useProducts from "../../hooks/useProducts";
import "./index.css";

function History() {
  // const [isLinkHovered, setIsLinkHovered] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isIngredientModalOpen, setIsIngredientModalOpen] = useState(false);
  const [productName, setProductName] = useState("");
  const [expirationDate, setExpirationDate] = useState("");
  const [productCategory, setProductCategory] = useState("");
  // const [products, setProducts] = useState([]);

  // Fetch products using the custom hook
  const { products, fetchProducts } = useProducts();

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
        await fetchProducts(); // Fetch products again to update the list
      } else {
        alert(`Error: ${data.error}`); // Error message
      }
    } catch (error) {
      console.log("Error adding product:", error);
      alert("Failed to add product. Please try again later. Error: " + error);
      alert(`User ID: ${userId}`); // Debugging
    }

    // Clear inputs after submission
    setProductName("");
    setExpirationDate("");
    setProductCategory("");
  };

  // Fetch products for ProductBar
  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <div className="historyContainerStyle">
      <h1 className="appTitleStyle">BEST BY NOTIFICATION</h1>
      <h2 className="historyTitleStyle">HISTORY</h2>

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

      {/* Render Product Bars */}
      <div className="productBars">
        {products.length === 0 ? (
          <p>No products found.</p>
        ) : (
          products.map(
            (product, index) => (
              console.log("Product's exp: ", product.expiration_date),
              (
                <ProductBar
                  key={product.id}
                  productID={product.id}
                  productName={product.name}
                  productCategory={product.category}
                  expirationDate={product["expiration date"]}
                  onDeletion={fetchProducts}
                ></ProductBar>
              )
            )
          )
        )}
      </div>

      {/* Bottom Navbar */}
      <Navbar
        toggleModal={toggleModal}
        toggleIngredientModal={toggleIngredientModal}
      />
    </div>
  );
}
export default History;
