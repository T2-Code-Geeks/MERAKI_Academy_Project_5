import React from "react";
import "./NavBar.css";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setLogout } from "../../service/redux/reducers/authSlice";
import { setLogout as employeelogout } from "../../service/redux/reducers/employeeSlice";
const NavBar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(setLogout());
        dispatch(employeelogout());
        navigate("/login");
    };
    const { tokenUser, userId } = useSelector((state) => state.auth);
    const { token } = useSelector((state) => state.employee);
    return (
        <nav>
            {tokenUser ? (
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
                    <NavLink to="/category">Employee Category </NavLink>
                    <NavLink to={"/cart"}>Cart </NavLink>
                    <NavLink onClick={handleLogout}>Logout</NavLink>
                </div>
            ) : token ? (
                <div>
                    <NavLink className="navlink" to="/">
                        home
                    </NavLink>
                    <NavLink to="/products" className={"navbar-margin"}>
                        products
                    </NavLink>
                    <NavLink to="employeeProfile/:id">Employee Profile</NavLink>
                </div>
            ) : (
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
            )}
        </nav>
    );

};

export default NavBar;

// tokenUser? (/* usernavbar */):((token? /* employee navbar */ ): (/* home product register login */))
