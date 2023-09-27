import { createBrowserRouter } from "react-router-dom";
import Products,{ productsLoader } from "../pages/Products/products/Products";
import Main from "../layouts/Main/Main";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    children: [
      {
        path: "login",
        element: <Login/>
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
