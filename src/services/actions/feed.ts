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
} from "../../types/state/feed";

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
