import { ThunkAction } from 'redux-thunk';
import { Action, ActionCreator } from 'redux';

import { store } from "../..";

import { TConstructorActions } from "./constructor";
import { TIngredientsActions } from "./ingredients";
import { TUserActions } from "./user";

export type TAppActions =
  | TConstructorActions
  | TIngredientsActions
  | TUserActions;

export type RootState = ReturnType<typeof store.getState>;

export type AppThunk<TReturn = void> = ActionCreator<
  ThunkAction<TReturn, Action, RootState, TAppActions>
>;

export type AppDispatch = typeof store.dispatch;
