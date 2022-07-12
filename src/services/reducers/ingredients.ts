import { IIngredientsState, TIngredientsActions } from "../../types/state/ingredients";
import {
  SET_INGREDIENTS,
  SET_APP_ERROR,
  SET_ACTIVE_TAB,
  TOGGLE_SELECTED_INGREDIENT,
} from "../../types/state/ingredients";

const initialState: IIngredientsState = {
  ingredients: [],
  isAppLoaded: false,
  appError: false,
  activeTab: "bun",
  selectedIngredient: null,
  isShowIngredientModal: false,
};

export const ingredientsReducer = (
  state = initialState,
  action: TIngredientsActions
): IIngredientsState => {
  switch (action.type) {
    case SET_INGREDIENTS:
      return { ...state, ingredients: action.payload, isAppLoaded: true };
    case SET_APP_ERROR:
      return { ...state, appError: action.payload };
    case SET_ACTIVE_TAB:
      return { ...state, activeTab: action.payload };
    case TOGGLE_SELECTED_INGREDIENT:
      return {
        ...state,
        selectedIngredient: action.payload,
        isShowIngredientModal: Boolean(action.payload),
      };
    default:
      return state;
  }
};
