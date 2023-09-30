import { createSlice } from "@reduxjs/toolkit";

export const products = createSlice({
  name: "products",
  initialState: {
    products: [],
    category:[],
    name: "products",
  },
  reducers: {
    setProducts: (state, action) => {
      state.articles = action.payload;
    },
    addProduct: (state, action) => {
      state.products.push(action.payload);
    },
    updateProductById: (state, action) => {
      const updatedProduct = action.payload;
      state.products = state.products.map((product) =>
      product.id === updatedProduct.id ? updatedProduct : product
      );
    },
    deleteProductById: (state, action) => {
     
      state.products = state.products.filter(
        
        (product) =>  product.id !== action.payload
      );
    },
    addCategory: (state, action) => {
      state.category.push(action.payload);
    },
    updateCategoryById: (state, action) => {
      const updatedCategory = action.payload;
      state.category = state.category.map((category) =>
      category.id === updatedCategory.id ? updatedCategory : category
      );
    },
    deleteCategoryById: (state, action) => {
     
      state.category = state.category.filter(
        
        (category) =>  category.id !== action.payload
      );
    },
  },
});
export const {
  setProducts,
  addProduct,
  updateProductById,
  deleteProductById,
  addCategory,updateCategoryById,deleteCategoryById
} = products.actions;
export default products.reducer;
