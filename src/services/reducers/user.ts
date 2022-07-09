// import { SET_IS_LOADING, SET_USER, SET_IS_LOGGED_IN } from "../actions/user";
import { IUserState, TUserActions } from "../../types/state/user";

const initialState: IUserState = {
  user: null,
  isLoading: false,
  isLoggedIn: false,
};

export const userReducer = (
  state = initialState,
  action: TUserActions
): IUserState => {
  switch (action.type) {
    case "SET_IS_LOADING":
      return { ...state, isLoading: action.payload };
    case "SET_USER":
      return { ...state, user: action.payload };
    case "SET_IS_LOGGED_IN":
      return { ...state, isLoggedIn: action.payload };
    default:
      return state;
  }
};
