import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  setLogin,
  setEmployeeId,
} from "../../service/redux/reducers/employeeSlice";
import axios from "axios";

//! ================ login as employee ...  ===================================

const EmployeeLogin = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [userInfo, setUserInfo] = useState({});
    const { token } = useSelector((state) => state.employee);
    const [message, setMessage] = useState("");


  const Login = async (e) => {
    e.preventDefault();
    try {
      const result = await axios.post("https://geeks-app.onrender.com/employees/login", 
      userInfo
      );
      if (result.data) {
        setMessage("");
        dispatch(setLogin(result.data.token));
        dispatch(setEmployeeId(result.data.employee_id));
      
      } else throw Error;
    } catch (error) {
      if (error.response && error.response.data) {
        console.log(error);
        return setMessage(error.response.data.message);
      }
      setMessage("There's somthing error while Login , Try Again...");
    }
  };

  //! ===============================================

  useEffect(() => {
    if (token) {
      navigate("/dashboard");
    }
  }, [token]);

  //! ===============================================

 
    return (
        <form className="grid grid-cols-1 gap-6 mt-8 md:grid-cols-2">
      
        <div>
            <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">
                Email address
            </label>
            <input
                type="email"
                placeholder="johnsnow@example.com"
                className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                onChange={(e) =>
                    setUserInfo({ ...userInfo, email: e.target.value })
                }
            />
        </div>
        <div>
            <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">
                Password
            </label>
            <input
                type="password"
                placeholder="Enter your password"
                className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                onChange={(e) =>
                    setUserInfo({ ...userInfo, password: e.target.value })
                }
            />
        </div>
        <button
            className="flex items-center justify-between w-full px-6 py-3 text-sm tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50"
            onClick={Login}
        >
            <span>Sign In </span>
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
    );

};

//! ================ export function ...  ===================================

export default EmployeeLogin;
