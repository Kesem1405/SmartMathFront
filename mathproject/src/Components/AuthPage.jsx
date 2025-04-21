import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import ForgotPasswordForm from "./ForgotPasswordForm.jsx";
import "bootstrap/dist/css/bootstrap.min.css";

function AuthPage() {
    const [authFormType, setAuthFormType] = useState("login"); // 'login', 'register', 'forgot'
    const navigate = useNavigate();

    useEffect(() => {
        if (localStorage.getItem("userToken")) {
            navigate("/dashboard"); // Redirect if already logged in
        }
    }, [navigate]);

    const handleAuthSuccess = () => {
        navigate("/dashboard"); // Redirect after login/register
    };

    const toggleForm = (formType) => {
        setAuthFormType(formType);
    };

    return (
        <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
            <div className="card p-4 shadow-sm" style={{ maxWidth: "400px", width: "100%" }}>
                <h2 className="text-center text-primary mb-3">
                    {authFormType === "login"
                        ? "התחברות"
                        : authFormType === "register"
                            ? "הרשמה"
                            : "איפוס סיסמא"}
                </h2>

                <div className="d-flex justify-content-center mb-3">
                    <img src="https://i.ibb.co/yVGxFPR/2.png" alt="User" height="80px" width="80px" />
                </div>

                <div className="form">
                    {authFormType === "login" && (
                        <Login
                            toggleForm={() => toggleForm("register")}
                            onAuthSuccess={handleAuthSuccess}
                            onForgotPassword={() => toggleForm("forgot")}
                        />
                    )}
                    {authFormType === "register" && (
                        <Register
                            toggleForm={() => toggleForm("login")}
                            onAuthSuccess={handleAuthSuccess}
                        />
                    )}
                    {authFormType === "forgot" && (
                        <ForgotPasswordForm onBack={() => toggleForm("login")} />
                    )}
                </div>

                {authFormType !== "forgot" && (
                    <div className="text-center mt-3">
                        {authFormType === "login" ? (
                            <p>
                                <button className="btn btn-link p-0" onClick={() => toggleForm("register")}>
                                    הרשמה
                                </button>
                                {" "}  ? אין לך משתמש
                            </p>
                        ) : (
                            <p>
                               כבר יש לך משתמש?{" "}
                                <button className="btn btn-link p-0" onClick={() => toggleForm("login")}>
                                    התחברות
                                </button>
                            </p>
                        )}
                        <p className="mt-2">
                            <button className="btn btn-link p-0" onClick={() => toggleForm("forgot")}>
                                שכחת סיסמא?
                            </button>
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default AuthPage;
