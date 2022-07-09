import { v4 as uuidv4 } from "uuid";
import { postRequest, checkToken } from "../../utils/api";
import { IIngredient, IOrder } from "../../types";
import {
  ADD_INGREDIENT,
  DELETE_INGREDIENT,
  SORT_INGREDIENT,
  SET_SUM,
  CLEAR_CONSTRUCTOR,
  TOGGLE_ORDER,
  IAddIngredient,
  IDeleteIngredient,
  ISortIngredient,
  ISetSum,
  IClearConstructor,
  IToggleOrder,
} from "../../types/state/constructor";
import { AppThunk, AppDispatch } from "../../types/state/state";

export const addIngredient = (ingredient: IIngredient): IAddIngredient => {
  const uuid = uuidv4();
  return {
    type: ADD_INGREDIENT,
    payload: Object.assign({}, ingredient, { uuid }),
  };
};

export const deleteIngredient = (index: number): IDeleteIngredient => ({
  type: DELETE_INGREDIENT,
  payload: index,
});

export const sortIngredient = (
  oldIndex: number,
  index: number
): ISortIngredient => ({
  type: SORT_INGREDIENT,
  payload: { oldIndex, index },
});

export const setSum = (sum: number): ISetSum => ({
  type: SET_SUM,
  payload: sum,
});
export const clearConstructor = (): IClearConstructor => ({
  type: CLEAR_CONSTRUCTOR,
});
export const toggleOrder = (order: IOrder | null): IToggleOrder => ({
  type: TOGGLE_ORDER,
  payload: order,
});

export const createOrder: AppThunk =
  (ingredients: IIngredient[]) => async (dispatch: AppDispatch) => {
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
