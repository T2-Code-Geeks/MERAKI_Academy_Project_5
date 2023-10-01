import React from "react";
import { NavLink } from "react-router-dom";
import "./NavBar.css"
const NavBar = () => {
  return (
    <nav>
      {/* <NavLink className="link" to="/admin">
        admin
      </NavLink>
      <NavLink to="/admin/users" className="link">users</NavLink>
      <NavLink to="/admin/employeeCategories" className="link">employeeCategories</NavLink>
      <NavLink to="/admin/employees" className="link">employees</NavLink>
      <NavLink to="/admin/productsCategories" className="link">productsCategories</NavLink>
      <NavLink to="/admin/products" className="link">products</NavLink> */}

<h1 className="text-3xl font-bold underline">
      Hello world!
    </h1>
    </nav>
  );
};

export default NavBar;
