import { createBrowserRouter } from "react-router-dom";
import Products from "../pages/Products/products/Products";
import Main from "../layouts/Main/Main";
import { EmployeesLoader } from "../service/api/EmployeeAPI/Employee";

import EmployeeDetails from "../pages/Employee/EmployeeDetiles/EmployeeDetiles";

import Employees from "../pages/Employee/EmployessPage/Employee";
import Register from "../pages/Register/Register";
import ProfileEmployee from "../pages/Employee/EmployeeProfile/ProfileEmployee";
import ProductDetails, {
    productLoader,
} from "../pages/Products/product/ProductDetails";
import LoginPage from "../pages/LoginPage/LoginPage";
import MainPage from "../components/Admin/MainPage/MainPage";
import AdminLayOut from "../layouts/Admin/AdminLayOut";
import UsersPage from "../components/Admin/UsersPage/UsersPage";
import EmployeeCategories from "../components/Admin/EmployeeCategories/EmployeeCategories";
import EmployeesPage from "../components/Admin/EmployeesPage/EmployeesPage";
import ProductsCategories from "../components/Admin/ProductsCategories/ProductsCategories";
import ProductsPage from "../components/Admin/ProductsPage/ProductsPage";

import UserProfile from "../pages/User/UserProfile";
import CategoryEmployees from "../pages/Employee/EmployeesCategory/EmployeesCategory";
import EmployeesByCategory from "../pages/Employee/EmployeesByCategory/EmployeesByCategory";
import Cart from "../pages/Products/cart/Cart";

import Checkout from "../pages/Products/Checkout/Checkout";

import Messages from "../components/Messages/Messages";
import Home from "../pages/Home/Home";
import Faq from "../components/FAQ/Faq";
import Contact from "../components/Contact/Contact";
import EmployeeLayout from "../layouts/Employee/EmployeeLayout";
export const router = createBrowserRouter([
    {
        path: "/",
        element: <Main />,
        children: [
            {
                path: "",
                element: <Home />,
            },
            {
                path: "faq",
                element: <Faq />,
            },
            {
                path: "contact",
                element: <Contact />,
            },
            {
                path: "login",
                element: <LoginPage />,
            },
            {
                path: "register",
                element: <Register />,
            },
            {
                path: "products",
                element: <Products />
            },
            {
                path: "products/:id",
                element: <ProductDetails />,
                loader: productLoader,
            },
            {
                path: "employees",
                element: <Employees />,
                loader: EmployeesLoader,
                children: [],
            },
            {
                path: "employees/:id",
                element: <EmployeeDetails />,
            },

            {
                path: "user/:id",
                element: <UserProfile />,
            },
            {
                path: "category",
                element: <CategoryEmployees />,
            },
            {
                path: "employeeSByCategory/:id",
                element: <EmployeesByCategory />,
            },
            {
                path: "cart",
                element: <Cart />,
                children: [],
            },
            {
                path: "checkout",
                element: <Checkout />,
            },
            {
                path: "chat",
                element: <Messages />,
            },
        ],
    },
    {
        path: "/admin",
        element: <AdminLayOut />,
        children: [
            {
                path: "",
                element: <MainPage />,
            },
            {
                path: "users",
                element: <UsersPage />,
            },
            {
                path: "employeeCategories",
                element: <EmployeeCategories />,
            },
            {
                path: "employees",
                element: <EmployeesPage />,
            },
            {
                path: "productsCategories",
                element: <ProductsCategories />,
            },
            {
                path: "products",
                element: <ProductsPage />,
            },
        ],
    },
    {
        path: "dashboard",
        element: <EmployeeLayout />,
        children: [
            {
                path: "employeeProfile/:id",
                element: <ProfileEmployee />,
            },
            {
                path: "chat",
                element: <Messages />,
            },
        ],
    },
]);
