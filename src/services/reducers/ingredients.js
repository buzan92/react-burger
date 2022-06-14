import {
  SET_INGREDIENTS,
  SET_APP_ERROR,
  TOGGLE_SELECTED_INGREDIENT,
  SET_ACTIVE_TAB,
} from "../actions/ingredients";

const initialState = {
  ingredients: [],
  isAppLoaded: false,
  appError: false,
  activeTab: "bun",
  selectedIngredient: null,
  isShowIngredientModal: false,
};

export const ingredientsReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_INGREDIENTS:
      return { ...state, ingredients: payload, isAppLoaded: true };
    case SET_APP_ERROR:
      return { ...state, appError: payload };
    case SET_ACTIVE_TAB:
      return { ...state, activeTab: payload };
    case TOGGLE_SELECTED_INGREDIENT:
      return {
        ...state,
        selectedIngredient: payload,
        isShowIngredientModal: Boolean(payload),
      };
    default:
      return state;
  }
};
