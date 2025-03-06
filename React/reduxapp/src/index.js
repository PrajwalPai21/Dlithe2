import React from "react";
import ReactDOM from "react-dom/client"; // Correct import for React 18+
import { Provider } from "react-redux";
import App from "./App";
import store from "./store";

// Create a root and render inside <Provider>
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <App />
  </Provider>
);
