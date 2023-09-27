import { createBrowserRouter } from "react-router-dom";
import Products,{ productsLoader } from "../pages/Products/products/Products";
import Main from "../layouts/Main/Main";

import Register from "../pages/Register/Register";
import ProductDetails, { productLoader } from "../pages/Products/product/ProductDetails";
import LoginPage from "../pages/LoginPage/LoginPage";


export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "login",
        element: <LoginPage/>
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "products",
        element: <Products />,
        loader:productsLoader,
        children:[]
      },
      {
        path:"products/:id",
        element:<ProductDetails/>,
        loader:productLoader
      },
    ],
  },

]);
