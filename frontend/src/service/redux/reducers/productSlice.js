import { createSlice } from "@reduxjs/toolkit";

export const products = createSlice({
  name: "products",
  initialState: {
    products: [],
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
        (product) => product.id !== action.payload
      );
    },
  
  },
});
export const {
  setProducts,
  addProduct,
  updateProductById,
  deleteProductById,
  setComments,
  addComment,
} = products.actions;
export default products.reducer;
