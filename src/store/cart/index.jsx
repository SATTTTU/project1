import {configureStore} from "@reduxjs/toolkit";
import cartReducer from "../../store/cart/cart"
//The store holds the global state
export const store = configureStore({
    reducer: {
        cart: cartReducer,// Add reducers here
    }
})
