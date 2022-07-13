import { IIngredient } from ".";

export interface IUser {
  createdAt: string;
  email: string;
  name: string;
  updatedAt: string;
}

export interface IOrder {
  createdAt: string;
  ingredients: IIngredient[];
  name: string;
  number: number;
  owner: IUser;
  price: number;
  status: string;
  updatedAt: string;
  _id: string;
}

export interface IFeedOrder {
  createdAt: string;
  ingredients: string[];
  name: string;
  number: number;
  status: string;
  updatedAt: string;
  _id: string;
}

export interface IState {
  construct: {
    bun: IIngredient | null;
    ingredients: IIngredient[];
    sum: number;
    order: IOrder; 
    isShowOrderModal: boolean;
  },
  ingredients: {
    ingredients: IIngredient[];
    isAppLoaded: boolean;
    appError: boolean;
    activeTab: string;
    selectedIngredient: IIngredient | null;
    isShowIngredientModal: boolean;
  },
  user: {
    user: IUser;
    isLoading: boolean;
    isLoggedIn: boolean;
  },
}