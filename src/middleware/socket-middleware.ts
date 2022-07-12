import type { Middleware, MiddlewareAPI } from "redux";
import { AppDispatch, RootState, TAppActions } from "../types/state/state";
import {
  wsConnectionSuccess,
  wsConnectionError,
  wsGetMessage,
  wsConnectionClosed,
} from "../services/actions/feed";

export const socketMiddleware = (): Middleware => {
  return ((store: MiddlewareAPI<AppDispatch, RootState>) => {
    let socket: WebSocket | null = null;

    return next => (action: TAppActions) => {
      const { dispatch } = store;

      if (action.type === "WS_CONNECTION_START") {
        socket = new WebSocket(action.payload);
      }
      if (socket && action.type === "WS_CONNECTION_CLOSE") {
        socket.close(1000, 'close');
      }
      if (socket) {
        socket.onopen = (event: Event) => {
          dispatch(wsConnectionSuccess());
        };

        socket.onerror = (event: Event) => {
          dispatch(wsConnectionError());
        };

        socket.onmessage = (event: MessageEvent) => {
          dispatch(wsGetMessage(JSON.parse(event.data)));
        };

        socket.onclose = (event: CloseEvent) => {
          dispatch(wsConnectionClosed());
        };

        if (action.type === "WS_SEND_MESSAGE") {
          const message = action.payload;
          socket.send(JSON.stringify(message));
        }
      }

      next(action);
    };
  }) as Middleware;
};
