import { createSlice } from "@reduxjs/toolkit";

export const products = createSlice({
  name: "products",
  initialState: {
    articles: [],
    name: "products",
  },
  reducers: {
    setArticles: (state, action) => {
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
    // setComments: (state, action) => {
    //   const { comments, article_id } = action.payload;
    //   const articleIndex = state.articles.findIndex(
    //     (art) => art.id === article_id
    //   );
    //   state.articles[articleIndex].comments = comments;
    // },
    // addComment: (state, action) => {
    //   const { newComment, article_id } = action.payload;
    //   const article = state.articles.find(
    //     (art) => art.id === article_id
    //   );
    //   article.comments.push(newComment);
    
    // },
  },
});
export const {
  setArticles,
  addProduct,
  updateProductById,
  deleteProductById,
  setComments,
  addComment,
} = products.actions;
export default products.reducer;
