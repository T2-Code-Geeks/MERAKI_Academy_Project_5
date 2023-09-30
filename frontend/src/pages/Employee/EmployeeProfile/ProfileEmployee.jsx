import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import "./ProfileEmployee";
import axios from "axios";
import { useEffect, useState } from "react";

//! ===============================================

const ProfileEmployee = () => {
    const { id } = useParams();
    
    const navigate = useNavigate();
    const [employee, setEmployee] = useState([]);
    //! ===============================================

    const profile = async () => {
        try {
            const result = await axios.get(
                `http://localhost:5000/employees/${id}`
            );
            if (result.data) {
                setEmployee(result.data.result[0]);
            } else throw Error;
        } catch (error) {
            if (error.response && error.response.data) {
                console.log(error);
            }
            console.log(error);

        }
    };

    useEffect(() => {
        profile(); // eslint-disable-next-line
    }, []);
    //! ===============================================
    return (
        <>
            <div>
                <p>Employee Profile</p>
                <p>Employee Name : {employee.firstname}</p>
                <button
                    onClick={(e) => {
                        navigate("/");
                    }}
                ></button>
            </div>
        </>
    );
};

export default ProfileEmployee;
