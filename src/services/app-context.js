import React from "react";

export const AppContext = React.createContext();

export const appReducer = (state, action) => {
  switch (action.type) {
    case "setAppField":
      const { field, value } = action.payload;
      return { ...state, [field]: value };
    case "toggleIngredient":
      return {
        ...state,
        selectedIngredient: action.payload,
        isShowIngredientModal: Boolean(action.payload),
      };
    case "toggleOrder":
      return {
        ...state,
        order: action.payload,
        isShowOrderModal: Boolean(action.payload),
      };
    case "addConstructorIngredient":
      return {
        ...state,
        constructor: {
          ...state.constructor,
          ingredients: [...state.constructor.ingredients, action.payload],
        },
      };
    case "addConstructorBun":
      return {
        ...state,
        constructor: {
          ...state.constructor,
          bun: action.payload,
        },
      };
    case "setConstructorSum":
      return {
        ...state,
        constructor: {
          ...state.constructor,
          sum: action.payload,
        },
      };
    case "deleteConstructorIngredient":
      return {
        ...state,
        constructor: {
          ...state.constructor,
          ingredients: state.constructor.ingredients.filter(
            (_, idx) => idx !== action.payload
          ),
        },
      };
    default:
      return state;
  }
};
