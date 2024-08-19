import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import componentReducer from "./features/Components";

const root = ReactDOM.createRoot(document.getElementById("root"));
const store = configureStore({
  reducer: {
    component: componentReducer,
  },
});
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);

reportWebVitals();
