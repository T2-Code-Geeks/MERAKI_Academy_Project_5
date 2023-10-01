import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducers/authSlice";
import productReducer from "./reducers/productSlice";

export default configureStore({
    reducer: {
        auth: authReducer,
        products:productReducer
    },
});
