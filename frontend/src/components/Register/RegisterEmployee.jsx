import React, { useEffect, useState } from "react";
import "./RegisterEmployee.css";
import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

//!=================================================

const RegisterEmployee = () => {
    const [employeeInfo, setEmployeeInfo] = useState({});
    const role_id = 2;
    const [message, setMessage] = useState("");
    const [status, setStatus] = useState(false);
    //!=================================================


    const { token } = useSelector((state) => state.employee);


    //!=================================================

    const navigate = useNavigate();
    useEffect(() => {
        if (token) {
            navigate("/");
        }
    });

    //!=================================================

    const CreateAccountEmployee = async (e) => {
        e.preventDefault();
        const addEmployee = { ...employeeInfo, role_id: role_id }
        try {
            const result = await axios.post(
                "http://localhost:5000/employees/register", addEmployee

            );

            if (result.data) {
                setStatus(true);
                setMessage(result.data.message);
            } else {
                throw Error;
            }
        } catch (error) {
            setStatus(false);
            if (error.response && error.response.data) {
                return setMessage(error.response.data.message);
            }
            setMessage("please try again");
        }
    };

    //!=================================================


    return (<>
        <form className="grid grid-cols-1 gap-6 mt-8 md:grid-cols-2">
            <div>
                <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">
                    First Name
                </label>
                <input
                    type="text"
                    placeholder="John"
                    className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" onChange={(e) => setEmployeeInfo({ ...employeeInfo, firstName: e.target.value })}
                />
            </div>
            <div>
                <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">
                    Last name
                </label>
                <input
                    type="text"
                    placeholder="Snow"
                    className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" onChange={(e) => setEmployeeInfo({ ...employeeInfo, lastName: e.target.value })}
                />
            </div>
            <div>
                <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">
                    Age
                </label>
                <input
                    type="text"
                    placeholder="Age"
                    className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" onChange={(e) => setEmployeeInfo({ ...employeeInfo, age: e.target.value })}
                />
            </div>
            <div>
                <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">
                    Country
                </label>
                <input
                    type="text"
                    placeholder="Country"
                    className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" onChange={(e) => setEmployeeInfo({ ...employeeInfo, country: e.target.value })}
                />
            </div>
            <div>
                <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">
                    Email address
                </label>
                <input
                    type="email"
                    placeholder="johnsnow@example.com"
                    className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" onChange={(e) => setEmployeeInfo({ ...employeeInfo, email: e.target.value })}
                />
            </div>
            <div>
                <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">
                    Password
                </label>
                <input
                    type="password"
                    placeholder="Enter your password"
                    className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" onChange={(e) => setEmployeeInfo({ ...employeeInfo, password: e.target.value })}
                />
            </div>
            <button className="flex items-center justify-between w-full px-6 py-3 text-sm tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50" onClick={CreateAccountEmployee}>
                <span>Sign Up </span>
                <p>{message}</p>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5 rtl:-scale-x-100"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                >
                    <path
                        fillRule="evenodd"
                        d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                        clipRule="evenodd"
                    />
                </svg>
            </button>
        </form>
        <div id="g_id_onload"
                data-client_id="641945516994-ab87juc1msoqee2hutvllqaqm4jld4nt.apps.googleusercontent.com"
                data-context="signin"
                data-ux_mode="popup"
                data-callback="Login"
                data-auto_prompt="false">
            </div>

            <div class="g_id_signin"
                data-type="standard"
                data-shape="pill"
                data-theme="filled_blue"
                data-text="continue_with"
                data-size="large"
                data-logo_alignment="left">
            </div>
        </> );

};
export default RegisterEmployee;
<script src="https://accounts.google.com/gsi/client" async></script>