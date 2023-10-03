import { createSlice } from "@reduxjs/toolkit";

//!============================================================================================

export const employeeSlice = createSlice({
  name: "employee",
  initialState: {
    token: localStorage.getItem("token") || null,
    employeeId: localStorage.getItem("employeeId") || null,
    employee: [],
    category:[],
    employeeByCate:[]
  },
  reducers: {
    setLogin: (state, action) => {
      state.token = action.payload;
      localStorage.setItem("token", state.token);

    },

    setEmployeeId: (state, action) => {
      state.employeeId = action.payload;
      localStorage.setItem("employeeId", state.employeeId);
    },
    setLogout: (state, action) => {
      state.token = null;
      state.employeeId = null;
      localStorage.clear();
    },
    setEmployee: (state, action) => {
      state.employee = action.payload;
    },
    updateProfileById: (state, action) => {
      const updatedUser = {
        ...state.employee,
        firstname: action.payload.firstname,
        lastname: action.payload.lastname ,
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
  setEmployeeId,
  setLogout,
  updateProfileById,
  setEmployee,
  setcategory,
  setEmployeeByCategory
} = employeeSlice.actions;
export default employeeSlice.reducer;