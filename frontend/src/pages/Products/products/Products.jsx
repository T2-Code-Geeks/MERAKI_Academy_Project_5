// import axios from 'axios';
import React, { Suspense, useState } from "react";
import { Await, Link, useLoaderData } from "react-router-dom";
import "./Products.css";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../../service/redux/reducers/cart";

const Products = () => {
    const { result } = useLoaderData();
    const { token } = useSelector((state) => state.auth);
    const [message, setMessage] = useState("");
    const [productId, setProductId] = useState("");
    const dispatch = useDispatch();
    // const filteredProducts=(cat)=>{
    // const updated=result.category.filter((x)=>x.category===cat)
    // }

    const addToCart = async (product_id) => {
        try {
            setProductId(product_id);
            const result = await axios.post(
                "http://localhost:5000/users/basket",
                { product_id, quantity: 1 },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            if (result.data.success) {
                setMessage("Added To cart");
                setTimeout(() => {
                    setMessage("");
                }, 2000);
            }
        } catch (error) {
            console.log(error.message);
        }
    };
    return (
        <>
            <h2>Products</h2>
            <Suspense fallback={<p>Loading...</p>}>
                <Await
                    resolve={result}
                    errorElement={<p>Error loading products.</p>}
                >
                    {(result) => (
                        <div>
                            {result?.map((product) => (
                                <div
                                    className="productContainer"
                                    key={product.id}
                                >
                                    <h2>{product.name}</h2>
                                    <p>{product.description}</p>
                                    <Link to={`/products/${product.id}`}>
                                        View Details
                                    </Link>
                                    <button
                                        onClick={() => {
                                            addToCart(product.id);
                                        }}
                                    >
                                        Add To Cart
                                    </button>
                                    {productId === product.id ? (
                                        <span>{message}</span>
                                    ) : (
                                        ""
                                    )}
                                </div>
                            ))}
                        </div>
                    )}
                </Await>
            </Suspense>
        </>
    );
};

export default Products;
