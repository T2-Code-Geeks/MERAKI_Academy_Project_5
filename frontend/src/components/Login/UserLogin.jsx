import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { setLogin, setUserId } from "../../service/redux/reducers/authSlice";

const UserLogin = () => {
    const { tokenUser } = useSelector((state) => state.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [userInfo, setUserInfo] = useState({});
    const [logins, setLogins] = useState("");
    const [message, setMessage] = useState();

    useEffect(() => {
        if (tokenUser) {
            navigate("/");
        }
    });
    const loginHandle = async (event) => {
        try {
            const result = await axios.post("http://localhost:5000/users/login", logins);
            if (result.data.success) {
                setMessage("");
                dispatch(setLogin(result.data.token));
                dispatch(setUserId(result.data.user_id));
                navigate("/")
            } else {
                setMessage(result.data.message);
            }
        } catch (error) {
            console.log(error.message);
            setMessage("Server Error")
        }
    };
    return (
        <form className="grid grid-cols-1 gap-6 mt-8 md:grid-cols-2">
        <div>
            <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">
                First Name
            </label>
            <input
                type="text"
                placeholder="John"
                className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                onChange={(e) =>
                    setUserInfo({ ...userInfo, firstName: e.target.value })
                }
            />
        </div>
        <div>
            <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">
                Last name
            </label>
            <input
                type="text"
                placeholder="Snow"
                className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                onChange={(e) =>
                    setUserInfo({ ...userInfo, lastName: e.target.value })
                }
            />
        </div>
        <div>
            <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">
                Age
            </label>
            <input
                type="text"
                placeholder="Age"
                className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                onChange={(e) =>
                    setUserInfo({ ...userInfo, age: e.target.value })
                }
            />
        </div>
        <div>
            <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">
                Country
            </label>
            <input
                type="text"
                placeholder="Country"
                className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                onChange={(e) =>
                    setUserInfo({ ...userInfo, country: e.target.value })
                }
            />
        </div>
        <div>
            <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">
                Address 1
            </label>
            <input
                type="text"
                placeholder="Address 1"
                className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                onChange={(e) =>
                    setUserInfo({ ...userInfo, address1: e.target.value })
                }
            />
        </div>{" "}
        <div>
            <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">
                Address 2
            </label>
            <input
                type="text"
                placeholder="Address 2"
                className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                onChange={(e) =>
                    setUserInfo({ ...userInfo, address2: e.target.value })
                }
            />
        </div>
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
            onClick={"handleUserRegister"}
        >
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
    );
};

export default UserLogin;
