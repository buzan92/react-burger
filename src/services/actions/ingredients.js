import { getRequest } from "../../utils/api";

export const SET_INGREDIENTS = "SET_INGREDIENTS";
export const SET_APP_ERROR = "SET_APP_ERROR";
export const TOGGLE_SELECTED_INGREDIENT = "TOGGLE_SELECTED_INGREDIENT";
export const SET_ACTIVE_TAB = "SET_ACTIVE_TAB";

export const getIngredients = () => dispatch => {
  getRequest("ingredients")
    .then(res => {
      if (res.success) {
        dispatch({ type: SET_INGREDIENTS, payload: res.data });
      }
    })
    .catch(error => {
      dispatch({ type: SET_APP_ERROR, payload: true });
    });
};

export const toggleSelectedIngredient = ingredient => ({
  type: TOGGLE_SELECTED_INGREDIENT,
  payload: ingredient,
});

export const setActiveTab = tab => ({
  type: SET_ACTIVE_TAB,
  payload: tab,
});
