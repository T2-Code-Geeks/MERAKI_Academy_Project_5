// import axios from 'axios';
import React, { useEffect, useState } from "react";
import "./Products.css";
import axios from "axios";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

const Products = () => {
    const [result, setResult] = useState([]);
    const { tokenUser } = useSelector((state) => state.auth);
    const [message, setMessage] = useState("");
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [isDropdownOpen, setDropdownOpen] = useState(false);
    const [categories, setCategories] = useState("");

    useEffect(() => {
        getAllProducts();
        getCategories();
    }, []);

    const toggleDropdown = () => {
        setDropdownOpen(!isDropdownOpen);
    };

    const getCategories = async () => {
        try {
            const result = await axios.get(
                "http://localhost:5000/products/category"
            );
            if (result.data.success) {
                setCategories(result.data.result);
            }
        } catch (error) {
            console.log(error.message);
        }
    };

    const getAllProducts = async () => {
        try {
            const products = await axios.get("http://localhost:5000/products/");
            if (products.data.result.length) {
                setResult(products.data.result);
            } else {
                setMessage("Error Occured");
                setTimeout(() => {
                    setMessage("");
                }, 2000);
            }
        } catch (error) {
            console.log(error.message);
        }
    };

    const getProductByCatgegory = async (categoryId) => {
        try {
            const result = await axios.get(
                `http://localhost:5000/products/category/products/${categoryId}`
            );
            if (result.data.success) {
                setResult(result.data.result);
            }
        } catch (error) {
            console.log(error.message);
        }
    };

    const addToCart = async (product_id) => {
        try {
            if (!tokenUser) {
                setMessage("Login Please");
                setTimeout(() => {
                    setMessage("");
                }, [2000]);
            } else {
                const result = await axios.post(
                    "http://localhost:5000/users/basket",
                    { product_id, quantity: 1 },
                    { headers: { Authorization: `Bearer ${tokenUser}` } }
                );
                console.log(result);
                if (result.data.success) {
                    setMessage("Added To cart");
                    setTimeout(() => {
                        setMessage("");
                    }, 2000);
                } else {
                    setMessage("Server Error");
                    setTimeout(() => {
                        setMessage("");
                    }, [2000]);
                }
            }
        } catch (error) {
            console.log(error.message);
        }
    };
    return (
        <>
            <div className="absolute top-20 left-20">
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
                                onClick={getAllProducts}
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
                                                getProductByCatgegory(cats.id);
                                            }}
                                            className="block px-14 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                                        >
                                            {cats.name}
                                        </button>
                                    </li>
                                );
                            })}
                    </ul>
                </div>
            </div>

            {message && <Message message={message} setMessage={setMessage} />}
            <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                <h2 className="sr-only">Products</h2>
                <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                    {result &&
                        result.map((product) => {
                            return (
                                <div key={product.id} className="group">
                                    <div
                                        className={`aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg ${
                                            isDarkMode
                                                ? "bg-gray-200"
                                                : "bg-white"
                                        } xl:aspect-h-8 xl:aspect-w-7`}
                                    >
                                        <img
                                            src="https://ar.workprotool.com/uploads/202236532/screwdriver-6-in-153525993729.jpg"
                                            alt=""
                                            className="h-full w-full object-cover object-center group-hover:opacity-75"
                                        />
                                    </div>
                                    <h3
                                        className={`mt-4 text-sm ${
                                            isDarkMode
                                                ? "text-gray-300"
                                                : "text-black-700"
                                        }`}
                                    >
                                        <NavLink to={`/products/${product.id}`}>{product.name}</NavLink>
                                    </h3>
                                    <p
                                        className={`mt-1 text-lg font-medium ${
                                            isDarkMode
                                                ? "text-gray-400"
                                                : "text-gray-900"
                                        }`}
                                    >
                                        ${product.price}
                                    </p>
                                    <button
                                        onClick={() => addToCart(product.id)}
                                        className={`mt-4 bg-blue-500 text-white font-medium rounded-md px-4 py-2 hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300`}
                                    >
                                        Add to Cart
                                    </button>{" "}
                                </div>
                            );
                        })}
                </div>
            </div>
        </>
    );
};

export default Products;

export const Message = ({ message, setMessage }) => {
    return (
        <div className="flex fixed right-10 shadow-md gap-6 rounded-lg overflow-hidden divide-x max-w-2xl dark:bg-gray-900 dark:text-gray-100 divide-gray-700">
            <div className="flex flex-1 flex-col p-4 border-l-8 dark:border-violet-400">
                <span className="text-2xl">{message}</span>
            </div>
            <button
                onClick={() => {
                    setMessage("");
                }}
                className="px-4 flex items-center text-xs uppercase tracki dark:text-gray-400 dark:border-gray-700"
            >
                Dismiss
            </button>
        </div>
    );
};
