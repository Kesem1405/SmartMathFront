import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate, Navigate } from "react-router-dom";
import "./style.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Modal } from "react-bootstrap";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./components/Dashboard";
import Profile from './components/Profile';

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [showAuthModal, setShowAuthModal] = useState(false);
    const [authFormType, setAuthFormType] = useState("login"); // 'login' or 'register'
    const navigate = useNavigate(); // useNavigate hook

    useEffect(() => {
        const token = localStorage.getItem("userToken");
        if (token) {
            setIsLoggedIn(true);
        }
    }, []);

    const handleAuthButtonClick = (formType) => {
        setAuthFormType(formType);
        setShowAuthModal(true);
    };

    const handleCloseAuthModal = () => {
        setShowAuthModal(false);
    };

    const handleSignOut = () => {
        localStorage.removeItem("userToken");
        setIsLoggedIn(false);
        navigate("/"); // Navigate to the home page
    };

    const goToDashboard = () => {
        navigate("/dashboard"); // Navigate to the dashboard
    };

    return (
        <>
            <Routes>
                <Route
                    path="/"
                    element={
                        isLoggedIn ? (
                            <div className="text-center mt-5">
                                <h1>Welcome Back!</h1>
                                {/* Button to navigate to the dashboard */}
                                <button className="btn btn-danger mt-3" onClick={goToDashboard}>
                                    Go to Dashboard
                                </button>
                                {/* Button to sign out */}
                                <button className="btn btn-danger mt-3" onClick={handleSignOut}>
                                    Sign Out
                                </button>
                            </div>
                        ) : (
                            <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
                                <div className="user-register">
                                    {/* Button to open the login modal */}
                                    <button className="btn btn-primary mx-2" onClick={() => handleAuthButtonClick("login")}>
                                        Login
                                    </button>
                                    {/* Button to open the register modal */}
                                    <button className="btn btn-secondary mx-2" onClick={() => handleAuthButtonClick("register")}>
                                        Register
                                    </button>
                                </div>
                            </div>
                        )
                    }
                />
                <Route
                    path="/dashboard"
                    element={isLoggedIn ? <Dashboard handleSignOut={handleSignOut} /> : <Navigate to="/" />}
                />
                <Route
                    path="/profile"
                    element={isLoggedIn ? <Profile /> : <Navigate to="/" />}
                />
            </Routes>

            {/* Modal for login/register */}
            <Modal show={showAuthModal} onHide={handleCloseAuthModal} centered>
                <Modal.Header closeButton>
                    <Modal.Title className="text-primary">
                        {authFormType === "login" ? "Sign In" : "Sign Up"}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="d-flex justify-content-center mb-4">
                        <img
                            className="user"
                            src="https://i.ibb.co/yVGxFPR/2.png"
                            alt="User"
                            height="100px"
                            width="100px"
                        />
                    </div>
                    <div className={`form ${authFormType === "login" ? "sign-in" : "sign-up"}`}>
                        {authFormType === "login" ? (
                            <Login
                                toggleForm={() => setAuthFormType("register")}
                                setIsLoggedIn={setIsLoggedIn}
                                closeModal={handleCloseAuthModal}
                            />
                        ) : (
                            <Register
                                toggleForm={() => setAuthFormType("login")}
                                setIsLoggedIn={setIsLoggedIn}
                                closeModal={handleCloseAuthModal}
                            />
                        )}
                    </div>
                </Modal.Body>
            </Modal>
        </>
    );
}

// Wrap App with Router
function AppWrapper() {
    return (
        <Router>
            <App />
        </Router>
    );
}

export default AppWrapper;