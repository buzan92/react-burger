import { SET_IS_LOADING, SET_USER } from "../actions/user";

const initialState = {
  user: null,
  isLoading: false,
};

export const userReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_IS_LOADING:
      return { ...state, isLoading: payload };
    case SET_USER:
      return { ...state, user: payload };
    default:
      return state;
  }
};
