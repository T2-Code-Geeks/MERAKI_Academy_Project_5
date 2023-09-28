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
            <div>
                <h4 onClick={toggleFn}>Toggle user or employee</h4>
            </div>
            {toggle ? <UserLogin /> : <EmployeeLogin />}
        </>
    );
};

export default LoginPage;
