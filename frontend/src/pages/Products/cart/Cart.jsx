import axios from "axios";
import React, { Fragment, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { setCart, updateItemById } from "../../../service/redux/reducers/cart";
import { useDispatch } from "react-redux";
import { deleteItemById } from "../../../service/redux/reducers/cart";
import { Dialog, Transition } from "@headlessui/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
const Cart = ({ open, setOpen }) => {
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
        <Transition.Root show={open} as={Fragment}>
            <Dialog as="div" className="relative z-10" onClose={setOpen}>
                <Transition.Child
                    as={Fragment}
                    enter="ease-in-out duration-500"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in-out duration-500"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                </Transition.Child>

                <div className="fixed inset-0 overflow-hidden">
                    <div className="absolute inset-0 overflow-hidden">
                        <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
                            <Transition.Child
                                as={Fragment}
                                enter="transform transition ease-in-out duration-500 sm:duration-700"
                                enterFrom="translate-x-full"
                                enterTo="translate-x-0"
                                leave="transform transition ease-in-out duration-500 sm:duration-700"
                                leaveFrom="translate-x-0"
                                leaveTo="translate-x-full"
                            >
                                <Dialog.Panel className="pointer-events-auto w-screen max-w-md">
                                    <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                                        <div className="flex-1 overflow-y-auto px-4 py-6 sm:px-6">
                                            <div className="flex items-start justify-between">
                                                <Dialog.Title className="text-lg font-medium text-gray-900">
                                                    Shopping cart
                                                </Dialog.Title>
                                                <div className="ml-3 flex h-7 items-center">
                                                    <button
                                                        type="button"
                                                        className="relative -m-2 p-2 text-gray-400 hover:text-gray-500"
                                                        onClick={() =>
                                                            setOpen(false)
                                                        }
                                                    >
                                                        <span className="absolute -inset-0.5" />
                                                        <span className="sr-only">
                                                            Close panel
                                                        </span>
                                                        <XMarkIcon
                                                            className="h-6 w-6"
                                                            aria-hidden="true"
                                                        />
                                                    </button>
                                                </div>
                                            </div>

                                            <div className="mt-8">
                                                <div className="flow-root">
                                                    <ul className="-my-6 divide-y divide-gray-200">
                                                        {cart.map((product) => (
                                                            <li
                                                                key={product.id}
                                                                className="flex py-6"
                                                            >
                                                                <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                                                    <img
                                                                        src={
                                                                            product.img
                                                                        }
                                                                        alt={
                                                                            product.imageAlt
                                                                        }
                                                                        className="h-full w-full object-cover object-center"
                                                                    />
                                                                </div>

                                                                <div className="ml-4 flex flex-1 flex-col">
                                                                    <div>
                                                                        <div className="flex justify-between text-base font-medium text-gray-900">
                                                                            <h3>
                                                                                <a
                                                                                    href={
                                                                                        product.href
                                                                                    }
                                                                                >
                                                                                    {
                                                                                        product.name
                                                                                    }
                                                                                </a>
                                                                            </h3>
                                                                            <p className="ml-4">
                                                                                $
                                                                                {product.price *
                                                                                    product.quantity}
                                                                            </p>
                                                                        </div>
                                                                    </div>
                                                                    <div className="flex flex-1 items-end justify-between text-sm">
                                                                        <p className="text-gray-500">
                                                                            Qty{" "}
                                                                            <span
                                                                                className="cursor-pointer text-lg"
                                                                                onClick={() => {
                                                                                    updateQuantity(
                                                                                        product.product_id,
                                                                                        product.quantity -
                                                                                            1
                                                                                    );
                                                                                }}
                                                                            >
                                                                                -{" "}
                                                                            </span>
                                                                            {
                                                                                product.quantity
                                                                            }
                                                                            <span
                                                                                className="cursor-pointer text-lg"
                                                                                onClick={() => {
                                                                                    updateQuantity(
                                                                                        product.product_id,
                                                                                        product.quantity +
                                                                                            1
                                                                                    );
                                                                                }}
                                                                            >
                                                                                {" "}
                                                                                +
                                                                            </span>
                                                                        </p>

                                                                        <div className="flex">
                                                                            <button
                                                                                type="button"
                                                                                className="font-medium text-indigo-600 hover:text-indigo-500"
                                                                                onClick={() => {
                                                                                    handleDelete(
                                                                                        product.id
                                                                                    );
                                                                                }}
                                                                            >
                                                                                Remove
                                                                            </button>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </li>
                                                        ))}
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                                            <div className="flex justify-between text-base font-medium text-gray-900">
                                                <p>Subtotal</p>
                                                <p>${sum}</p>
                                            </div>
                                            <p className="mt-0.5 text-sm text-gray-500">
                                                Shipping and taxes calculated at
                                                checkout.
                                            </p>
                                            <div className="mt-6">
                                                <button
                                                    disabled={buttonBoolean}
                                                    className=" cursor-pointer flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                                                >
                                                    Checkout
                                                </button>
                                            </div>
                                            <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                                                <p>
                                                    or
                                                    <button
                                                        type="button"
                                                        className="font-medium text-indigo-600 hover:text-indigo-500"
                                                        onClick={() =>
                                                            setOpen(false)
                                                        }
                                                    >
                                                        Continue Shopping
                                                        <span aria-hidden="true">
                                                            {" "}
                                                            &rarr;
                                                        </span>
                                                    </button>
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </div>
            </Dialog>
        </Transition.Root>
    );
};

export default Cart;
