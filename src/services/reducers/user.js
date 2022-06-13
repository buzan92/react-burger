import { SET_IS_LOADING, SET_USER, SET_IS_LOGGED_IN } from "../actions/user";

const initialState = {
  user: null,
  isLoading: false,
  isLoggedIn: false,
};

export const userReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_IS_LOADING:
      return { ...state, isLoading: payload };
    case SET_USER:
      return { ...state, user: payload };
    case SET_IS_LOGGED_IN:
      return { ...state, isLoggedIn: payload}
    default:
      return state;
  }
};
