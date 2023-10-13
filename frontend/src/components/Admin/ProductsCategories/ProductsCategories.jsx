import React, { Suspense, useEffect, useState } from "react";
import { Await, useLoaderData } from "react-router";
import { Link } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
    addCategory,
    deleteCategoryById,
    setCategory,
    updateCategoryById,
} from "../../../service/redux/reducers/productSlice";

const ProductsCategories = () => {
    const { category } = useSelector((state) => state.products);
    const dispatch = useDispatch();
    const [addCategoryState, setAddCategoryState] = useState({});
    const [updateCategoryState, setUpdateCategoryState] = useState({});

    useEffect(() => {
        getAllCategory();
    }, []);

    const getAllCategory = async () => {
        try {
            const result = await axios.get(
                "http://localhost:5000/products/category"
            );
            if (result.data.success) {
                dispatch(setCategory(result.data.result));
            }
        } catch (error) {
            console.log(error);
        }
    };

    const addNewCategory = async (e) => {
        e.preventDefault();
        try {
            const result = await axios.post(
                "http://localhost:5000/products/category",
                addCategoryState
            );
            if (result.data.success) {
                dispatch(addCategory(result.data.result));
            }
        } catch (error) {
            if (!error.response.data.success) {
                console.log(error.response.data);
            }
        }
    };
    const updateCategory = async (id) => {
        try {
            const result = await axios.put(
                `http://localhost:5000/products/category/${id}`,
                updateCategoryState
            );

            dispatch(updateCategoryById(result.data.result));
        } catch (error) {
            console.log(error);
        }
    };
    const deleteCategory = async (id) => {
        try {
            const result = await axios.delete(
                `http://localhost:5000/products/category/${id}`
            );
            dispatch(deleteCategoryById(id));
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <div>
            <form onSubmit={addNewCategory}>
                <br />
                <input
                    type="text"
                    placeholder="Product name "
                    onChange={(e) =>
                        setAddCategoryState({
                            ...addCategoryState,
                            name: e.target.value,
                        })
                    }
                />
                <br />
                <input
                    type="text"
                    placeholder="Product name "
                    onChange={(e) =>
                        setAddCategoryState({
                            ...addCategoryState,
                            description: e.target.value,
                        })
                    }
                />
                <br />
                <button>Add category</button>
            </form>

            {category?.map((category) => (
                <div className="productContainer" key={category.id}>
                    <h2>{category.name}</h2>
                    <input
                        onChange={(e) => {
                            setUpdateCategoryState({
                                ...updateCategoryState,
                                name: e.target.value,
                            });
                        }}
                    />
                    <button onClick={() => updateCategory(category.id)}>
                        update
                    </button>
                    <p>{category.description}</p>
                    <button
                        onClick={() => {
                            deleteCategory(category.id);
                        }}
                    >
                        delete category
                    </button>
                    <Link to={`/products/${category.id}`}>View Details</Link>
                </div>
            ))}
        </div>
    );
};

export default ProductsCategories;
