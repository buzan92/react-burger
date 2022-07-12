import { IFeedState, TWsActions } from "../../types/state/feed";

const initialState: IFeedState = {
  orders: [],
  total: 0,
  totalToday: 0,
}

export const feedReducer = (
  state = initialState,
  action: TWsActions
): IFeedState => {
  switch (action.type) {
    case "WS_GET_MESSAGE":
      const { orders, total, totalToday } = action.payload;
      return { ...state, orders, total, totalToday };
    default:
      return state;
  }
};