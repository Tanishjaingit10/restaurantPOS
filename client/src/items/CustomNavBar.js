import React, { useContext, useState } from "react";
import { ThemeContext } from "../context/Theme";
import Logo from "../images/logo.jpeg";
import CheeseburgerMenu from "cheeseburger-menu";
import { Link } from "react-router-dom";
import Sidebar from "../components/Sidebar";

const CustomNavBar = () => {
  const theme = useContext(ThemeContext);
  const [menuIsOpen, setMenuIsOpen] = useState(false);

  const closeMenu = () => {
    setMenuIsOpen(false);
  };

  return (
    <nav
      style={{ backgroundColor: theme.backgroundColor }}
      className="bg-red px-1 mt-0 h-auto w-full top-0 text-2xl"
    >
      <div className="flex items-center justify-between">
        <div className="flex flex-shrink md:w-1/3 justify-start md:justify-start text-white ml-0">
          {/* <button onClick={() => setMenuIsOpen(true)} className="cursor-pointer">
            <i className="fas fa-bars font-semibold"></i>
          </button> */}
          <img src={Logo} alt="Logo" className="w-16 h-14 ml-0" />
        </div>
        <button
          style={{color: theme.backgroundColor}}
          className="bg-white text-lg py-2 px-8 rounded-md mr-4 font-semibold"
        >
          Log Out
        </button>
      </div>
      {/* <CheeseburgerMenu isOpen={menuIsOpen} closeCallback={closeMenu}>
        <Sidebar />
      </CheeseburgerMenu> */}
    </nav>
  );
};

export default CustomNavBar;
