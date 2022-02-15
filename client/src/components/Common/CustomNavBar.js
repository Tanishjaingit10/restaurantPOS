import React, { useContext } from "react";
import { ThemeContext } from "../../context/Theme";
import Logo from "../.././assets/Images/Logo.png";
import { Link } from "@material-ui/core";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/User";

const CustomNavBar = () => {
    const navigate = useNavigate();
    const theme = useContext(ThemeContext);
    const { setIsAuthenticated } = useContext(UserContext);
    const handleLogout = () => {
        localStorage.removeItem("token");
        setIsAuthenticated(false);
        navigate("/login", { replace: true });
    };

    return (
        <nav
            style={{ backgroundColor: theme.backgroundColor }}
            className="bg-red-500 px-1 mt-0 h-auto w-full top-0 text-2xl"
        >
            <div className="flex items-center justify-between">
                <div className="flex flex-shrink md:w-1/3 justify-start md:justify-start text-white ml-0">
                    <Link to="/dashboard">
                        <img src={Logo} alt="Logo" className="w-16 h-14 ml-0" />
                    </Link>
                </div>
                <button
                    onClick={handleLogout}
                    className="text-red-500 bg-white text-lg py-2 px-8 rounded-md mr-4 font-semibold"
                >
                    Log Out
                </button>
            </div>
        </nav>
    );
};

export default CustomNavBar;
