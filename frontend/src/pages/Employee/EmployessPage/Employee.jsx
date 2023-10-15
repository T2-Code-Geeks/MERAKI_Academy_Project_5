import React, { Suspense, useEffect, useState } from "react";
import { Await, useLoaderData, useNavigate } from "react-router-dom";
import "./Employee.css";
import { useSelector } from "react-redux";
import axios from "axios";
//!==================================== Employess packge ==========================================

const Employees = () => {
    //!=================================================
    const [result, setResult] = useState([]);

    const navigate = useNavigate();
    const [isDropdownOpen, setDropdownOpen] = useState(false);
    const [categories, setCategories] = useState("");
    const toggleDropdown = () => {
        setDropdownOpen(!isDropdownOpen);
    };
useEffect(() => {
    getAllEmployee()
    getCategory()
}, [])


    const getAllEmployee = async () => {
        try {
            const employee = await axios.get(`http://localhost:5000/employees`);
            if (employee.data.result.length) {
                setResult(employee.data.result);
            } else {
         
            }
        } catch (error) {
            console.log(error.message);
        }
    };
    const getEmployeeByCategory= async (categoryId) => {
        try {
            const result = await axios.get(
                `http://localhost:5000/employees/ByCategory/${categoryId}`
            );
            if (result.data.success) {
                setResult(result.data.result);
            }
        } catch (error) {
            console.log(error.message);
        }
    };
    const getCategory= async (categoryId) => {
        try {
            const result = await axios.get(
                `http://localhost:5000/employees/categoryes/all`
            );
            if (result.data.success) {
                setCategories(result.data.result);
            }
        } catch (error) {
            console.log(error.message);
        }
    };
    //!=================================================
    return (
        <>    <div className="absolute top-20 left-20">
        <button
            id="dropdownNavbarLink"
            data-dropdown-toggle="dropdownNavbar"
            onClick={toggleDropdown}
            className="flex items-center justify-between w-full py-2 pl-3 pr-4  text-gray-700 border-b border-gray-100 hover:bg-gray-50 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 md:w-auto dark:text-white md:dark:hover:text-blue-500 dark:focus:text-white dark:border-gray-700 dark:hover:bg-gray-700 md:dark:hover:bg-transparent"
        >
            Filter
            <svg
                className="w-2.5 h-2.5 ml-2.5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 10 6"
            >
                <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 4 4 4-4"
                />
            </svg>
        </button>
        <div
            id="dropdownNavbar"
            className={`z-10 absolute ${
                isDropdownOpen ? "block" : "hidden"
            } font-normal bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 dark:divide-gray-600`}
            style={{ top: "1.9rem" }}
        >
            <ul
                className="py-2 text-sm text-gray-700 dark:text-gray-400"
                aria-labelledby="dropdownLargeButton"
            >
                <li>
                    <button
                        onClick={getAllEmployee}
                        className="block px-14 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                    >
                        All Categories
                    </button>
                </li>
                {categories &&
                    categories.map((cats) => {
                        return (
                            <li key={cats.id}>
                                <button
                                    onClick={() => {
                                        getEmployeeByCategory(cats.id);
                                    }}
                                    className="block px-14 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                >
                                    {cats.category}
                                </button>
                            </li>
                        );
                    })}
            </ul>
        </div>
    </div>
            <div className="text-center pb-12">
                <h2 className="text-base font-bold text-indigo-600">
                    We have the best Services In our App
                </h2>
                <h1 className="font-bold text-3xl md:text-4xl lg:text-5xl font-heading text-white">
                    Check our awesome craftmen ...
                </h1>

                <div className="w-full lg:flex">
                    <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-4 py-12 lg:flex">
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">

                                        <>
                                            {result?.map((Employee) => (
                                                <div
                                                    key={Employee.id}
                                                    className="w-full bg-gray-900 rounded-lg sahdow-lg p-12 flex flex-col justify-center items-center"
                                                >
                                                    <div className="mb-8">
                                                        <img
                                                            className="object-center object-cover rounded-full h-36 w-36"
                                                            src={Employee.img}
                                                            alt="photo"
                                                        />
                                                    </div>
                                                    <div className="text-center">
                                                        <p className="text-xl text-white font-bold mb-2">
                                                            {Employee.firstname +
                                                                " " +
                                                                Employee.lastname}
                                                        </p>
                                                        <p className="text-base text-gray-400 font-normal">
                                                            {
                                                                Employee.description
                                                            }
                                                        </p>
                                                        <button
                                                            className="px-8 py-2.5 leading-5 text-white transition-colors duration-300 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
                                                            onClick={() => {
                                                                navigate(
                                                                    `/employees/${Employee.id}`
                                                                );
                                                            }}
                                                        >
                                                            More Details
                                                        </button>
                                                    </div>
                                                </div>
                                            ))}
                                        </>

                        </div>
                    </section>
                </div>
            </div>
        </>
    );
};
//!====================================== export function ==========================================
export default Employees;


