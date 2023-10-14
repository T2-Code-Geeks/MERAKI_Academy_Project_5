import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./EmployeesCategory";
import { setcategory } from "../../../service/redux/reducers/employeeSlice";
import { useNavigate } from "react-router-dom";

//!======================================= Category Employees ... ===============================================
const CategoryEmployees = () => {

    //!==============================================   
    useEffect(() => {
        // Category();
    }, []);

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { category } = useSelector((state) => {
        return {
            category: state.employee.category,
        };
    });

    //!==============================================   


    

    //!==============================================  

    return (
        <>
            {category &&
                category.map((category, i) => {
                    return (
                        <div>
                            <button
                                key={category.id}
                                onClick={() => {
                                    navigate(
                                        `/employeeSByCategory/${category.id}`)

                                }}
                            >
                                {category.category}
                            </button>
                        </div>
                    )
                })}
        </>
    );
};

//!============================================= export function ===================================================

export default CategoryEmployees;
