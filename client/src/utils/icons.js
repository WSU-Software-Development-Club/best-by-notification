import poultry from "../assets/icons/colored/poultry-icon.png";
import seafood from "../assets/icons/colored/seafood-icon.png";
import dairy from "../assets/icons/colored/milk-icon.png";
import fruits from "../assets/icons/colored/fruit-icon.png";
import vegetables from "../assets/icons/colored/vegetable-icon.png";
import grains from "../assets/icons/colored/grain-icon.png";
import snacks from "../assets/icons/colored/snacks-icon.png";
import beverages from "../assets/icons/colored/drink-icon.png";
import frozen from "../assets/icons/colored/snowflake-icon.png";
import other from "../assets/icons/uncolored/image-photography-icon.png";

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
