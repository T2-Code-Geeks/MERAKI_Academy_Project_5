import axios from "axios";
import React, { Suspense, useState } from "react";
import { Await, useLoaderData } from "react-router-dom";
import "./UserProfile.css";
import { Avatar } from "@mui/material";
import { useSelector } from "react-redux";

const UserProfile = () => {
    const { userId } = useSelector((state) => state.auth);
    const { result } = useLoaderData();
    const [updating, setUpdating] = useState(false);
    const [userInfo, setUserInfo] = useState(result);
    const handleUpdate = async () => {
        try {
            const updatedInfo = await axios.put(`http://localhost:5000/users/${userId}`, userInfo);
            // setUserInfo(updatedInfo.data.result)
            setUpdating(false);
        } catch (error) {
            console.log(error.message);
        }
    };
    return (
        <div>
            <Suspense fallback={<p>Loading Data...</p>}>
                <Await
                    resolve={result}
                    errorElement={<p>Error loading Data</p>}
                >
                    {!updating ? (
                        <div>
                            <Avatar src={result.img} />
                            <h4>
                                {userInfo.firstname + " " + userInfo.lastname}
                            </h4>
                            <h4>Email: </h4>
                            <h3>{userInfo.email}</h3>
                            <h4>Address (1): </h4>
                            <h3>{userInfo.address1}</h3>
                            <h4>Address (2): </h4>
                            <h3>{userInfo.address2}</h3>
                            <button onClick={()=>{setUpdating(!updating)}}>Update</button>
                        </div>
                    ) : (
                            <div>
                            <input onChange={(event)=>{setUserInfo({...userInfo, address1:event.target.value})}} type="text" value={ userInfo.address1 } />
                            <button onClick={handleUpdate}>Update</button>
                            </div>
                    )}
                </Await>
            </Suspense>
        </div>
    );
};

export default UserProfile;

export const profileInfoLoader = async ({ params }) => {
    const result = await axios
        .get(`http://localhost:5000/users/${params.id}`)
        .then((res) => {
            return res.data.result;
        });
    return { result };
};
