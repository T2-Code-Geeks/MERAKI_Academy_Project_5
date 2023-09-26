import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/login/Login.Jsx";

export const router = createBrowserRouter(
  {
    path: "/",
    element: <Main />,
    children: [{ path: "", element: <Home /> }],
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/register",
    element: <Login />,
  }
);
