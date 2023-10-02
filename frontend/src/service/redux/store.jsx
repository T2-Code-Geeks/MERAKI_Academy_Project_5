import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducers/authSlice";
import productReducer from "./reducers/productSlice";
import cartReducer from "./reducers/cart";

export default configureStore({
    reducer: {
        auth: authReducer,
        products:productReducer,
        cart:cartReducer
    },
});
