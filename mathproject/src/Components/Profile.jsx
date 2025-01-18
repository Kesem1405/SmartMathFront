import React, { useState, useEffect } from "react";
import Navbar from "./Navbar";
import "./Profile.css";

function Profile() {
    const [userData, setUserData] = useState({
        name: "",
        email: "",
        preferredLanguage: "English",
    });

    useEffect(() => {
        // כאן תוכל להוסיף קריאה ל-API או להביא את המידע מקובץ המקומי
        const storedUserData = {
            email: "",
            password: "",
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

    const saveChanges = () => {
        console.log("Changes saved:", userData);
    };

    return (
        <div>
            <Navbar />
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
                            type="Password"
                            name="Password"
                            value={userData.Password}
                            onChange={handleChange}
                        />
                    </div>
                    <button onClick={saveChanges}>Save changes</button>
                </div>
            </div>
        </div>
    );
};

export default Profile;
