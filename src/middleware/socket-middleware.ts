import type { Middleware, MiddlewareAPI } from "redux";
import { AppDispatch, RootState, TAppActions } from "../types/state/state";
import { IWSActions } from "../services/actions/feed";

export const socketMiddleware = (wsActions: IWSActions): Middleware => {
  return ((store: MiddlewareAPI<AppDispatch, RootState>) => {
    let socket: WebSocket | null = null;

    return next => (action: TAppActions) => {
      const { dispatch } = store;

      if (action.type === wsActions.WS_CONNECTION_START) {
        socket = new WebSocket(action.payload);
      }
      if (socket && action.type === wsActions.WS_CONNECTION_CLOSE) {
        socket.close(1000, "close");
      }
      if (socket) {
        socket.onopen = (event: Event) => {
          dispatch(wsActions.wsConnectionSuccess());
        };

        socket.onerror = (event: Event) => {
          dispatch(wsActions.wsConnectionError());
        };

        socket.onmessage = (event: MessageEvent) => {
          dispatch(wsActions.wsGetMessage(JSON.parse(event.data)));
        };

        socket.onclose = (event: CloseEvent) => {
          dispatch(wsActions.wsConnectionClosed());
        };

        if (action.type === wsActions.WS_SEND_MESSAGE) {
          const message = action.payload;
          socket.send(JSON.stringify(message));
        }
      }

      next(action);
    };
  }) as Middleware;
};
