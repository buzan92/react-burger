import { postRequest } from "../../utils/api";

export const ADD_INGREDIENT = "ADD_INGREDIENT";
export const DELETE_INGREDIENT = "DELETE_INGREDIENT";
export const SORT_INGREDIENT = "SORT_INGREDIENT";
export const SET_SUM = "SET_SUM";
export const CLEAR_CONSTRUCTOR = "CLEAR_CONSTRUCTOR";
export const TOGGLE_ORDER = "TOGGLE_ORDER";

export const addIngredient = ingredient => ({
  type: ADD_INGREDIENT,
  payload: ingredient,
});

export const deleteIngredient = index => ({
  type: DELETE_INGREDIENT,
  payload: index,
});

export const sortIngredient = (oldIndex, index) => ({
  type: SORT_INGREDIENT,
  payload: { oldIndex, index },
});

export const setSum = sum => ({ type: SET_SUM, payload: sum });
export const clearConstructor = () => ({ type: CLEAR_CONSTRUCTOR });

export const createOrder = ingredients => dispatch => {
  postRequest("orders", { ingredients })
    .then(res => {
      if (res.success) {
        dispatch({ type: TOGGLE_ORDER, payload: res.order });
        dispatch({ type: CLEAR_CONSTRUCTOR });
      }
    })
    .catch(error => {
      dispatch({ type: TOGGLE_ORDER, payload: null });
    });
};
export const toggleOrder = (payload) => ({ type: TOGGLE_ORDER, payload });
