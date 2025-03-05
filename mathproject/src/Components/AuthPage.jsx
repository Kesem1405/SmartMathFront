import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import "bootstrap/dist/css/bootstrap.min.css";

function AuthPage() {
    const [authFormType, setAuthFormType] = useState("login"); // 'login' or 'register'
    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem("userToken")) {
            navigate("/dashboard"); // Redirect if already logged in
        }else{  navigate("/auth");}
    }, [navigate]);

    //קוד כפול
    //
    // useEffect(() => {
    //     const token = localStorage.getItem("userToken");
    //     if (!token) {
    //         navigate("/auth");
    //     }
    // }, [navigate]);

    const handleAuthSuccess = () => {
        navigate("/dashboard"); // Redirect after login/register
    };

    const toggleForm = () => {
        setAuthFormType(authFormType === "login" ? "register" : "login");
    };

    return (
        <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
            <div className="card p-4 shadow-sm" style={{ maxWidth: "400px", width: "100%" }}>
                <h2 className="text-center text-primary mb-3">
                    {authFormType === "login" ? "Sign In" : "Sign Up"}
                </h2>
                <div className="d-flex justify-content-center mb-3">
                    <img src="https://i.ibb.co/yVGxFPR/2.png" alt="User" height="80px" width="80px" />
                </div>
                <div className="form">
                    {authFormType === "login" ? (
                        <Login toggleForm={toggleForm} onAuthSuccess={handleAuthSuccess} />
                    ) : (
                        <Register toggleForm={toggleForm} onAuthSuccess={handleAuthSuccess} />
                    )}
                </div>
                <div className="text-center mt-3">
                    {authFormType === "login" ? (
                        <p>
                            Don&#39;t have an account?{" "}
                            <button className="btn btn-link p-0" onClick={toggleForm}>
                                Sign Up
                            </button>
                        </p>
                    ) : (
                        <p>
                            Already have an account?{" "}
                            <button className="btn btn-link p-0" onClick={toggleForm}>
                                Sign In
                            </button>
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}

export default AuthPage;