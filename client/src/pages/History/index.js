import React, { useEffect, useState } from "react";
import "./../../assets/fonts/fonts.css";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar/Navbar";
import Modal from "../../components/Modal/Modal";
import ProductBar from "../../components/ProductBar/ProductBar";
import "./index.css";

function History() {
  // const [isLinkHovered, setIsLinkHovered] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [productName, setProductName] = useState("");
  const [expirationDate, setExpirationDate] = useState("");
  const [productCategory, setProductCategory] = useState("");
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  // Handles opening/closing the modal
  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
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
        // toggleModal(); //// Close the modal (Optional)
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

  const fetchProducts = async () => {
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
  };

  useEffect(() => {
    fetchProducts();
  }, []);

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

      {/* Render Product Bars */}
      <div className="productBars">
        {products.length === 0 ? (
          <p>No products found.</p>
        ) : (
          products.map((product, index) => (
            <ProductBar
              productName={product.name}
              productCategory={product.category}
              expirationDate={product.expiration_date}
              handleDelete={() => {
                alert(`Delete product: ${product.name}`);
              }}
            ></ProductBar>
          ))
        )}
      </div>

      {/* Bottom Navbar */}
      <Navbar toggleModal={toggleModal} />
    </div>
  );
}
export default History;
