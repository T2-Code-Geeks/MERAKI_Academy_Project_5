import axios from "axios";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { setCart, updateItemById } from "../../../service/redux/reducers/cart";
import { useDispatch } from "react-redux";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import { deleteItemById } from "../../../service/redux/reducers/cart";

const Cart = () => {
    const dispatch = useDispatch();
    const { tokenUser } = useSelector((state) => state.auth);
    const { cart } = useSelector((state) => state.cart);

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
            dispatch(setCart(result.data.result));
        } catch (error) {
            console.log(error.message);
        }
    };

    const updateQuantity = async (product_id, quantity, itemId) => {
        try {
            if (quantity < 1) {
            } else {
                const result = await axios.post(
                    "http://localhost:5000/users/basket",
                    { product_id, quantity },
                    { headers: { Authorization: `Bearer ${tokenUser}` } }
                );
                dispatch(updateItemById(result.data.result[0]));
            }
        } catch (error) {
            console.log(error.message);
        }
    };

    const handleDelete = async (itemId) => {
        try {
            await axios.delete(`http://localhost:5000/users/basket/${itemId}`, {
                headers: { Authorization: `Bearer ${tokenUser}` },
            });
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
                                        item.quantity - 1,
                                        item.id
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
                                        item.quantity + 1,
                                        item.id
                                    );
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
