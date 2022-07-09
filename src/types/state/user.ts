import { IUser } from "..";

export const SET_IS_LOADING: "SET_IS_LOADING" = "SET_IS_LOADING";
export const SET_USER: "SET_USER" = "SET_USER";
export const SET_IS_LOGGED_IN: "SET_IS_LOGGED_IN" = "SET_IS_LOGGED_IN";

export interface IUserState {
  user: IUser | null;
  isLoading: boolean;
  isLoggedIn: boolean;
}

export interface ISetIsLoading {
  readonly type: typeof SET_IS_LOADING;
  readonly payload: boolean;
}

export interface ISetUser {
  readonly type: typeof SET_USER;
  readonly payload: IUser | null;
}

export interface ISetIsLoggedIn {
  readonly type: typeof SET_IS_LOGGED_IN;
  readonly payload: boolean;
}

export type TUserActions = ISetIsLoading | ISetUser | ISetIsLoggedIn;
