import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

import "./UserProfile.css";
import { Avatar } from "@mui/material";
import { useSelector } from "react-redux";

const UserProfile = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { token } = useSelector((state) => state.auth);
    const { userId } = useSelector((state) => state.auth);
    const [updating, setUpdating] = useState(false);
    const [userInfo, setUserInfo] = useState("");

    const profileInfo = async () => {
        const result = await axios.get(`http://localhost:5000/users/${id}`);
        setUserInfo(result.data.result);
    };

    useEffect(() => {
        if (token) {
            profileInfo();
        } else {
            navigate("/login");
        }
    },[token]);

    const handleUpdate = async () => {
        try {
            const updatedInfo = await axios.put(`http://localhost:5000/users/${userId}`, userInfo);
            setUserInfo(updatedInfo.data.result);
            setUpdating(false);
        } catch (error) {
            console.log(error.message);
        }
    };
    return (
        <div>
            {!updating ? (
                <div>
                    <Avatar src={userInfo.img} />
                    <h4>{userInfo.firstname + " " + userInfo.lastname}</h4>
                    <h4>Email: </h4>
                    <h3>{userInfo.email}</h3>
                    <h4>Address (1): </h4>
                    <h3>{userInfo.address1}</h3>
                    <h4>Address (2): </h4>
                    <h3>{userInfo.address2}</h3>
                    <button
                        onClick={() => {
                            setUpdating(!updating);
                        }}
                    >
                        Update
                    </button>
                </div>
            ) : (
                <div>
                    <input
                        onChange={(event) => {
                            setUserInfo({
                                ...userInfo,
                                address1: event.target.value,
                            });
                        }}
                        type="text"
                        value={userInfo.address1}
                    />
                    <button onClick={handleUpdate}>Update</button>
                </div>
            )}
        </div>
    );
};

export default UserProfile;
