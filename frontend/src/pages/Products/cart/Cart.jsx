import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { setCart, updateItemById } from "../../../service/redux/reducers/cart";
import { useDispatch } from "react-redux";

const Cart = () => {
    const dispatch = useDispatch();
    const { tokenUser } = useSelector((state) => state.auth);
    const { cart } = useSelector((state) => state.cart);
    const [quantity, setQuantity] = useState("");
    useEffect(() => {
        if (tokenUser) {
            getBasket();
        }
    }, []);

    const getBasket = async () => {
        try {
            const result = await axios.get(
                "http://localhost:5000/users/basket/get",
                { headers: { Authorization: `Bearer ${tokenUser}` } }
            );
            dispatch(setCart(result.data.result));
        } catch (error) {
            console.log(error.message);
        }
    };

    const updateQuantity = async (product_id, quantity) => {
        try {
            const result = await axios.post(
                "http://localhost:5000/users/basket",
                { product_id, quantity },
                { headers: { Authorization: `Bearer ${tokenUser}` } }
            );
            dispatch(updateItemById(result.data.result[0]));
        } catch (error) {
            console.log(error.message);
        }
    };

    return (
        <div>
            {cart &&
                cart.map((item) => {
                    return (
                        <div key={item.id}>
                            <h1>{item.name}</h1>
                            <button
                                onClick={() => {
                                    updateQuantity(item.id, item.quantity - 1);
                                }}
                            >
                                -
                            </button>
                            {item.quantity}
                            <button
                                onClick={() => {
                                    updateQuantity(item.id, item.quantity + 1);
                                }}
                            >
                                +
                            </button>
                        </div>
                    );
                })}
        </div>
    );
};

export default Cart;
