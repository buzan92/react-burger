import PropTypes from "prop-types";

export const IngredientType = PropTypes.shape({
  calories: PropTypes.number,
  carbohydrates: PropTypes.number,
  fat: PropTypes.number,
  image: PropTypes.string,
  image_large: PropTypes.string,
  image_mobile: PropTypes.string,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  proteins: PropTypes.number,
  type: PropTypes.oneOf(["bun", "sauce", "main"]).isRequired,
  _id: PropTypes.string.isRequired,
});
