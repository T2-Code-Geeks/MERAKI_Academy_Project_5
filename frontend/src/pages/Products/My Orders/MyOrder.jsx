import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";

const MyOrder = () => {
    const { tokenUser } = useSelector((state) => state.auth);
    const [result, setResult] = useState("");
    useEffect(() => {
        getUserOrders();
    }, []);
    const getUserOrders = async () => {
        try {
            const result = await axios.get(
                "http://localhost:5000/users/orders/all",
                {
                    headers: { Authorization: `Bearer ${tokenUser}` },
                }
            );
            if (result.data.success) {
                setResult(result.data.result);
            }
        } catch (error) {
            console.log(error.message);
        }
    };
    return (
        <div className="container p-2 mx-auto sm:p-4 dark:text-gray-100 ">
            <h2 className="mb-4 text-2xl font-semibold leadi">Invoices</h2>
            <div className="overflow-x-auto">
                <table className="min-w-full text-xs">
                    <colgroup>
                        <col />
                        <col />
                        <col />
                        <col />
                        <col />
                        <col className="w-24" />
                    </colgroup>
                    <thead className="dark:bg-gray-700">
                        <tr className="text-left">
                            <th className="p-3">Order Id</th>
                            <th className="p-3">Items</th>
                            <th className="p-3">Shipping Date</th>
                            <th className="p-3 text-right">Total Amount</th>
                            <th className="p-3 text-right">Status</th>
                        </tr>
                    </thead>
                    
                        {
                            result && result.map((order) => {
                                return (
                                    <tbody key={order.id}>
                                        <tr className="border-b border-opacity-20 dark:border-gray-700 dark:bg-gray-900">
                                            <td className="p-3">
                                                <p>{ order.id }</p>
                                            </td>
                                            <td className="p-3">
                                                <NavLink>Order Items</NavLink>
                                            </td>
                                            <td className="p-3">
                                                <p>{ order.shipping_date?order.shipping_date.split("T")[0]:"Not Determined" }</p>
                                            </td>
                                            <td className="p-3 text-right">
                                                <p>${order.total }</p>
                                            </td>
                                            <td className="p-3 text-right">
                                                <span className="px-3 py-1 font-semibold rounded-md dark:bg-violet-400 dark:text-gray-900">
                                                    <span>Pending</span>
                                                </span>
                                            </td>
                                        </tr>
                                    </tbody>
                                );
                            })
                        }
                        
                    
                </table>
            </div>
        </div>
    );
};

export default MyOrder;
