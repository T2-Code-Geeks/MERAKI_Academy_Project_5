import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "../../../service/redux/reducers/cart";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const Checkout = () => {
    const { tokenUser } = useSelector((state) => state.auth);
    const [message, setMessage] = useState("");
    const { cart } = useSelector((state) => state.cart);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleOrder = async () => {
        let total = 0;
        cart.forEach((item) => {
            total += item.quantity * item.price;
        });
        try {
            const result = await axios.post(
                `http://localhost:5000/products/new/OrderDetail`,
                { order_items: cart, paymentMethod: "cod", total },
                { headers: { Authorization: `Bearer ${tokenUser}` } }
            );
            if (result.data.success) {
                dispatch(clearCart());
                setMessage("Order Confirmed");
                setTimeout(() => {
                    setMessage("");
                    navigate("/");
                }, 1500);
            }
        } catch (error) {
            console.log(error.message);
        }
    };
    return (
        <div>
            <select>
                <option value={"cod"}>Cash On Delivery</option>
                <option value={"cc"}>credit Card</option>
            </select>
            <button onClick={ handleOrder }>Confirm</button>
            <h5>{ message }</h5>
        </div>
    );
};

export default Checkout;
