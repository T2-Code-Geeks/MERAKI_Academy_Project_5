import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./EmployeeLogin.css";
import { useDispatch, useSelector } from "react-redux";
import { setLogin, setEmployeeId } from "../../service/redux/reducers/employeeSlice";
import axios from "axios";

//! ===============================================
const EmployeeLogin = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { token } = useSelector((state) => state.employee);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const [status, setStatus] = useState(false);

    //! ===============================================

    const Login = async (e) => {
        e.preventDefault();
        try {
            const result = await axios.post(
                "http://localhost:5000/employees/login",
                {
                    email,
                    password,
                }
            );
            if (result.data) {
                console.log(result.data)
                setMessage("");
                dispatch(setLogin(result.data.token));
                dispatch(setEmployeeId(result.data.employee_id));
                setStatus(true);
            } else throw Error;
        } catch (error) {
            if (error.response && error.response.data) {
                console.log(error);
                return setMessage(error.response.data.message);
            }
            setMessage("There's somthing error while Login , Try Again...");
            setStatus(false);
        }
    };
    //! ===============================================
    useEffect(() => {
        if (token) {
            navigate("/");
        }
    },[token]);
    //! ===============================================

    return (
        <>
            <div>
                <p>Employee Login:</p>
                <form
                    onSubmit={(e) => {
                        Login(e);
                    }}
                >
                    <br />

                    <input
                        type="email"
                        placeholder="Email"
                        onChange={(e) => { setEmail(e.target.value) }}
                    />
                    <br />
                    <input
                        type="password"
                        placeholder="Password"
                        onChange={(e) => { setPassword(e.target.value) }}
                    />
                    <br />
                    <button
                        onClick={(e) => {
                            Login(e);
                        }}
                    >
                        Login
                    </button>
                </form>

                {status
                    ? message && <div className="SuccessMessage">{message}</div>
                    : message && <div className="ErrorMessage">{message}</div>}
            </div>
        </>
    );
};

export default EmployeeLogin;
