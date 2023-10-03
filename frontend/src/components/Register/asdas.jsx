import React, { useState, useEffect, useRef } from "react";
// import axios from "axios";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Avatar } from "@mui/material";

const UserRegister = () => {
    const { token } = useSelector((state) => state.auth);
    const navigate = useNavigate();
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [img, setImg] = useState("");
    const [age, setAge] = useState(0);
    const [country, setCountry] = useState("");
    const [address1, setAdress1] = useState("");
    const [address2, setAdress2] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [message, setMessage] = useState("");
    const imageInputRef = useRef(null);
    useEffect(() => {
        if (token) {
            navigate("/");
        }
    }, [token, navigate]);

    const handleUserRegister = async () => {
        try {
            const result = await axios.post("http://localhost:5000/users/", {
                firstName,
                lastName,
                img,
                age,
                country,
                address1,
                address2,
                email,
                password,
            });

            if (result.data.success) {
                setMessage("Account Created");
                setTimeout(() => {
                    navigate("/login");
                }, 2000);
            } else {
                setMessage(result.data.message);
            }
        } catch (error) {
            console.log(error.message);
        }
    };

    const clickInput = () => {
        imageInputRef.current.click();
    };

    const addPicture = async(file) => {
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
                setImg(data.url);
            })
            .catch((err) => console.log(err));
    };

    return (
        <div>
            user
            <div>
                <input
                    type="file"
                    ref={imageInputRef}
                    hidden
                    onChange={(event) => {
                        addPicture(event.target.files[0]);
                    }}
                />
                <Avatar
                    onClick={clickInput}
                    src={img}
                    style={{ cursor: "pointer" }}
                />
                <input
                    type="text"
                    placeholder="First Name"
                    onChange={(e) => setFirstName(e.target.value)}
                />
                <br />
                <input
                    type="text"
                    placeholder="Last Name"
                    onChange={(e) => setLastName(e.target.value)}
                />
                <br />
                <input
                    type="number"
                    placeholder="Age"
                    onChange={(e) => setAge(e.target.value)}
                />
                <br />
                <input
                    type="text"
                    placeholder="Country"
                    onChange={(e) => setCountry(e.target.value)}
                />
                <br />
                <input
                    type="text"
                    placeholder="Address 1"
                    onChange={(e) => setAdress1(e.target.value)}
                />
                <br />
                <input
                    type="text"
                    placeholder="Address 2"
                    onChange={(e) => setAdress2(e.target.value)}
                />
                <br />
                <input
                    type="email"
                    placeholder="Email"
                    onChange={(e) => setEmail(e.target.value)}
                />
                <br />
                <input
                    type="password"
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                />
                <br />
                <button onClick={handleUserRegister}>Register</button>
                <p>{message}</p>
            </div>
        </div>
    );
};