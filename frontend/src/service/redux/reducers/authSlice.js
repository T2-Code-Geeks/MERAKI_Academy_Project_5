import { createSlice } from "@reduxjs/toolkit";

//!============================================================================================

export const authSlice = createSlice({

    name: "auth",
    initialState: {
        tokenUser: localStorage.getItem("tokenUser") || null,
        userId: localStorage.getItem("userId") || null,
        users:[]
    },


    reducers: {
        setLogin: (state, action) => {
            state.tokenUser = action.payload;
            localStorage.setItem("tokenUser", state.tokenUser);
        },

        setUserId: (state, action) => {
            state.userId = action.payload;
            localStorage.setItem("userId", state.userId);
        },
        setLogout: (state, action) => {
            state.tokenUser = null;
            state.userId = null;
            localStorage.clear();
        },
        setUsers: (state, action) => {
            state.users = action.payload;
          },
          deleteUsers: (state, action) => {
            state.users = state.users.filter((item) => item.id !== action.payload);
        },
    },

});

//!============================================================================================

export const {
    setLogin,
    setUserId,
    setLogout,setUsers,deleteUsers
} = authSlice.actions;
export default authSlice.reducer;
