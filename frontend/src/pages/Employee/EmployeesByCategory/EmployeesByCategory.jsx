import axios from "axios";
import React, { useEffect, useState } from "react";
import "./EmployeesByCategory.css";
import { setEmployeeByCategory } from "../../../service/redux/reducers/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
//!============================================================================================

export const EmployeesByCategory = () => {
    const [massege, setMassege] = useState("");
    const dispatch = useDispatch();
    const { id } = useParams();
    const { employeeByCate } = useSelector((state) => state.auth);
    //!============================================================================================

    useEffect(() => {
        getEmployeeByCategory();
        console.log("dsafasdf");
    }, []);

    //!============================================================================================

    const getEmployeeByCategory = async () => {
        try {
            const result = await axios.get(
                `http://localhost:5000/employees/ByCategory/${id}`
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

    //!============================================================================================

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

export default EmployeesByCategory;
