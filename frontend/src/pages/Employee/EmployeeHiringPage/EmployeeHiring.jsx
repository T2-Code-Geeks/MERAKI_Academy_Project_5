import axios from "axios";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setHiring } from "../../../service/redux/reducers/employeeSlice";

//!======================================= Hiring of Employee ... =================================================

const EmployeeHiring = () => {

    //!=======================================================

    useEffect(() => {
        HiringAprroved();
    }, []);

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
                `https://geeks-app.onrender.com/employees/hiring`
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

    //!=======================================================
    return (
        <>
            {Hiring &&
                Hiring.map((Hiring, i) => {
                    return

                })}

        </>
    );
};

//!======================================= export function ... =================================================

export default EmployeeHiring;