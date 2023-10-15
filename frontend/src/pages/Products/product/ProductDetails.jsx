import { Message } from "../products/Products";
import axios from "axios";
import React, { Suspense, useState } from "react";
import { useSelector } from "react-redux";
import { Await, useLoaderData } from "react-router-dom";

const ProductDetails = () => {
    const { result } = useLoaderData();
    const [message, setMessage] = useState("");
    const { tokenUser } = useSelector((state) => state.auth);
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
                    }, [2000]);
                }
            }
        } catch (error) {
            console.log(error.message);
        }
    };
    return (
        <>
            <Suspense fallback={<p>Loading...</p>}>
                <Await
                    resolve={result}
                    errorElement={<p>Error loading product details.</p>}
                >
                    {(result) => (
                        <>
                            {message && (
                                <Message
                                    message={message}
                                    setMessage={setMessage}
                                />
                            )}
                            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-screen py-20">
                                <div className="flex flex-col md:flex-row -mx-4">
                                    <div className="md:flex-1 px-4">
                                        <div className="h-[460px] rounded-lg bg-gray-300 mb-4">
                                            <img
                                                className="w-full h-full object-cover"
                                                src={result.img}
                                                alt="Product Image"
                                            />
                                        </div>
                                        <div className="flex -mx-2 mb-4">
                                            <div className="w-1/2 px-2">
                                                <button
                                                    onClick={() =>
                                                        addToCart(result.id)
                                                    }
                                                    className="w-full bg-gray-900 text-white py-2 px-4 rounded-full font-bold hover:bg-gray-800"
                                                >
                                                    Add to Cart
                                                </button>
                                            </div>
                                            <div className="w-1/2 px-2">
                                                <button className="w-full bg-gray-400 text-gray-800 py-2 px-4 rounded-full font-bold hover:bg-gray-300">
                                                    Add to Wishlist
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="md:flex-1 px-4">
                                        <h2 className="text-2xl font-bold mb-2">
                                            {result.name}
                                        </h2>
                                        <div className="flex mb-4">
                                            <div className="mr-4">
                                                <span className="font-bold text-gray-100">
                                                    Price:{" "}
                                                </span>
                                                <span className="text-gray-200">
                                                    ${result.price}
                                                </span>
                                            </div>
                                        </div>
                                        <div>
                                            <span className="font-bold text-gray-100">
                                                Product Description:
                                            </span>
                                            <p className="text-gray-200 text-sm mt-2">
                                                {result.description}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
                </Await>
            </Suspense>
        </>
    );
};

export default ProductDetails;

export const productLoader = async ({ params }) => {
    const result = axios
        .get(`http://localhost:5000/products/${params.id}`)
        .then((res) => {
            return res.data.result;
        });
    return { result };
};
