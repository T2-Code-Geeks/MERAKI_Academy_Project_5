import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const Cart = () => {
    const { token } = useSelector((state) => state.auth);
    const [cart, setCart] = useState([]);
    const [quantity, setQuantity] = useState("");
    useEffect(() => {
        if (token) {
            getBasket();
        }
    }, []);

    const getBasket = async () => {
        try {
            const result = await axios.get(
                "http://localhost:5000/users/basket/get",
                { headers: { Authorization: `Bearer ${token}` } }
            );
            console.log(result.data.result);
            setCart(result.data.result);
        } catch (error) {}
    };

    const updateQuantity = async () => {
        try {
            const result = await axios.post("http://localhost:5000/users/basket", quantity, { headers: { Authorization: `Bearer ${token}` } });
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
                            <button>-</button>
                            {item.quantity}
                            <button>+</button>
                        </div>
                    );
                })}
        </div>
    );
};

export default Cart;
