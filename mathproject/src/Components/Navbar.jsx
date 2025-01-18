import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = ({ handleSignOut }) => {
    const navigate = useNavigate();

    const signOutAndRedirect = () => {
        handleSignOut();
        navigate("/"); // ניתוב לעמוד הראשי אחרי התנתקות
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container">
                <Link className="navbar-brand" to="/Dashboard">Dashboard</Link>
                <div className="collapse navbar-collapse">
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <Link className="nav-link" to="/Profile">Profile</Link>
                        </li>
                        <li className="nav-item">
                            <button className="btn btn-outline-danger nav-link" onClick={signOutAndRedirect}>
                                Sign Out
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
