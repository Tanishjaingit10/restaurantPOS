import React, { useContext } from "react";
import { ThemeContext } from "../../context/Theme";
import Logo from "../../images/logo.jpeg";

const CustomNavBar = () => {
  const theme = useContext(ThemeContext);

  return (
    <nav
      style={{ backgroundColor: theme.backgroundColor }}
      className="bg-red px-1 mt-0 h-auto w-full top-0 text-2xl"
    >
      <div className="flex items-center justify-between">
        <div className="flex flex-shrink md:w-1/3 justify-start md:justify-start text-white ml-0">
          <a href="/dashboard">
            <img src={Logo} alt="Logo" className="w-16 h-14 ml-0" />
          </a>
        </div>
        <button
          style={{color: theme.backgroundColor}}
          className="bg-white text-lg py-2 px-8 rounded-md mr-4 font-semibold"
        >
          Log Out
        </button>
      </div>
    </nav>
  );
};

export default CustomNavBar;
