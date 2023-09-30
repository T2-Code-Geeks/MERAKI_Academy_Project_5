import { createBrowserRouter } from "react-router-dom";
import Products,{ productsLoader } from "../pages/Products/products/Products";
import Main from "../layouts/Main/Main";
import { EmployeesLoader} from "../service/api/EmployeeAPI/Employee";
import EmployeeDetails, { EmployeeLoader } from "../pages/Employee/EmployeeDetiles/EmployeeDetiles";
import Employees from "../pages/Employee/EmployessPage/Employee";
import Register from "../pages/Register/Register";
import ProfileEmployee from "../pages/Employee/EmployeeProfile/ProfileEmployee";
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
      {
        path: "employees",
        element: <Employees/>,
        loader:EmployeesLoader,
        children:[]
      },
      {
        path:"employees/:id",
        element:<EmployeeDetails/>,
        loader:EmployeeLoader
      },
      {
        path:"employeeProfile/:id",
        element:<ProfileEmployee/>,
      },
    ],
  },
]);
