import React from 'react'
import "./NavBar.css"
import { NavLink } from 'react-router-dom'
const NavBar = () => {
  return (
 <nav>
<NavLink className="navlink" to="/">home</NavLink>
<NavLink to="/login">Login</NavLink>
<NavLink to="/register">register</NavLink>
<NavLink to="/products">products</NavLink>


 </nav>
  )
}

export default NavBar