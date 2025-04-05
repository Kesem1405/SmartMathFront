import  {useEffect, useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import "../css/Navbar.css";
import AboutPage from "./AboutPage.jsx"; // Import the updated CSS file

const Navbar = ( {handleSignOut} ) => {
    const navigate = useNavigate();
    const [isAdmin, setIsAdmin] = useState(false);
    const signOutAndRedirect = () => {
        handleSignOut();
        localStorage.removeItem("userToken");
        localStorage.removeItem("ADMIN");
        localStorage.removeItem("score");
        localStorage.removeItem("streak");
        navigate("homePage"); // Redirect to home after sign out
    };

    useEffect(() => {
        const isAdmin = localStorage.getItem("ADMIN");
        if (isAdmin === "true") {
            setIsAdmin(true);
        } else {
            setIsAdmin(false);
        }
    }, []);

    return (
        <nav className="emoji-navbar">
            <ol>
                <li className="menu-item">
                    <Link to="/Dashboard"> מסך הבית</Link>
                </li>
                <li className="menu-item">
                    <Link to="/Profile"> פרופיל</Link>
                </li>
                <li className="menu-item">
                    <Link to="/aboutPage"> אודות</Link>
                </li>
                {isAdmin ? (
                    <li className="menu-item">
                        <Link to="/AdminPanel"> מנהל</Link>
                    </li>

                ) : (<p></p>)}
                <button className="button" onClick={signOutAndRedirect}>
                    🚪 התנתק
                </button>
            </ol>
        </nav>
    );
};

export default Navbar;
