import axios from "axios";
import React, { useEffect, useState } from "react";
import "./EmployeesByCategory.css";
import { setEmployeeByCategory } from "../../../service/redux/reducers/employeeSlice";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
//!==================================== Employees By Category... ========================================================

export const EmployeesByCategory = () => {

    const [massege, setMassege] = useState("");
    const dispatch = useDispatch();
    const { id } = useParams();
    const { employeeByCate } = useSelector((state) => {
        return {
            employeeByCate: state.employee.employeeByCate,
        };
    });

    //!=======================================================

    useEffect(() => {
        getEmployeeByCategory();
    }, []);

    //!=====================================================

    const getEmployeeByCategory = async () => {
        try {
            const result = await axios.get(
                `https://geeks-app.onrender.com/employees/ByCategory/${id}`
            );
            if (result.data.success) {
                dispatch(setEmployeeByCategory(result.data.result));
            } else {
                setMassege(result.data.message);
            }
        } catch (error) {
            if (error.response && error.response.data) {
                console.log(error);
            }
            console.log(error);
        }
    };

    //!=====================================================
    return (
        <>
            {employeeByCate &&
                employeeByCate.map((employee, i) => {
                    return (
                        <div>
                            <p>{employee.firstname}</p>
                            <p>{employee.lastname}</p>
                        </div>
                    );
                })}
            <p>{massege}</p>
        </>
    );
};

//!=========================================== export function ... =================================================

export default EmployeesByCategory;
