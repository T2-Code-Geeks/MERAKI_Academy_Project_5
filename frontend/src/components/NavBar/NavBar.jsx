import React from "react";
import "./NavBar.css";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setLogout } from "../../service/redux/reducers/authSlice";
const NavBar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(setLogout());
    navigate("/login");
  };

  const { token, userId } = useSelector((state) => state.auth);

  return (
    <nav>
      {!token ? (
        <div>
          <NavLink className="navlink" to="/">
            home
          </NavLink>
          <NavLink to="/products" className={"navbar-margin"}>
            products
          </NavLink>
          <NavLink to="/register" className={"navbar-margin"}>
            register
          </NavLink>
          <NavLink to="/login" className={"navbar-margin"}>
            Login
          </NavLink>
        </div>
      ) : (
        <div>
          <NavLink className="navlink" to="/">
            home
          </NavLink>
          <NavLink to="/products" className={"navbar-margin"}>
            products
          </NavLink>
          <NavLink to={`/user/${userId}`} className={"navbar-margin"}>
            My Profile
          </NavLink>
          <NavLink onClick={handleLogout}>Logout</NavLink>
          <NavLink to="/category">Employee Category </NavLink>
          <NavLink to="employeeProfile/:id">Employee Profile</NavLink>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
