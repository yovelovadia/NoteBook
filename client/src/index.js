import React from "react";
import ReactDOM from "react-dom";
import "./style.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { createStore } from "redux";
import { Provider } from "react-redux";
import Store from "./Reducer/Store";
import checkJwtExp from "./checkJwtExp";
import jwt from "jsonwebtoken";

const store = createStore(
  Store,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

const token = localStorage.jwtAuthToken;
if (token) {
  checkJwtExp();
  store.dispatch({ type: "Logged", value: jwt.decode(token)._id });
}

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>,
  document.getElementById("root")
);

serviceWorker.unregister();
