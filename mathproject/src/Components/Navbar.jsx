import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../css/Navbar.css";

const Navbar = ({ handleSignOut = () => {} }) => {
    const navigate = useNavigate();
    const [isAdmin, setIsAdmin] = useState(false);

    const signOutAndRedirect = () => {
        handleSignOut();
        localStorage.removeItem("userToken");
        localStorage.removeItem("ADMIN");
        localStorage.removeItem("score");
        localStorage.removeItem("streak");
        navigate("/home");
    };

    useEffect(() => {
        const adminStatus = localStorage.getItem("ADMIN");
        setIsAdmin(adminStatus === "true");
    }, []);

    return (
        <nav className="emoji-navbar">
            <ol>
                <li className="menu-item">
                    <Link to="/Dashboard">קדימה לתרגל</Link>
                </li>
                <li className="menu-item">
                    <Link to="/Profile">פרופיל</Link>
                </li>
                <li className="menu-item">
                    <Link to="/aboutPage">אודות</Link>
                </li>
                <li className="menu-item">
                    <Link to="/home">דף הבית</Link>
                </li>
                {isAdmin && (
                    <li className="menu-item">
                        <Link to="/AdminPanel">מנהל</Link>
                    </li>
                )}
                <button className="button" onClick={signOutAndRedirect}>
                    🚪 התנתק
                </button>
            </ol>
        </nav>
    );
};

export default Navbar;