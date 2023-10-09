import axios from "axios";
import React from "react";

const Checkout = () => {
    const handleOrder = async() => {
        try {
            const result = await axios.post();
        } catch (error) {
            console.log(error.message);
        }
    }
    return (
        <div>
            <select name="payment method">
                <option>Credit Card</option>
                <option>Cash On Delivery</option>
            </select>
            <button onClick={handleOrder}>Confirm</button>
        </div>
    );
};

export default Checkout;