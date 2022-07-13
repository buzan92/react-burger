import {
  WS_CONNECTION_START,
  WS_CONNECTION_CLOSE,
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_GET_MESSAGE,
  WS_CONNECTION_CLOSED,
  WS_SEND_MESSAGE,
  IWsConnectionSuccess,
  IWsConnectionClose,
  IWsConnectionError,
  IWsGetMessage,
  IWsSendMessage,
  IWsConnectionClosed,
  IWsConnectionStart,
  ISetShowFeedModal,
  SET_SHOW_FEED_MODAL,
} from "../../types/state/feed";

export const setShowFeedModal = (payload: boolean): ISetShowFeedModal => ({
  type: SET_SHOW_FEED_MODAL,
  payload,
});

export const wsConnectionStart = (payload: string): IWsConnectionStart => ({
  type: WS_CONNECTION_START,
  payload,
});

export const wsConnectionClose = (): IWsConnectionClose => ({
  type: WS_CONNECTION_CLOSE,
});

export const wsConnectionSuccess = (): IWsConnectionSuccess => ({
  type: WS_CONNECTION_SUCCESS,
});

export const wsConnectionError = (): IWsConnectionError => ({
  type: WS_CONNECTION_ERROR,
});

export const wsGetMessage = (payload: any): IWsGetMessage => ({
  type: WS_GET_MESSAGE,
  payload,
});

export const wsSendMessage = (payload: any): IWsSendMessage => ({
  type: WS_SEND_MESSAGE,
  payload,
});

export const wsConnectionClosed = (): IWsConnectionClosed => ({
  type: WS_CONNECTION_CLOSED,
});

export interface IWSActions {
  wsConnectionSuccess: typeof wsConnectionSuccess;
  wsConnectionError: typeof wsConnectionError;
  wsGetMessage: typeof wsGetMessage;
  wsConnectionClosed: typeof wsConnectionClosed;
  WS_CONNECTION_START: typeof WS_CONNECTION_START;
  WS_CONNECTION_CLOSE: typeof WS_CONNECTION_CLOSE;
  WS_SEND_MESSAGE: typeof WS_SEND_MESSAGE;
}

export const WSActions = {
  wsConnectionSuccess,
  wsConnectionError,
  wsGetMessage,
  wsConnectionClosed,
  WS_CONNECTION_START,
  WS_CONNECTION_CLOSE,
  WS_SEND_MESSAGE,
}