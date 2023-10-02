import { createSlice } from "@reduxjs/toolkit";

//!============================================================================================

export const authSlice = createSlice({
    name: "auth",
    initialState: {
        token: localStorage.getItem("token") || null,
        userId: localStorage.getItem("userId") || null,
        
        employee: [],
        category: [],
        employeeByCate: []
    },
    reducers: {
        setLogin: (state, action) => {
            state.token = action.payload;
            localStorage.setItem("token", state.token);

        },

        setUserId: (state, action) => {
            state.userId = action.payload;
            localStorage.setItem("userId", state.userId);
        },
        setLogout: (state, action) => {
            state.token = null;
            state.userId = null;
            localStorage.clear();
        },
        setEmployee: (state, action) => {
            state.employee = action.payload;
        },
        updateProfileById: (state, action) => {
            const updatedUser = {
                ...state.employee,
                firstname: action.payload.firstname,
                lastname: action.payload.lastname,
                country: action.payload.country,
            };

            state.employee = updatedUser;
            return state;
        },
        setcategory: (state, action) => {
            state.category = action.payload;
        },
        setEmployeeByCategory: (state, action) => {
            state.employeeByCate = action.payload;
        },
    },
});

//!============================================================================================

export const {
    setLogin,
    setUserId,
    setLogout,
    updateProfileById,
    setEmployee,
    setcategory,
    setEmployeeByCategory
} = authSlice.actions;
export default authSlice.reducer;
