import React from "react";
import ReactDOM from "react-dom";
import "./style.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { createStore } from "redux";
import { Provider } from "react-redux";
import Store from "./Reducer/Store";
import useAuthToken from "./useAuthToken";
import jwt from "jsonwebtoken";

const store = createStore(
  Store,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

// if (localStorage.jwtAuthToken) {
//   useAuthToken(localStorage.jwtAuthToken);
//   store.dispatch({
//     type: "Logged",
//     value: jwt.decode(localStorage.jwtAuthToken)._id,
//   });
// }

ReactDOM.render(
  <Provider store={store}>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </Provider>,
  document.getElementById("root")
);

serviceWorker.unregister();
