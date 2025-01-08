import React, { useState, useEffect } from "react";
import "./style.css"; // Custom styles
import Login from "./components/Login";
import Register from "./components/Register";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
    const [isLogin, setIsLogin] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    // Check if user is logged in
    useEffect(() => {
        const token = localStorage.getItem("userToken");
        if (token) {
            setIsLoggedIn(true);
        }
    }, []);

    const toggleForm = () => {
        setIsLogin((prev) => !prev);
    };

    // Redirect user if they are already logged in
    if (isLoggedIn) {
        return <div>Welcome back!</div>; // Or redirect to your dashboard/home
    }

    return (
        <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh", backgroundPosition: 'center' }}>
            <div className="loginBox bg-dark p-4 rounded">
                <div className="d-flex justify-content-center mb-4">
                    <img className="user" src="https://i.ibb.co/yVGxFPR/2.png" alt="User" height="100px" width="100px" />
                </div>
                <h3 className="text-center text-primary">{isLogin ? "Sign In" : "Sign Up"}</h3>
                <div className={`form ${isLogin ? "sign-in" : "sign-up"}`}>
                    {isLogin ? (
                        <Login toggleForm={toggleForm} />
                    ) : (
                        <Register toggleForm={toggleForm} />
                    )}
                </div>
                <div className="text-center mt-3">
                    <p style={{ color: "#59238F" }} onClick={toggleForm} className="btn">
                        {isLogin ? "Don't have an account? Sign Up" : "Already have an account? Sign In"}
                    </p>
                </div>
            </div>
        </div>
    );
}

export default App;
