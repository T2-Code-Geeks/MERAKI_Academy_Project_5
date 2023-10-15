import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setHiring } from "../../../../service/redux/reducers/employeeSlice"

//!======================================= Hiring of Employee ... =================================================
const Dashboard = () => {

    //!=======================================================

    const dispatch = useDispatch();
    const { Hiring } = useSelector((state) => {
        return {
            Hiring: state.employee.Hiring,
        }
    })

    //!=======================================================
    
    const HiringAprroved = async () => {
        try {
            const result = await axios.get(
                `http://localhost:5000/employees/hiring`
            );

            if (result.data) {
                dispatch(setHiring(result.data.result));
            } else throw Error;
        } catch (error) {
            if (error.response && error.response.data) {
                console.log(error);
            }
            console.log(error);
        }
    };


  return (
    <div className="container px-4 py-4 mx-auto">
        <div className="sm:flex sm:items-center sm:justify-between">
          <div className="flex">
            <h2 className="text-lg font-medium text-gray-800 dark:text-white">
              All mY order
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
                            {state.user_id?state.user_id:"No Description Yet"}
                          </td>
                          <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                            {state?.employee_id}
                          </td>
                          <td className="px-4 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                            {state?.note}
                          </td>
                          <td className="px-4 py-4 text-sm font-medium text-yellow-600 whitespace-nowrap">
                            {state?.Date} 
                          </td>
                          <td className="px-4 py-4 text-sm font-medium text-yellow-600 whitespace-nowrap">
                            {state?.Status} 
                          </td>
                          <td className="px-2 py-4 text-sm font-medium text-blue-600 whitespace-nowrap">
                          
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
      </div>
  )
}

export default Dashboard;