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
    const [updating, setUpdating] = useState(false);
    const [userInfo, setUserInfo] = useState("");
    const imageInputRef = useRef(null);
    const [updateBox, setUpdateBox] = useState(false);

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
                console.log(userInfo.id);
                const result = await axios.put(`http://localhost:5000/users/${userInfo.id}`, { img: data.url });
                setUserInfo({ ...userInfo, img: data.url });
            })
            .catch((err) => console.log(err));
    };

    const handleUpdate = async () => {
        try {
            const updatedInfo = await axios.put(
                `http://localhost:5000/users/${userId}`,
                userInfo
            );
            setUserInfo(updatedInfo.data.result);
            setUpdating(false);
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
                                    <a href="#update">
                                        <Button
                                            className="bg-blue-400 mt-5"
                                            onClick={() => {
                                                setUpdateBox(true);
                                            }}
                                        >
                                            Update
                                        </Button>
                                    </a>
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
                {/* {updateBox && (
                    <form>
                        <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
                            <div>
                                <label
                                    className="text-gray-700 dark:text-gray-500"
                                    for="username"
                                >
                                    Username
                                </label>
                                <input
                                    id="username"
                                    type="text"
                                    className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                                    onChange={(e) => {
                                        setFirstName(e.target.value);
                                    }}
                                />
                            </div>

                            <div>
                                <label
                                    className="text-gray-700 dark:text-gray-500"
                                    for="LastName"
                                >
                                    Last Name
                                </label>
                                <input
                                    id="LastName"
                                    type="email"
                                    className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                                    onChange={(e) => {
                                        setLastName(e.target.value);
                                    }}
                                />
                            </div>
                            <div>
                                <label
                                    className="text-gray-700 dark:text-gray-500"
                                    for="Discription"
                                >
                                    Discription
                                </label>
                                <input
                                    id="Discription"
                                    type="email"
                                    className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                                    onChange={(e) => {
                                        setDescription(e.target.value);
                                    }}
                                />
                            </div>
                            <div>
                                <label
                                    className="text-gray-700 dark:text-gray-500"
                                    for="Age"
                                >
                                    Age
                                </label>
                                <input
                                    id="Age"
                                    type="number"
                                    className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                                    onChange={(e) => {
                                        setAge(e.target.value);
                                    }}
                                />
                            </div>
                            <div>
                                <label
                                    className="text-gray-700 dark:text-gray-500"
                                    for="Country"
                                >
                                    Country
                                </label>
                                <input
                                    id="Country"
                                    type="text"
                                    className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                                    onChange={(e) => {
                                        setCountry(e.target.value);
                                    }}
                                />
                            </div>

                            <div>
                                <label
                                    className="text-gray-700 dark:text-gray-500"
                                    for="WorksHours"
                                >
                                    Works Hours
                                </label>
                                <input
                                    id="WorksHours"
                                    type="text"
                                    className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                                    onChange={(e) => {
                                        setWork_hours(e.target.value);
                                    }}
                                />
                            </div>
                            <div>
                                <label
                                    htmlFor="category"
                                    className="text-gray-700 dark:text-gray-500"
                                >
                                    Crafts Category
                                </label>
                                <select
                                    id="category"
                                    className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
                                    onChange={(e) =>
                                        setSelectedCategory(e.target.value)
                                    }
                                    value={selectedCategory}
                                >
                                    <option value="">Select a category</option>
                                    {category.map((category) => (
                                        <option
                                            key={category.id}
                                            value={category.id}
                                        >
                                            {category.category}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div className="flex justify-end mt-6">
                            <button
                                className="px-8 py-4  leading-5 text-white transition-colors duration-300 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
                                onClick={() => {
                                    navigate("/");
                                }}
                            >
                                Back To Home
                            </button>
                            <button
                                className="px-8 py-2.5 leading-5 text-white transition-colors duration-300 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
                                onClick={() => {
                                    updateProfile();
                                    setUpdateBox(false);
                                }}
                            >
                                Save
                            </button>
                        </div>
                    </form>
                )} */}
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
