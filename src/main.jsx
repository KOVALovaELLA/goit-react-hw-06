/* import React from "react";
import ReactDOM from "react-dom/client";
import App from "./components/App/App";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
 */

import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import store from "./redux/store"; // ваш Redux store
import App from "./components/App/App"; // ваш основний компонент

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
