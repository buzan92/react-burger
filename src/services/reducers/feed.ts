import { IFeedState, TWsActions } from "../../types/state/feed";
import { WS_GET_MESSAGE, SET_SHOW_FEED_MODAL } from "../../types/state/feed";

const initialState: IFeedState = {
  orders: [],
  total: 0,
  totalToday: 0,
  isShowFeedModal: false,
};

export const feedReducer = (
  state = initialState,
  action: TWsActions
): IFeedState => {
  switch (action.type) {
    case WS_GET_MESSAGE:
      const { orders, total, totalToday } = action.payload;
      return { ...state, orders, total, totalToday };
    case SET_SHOW_FEED_MODAL:
      return { ...state, isShowFeedModal: action.payload };
    default:
      return state;
  }
};
