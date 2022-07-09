import { IIngredient, IOrder } from "..";

export const ADD_INGREDIENT: "ADD_INGREDIENT" = "ADD_INGREDIENT";
export const DELETE_INGREDIENT: "DELETE_INGREDIENT" = "DELETE_INGREDIENT";
export const SORT_INGREDIENT: "SORT_INGREDIENT" = "SORT_INGREDIENT";
export const SET_SUM: "SET_SUM" = "SET_SUM";
export const CLEAR_CONSTRUCTOR: "CLEAR_CONSTRUCTOR" = "CLEAR_CONSTRUCTOR";
export const TOGGLE_ORDER: "TOGGLE_ORDER" = "TOGGLE_ORDER";

export interface IConstructorState {
  bun: IIngredient | null;
  ingredients: IIngredient[];
  sum: number;
  order: IOrder | null;
  isShowOrderModal: boolean;
}

export interface IAddIngredient {
  readonly type: typeof ADD_INGREDIENT;
  readonly payload: IIngredient;
}

export interface IDeleteIngredient {
  readonly type: typeof DELETE_INGREDIENT;
  readonly payload: number;
}

export interface ISortIngredient {
  readonly type: typeof SORT_INGREDIENT;
  readonly payload: { oldIndex: number; index: number };
}

export interface ISetSum {
  readonly type: typeof SET_SUM;
  readonly payload: number;
}

export interface IClearConstructor {
  readonly type: typeof CLEAR_CONSTRUCTOR;
}

export interface IToggleOrder {
  readonly type: typeof TOGGLE_ORDER;
  readonly payload: IOrder | null;
}

export type TConstructorActions =
  | IAddIngredient
  | IDeleteIngredient
  | ISortIngredient
  | ISetSum
  | IClearConstructor
  | IToggleOrder;
