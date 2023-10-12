// import axios from 'axios';
import React, { Suspense, useState } from "react";
import { Await, useLoaderData } from "react-router-dom";
import "./Products.css";
import axios from "axios";
import { useSelector } from "react-redux";

const Products = () => {
    const { result } = useLoaderData();
    const { tokenUser } = useSelector((state) => state.auth);
    const [message, setMessage] = useState("");
    const [isDarkMode, setIsDarkMode] = useState(false);
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
                if (result.data.success) {
                    setMessage("Added To cart");
                    setTimeout(() => {
                        setMessage("");
                    }, 2000);
                } else {
                    setMessage("Server Error");
                    setTimeout(() => {
                        setMessage("");
                    },[2000]);
                }
            }
        } catch (error) {
            console.log(error.message);
        }
    };
    return (
        <>
            {message && <Message message={message} setMessage={setMessage} />}
            <Suspense fallback={<p>Loading...</p>}>
                <Await
                    resolve={result}
                    errorElement={<p>Error loading products.</p>}
                >
                    {(result) => (
                        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                            <h2 className="sr-only">Products</h2>
                            <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                                {result.map((product) => (
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
                                            {product.name}
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
                                            onClick={() =>
                                                addToCart(product.id)
                                            }
                                            className={`mt-4 bg-blue-500 text-white font-medium rounded-md px-4 py-2 hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-300`}
                                        >
                                            Add to Cart
                                        </button>{" "}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </Await>
            </Suspense>
        </>
    );
};

export default Products;

export const Message = ({message, setMessage}) => {
    return (
        <div className="flex fixed right-10 shadow-md gap-6 rounded-lg overflow-hidden divide-x max-w-2xl dark:bg-gray-900 dark:text-gray-100 divide-gray-700">
            <div className="flex flex-1 flex-col p-4 border-l-8 dark:border-violet-400">
                <span className="text-2xl">{ message }</span>
            </div>
            <button onClick={()=>{setMessage("")}} className="px-4 flex items-center text-xs uppercase tracki dark:text-gray-400 dark:border-gray-700">
                Dismiss
            </button>
        </div>
    );
};
