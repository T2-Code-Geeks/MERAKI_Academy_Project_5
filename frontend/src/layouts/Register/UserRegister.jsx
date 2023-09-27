import React, { useState, useEffect } from "react";
// import axios from "axios";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { useNavigate } from "react-router-dom";
import axios from "axios";

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
    useEffect(() => {
        if (token) {
            navigate("/");
        }
    }, [token]);

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
                    navigate("/");
                }, 2000);
            } else {
                setMessage(result.data.message);
            }

            console.log(result);
        } catch (error) {
            console.log(error.message);
        }
    };

    return (
        <div>
            {token ? (
                navigate("/")
            ) : (
                <div>
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
            )}
        </div>
    );
};

export default UserRegister;
