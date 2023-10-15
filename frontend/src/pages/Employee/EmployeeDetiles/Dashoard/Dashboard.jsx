import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setHiring } from "../../../../service/redux/reducers/employeeSlice";

//!======================================= Hiring of Employee ... =================================================
const Dashboard = () => {
    //!=======================================================
    const [updateProductId, setUpdateProductId] = useState(null);
    const [openUpdateProduct, setOpenUpdateProduct] = useState(false);
    const [updateHiring, setUpdateHiring] = useState({});
    const dispatch = useDispatch();
    const { Hiring } = useSelector((state) => {
        return {
            Hiring: state.employee.Hiring,
        };
    });

    const { token } = useSelector((state) => state.employee);

    useEffect(() => {
        getAllMyOrders();
    }, []);

    //!=======================================================

    const getAllMyOrders = async () => {
        try {
            const result = await axios.get(
                "http://localhost:5000/employees/hiring/all",
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
            if (result.data.success) {
                dispatch(setHiring(result.data.result));
            }
        } catch (error) {
            console.log(error.message);
        }
    };

    const HiringAprroved = async (productId) => {
        try {
            const result = await axios.put(
                `http://localhost:5000/employees/updateHiring/${productId}`,
                updateHiring,
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
            );
            if (result.data) {
                getAllMyOrders();
                toggleUpdateProductsMenu(null);
            } else throw Error;
        } catch (error) {
            if (error.response && error.response.data) {
                console.log(error);
            }
            console.log(error);
        }
    };

    const toggleUpdateProductsMenu = (productId) => {
        setUpdateProductId(productId);
        setOpenUpdateProduct((pre) => !pre);
    };

    return (
        <div className="container px-4 py-4 mx-auto">
            <div className="sm:flex sm:items-center sm:justify-between">
                <div className="flex">
                    <h2 className="text-lg font-medium text-gray-800 dark:text-white">
                        All my order
                    </h2>
                </div>
            </div>
            <div className="flex flex-col mt-6">
                <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
                    <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
                        <div className="overflow-hidden border border-gray-200 dark:border-gray-700 md:rounded-lg">
                            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                                <thead className="bg-gray-50 dark:bg-gray-800">
                                    <tr>
                                        <th
                                            scope="col"
                                            className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                                        >
                                            <div className="flex items-center gap-x-3">
                                                <input
                                                    type="checkbox"
                                                    className="text-blue-500 border-gray-300 rounded dark:bg-gray-900 dark:ring-offset-gray-900 dark:border-gray-700"
                                                />
                                                <span>user_id</span>
                                            </div>
                                        </th>
                                        <th
                                            scope="col"
                                            className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                                        >
                                            <span>employee_id</span>
                                        </th>
                                        <th
                                            scope="col"
                                            className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                                        >
                                            <span>note</span>
                                        </th>
                                        <th
                                            scope="col"
                                            className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                                        >
                                            <span>Date</span>
                                        </th>
                                        <th
                                            scope="col"
                                            className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                                        >
                                            <span>Status</span>
                                        </th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                                    {Hiring &&
                                        Hiring.map((state) => (
                                            <tr key={state?.id}>
                                                <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                                                    {state.user_id
                                                        ? state.user_id
                                                        : "No Description Yet"}
                                                </td>
                                                <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                                                    {state?.employee_id}
                                                </td>
                                                <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                                                    {state?.note}
                                                </td>
                                                <td className="px-4 py-4 text-sm font-medium text-yellow-600 whitespace-nowrap">
                                                    {state?.date.split("T")[0]}
                                                </td>
                                                <td className="px-4 py-4 text-sm font-medium text-yellow-600 whitespace-nowrap">
                                                    {state?.status}
                                                </td>
                                                <td className="px-2 py-4 text-sm font-medium text-blue-600 whitespace-nowrap">
                                                    <button
                                                        className="text-gray-500 transition-colors duration-200 dark:hover:text-yellow-500 dark:text-gray-300 hover:text-yellow-500 focus:outline-none"
                                                        onClick={() =>
                                                            toggleUpdateProductsMenu(
                                                                state.id
                                                            )
                                                        }
                                                    >
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            fill="none"
                                                            viewBox="0 0 24 24"
                                                            strokeWidth="1.5"
                                                            stroke="currentColor"
                                                            className="w-5 h-5"
                                                        >
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10"
                                                            />
                                                        </svg>
                                                    </button>
                                                    <button
                                                        className="text-gray-500 transition-colors duration-200 dark:hover:text-red-500 dark:text-gray-300 hover:text-red-500 focus:outline-none gap-x-3"
                                                        onClick={() => {
                                                            // openDeleteConfirmation(emp.id);
                                                        }}
                                                    >
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            fill="none"
                                                            viewBox="0 0 24 24"
                                                            strokeWidth="1.5"
                                                            stroke="currentColor"
                                                            className="w-5 h-5"
                                                        >
                                                            <path
                                                                strokeLinecap="round"
                                                                strokeLinejoin="round"
                                                                d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
                                                            />
                                                        </svg>
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
            {openUpdateProduct && updateProductId && (
                <div className="fixed inset-0 z-50 overflow-y-auto">
                    <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                        <div
                            className="fixed inset-0 transition-opacity"
                            aria-hidden="true"
                        >
                            <div className="absolute inset-0 bg-gray-500 dark:bg-black opacity-75"></div>
                        </div>

                        <span
                            className="hidden sm:inline-block sm:align-middle sm:h-screen"
                            aria-hidden="true"
                        >
                            &#8203;
                        </span>

                        <div
                            className="inline-block align-bottom bg-white dark:bg-gray-800 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
                            role="dialog"
                            aria-modal="true"
                            aria-labelledby="modal-headline"
                        >
                            {/* Add your form for adding new products here */}
                            <div className="bg-white dark:bg-gray-800 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                {/* Add your form inputs here */}
                                <form>
                                    {/* Example input field */}
                                    <div className="mb-4">
                                        <label
                                            htmlFor="productName"
                                            className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2"
                                        >
                                            Date
                                        </label>
                                        <input
                                            type="date"
                                            id="productName"
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-300 leading-tight focus:outline-none focus:shadow-outline"
                                            placeholder="Enter product name"
                                            onChange={(e) =>
                                                setUpdateHiring({
                                                    ...updateHiring,
                                                    Date: e.target.value,
                                                })
                                            }
                                        />
                                    </div>
                                    <div className="mb-4">
                                        <label
                                            htmlFor="productName"
                                            className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2"
                                        >
                                            Status
                                        </label>
                                        <input
                                            type="text"
                                            id="productName"
                                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-300 leading-tight focus:outline-none focus:shadow-outline"
                                            placeholder="Enter product name"
                                            onChange={(e) =>
                                                setUpdateHiring({
                                                    ...updateHiring,
                                                    Status: e.target.value,
                                                })
                                            }
                                        />
                                    </div>
                                </form>
                            </div>

                            {/* Modal footer */}
                            <div className="bg-gray-50 dark:bg-gray-700 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                                <button
                                    type="button"
                                    onClick={() => {
                                        HiringAprroved(updateProductId);
                                    }}
                                    className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-500 dark:bg-blue-600 text-base font-medium text-white hover:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                                >
                                    Update
                                </button>
                                <button
                                    type="button"
                                    onClick={toggleUpdateProductsMenu}
                                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 dark:border-gray-500 shadow-sm px-4 py-2 bg-white dark:bg-gray-800 text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                                >
                                    Cancel
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Dashboard;
