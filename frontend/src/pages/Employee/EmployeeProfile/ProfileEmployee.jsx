import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ProfileEmployee";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
    updateProfileById,
    setEmployee,
} from "../../../service/redux/reducers/authSlice";

//!============================================================================================

const ProfileEmployee = () => {
    const { employee, userId } = useSelector((state) => state.auth);
    const [firstname, setFirstName] = useState("");
    const [lastname, setLastName] = useState("");
    const [description, setDescription] = useState("");
    const [work_hours, setWork_hours] = useState("");
    const [country, setCountry] = useState("");
    const [img, setImg] = useState("");
    const [age, setAge] = useState("");
    const [category_id, setCategory_id] = useState("");
    const [updateBox, setUpdateBox] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    //!============================================================================================

    useEffect(() => {
        profile();
    }, []);

    const profile = async () => {
        try {
            const result = await axios.get(
                `http://localhost:5000/employees/${userId}`
            );
            if (result.data) {
                dispatch(setEmployee(result.data.result));
            } else throw Error;
        } catch (error) {
            if (error.response && error.response.data) {
                console.log(error);
            }
            console.log(error);
        }
    };
    //!============================================================================================
    // const handleUpdateClick = (article) => {
    //   setUpdateBox(!updateBox);
    //   if (updateBox) updateProfile(article.id);
    // };
    //!============================================================================================
    const updateProfile = async (id) => {
        try {
            await axios.put(`http://localhost:5000/employees/${id}`, {
                firstname,
                lastname,
                description,
                work_hours,
                country,
                category_id,
                img,
                age,
            });
        } catch (error) {
            console.log(error);
        }
    };

    //!============================================================================================

    return (
        <>
            {employee && (
                <div>
                    <p>Employee Profile</p>
                    <p>Employee Name : {employee.firstname}</p>
                    <p>Last Name : {employee.lastname}</p>
                    <p>country: {employee.country}</p>
                    First Name:
                    <input
                        type="text"
                        placeholder={employee.firstname}
                        onChange={(e) => {
                            setFirstName(e.target.value);
                        }}
                    />
                    Last Name :
                    <input
                        type="text"
                        placeholder={employee.lastname}
                        onChange={(e) => {
                            setLastName(e.target.value);
                        }}
                    />
                    Country :
                    <input
                        type="text"
                        placeholder={employee.country}
                        onChange={(e) => {
                            setCountry(e.target.value);
                        }}
                    />
                    <button
                        onClick={() => {
                            dispatch(
                                updateProfileById({
                                    id: employee.id,
                                    firstname: firstname || employee.firstname,
                                    lastname: lastname || employee.lastname,
                                    // description,
                                    // work_hours,
                                    country: country || employee.country,
                                    // category_id,
                                    // img,
                                    // age,
                                })
                            );
                        }}
                    >
                        {" "}
                        Update Profile
                    </button>
                    <button
                        onClick={(e) => {
                            navigate("/");
                        }}
                    >
                        {" "}
                        Back to main{" "}
                    </button>
                </div>
            )}
        </>
    );
};

export default ProfileEmployee;
