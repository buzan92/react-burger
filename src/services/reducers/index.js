import { combineReducers } from "redux";
import { ingredientsReducer } from './ingredients';
import { constructorReducer } from './constructor';


export const reducer = combineReducers({
  ingredients: ingredientsReducer,
  construct: constructorReducer,
});