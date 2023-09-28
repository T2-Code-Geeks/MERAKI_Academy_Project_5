
import React, { useState } from "react";
import RegisterEmployee from "../../components/Register/RegisterEmployee";
import UserRegister from "../../components/Register/UserRegister";
import "./Register.css"
const Register = () => {
  const [toggle, setToggle] = useState(false);

  const toggleFn=()=>{
      setToggle(prev=>!prev)
  }


    return (

      <>
      <div   className="register">
        <h4 onClick={toggleFn}>Toggle user or employee </h4><br/>
       {toggle ? <UserRegister /> :<RegisterEmployee /> }
      </div>
     
  </>
      
    );
};



export default Register;
