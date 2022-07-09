import { getRequest } from "../../utils/api";
import { IIngredient } from "../../types";
import {
  SET_INGREDIENTS,
  SET_APP_ERROR,
  TOGGLE_SELECTED_INGREDIENT,
  SET_ACTIVE_TAB,
  ISetIngredients,
  ISetAppError,
  IToggleSelectedIngredient,
  ISetActiveTab,
} from "../../types/state/ingredients";
import { AppThunk, AppDispatch } from "../../types/state/state";

export const setIngredients = (payload: IIngredient[]): ISetIngredients => ({
  type: SET_INGREDIENTS,
  payload,
});
export const setAppError = (payload: boolean): ISetAppError => ({
  type: SET_APP_ERROR,
  payload,
});

export const toggleSelectedIngredient = (
  ingredient: IIngredient | null
): IToggleSelectedIngredient => ({
  type: TOGGLE_SELECTED_INGREDIENT,
  payload: ingredient,
});

export const setActiveTab = (tab: string): ISetActiveTab => ({
  type: SET_ACTIVE_TAB,
  payload: tab,
});

export const getIngredients: AppThunk = () => (dispatch: AppDispatch) => {
  getRequest("ingredients")
    .then(res => {
      if (res.success) {
        dispatch(setIngredients(res.data));
      }
    })
    .catch(error => {
      dispatch(setAppError(true));
    });
};
