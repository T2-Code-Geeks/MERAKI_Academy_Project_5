import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import "./UserProfile.css";
import { Avatar, Typography, Button } from "@material-tailwind/react";
import { useSelector } from "react-redux";
import { MapPinIcon, BuildingLibraryIcon } from "@heroicons/react/24/solid";

const UserProfile = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { tokenUser } = useSelector((state) => state.auth);
    const { userId } = useSelector((state) => state.auth);
    const [userInfo, setUserInfo] = useState("");
    const imageInputRef = useRef(null);
    const [updateBox, setUpdateBox] = useState(false);
    const [updateInfo, setUpdateInfo] = useState({});
    const profileInfo = async () => {
        try {
            const result = await axios.get(`http://localhost:5000/users/${id}`);
            if (result.data.success) {
                setUserInfo(result.data.result);
            }
        } catch (error) {
            console.log(error.message);
        }
    };

    const clickInput = () => {
        imageInputRef.current.click();
    };

    useEffect(() => {
        if (tokenUser) {
            profileInfo();
        } else {
            navigate("/login");
        }
    }, [tokenUser]);

    const addPicture = async (file) => {
        const data = new FormData();
        data.append("file", file);
        data.append("upload_preset", "profilePicture");
        data.append("cloud_name", "dbkfrtdjm");
        fetch("https://api.cloudinary.com/v1_1/dbkfrtdjm/image/upload", {
            method: "post",
            body: data,
        })
            .then((resp) => resp.json())
            .then(async (data) => {
                const result = await axios.put(
                    `http://localhost:5000/users/${userInfo.id}`,
                    { img: data.url }
                );
                setUserInfo({ ...userInfo, img: data.url });
            })
            .catch((err) => console.log(err));
    };

    const handleUpdate = async () => {
        try {
            const updatedInfo = await axios.put(
                `http://localhost:5000/users/${userId}`,
                updateInfo
            );
            if (updatedInfo.data.success) {
                setUserInfo(updatedInfo.data.result);
            }
        } catch (error) {
            console.log(error.message);
        }
    };
    return (
        <>
            <section className="relative block h-[50vh]">
                <div className="bg-profile-background absolute top-0 h-full w-full  bg-cover bg-center" />
                <div className="absolute top-0 h-full w-full bg-black/75 bg-cover bg-center" />
            </section>
            <section className="relative bg-blue-gray-50/50 py-16 px-4">
                <div className="container mx-auto">
                    <div className="relative mb-6 -mt-64 flex w-full min-w-0 flex-col break-words rounded-3xl bg-white shadow-xl shadow-gray-500/5">
                        <div className="px-6">
                            <div className="flex flex-wrap justify-center">
                                <div className="flex w-full justify-center px-4 lg:order-2 lg:w-3/12">
                                    <div className="relative">
                                        <div className="-mt-20 w-70">
                                            <input
                                                type="file"
                                                ref={imageInputRef}
                                                hidden
                                                onChange={(event) => {
                                                    addPicture(
                                                        event.target.files[0]
                                                    );
                                                }}
                                            />
                                            <Avatar
                                                src={
                                                    userInfo.img
                                                        ? userInfo.img
                                                        : "https://www.shareicon.net/data/128x128/2016/02/07/715342_people_512x512.png"
                                                }
                                                onClick={clickInput}
                                                variant="circular"
                                                className="h-60 w-25 shadow-xl"
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-10 flex w-full justify-center px-4 lg:order-3 lg:mt-0 lg:w-4/12 lg:justify-end lg:self-center">
                                    <Button
                                        className="bg-blue-400 mt-5"
                                        onClick={() => {
                                            setUpdateBox(true);
                                        }}
                                    >
                                        Update
                                    </Button>
                                </div>
                                <div className="w-full px-4 lg:order-1 lg:w-4/12">
                                    <div className="flex justify-center py-4 pt-8 lg:pt-4"></div>
                                </div>
                            </div>
                            <div className="my-8 text-center">
                                <div className="mb-2 flex items-center justify-center gap-2">
                                    <Typography className="font-medium text-blue-gray-700">
                                        Email : {userInfo.email}
                                    </Typography>
                                </div>
                                <Typography
                                    variant="h2"
                                    color="blue-gray"
                                    className="mb-2"
                                >
                                    Name: {userInfo.firstname}{" "}
                                    {userInfo.lastname}
                                </Typography>
                                {userInfo.country && (
                                    <div className="mb-10 flex items-center justify-center gap-2">
                                        <MapPinIcon className="-mt-px h-4 w-4 text-blue-gray-700" />
                                        <Typography className="font-medium text-blue-gray-700">
                                            Country: {userInfo.country}
                                        </Typography>
                                    </div>
                                )}

                                {userInfo.age && (
                                    <div className="mb-2 flex items-center justify-center gap-2">
                                        <Typography className="font-medium text-blue-gray-700">
                                            Age : {userInfo.age} years
                                        </Typography>
                                    </div>
                                )}
                                {userInfo.address1 && (
                                    <div className="mb-2 flex items-center justify-center gap-2">
                                        <Typography className="font-medium text-blue-gray-700">
                                            Address (1) : {userInfo.address1}
                                        </Typography>
                                    </div>
                                )}
                                {userInfo.address2 && (
                                    <div className="mb-2 flex items-center justify-center gap-2">
                                        <Typography className="font-medium text-blue-gray-700">
                                            Address (2) : {userInfo.address2}
                                        </Typography>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                {updateBox && (
                    <form>
                        <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
                            <div>
                                <label
                                    className="text-gray-700 dark:text-gray-500"
                                    htmlFor="username"
                                >
                                    First Name
                                </label>
                                <input
                                    id="username"
                                    type="text"
                                    className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                                    onChange={(e) => {
                                        setUpdateInfo({
                                            ...updateInfo,
                                            firstName: e.target.value,
                                        });
                                    }}
                                />
                            </div>

                            <div>
                                <label
                                    className="text-gray-700 dark:text-gray-500"
                                    htmlFor="LastName"
                                >
                                    Last Name
                                </label>
                                <input
                                    id="LastName"
                                    type="email"
                                    className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                                    onChange={(e) => {
                                        setUpdateInfo({
                                            ...updateInfo,
                                            lastName: e.target.value,
                                        });
                                    }}
                                />
                            </div>
                            <div>
                                <label
                                    className="text-gray-700 dark:text-gray-500"
                                    htmlFor="Country"
                                >
                                    Country
                                </label>
                                <input
                                    id="Country"
                                    type="text"
                                    className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                                    onChange={(e) => {
                                        setUpdateInfo({
                                            ...updateInfo,
                                            country: e.target.value,
                                        });
                                    }}
                                />
                            </div>
                            <div>
                                <label
                                    className="text-gray-700 dark:text-gray-500"
                                    htmlFor="Age"
                                >
                                    Age
                                </label>
                                <input
                                    id="Age"
                                    type="number"
                                    className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                                    onChange={(e) => {
                                        setUpdateInfo({
                                            ...updateInfo,
                                            age: e.target.value,
                                        });
                                    }}
                                />
                            </div>
                            <div>
                                <label
                                    className="text-gray-700 dark:text-gray-500"
                                    htmlFor="Address1"
                                >
                                    Address (1)
                                </label>
                                <input
                                    id="Address1"
                                    type="text"
                                    className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                                    onChange={(e) => {
                                        setUpdateInfo({
                                            ...updateInfo,
                                            address1: e.target.value,
                                        });
                                    }}
                                />
                            </div>

                            <div>
                                <label
                                    className="text-gray-700 dark:text-gray-500"
                                    htmlFor="Address2"
                                >
                                    Address (1)
                                </label>
                                <input
                                    id="Address2"
                                    type="text"
                                    className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                                    onChange={(e) => {
                                        setUpdateInfo({
                                            ...updateInfo,
                                            address2: e.target.value,
                                        });
                                    }}
                                />
                            </div>
                        </div>

                        <div className="flex justify-end mt-6">
                            <button
                                className="px-8 py-2.5 leading-5 text-white transition-colors duration-300 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
                                onClick={() => {
                                    handleUpdate();
                                    setUpdateBox(false);
                                }}
                            >
                                Save
                            </button>
                        </div>
                    </form>
                )}
            </section>
        </>

        // <div>
        //     {!updating ? (
        //         <div>
        //             <Avatar src={userInfo.img} />
        //             <h4>{userInfo.firstname + " " + userInfo.lastname}</h4>
        //             <h4>Email: </h4>
        //             <h3>{userInfo.email}</h3>
        //             <h4>Address (1): </h4>
        //             <h3>{userInfo.address1}</h3>
        //             <h4>Address (2): </h4>
        //             <h3>{userInfo.address2}</h3>
        //             <button
        //                 onClick={() => {
        //                     setUpdating(!updating);
        //                 }}
        //             >
        //                 Update
        //             </button>
        //         </div>
        //     ) : (
        //         <div>
        //             <input
        //                 onChange={(event) => {
        //                     setUserInfo({
        //                         ...userInfo,
        //                         address1: event.target.value,
        //                     });
        //                 }}
        //                 type="text"
        //                 value={userInfo.address1}
        //             />
        //             <button onClick={handleUpdate}>Update</button>
        //         </div>
        //     )}
        // </div>
    );
};

export default UserProfile;
