import { useLocation, useNavigate } from "react-router-dom";
import "./index.css";

const RecipeDetail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { recipe } = location.state || {};

  if (!recipe) {
    return <div>No recipe selected.</div>;
  }

  return (
    <div className="recipeDetailContainer">
      <h1>{recipe.title}</h1>
      <img
        src={recipe.image}
        alt={recipe.title}
        className="recipeDetailImage"
      />
      <p>
        <strong>Used Ingredients:</strong> {recipe.usedIngredientCount}
      </p>
      <p>
        <strong>Missed Ingredients:</strong> {recipe.missedIngredientCount}
      </p>
      <ul>
        <strong>Missed Ingredients Details:</strong>
        {recipe.missedIngredients.map((ingredient, index) => (
          <li key={index}>
            {ingredient.original} - Aisle: {ingredient.aisle}
          </li>
        ))}
      </ul>
      <ul>
        <strong>Used Ingredients Details:</strong>
        {recipe.usedIngredients.map((ingredient, index) => (
          <li key={index}>
            {ingredient.original} - Aisle: {ingredient.aisle}
          </li>
        ))}
      </ul>
      <button onClick={() => navigate(-1)} className="backButton">
        Go Back
      </button>
    </div>
  );
};

export default RecipeDetail;
