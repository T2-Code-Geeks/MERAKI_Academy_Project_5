import React from 'react'
import "./NavBar.css"
import { NavLink,useNavigate } from 'react-router-dom'
import { useSelector  } from "react-redux";

const NavBar = () => {
  const { userId } = useSelector((state) => state.auth);
  const navegite= useNavigate()
  return (
 <nav>
<NavLink className="navlink" to="/">home</NavLink>
<NavLink to="/login">Login</NavLink>
<NavLink to="/register">register</NavLink>
<NavLink to="/products">products</NavLink>
<NavLink to="/employees">Employees</NavLink>
<button onClick={()=>{navegite(`employeeProfile/${userId}`)}}> my profile</button>
 </nav>
  )
}

export default NavBar