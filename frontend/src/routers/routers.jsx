import { createBrowserRouter } from "react-router-dom";
import Products,{ productsLoader } from "../pages/Products/products/Products";
import Main from "../layouts/Main/Main";
import Login from "../pages/login/Login";
import UserRegister from "../layouts/Register/UserRegister";
// import { productsLoader } from "../service/api/ProductsAPI/Products";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Main />,
        children: [
            {
                path: "login",
                element: <Login />,
            },
            {
                path: "register",
                element: <UserRegister/>
            },
            {
                path: "products",
                element: <Products />,
                loader: productsLoader,
            },
        ],
    },
]);
