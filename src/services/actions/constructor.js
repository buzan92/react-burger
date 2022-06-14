import { v4 as uuidv4 } from "uuid";
import { postRequest, checkToken } from "../../utils/api";

export const ADD_INGREDIENT = "ADD_INGREDIENT";
export const DELETE_INGREDIENT = "DELETE_INGREDIENT";
export const SORT_INGREDIENT = "SORT_INGREDIENT";
export const SET_SUM = "SET_SUM";
export const CLEAR_CONSTRUCTOR = "CLEAR_CONSTRUCTOR";
export const TOGGLE_ORDER = "TOGGLE_ORDER";

export const addIngredient = ingredient => {
  const uuid = uuidv4();
  return {
    type: ADD_INGREDIENT,
    payload: Object.assign({}, ingredient, { uuid }),
  };
};

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
export const toggleOrder = (payload) => ({ type: TOGGLE_ORDER, payload });

export const createOrder = ingredients => async dispatch => {
  try {
    await checkToken();
    const res = await postRequest("orders", { ingredients });
    if (res.success) {
      dispatch(toggleOrder(res.order));
      dispatch(clearConstructor());
    }
  } catch (error) {
    dispatch(toggleOrder(null));
  }
};

