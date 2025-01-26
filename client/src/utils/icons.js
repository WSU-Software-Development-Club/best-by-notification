import poultry from "../assets/icons/chicken-leg-icon.png";
import seafood from "../assets/icons/seafood-icon.png";
import dairy from "../assets/icons/milk-icon.png";
import fruits from "../assets/icons/fruit-basket-icon.png";
import vegetables from "../assets/icons/carrot-vegetable-icon.png";
import grains from "../assets/icons/rice-icon.png";
import snacks from "../assets/icons/snacks-icon.png";
import beverages from "../assets/icons/soda-with-straw-icon.png";
import frozen from "../assets/icons/snowflake-icon.png";
import other from "../assets/icons/image-photography-icon.png";

const categoryIcons = {
  poultry,
  seafood,
  dairy,
  fruits,
  vegetables,
  grains,
  snacks,
  beverages,
  frozen,
  other,
};

export const getCategoryIcon = (category) => categoryIcons[category] || other;
