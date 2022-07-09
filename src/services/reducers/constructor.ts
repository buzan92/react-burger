import { IConstructorState, TConstructorActions } from "../../types/state/constructor";

const initialState: IConstructorState = {
  bun: null,
  ingredients: [],
  sum: 0,
  order: null,
  isShowOrderModal: false,
};

export const constructorReducer = (
  state = initialState,
  action: TConstructorActions,
): IConstructorState => {
  const { type } = action;
  switch (type) {
    case 'ADD_INGREDIENT':
      const isBun = action.payload.type === "bun";
      return {
        ...state,
        ...(isBun && { bun: action.payload }),
        ...(!isBun && {
          ingredients: [...state.ingredients, action.payload],
        }),
      };
    case 'DELETE_INGREDIENT':
      return {
        ...state,
        ingredients: state.ingredients.filter((_, index) => index !== action.payload),
      };
    case 'SORT_INGREDIENT':
      const ingredients = [...state.ingredients];
      const draggable = ingredients.splice(action.payload.oldIndex, 1)[0];
      ingredients.splice(action.payload.index, 0, draggable);
      return { ...state, ingredients };
    case 'SET_SUM':
      return { ...state, sum: action.payload };
    case 'TOGGLE_ORDER':
      return { ...state, order: action.payload, isShowOrderModal: Boolean(action.payload) };
    case 'CLEAR_CONSTRUCTOR':
      return { ...state, bun: null, ingredients: [] };
    default:
      return state;
  }
};
