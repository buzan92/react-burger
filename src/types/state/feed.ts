import { IFeedOrder } from "..";

export const WS_CONNECTION_START: "WS_CONNECTION_START" = "WS_CONNECTION_START";
export const WS_CONNECTION_CLOSE: "WS_CONNECTION_CLOSE" = "WS_CONNECTION_CLOSE";
export const WS_CONNECTION_SUCCESS: "WS_CONNECTION_SUCCESS" =
  "WS_CONNECTION_SUCCESS";
export const WS_CONNECTION_ERROR: "WS_CONNECTION_ERROR" = "WS_CONNECTION_ERROR";
export const WS_GET_MESSAGE: "WS_GET_MESSAGE" = "WS_GET_MESSAGE";
export const WS_CONNECTION_CLOSED: "WS_CONNECTION_CLOSED" =
  "WS_CONNECTION_CLOSED";
export const WS_SEND_MESSAGE: "WS_SEND_MESSAGE" = "WS_SEND_MESSAGE";
export const SET_SHOW_FEED_MODAL: "SET_SHOW_FEED_MODAL" = "SET_SHOW_FEED_MODAL";

export interface IFeedState {
  orders: IFeedOrder[];
  total: number;
  totalToday: number;
  isShowFeedModal: boolean;
}

export interface ISetShowFeedModal {
  readonly type: typeof SET_SHOW_FEED_MODAL;
  readonly payload: boolean; 
}

export interface IWsConnectionStart {
  readonly type: typeof WS_CONNECTION_START;
  readonly payload: string; 
}

export interface IWsConnectionClose {
  readonly type: typeof WS_CONNECTION_CLOSE;
}

export interface IWsConnectionSuccess {
  readonly type: typeof WS_CONNECTION_SUCCESS;
}

export interface IWsConnectionError {
  readonly type: typeof WS_CONNECTION_ERROR;
}

export interface IWsGetMessage {
  readonly type: typeof WS_GET_MESSAGE;
  readonly payload: any;
}

export interface IWsSendMessage {
  readonly type: typeof WS_SEND_MESSAGE;
  readonly payload: any;
}

export interface IWsConnectionClosed {
  readonly type: typeof WS_CONNECTION_CLOSED;
}

export type TWsActions =
  | IWsConnectionStart
  | IWsConnectionClose
  | IWsConnectionSuccess
  | IWsConnectionError
  | IWsGetMessage
  | IWsSendMessage
  | IWsConnectionClosed
  | ISetShowFeedModal;
