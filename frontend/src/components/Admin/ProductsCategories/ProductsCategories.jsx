import React, { Suspense, useEffect, useState } from "react";
import { Await, useLoaderData } from "react-router";
import { Link } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  addCategory,
  deleteProductById,
  setCategory,
  updateProductById,
} from "../../../service/redux/reducers/productSlice";

const ProductsCategories = () => {
  const { category } = useSelector((state) => state.products
  );
  const dispatch = useDispatch();
  const [addCategoryState, setAddCategoryState] = useState({});
useEffect(()=>{
  getAllCategory()
},[])

  const getAllCategory = async () => {
    try {
      const result = await axios.get("http://localhost:5000/products/category");
      console.log(result.data.result);
      if (result.data.success) {
        console.log("asdasd");
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
console.log(result.data);
      if (result.data.success) {
        dispatch(addCategory(result.data.result));
      }
    } catch (error) {
      if (!error.response.data.success) {
        console.log(error.response.data);
      }
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
            setAddCategoryState({ ...addCategoryState, name: e.target.value })
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
                  <p>{category.description}</p>
                  <button
                    onClick={() => {
                      // deleteProduct(product.id)
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
