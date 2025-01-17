import React, { useState, useEffect } from "react";
import "./style.css"; // Custom styles
import Login from "./components/Login";
import Register from "./components/Register";
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
    const [isLogin, setIsLogin] = useState(true); // Toggle between Login and Register
    const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login status
    const [showAuthForm, setShowAuthForm] = useState(false); // Control visibility of auth forms

    // Check if the user is already logged in
    useEffect(() => {
        const token = localStorage.getItem("userToken");
        if (token) {
            setIsLoggedIn(true);
        }
    }, []);

    // Toggle between Login and Register forms
    const toggleForm = () => {
        setIsLogin((prev) => !prev);
    };

    // Show the authentication form (Login or Register)
    const handleAuthButtonClick = (isLoginForm) => {
        setIsLogin(isLoginForm);
        setShowAuthForm(true);
    };

    // Handle user sign out
    const handleSignOut = () => {
        localStorage.removeItem("userToken"); // Clear the token from localStorage
        setIsLoggedIn(false); // Update the logged-in state
    };

    // If the user is logged in, show a welcome message and a Sign Out button
    if (isLoggedIn) {
        return (
            <div className="text-center mt-5">
                <h1>Welcome back!</h1>
                <button
                    className="btn btn-danger mt-3"
                    onClick={handleSignOut}
                >
                    Sign Out
                </button>
            </div>
        );
    }

    return (
        <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh", backgroundPosition: 'center' }}>
            {/* Homepage with Login and Register buttons */}
            {!showAuthForm && (
                <div className="user-register">
                    <button
                        className="btn btn-primary mx-2"
                        onClick={() => handleAuthButtonClick(true)}
                    >
                        Login
                    </button>
                    <button
                        className="btn btn-secondary mx-2"
                        onClick={() => handleAuthButtonClick(false)}
                    >
                        Register
                    </button>
                </div>
            )}

            {/* Show Login or Register form based on state */}
            {showAuthForm && (
                <div className="loginBox bg-dark p-4 rounded">
                    <div className="d-flex justify-content-center mb-4">
                        <img
                            className="user"
                            src="https://i.ibb.co/yVGxFPR/2.png"
                            alt="User"
                            height="100px"
                            width="100px"
                        />
                    </div>
                    <h3 className="text-center text-primary">
                        {isLogin ? "Sign In" : "Sign Up"}
                    </h3>
                    <div className={`form ${isLogin ? "sign-in" : "sign-up"}`}>
                        {isLogin ? (
                            <Login toggleForm={toggleForm} setIsLoggedIn={setIsLoggedIn} />
                        ) : (
                            <Register toggleForm={toggleForm} setIsLoggedIn={setIsLoggedIn} />
                        )}
                    </div>
                    <div className="text-center mt-3">
                        <p
                            style={{ color: "#59238F" }}
                            onClick={toggleForm}
                            className="btn"
                        >
                            {isLogin
                                ? "Don't have an account? Sign Up"
                                : "Already have an account? Sign In"}
                        </p>
                    </div>
                </div>
            )}
        </div>
    );
}

export default App;