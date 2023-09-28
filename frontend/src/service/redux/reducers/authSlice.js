import { createSlice } from "@reduxjs/toolkit";

export const authSlice = createSlice({
    name: "auth",
    initialState: {
        token: localStorage.getItem("token") || null,
        userId: localStorage.getItem("userId") || null,
        
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
           ;
        },
    }
})

export const { setLogin, setUserId, setLogout } = authSlice.actions;
export default authSlice.reducer;