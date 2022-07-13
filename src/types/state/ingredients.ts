import { IIngredient } from "..";

export const SET_INGREDIENTS: "SET_INGREDIENTS" = "SET_INGREDIENTS";
export const SET_APP_ERROR: "SET_APP_ERROR" = "SET_APP_ERROR";
export const TOGGLE_SELECTED_INGREDIENT: "TOGGLE_SELECTED_INGREDIENT" =
  "TOGGLE_SELECTED_INGREDIENT";
export const SET_ACTIVE_TAB: "SET_ACTIVE_TAB" = "SET_ACTIVE_TAB";

export interface IIngredientsState {
  ingredients: IIngredient[];
  isAppLoaded: boolean;
  appError: boolean;
  activeTab: string;
  selectedIngredient: IIngredient | null;
  isShowIngredientModal: boolean;
}

export interface ISetIngredients {
  readonly type: typeof SET_INGREDIENTS;
  readonly payload: IIngredient[];
}

export interface ISetAppError {
  readonly type: typeof SET_APP_ERROR;
  readonly payload: boolean;
}

export interface IToggleSelectedIngredient {
  readonly type: typeof TOGGLE_SELECTED_INGREDIENT;
  readonly payload: IIngredient | null;
}

export interface ISetActiveTab {
  readonly type: typeof SET_ACTIVE_TAB;
  readonly payload: string;
}

export type TIngredientsActions =
  | ISetIngredients
  | ISetAppError
  | IToggleSelectedIngredient
  | ISetActiveTab;
