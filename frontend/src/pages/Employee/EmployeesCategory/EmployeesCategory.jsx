import axios from "axios";
import React, { useEffect} from "react";
import { useDispatch, useSelector } from "react-redux";
import "./EmployeesCategory";
import { setcategory } from "../../../service/redux/reducers/employeeSlice";
import { useNavigate } from "react-router-dom";
const CategoryEmployees = () => {
   
    useEffect(() => {
        Category();
    }, []);

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { category } = useSelector((state) => {
        return {
            category: state.employee.category
        }
    });
    const Category = async () => {
        try {
            const result = await axios.get(
                `http://localhost:5000/employees/categoryes/all`
            );
            if (result.data) {
                dispatch(setcategory(result.data.result));
            } else throw Error;
        } catch (error) {
            if (error.response && error.response.data) {
                console.log(error);
            }
            console.log(error);
        }
    };

    return (
        <>
            { category &&
                category.map((category, i) => {
                    return (
                        <div>
                            <button
                                key={ category.id }
                                onClick={ () => {
                                    navigate(
                                        `/employeeSByCategory/${category.id}`
                                    )
                                } }
                            >
                                { category.category }
                            </button>
                        </div>
                    );
                }) }
            
        </>
    );
};

export default CategoryEmployees;
