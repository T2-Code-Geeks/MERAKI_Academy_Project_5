import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducers/authSlice";
import employeeReducer from "./reducers/employeeSlice";
export default configureStore({
    reducer: {
        auth: authReducer,
        employee:employeeReducer,
    },
});
