import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducers/authSlice";
import employeeReducer from "./reducers/employeeSlice";
import productReducer from "./reducers/productSlice";
import cartReducer from "./reducers/cart";

export default configureStore({
    reducer: {
        auth: authReducer,
        products:productReducer,
        employee:employeeReducer,
        cart:cartReducer

    },
});
