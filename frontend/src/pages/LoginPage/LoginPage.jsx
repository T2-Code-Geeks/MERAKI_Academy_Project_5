import React, { useState } from "react";
import EmployeeLogin from "../../components/Login/EmployeeLogin";
import UserLogin from "../../components/Login/UserLogin";

const LoginPage = () => {
    const [toggle, setToggle] = useState(false);

    const toggleFn = () => {
        setToggle((prev) => !prev);
    };
    return (
        <>
            <div on onClick={toggleFn}>
                Toggle user or employee
            </div>
            {toggle ? <UserLogin /> : <EmployeeLogin />}
        </>
    );
};

export default LoginPage;
