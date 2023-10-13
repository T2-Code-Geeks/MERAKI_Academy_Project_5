import axios from "axios";
import React, { Suspense, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setEmployee ,deleteEmployee} from "../../../service/redux/reducers/employeeSlice";

const EmployeesPage = () => {

    const { employee } = useSelector((state) => state.employee);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [openDelete, setOpenDelete] = useState(false);
    const [productToDeleteId, setProductToDeleteId] = useState(null);
    useEffect(() => {
        getAllEmployee(currentPage);
  
    }, [currentPage]);
    const dispatch = useDispatch();
    const getAllEmployee= async (page) => {
      try {
        const result = await axios.get(
          `http://localhost:5000/employees`
        );
        if (result.data.success) {
          dispatch(setEmployee(result.data.result));
        }
      } catch (error) {
        console.log(error);
      }
    };



  
    const openDeleteConfirmation = (productId) => {
      setProductToDeleteId(productId);
      setOpenDelete(true);
    };
  
    const closeDeleteConfirmation = () => {
      setProductToDeleteId(null);
      setOpenDelete(false);
    };
    const deleteEmployees= async () => {
      if (productToDeleteId) {
        try {
          const result = await axios.delete(
            `http://localhost:5000/employees/${productToDeleteId}`
          );
          dispatch(deleteEmployee(productToDeleteId));
        } catch (error) {
          console.log(error);
        } finally {
          closeDeleteConfirmation();
        }
      }
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
        <div className="container px-4 py-4 mx-auto">
        <div className="sm:flex sm:items-center sm:justify-between">
          <div className="flex">
            <h2 className="text-lg font-medium text-gray-800 dark:text-white">
              All Employees
            </h2>
            <span className="px-3 py-1 text-ms text-blue-600 bg-blue-100 rounded-full dark:bg-gray-800 dark:text-blue-400">
              {employee.length}
            </span>
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
                        <span>Country</span>
                      </th>
                      <th
                        scope="col"
                        className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                      >
                        <span>Email</span>
                      </th>
                      <th
                        scope="col"
                        className="py-3.5 px-4 text-sm font-normal text-left rtl:text-right text-gray-500 dark:text-gray-400"
                      >
                        <span>Age</span>
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
                    {employee &&
                      employee.map((emp) => (
                        <tr key={emp?.id}>
                          <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                            <div className="inline-flex items-center gap-x-3">
                              <input
                                type="checkbox"
                                className="text-blue-500 border-gray-300 rounded dark:bg-gray-900 dark:ring-offset-gray-900 dark:border-gray-700"
                              />
                              <div className="flex items-center gap-x-2">
                            { emp.img?   <img
                                  className="object-cover w-10 h-10 rounded-full"
                                  src={emp.img}
                                  alt=""
                                />:<img  className="object-cover w-10 h-10 rounded-full"
                                src="https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"/>}
                                <div>
                                  <h2 className="font-medium text-gray-800 dark:text-white">
                                    {emp?.firstname} {emp?.lastname}
                                  </h2>
                                </div>
                              </div>
                            </div>
                          </td>
                          <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                            {emp.description?emp.description:"No Description Yet"}
                          </td>
                          <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                            {emp?.country}
                          </td>
                          <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                            {emp?.email}
                          </td>
                          <td className="px-4 py-4 text-sm font-medium text-yellow-600 whitespace-nowrap">
                            {emp?.age} years
                          </td>
                          <td className="px-2 py-4 text-sm font-medium text-blue-600 whitespace-nowrap">
                          
                            <button
                              className="text-gray-500 transition-colors duration-200 dark:hover:text-red-500 dark:text-gray-300 hover:text-red-500 focus:outline-none gap-x-3"
                              onClick={() => {
                                openDeleteConfirmation(emp.id);
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
     
   
        {/* Delete Confirmation popup */}
        {openDelete && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="modal-overlay fixed inset-0 bg-gray-600 opacity-50"></div>
  
            <div className="modal-container bg-white dark:bg-gray-800 w-96 mx-auto rounded shadow-lg z-50">
              <div className="modal-content p-4">
                <p className="text-gray-800 dark:text-white text-lg">
                  Are you sure you want to delete this Employee?
                </p>
                <div className="flex justify-end mt-4">
                  <button
                    onClick={closeDeleteConfirmation}
                    className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500 mr-2"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={deleteEmployees}
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

export default EmployeesPage;
