import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./app.css";

import { App } from "./app/app";
import '../src/app.css'
import { Provider } from "react-redux";
import {store} from "./store/cart/index";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>

    <App />
    </Provider>
    
  </StrictMode>
);
