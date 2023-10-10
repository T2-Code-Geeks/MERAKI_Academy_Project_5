import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { setCart, updateItemById } from "../../../service/redux/reducers/cart";
import { useDispatch } from "react-redux";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { deleteItemById } from "../../../service/redux/reducers/cart";
import { NavLink } from "react-router-dom";

const Cart = () => {
    const dispatch = useDispatch();
    const { tokenUser } = useSelector((state) => state.auth);
    const { cart } = useSelector((state) => state.cart);
    const [buttonBoolean, setButtonBoolean] = useState(true);
    const [sum, setSum] = useState(0);

    useEffect(() => {
        if (tokenUser) {
            getBasket();
        }
    }, [tokenUser]);

    const getBasket = async () => {
        try {
            const result = await axios.get(
                "http://localhost:5000/users/basket/get",
                { headers: { Authorization: `Bearer ${tokenUser}` } }
            );
            if (result.data.result.length) {
                let sumPrice = 0;
                result.data.result.forEach((item) => {
                    sumPrice += item.price * item.quantity;
                });
                setSum(sumPrice);
                setButtonBoolean(false);
            } else {
                setButtonBoolean(true);
            }
            dispatch(setCart(result.data.result));
        } catch (error) {
            console.log(error.message);
        }
    };

    const updateQuantity = async (product_id, quantity) => {
        try {
            if (quantity < 1) {
            } else {
                const result = await axios.post(
                    "http://localhost:5000/users/basket",
                    { product_id, quantity },
                    { headers: { Authorization: `Bearer ${tokenUser}` } }
                );
                let sumPrice = 0;
                result.data.remaining.forEach((item) => {
                    sumPrice += item.price * item.quantity;
                });
                setSum(sumPrice);
                dispatch(updateItemById(result.data.result[0]));
            }
        } catch (error) {
            console.log(error.message);
        }
    };

    const handleDelete = async (itemId) => {
        try {
            const result = await axios.delete(
                `http://localhost:5000/users/basket/${itemId}`,
                {
                    headers: { Authorization: `Bearer ${tokenUser}` },
                }
            );
            let sumPrice = 0;
            result.data.remaining.forEach((item) => {
                sumPrice += item.price * item.quantity;
            });
            setSum(sumPrice);
            dispatch(deleteItemById(itemId));
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
                            <DeleteForeverIcon
                                onClick={() => {
                                    handleDelete(item.id);
                                }}
                            />
                            <h1>{item.name}</h1>
                            <button
                                onClick={() => {
                                    updateQuantity(
                                        item.product_id,
                                        item.quantity - 1
                                    );
                                }}
                            >
                                -
                            </button>
                            <span>{item.quantity}</span>
                            <button
                                onClick={() => {
                                    updateQuantity(
                                        item.product_id,
                                        item.quantity + 1
                                    );
                                }}
                            >
                                +
                            </button>
                            <span>{item.price * item.quantity}</span>
                        </div>
                    );
                })}
            <h6>Total: {sum}</h6>
            <NavLink to={"/checkout"}>
                <button disabled={buttonBoolean}>Checkout</button>
            </NavLink>
        </div>
    );
};

export default Cart;
