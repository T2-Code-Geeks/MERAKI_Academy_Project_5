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
  const [updatedProduct, setUpdatedProduct] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [openAddProduct, setOpenAddProduct] = useState(false);
  const [openUpdateProduct, setOpenUpdateProduct] = useState(false);
  const [updateProductId, setUpdateProductId] = useState(null);
  const [openDelete, setOpenDelete] = useState(false);
  const [CategoryToDeleteId, setCategoryToDeleteId] = useState(null);
  const [categoryNames, setCategoryNames] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
useEffect(()=>{
  getAllCategory()
},[])

  const getAllCategory = async () => {
    try {
      const result = await axios.get("http://localhost:5000/products/category");
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
      const result = await axios.put(`http://localhost:5000/products/category/${id}`,updateCategoryState);
      
      dispatch(updateCategoryById(result.data.result));
    } catch (error) {
      console.log(error);
    }
  };
  const openDeleteConfirmation = (catId) => {
    setCategoryToDeleteId(catId);
    setOpenDelete(true);
  };

  const closeDeleteConfirmation = () => {
    setCategoryToDeleteId(null);
    setOpenDelete(false);
  };
  const deleteCategory = async () => {
 if (CategoryToDeleteId) {
    try {
      const result = await axios.delete(`http://localhost:5000/products/category/${CategoryToDeleteId}`);
      dispatch(deleteCategoryById(CategoryToDeleteId));
    } catch (error) {
      console.log(error);
    }finally {
      closeDeleteConfirmation();
    }
 }
  
  };

  const toggleAddProductsMenu = () => {
    setOpenAddProduct((pre) => !pre);
  };

  const toggleUpdateProductsMenu = (productId) => {
    setUpdateProductId(productId);
    setOpenUpdateProduct((pre) => !pre);
  };

  const handlePreviousClick = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextClick = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };
  return (
    <div className="container px-4 mx-auto">
    <div className="sm:flex sm:items-center sm:justify-between">
      <div className="flex">
        <h2 className="text-lg font-medium text-gray-800 dark:text-white">
          All Category  
        </h2>   
        <span className="px-3 py-1 text-ms text-blue-600 bg-blue-100 rounded-full dark:bg-gray-800 dark:text-blue-400">
           { category.length}
        </span>
      </div>
      <div className="flex items-center mt-4 gap-x-3">
        <button
          className="flex items-center justify-center w-1/2 px-5 py-2 text-sm tracking-wide text-white transition-colors duration-200 bg-blue-500 rounded-lg sm:w-auto gap-x-2 hover:bg-blue-600 dark:hover:bg-blue-500 dark:bg-blue-600"
          onClick={toggleAddProductsMenu}
        >
          <span>Add New category</span>
        </button>
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
                      <span>Name</span>
                    </div>
                  </th>
                  <th
                    scope="col"
                    className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                  >
                    <span>description</span>
                  </th>
             
                  <th
                    scope="col"
                    className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                  >
                    <span></span>
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-900">
                {category &&
                  category.map((cate) => (
                    <tr key={cate?.id}>
                      <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                        <div className="inline-flex items-center gap-x-3">
                          <input
                            type="checkbox"
                            className="text-blue-500 border-gray-300 rounded dark:bg-gray-900 dark:ring-offset-gray-900 dark:border-gray-700"
                          />
                          <div className="flex items-center gap-x-2">
                            <img
                              className="object-cover w-10 h-10 rounded-full"
                              src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=880&q=80"
                              alt=""
                            />
                            <div>
                              <h2 className="font-medium text-gray-800 dark:text-white">
                                {cate?.name}
                              </h2>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                        {cate?.description}
                      </td>
                  
                      <td className="px-2 py-4 text-sm font-medium text-blue-600 whitespace-nowrap">
                        <button
                          className="text-gray-500 transition-colors duration-200 dark:hover:text-yellow-500 dark:text-gray-300 hover:text-yellow-500 focus:outline-none"
                          onClick={() => toggleUpdateProductsMenu(cate.id)}
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
                            openDeleteConfirmation(cate.id);
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
    <div className="mt-6 sm:flex sm:items-center sm:justify-between ">
      <div className="text-sm text-gray-500 dark:text-gray-400">
        Page
        <span className="font-medium text-gray-700 dark:text-gray-100">
          {currentPage} of {totalPages}
        </span>
      </div>

      <div className="flex items-center mt-4 gap-x-4 sm:mt-0">
        <a
          onClick={handlePreviousClick}
          className="flex items-center justify-center w-1/2 px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md sm:w-auto gap-x-2 hover:bg-gray-100 dark:bg-gray-900 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-5 h-5 rtl:-scale-x-100"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6.75 15.75L3 12m0 0l3.75-3.75M3 12h18"
            />
          </svg>

          <span>previous</span>
        </a>

        <a
          onClick={handleNextClick}
          className="flex items-center justify-center w-1/2 px-5 py-2 text-sm text-gray-700 capitalize transition-colors duration-200 bg-white border rounded-md sm:w-auto gap-x-2 hover:bg-gray-100 dark:bg-gray-900 dark:text-gray-200 dark:border-gray-700 dark:hover:bg-gray-800"
        >
          <span>Next</span>

          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-5 h-5 rtl:-scale-x-100"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
            />
          </svg>
        </a>
      </div>
    </div>
    {/* {Add Products Slide-Over} */}
    {openAddProduct && (
      <div
        className={`fixed inset-y-0 right-0 w-64 bg-white dark:bg-gray-800 transform ${
          openAddProduct ? "slide-over" : "slide-over-hidden"
        }`}
      >
        <div className="p-4">
          <h2 className="text-lg font-medium text-gray-800 dark:text-white">
            Add New Category
          </h2>
          <form>
            <div className="mb-4">
              <label
                htmlFor="productName"
                className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2"
              >
                Category Name
              </label>
              <input
                type="text"
                id="productName"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-900 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Enter Category name"
                onChange={(e) =>
                  setAddCategoryState({ ...addCategoryState, name: e.target.value })
                }
              />
              <label
                htmlFor="productName"
                className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2"
              >
                Category description
              </label>
              <textarea
                type="text"
                id="productName"
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-900 leading-tight focus:outline-none focus:shadow-outline"
                placeholder="Enter Category description"
                onChange={(e) =>
                  setAddCategoryState({
                    ...addCategoryState,
                    description: e.target.value,
                  })
                }
              />

            </div>
          </form>

          <div className="mt-6">
            <button
              className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 dark:bg-red-600 dark:hover:bg-red-700"
              onClick={toggleAddProductsMenu}
            >
              Cancel
            </button>
            <button
              className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700"
              onClick={addNewCategory}
            >
              Add Category
            </button>
          </div>
        </div>
      </div>
    )}
    {/* {update Products popup} */}
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
                    Product Name
                  </label>
                  <input
                    type="text"
                    id="productName"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-300 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Enter product name"
                    onChange={(e) =>
                      setUpdatedProduct({
                        ...updatedProduct,
                        name: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="productName"
                    className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2"
                  >
                    Product description
                  </label>
                  <input
                    type="text"
                    id="productName"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-300 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Enter product name"
                    onChange={(e) =>
                      setUpdatedProduct({
                        ...updatedProduct,
                        description: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="productName"
                    className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2"
                  >
                    Product img
                  </label>
                  <input
                    type="file"
                    id="productName"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-300 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Enter product name"
                    onChange={(e) =>
                      setUpdatedProduct({
                        ...updatedProduct,
                        img: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="productName"
                    className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2"
                  >
                    Product price
                  </label>
                  <input
                    type="text"
                    id="productName"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-300 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="$"
                    onChange={(e) =>
                      setUpdatedProduct({
                        ...updatedProduct,
                        price: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="category"
                    className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2"
                  >
                    Product Category
                  </label>
                  <select
                    id="category"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-900 leading-tight focus:outline-none focus:shadow-outline"
                    onChange={(e) => {
                      console.log(e.target.value);
                      setUpdatedProduct({
                        ...updatedProduct,
                        category_id: e.target.value,
                      });
                    }}
                    value={selectedCategory}
                  >
                    <option value="">Select a category</option>
                    {categoryNames.map((category) => (
                      <option key={category.id} value={category.id}>
                        {category.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="mb-4">
                  <label
                    htmlFor="productName"
                    className="block text-gray-700 dark:text-gray-300 text-sm font-bold mb-2"
                  >
                    Product Quantity
                  </label>
                  <input
                    type="text"
                    id="productName"
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 dark:text-gray-300 leading-tight focus:outline-none focus:shadow-outline"
                    placeholder="Enter product Quantity"
                    onChange={(e) =>
                      setUpdatedProduct({
                        ...updatedProduct,
                        inventory_ID: e.target.value,
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
                onClick={() => updateCategory(updateProductId)}
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
    {/* Delete Confirmation popup */}
    {openDelete && (
      <div className="fixed inset-0 flex items-center justify-center z-50">
        <div className="modal-overlay fixed inset-0 bg-gray-600 opacity-50"></div>

        <div className="modal-container bg-white dark:bg-gray-800 w-96 mx-auto rounded shadow-lg z-50">
          <div className="modal-content p-4">
            <p className="text-gray-800 dark:text-white text-lg">
              Are you sure you want to delete this product?
            </p>
            <div className="flex justify-end mt-4">
              <button
                onClick={closeDeleteConfirmation}
                className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500 mr-2"
              >
                Cancel
              </button>
              <button
                onClick={deleteCategory}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      </div>
    )}
  </div>

  );
};

export default ProductsCategories;
