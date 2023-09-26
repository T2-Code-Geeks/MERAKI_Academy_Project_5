import { createBrowserRouter } from "react-router-dom";
import Products from "../pages/Products/products/Products";
import Main from "../layouts/Main/Main";
import Register from "../pages/Register/Register";
import Login from "../pages/Login/Login.Jsx";

export const router = createBrowserRouter(
[  {
    path: "/",
    element: <Main />,
    children: [{
        path: "/login",
        element: <Login/>,
      },
      {
        path: "/register",
        element: <Register />,
      },
      {
        path: "/products",
        element: <Products />,
      }],
  },
  ]

);
