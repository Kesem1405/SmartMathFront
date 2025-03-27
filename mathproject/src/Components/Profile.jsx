import  { useState, useEffect } from "react";
import Navbar from "./Navbar.jsx";
import "./Profile.css";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Add navigate for redirect


function Profile() {
    const [userData, setUserData] = useState({
        email: "",
        password: "",
        firstName: "",
        lastName: ""
    });
    const [errorMessage, setErrorMessage] = useState(""); // For error messages
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('userToken');

        axios.get("http://localhost:8080/api/user/info/"+token, {
        })
            .then((response) => {
                setUserData({
                    email: response.data.email,
                    password: response.data.password,
                    firstName: response.data.firstName,
                    lastName: response.data.lastName,

                });
            })
            .catch((error) => console.error("Error fetching user data:", error));
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

 
    const saveChanges = async () => {
        setErrorMessage("");
        try {
            const response = await fetch("http://localhost:8080/api/user/update-profile", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(userData),
            });

            if (response.ok) {
                navigate("/dashboard");
                localStorage.setItem("userToken", response.data.token);
            } else {
                const errorData = await response.json();
                setErrorMessage(errorData.message || "An error occurred while saving changes.");
            }
        } catch (error) {
            setErrorMessage("Failed to save changes. Please try again later.");

        }
    };

    return (
        <div>
            <div>
                <Navbar handleSignOut={() => {
                    localStorage.removeItem("userToken");
                    navigate("/auth");
                }}/>
            </div>
            <div className="profile-container">
                <h2>Profile Page</h2>
                <div className="profile-details">
                    <div>
                        <label>Email:</label>
                        <input
                            type="email"
                            name="email"
                            value={userData.email}
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label>Password:</label>
                        <input
                            type="password"
                            name="password"
                            value={userData.password}
                            onChange={handleChange}
                        />
                    </div>

                    <div>
                        <label> שם פרטי :</label>
                        <div>
                        <input
                            type="text"
                            name="firstName"
                            value={userData.firstName}
                            onChange={handleChange}
                        />
                        </div>
                    </div>

                    <div>
                        <label>שם משפחה :</label>
                        <input
                            type="text"
                            name="lastName"
                            value={userData.lastName}
                            onChange={handleChange}
                        />
                    </div>
                    <button onClick={saveChanges}>Save changes</button>
                </div>
                {errorMessage && <p className="error-message">{errorMessage}</p>}
            </div>
        </div>
    );
}

export default Profile;
