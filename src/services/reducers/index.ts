import { combineReducers } from "redux";
import { ingredientsReducer } from './ingredients';
import { constructorReducer } from './constructor';
import { userReducer } from './user';
import { feedReducer } from './feed';


export const reducer = combineReducers({
  ingredients: ingredientsReducer,
  construct: constructorReducer,
  user: userReducer,
  feed: feedReducer,
});
