import { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import Lottie from "react-lottie";
import "../css/Navbar.css";

import HomeIcon from "../images/home.mp4.lottie.json";
import PracticeIcon from "../images/practice.mp4.lottie.json";
import ProfileIcon from "../images/profile.mp4.lottie.json";
import AboutIcon from "../images/about.mp4.lottie.json";
import AdminIcon from "../images/admin.mp4.lottie.json";
import ExitIcon from "../images/logout.mp4.lottie.json";

const Navbar = ({ handleSignOut = () => {} }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isAdmin, setIsAdmin] = useState(false);
  const [activeTab, setActiveTab] = useState("");
  const [hoveredItem, setHoveredItem] = useState(null);

  useEffect(() => {
    setIsAdmin(localStorage.getItem("ADMIN") === "true");
    setActiveTab(location.pathname.split("/")[1] || "home");
  }, [location]);

  const signOutAndRedirect = () => {
    handleSignOut();
    localStorage.clear();
    navigate("/home");
  };

  const defaultOptions = {
    loop: true,
    autoplay: false,
    animationData: null,
    rendererSettings: { preserveAspectRatio: "xMidYMid slice" }
  };

  const navItems = [
    { path: "/home",     icon: HomeIcon,     label: "בית",     key: "home" },
    { path: "/aboutPage",icon: AboutIcon,    label: "אודות",    key: "aboutPage" },
    { path: "/Profile",  icon: ProfileIcon,  label: "פרופיל",   key: "Profile" },
    { path: "/Dashboard",icon: PracticeIcon, label: "תרגול",    key: "Dashboard" },
    ...(isAdmin 
      ? [{ path: "/AdminPanel", icon: AdminIcon, label: "מנהל", key: "AdminPanel" }] 
      : []
    ),
    { path: null,        icon: ExitIcon,     label: "יציאה",   key: "signout", action: signOutAndRedirect }
  ];

  return (
    <nav className="math-navbar">

      <div className="math-navbar__logo-wrapper">
        <Link to="/home" className="math-navbar__logo">
        <span className="title-learn">Learn</span>
        <span className="title-dyno">Dyno</span>
        </Link>
      </div>


      <div className="math-navbar__menu">
        <div className="math-navbar__items">
          {navItems.map(item => {
            const isActive  = activeTab === item.key;
            const isHovered = hoveredItem === item.key;

            if (item.path) {
              return (
                <Link
                  key={item.key}
                  to={item.path}
                  className={`math-navbar__item ${isActive ? "active" : ""}`}
                  onMouseEnter={() => setHoveredItem(item.key)}
                  onMouseLeave={() => setHoveredItem(null)}
                >
                  <div className="math-navbar__icon-container">
                    <Lottie
                      options={{
                        ...defaultOptions,
                        animationData: item.icon,
                        autoplay: isActive || isHovered
                      }}
                      height={36}
                      width={36}
                      isStopped={!isActive && !isHovered}
                    />
                  </div>
                  <span className="math-navbar__label">{item.label}</span>
                  {isActive && <div className="math-navbar__indicator" />}
                </Link>
              );
            }

            return (
              <button
                key={item.key}
                onClick={item.action}
                className="math-navbar__item math-navbar__item--signout"
                onMouseEnter={() => setHoveredItem(item.key)}
                onMouseLeave={() => setHoveredItem(null)}
              >
                <div className="math-navbar__icon-container">
                  <Lottie
                    options={{
                      ...defaultOptions,
                      animationData: item.icon,
                      autoplay: isHovered
                    }}
                    height={36}
                    width={36}
                    isStopped={!isHovered}
                  />
                </div>
                <span className="math-navbar__label">{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
