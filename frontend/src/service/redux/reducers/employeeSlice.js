import { createSlice } from "@reduxjs/toolkit";

//!======================================== employee Slice ... ====================================================

export const employeeSlice = createSlice({

  name: "employee",
  initialState: {
    token: localStorage.getItem("token") || null,
    employeeId: localStorage.getItem("employeeId") || null,
    employee: [],
    category: [],
    employeeByCate: [],
    comments: [],
    Hiring: []
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
        lastname: action.payload.lastname,
        country: action.payload.country,
      };
      state.employee = updatedUser;
      return state;
    },
    deleteEmployee: (state, action) => {
      state.employee = state.employee.filter((item) => item.id !== action.payload);
  },
    setcategory: (state, action) => {
      state.category = action.payload;
    },
    setEmployeeByCategory: (state, action) => {
      state.employeeByCate = action.payload;
    },
    setComment: (state, action) => {
      state.comments = action.payload
    },
    addNewComment: (state, action) => {
      state.comments.push(action.payload);

    },
    deletecomment: (state, action) => {
      state.comments = state.comments.filter((comments) => comments.id !== action.payload);
    }
    ,
    setHiring: (state, action) => {
      state.Hiring = action.payload;
    },
    updateHiringState:(state,action)=>{
      const updatedStatus = {
        ...state.employee,
        state: action.payload.Status,
      
      };
      state.Hiring = updatedStatus;
      return state;
    },
    }
  })

//!=========================================== export function =================================================
export const {
  setLogin,
  setEmployeeId,
  setLogout,
  updateProfileById,
  setEmployee,
  setcategory,
  setEmployeeByCategory,
  setComment,
  addNewComment,
  deletecomment,
  setHiring,deleteEmployee
} = employeeSlice.actions;
export default employeeSlice.reducer;