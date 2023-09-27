
import React, { useState } from "react";
import RegisterEmployee from "../../components/Register/RegisterEmployee";
import UserRegister from "../../components/Register/UserRegister";

const Register = () => {
  const [toggle, setToggle] = useState(false);

  const toggleFn=()=>{
      setToggle(prev=>!prev)
  }


    return (

      <>
      <div on onClick={toggleFn}>Toggle user or employee</div>
      {toggle ? <UserRegister /> :<RegisterEmployee /> }
  </>
      
    );
};



export default Register;
