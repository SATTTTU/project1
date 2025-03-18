import {configureStore} from "@reduxjs/toolkit";
import cartReducer from "../../store/cart/cart"
import authReducer from "../cart/authSlice"
//The store holds the global state
export const store = configureStore({
    reducer: {
        cart: cartReducer,
        auth: authReducer,
    }
})
