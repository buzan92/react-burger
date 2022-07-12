import React from "react";
import ReactDOM from "react-dom";
import "./styles/index.css";
import App from "./components/app/app";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import { socketMiddleware } from "./middleware/socket-middleware";
import { reducer } from "./services/reducers";
import { BrowserRouter as Router } from "react-router-dom";

import { WSActions } from "./services/actions/feed";

export const store = configureStore({
  reducer,
  middleware: [thunk, socketMiddleware(WSActions)],
  devTools: process.env.NODE_ENV !== "production",
});

ReactDOM.render(
  <Router>
    <React.StrictMode>
      <Provider store={store}>
        <App />
      </Provider>
    </React.StrictMode>
  </Router>,
  document.getElementById("root") as HTMLElement
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
