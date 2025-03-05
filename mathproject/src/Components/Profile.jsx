import  { useState, useEffect } from "react";
import Navbar from "./Navbar";
import "./Profile.css";
import { useNavigate } from "react-router-dom"; // Add navigate for redirect


function Profile() {
    const [userData, setUserData] = useState({
        email: "",
        password: "",
    });
    const [errorMessage, setErrorMessage] = useState(""); // For error messages
    const navigate = useNavigate(); // Hook for routing

    useEffect(() => {
        const storedUserData = {
            email: userData.email,
            password: userData.password,
        };


        setUserData(storedUserData);
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setUserData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

 
    const saveChanges = async () => {
        setErrorMessage(""); // Clear previous error message
        try {
            const response = await fetch("http://localhost:8080/user/update-profile", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(userData),
            });

            if (response.ok) {
                navigate("/dashboard");
            } else {
                const errorData = await response.json();
                setErrorMessage(errorData.message || "An error occurred while saving changes.");
            }
        } catch (error) {
            // Handle fetch error
            setErrorMessage("Failed to save changes. Please try again later.");
        }
    };

    return (
        <div>
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
                    <button onClick={saveChanges}>Save changes</button>
                </div>
                {errorMessage && <p className="error-message">{errorMessage}</p>}
            </div>
        </div>
    );
}

export default Profile;
