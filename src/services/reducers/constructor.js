import {
  ADD_INGREDIENT,
  DELETE_INGREDIENT,
  SORT_INGREDIENT,
  SET_SUM,
  CLEAR_CONSTRUCTOR,
  TOGGLE_ORDER,
} from "../actions/constructor";

const initialState = {
  bun: null,
  ingredients: [],
  sum: 0,
  order: null,
  isShowOrderModal: false,
};

export const constructorReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ADD_INGREDIENT:
      const isBun = payload.type === "bun";
      return {
        ...state,
        ...(isBun && { bun: payload }),
        ...(!isBun && {
          ingredients: [...state.ingredients, payload],
        }),
      };
    case DELETE_INGREDIENT:
      return {
        ...state,
        ingredients: state.ingredients.filter((_, index) => index !== payload),
      };
    case SORT_INGREDIENT:
      const ingredients = [...state.ingredients];
      const draggable = ingredients.splice(payload.oldIndex, 1)[0];
      ingredients.splice(payload.index, 0, draggable);
      return { ...state, ingredients };
    case SET_SUM:
      return { ...state, sum: payload };
    case TOGGLE_ORDER:
      return { ...state, order: payload, isShowOrderModal: Boolean(payload) };
    case CLEAR_CONSTRUCTOR:
      return { ...state, bun: null, ingredients: [] };
    default:
      return state;
  }
};
