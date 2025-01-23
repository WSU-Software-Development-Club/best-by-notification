import { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import "./index.css";

const RecipeDetail = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const { recipe } = location.state || {};
  const [recipeInfo, setRecipeInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch detailed recipe information with the provided ID
    const fetchRecipe = async () => {
      try {
        const response = await fetch(
          `https://api.spoonacular.com/recipes/${id}/information?apiKey=65b987e8941e44bb9c708a7082d4f126`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch recipe details.");
        }
        const data = await response.json();
        setRecipeInfo(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchRecipe();
  }, [id]);

  if (loading) {
    return <div>Loading your recipe...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!recipe) {
    return <div>No recipe selected.</div>;
  }

  if (!recipeInfo) {
    return <div>No recipe details available.</div>;
  }

  return (
    <div className="recipeDetailContainer">
      <div className="headerStyle">
        <h1 className="appTitleStyle">BEST BY NOTIFICATION</h1>
        <h2 className="recipeTitleStyle">RECIPE</h2>
        <h1>{recipe.title}</h1>
      </div>
      <img
        src={recipe.image}
        alt={recipe.title}
        className="recipeDetailImage"
      />
      <p>
        <strong>Ready in:</strong> {recipeInfo.readyInMinutes} minutes
      </p>
      <p>
        <strong>Servings:</strong> {recipeInfo.servings}
      </p>
      <p>
        <strong>Health Score:</strong> {recipeInfo.healthScore}
      </p>
      <p>
        <strong>Approximate price per Serving:</strong> $
        {(recipeInfo.pricePerServing / 100).toFixed(2)}
      </p>
      <p>
        <strong>Spoonacular summary:</strong>{" "}
        <span dangerouslySetInnerHTML={{ __html: recipeInfo.summary }} />
      </p>

      <h2>Ingredients</h2>
      <p>
        <strong>Ingredients you have:</strong> {recipe.usedIngredientCount}
      </p>
      <ul>
        {recipe.usedIngredients.map((ingredient, index) => (
          <li key={index}>{ingredient.original}</li>
        ))}
      </ul>
      <p>
        <strong>Missed Ingredients:</strong> {recipe.missedIngredientCount}
      </p>
      <ul>
        {recipe.missedIngredients.map((ingredient, index) => (
          <li key={index}>{ingredient.original}</li>
        ))}
      </ul>
      <h3>Full Ingredients List</h3>
      <ul>
        {recipeInfo.extendedIngredients.map((ingredient, index) => (
          <li key={index}>{ingredient.original}</li>
        ))}
      </ul>

      <h2>Instructions</h2>
      {recipeInfo.analyzedInstructions.length > 0 ? (
        recipeInfo.analyzedInstructions.map((instructionSet, idx) => (
          <div key={idx}>
            <h3>{instructionSet.name || `Step-by-Step Instructions`}</h3>
            <ol>
              {instructionSet.steps.map((step, stepIdx) => (
                <li key={stepIdx}>{step.step}</li>
              ))}
            </ol>
          </div>
        ))
      ) : (
        <p>No instructions available for this recipe.</p>
      )}

      <div className="backButtonContainer">
        <button onClick={() => navigate(-1)} className="backButton">
          Go Back
        </button>
      </div>
      {/* Footer Section */}
      <footer className="footer">
        <p>
          Recipe data provided by{" "}
          <a
            href="https://spoonacular.com/food-api"
            target="_blank"
            rel="noopener noreferrer"
          >
            Spoonacular API
          </a>
          .
        </p>
      </footer>
    </div>
  );
};

export default RecipeDetail;
