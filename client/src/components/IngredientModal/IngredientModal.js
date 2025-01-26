import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { formatDate } from "../../utils/dateFormatter";
import { getCategoryIcon } from "../../utils/icons"; // Use the centralized function
import "./IngredientModal.css";

const IngredientModal = ({ isOpen, toggleIngredientModal, products }) => {
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [view, setView] = useState("ingredientSelection");
  const [recipes, setRecipes] = useState([]);
  const navigate = useNavigate();

  const handleRecipeClick = (recipe) => {
    navigate(`/recipe/${recipe.id}`, {
      state: { recipe, previousView: "recipeDisplay" },
    });
  };

  useEffect(() => {
    if (isOpen) {
      setView("ingredientSelection"); // Reset to default view when modal is opened
    }
  }, [isOpen]);

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

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (selectedProducts.length === 0) {
      alert("No chosen ingredients.");
      return;
    }

    try {
      // Parse selected products into a comma-separated string of names
      const ingredientNames = selectedProducts
        .map((product) => product.name.trim()) // Extract the name and trim whitespace
        .join(","); // Join names with commas
      // Spoonacular API
      const apiUrl = `https://api.spoonacular.com/recipes/findByIngredients?apiKey=65b987e8941e44bb9c708a7082d4f126&ingredients=${encodeURIComponent(
        ingredientNames
      )}&ignorePantry=true`;

      const response = await fetch(apiUrl);
      const fetchedRecipes = await response.json();

      if (response.ok) {
        setRecipes(fetchedRecipes);
        setView("recipeDisplay");
      } else {
        throw new Error(`API error: ${recipes.message || "Unknown error"}`);
      }
    } catch (error) {
      console.log("Error fetching recipes:", error);
      alert(
        "Failed to search for recipes. Please try again later. Error: " + error
      );
    }
  };

  if (!isOpen) return null; // Don't render if modal is closed

  return (
    <div className="ingredientModalOverlay">
      <div className="ingredientModalContainer">
        {view === "ingredientSelection" && (
          <>
            <h2 className="modalTitle">Pick Ingredients</h2>
            <div className="ingredientBars">
              {products.length > 0 ? (
                products.map((product, index) => (
                  <div
                    className={`ingredientBar ${
                      selectedProducts.includes(product) ? "selected" : ""
                    }`}
                    key={index}
                    onClick={() => handleSelectProduct(product)}
                  >
                    <img
                      src={getCategoryIcon(product.category)}
                      alt={product.category}
                      className="categoryIcon"
                    />
                    <div className="ingredientInfo">
                      <h3>{product.name}</h3>
                      <p>Category: {product.category}</p>
                      <p>Expires: {formatDate(product["expiration date"])}</p>
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
              <button
                className="modalActionButton"
                onClick={toggleIngredientModal}
              >
                Cancel
              </button>
            </div>
          </>
        )}

        {view === "recipeDisplay" && (
          <>
            <h2 className="modalTitle">Recipes</h2>
            <div className="ingredientBars">
              {recipes.length > 0 ? (
                recipes.map((recipe, index) => (
                  <div
                    className="ingredientBar"
                    key={index}
                    onClick={() => handleRecipeClick(recipe)}
                  >
                    <img
                      src={recipe.image}
                      alt={recipe.title}
                      className="recipeImage"
                    />
                    <div className="ingredientInfo">
                      <h3>{recipe.title}</h3>
                      <p>Used Ingredients: {recipe.usedIngredientCount}</p>
                      <p>Missed Ingredients: {recipe.missedIngredientCount}</p>
                    </div>
                  </div>
                ))
              ) : (
                <p>No recipes found.</p>
              )}
            </div>
            <div className="modalButtons">
              <button
                className="modalActionButton"
                onClick={() => setView("ingredientSelection")}
              >
                Back
              </button>
              <button
                className="modalActionButton"
                onClick={toggleIngredientModal}
              >
                Close
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default IngredientModal;
