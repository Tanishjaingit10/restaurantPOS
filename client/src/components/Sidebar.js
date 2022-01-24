import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { ThemeContext } from "../context/Theme";

const Sidebar = () => {
  const [show, setShow] = useState(false);
  const theme = useContext(ThemeContext);

  return (
    <div className="flex md:flex-row overflow-y-auto border-r-4">
      <div className="bg-white overflow-y-auto shadow-xl h-16 fixed bottom-0 mt-12 md:relative md:h-screen z-10 w-full md:w-80">
        <div
          className=" md:fixed md:left-0 md:top-0 content-center md:content-start  w-full h-full  justify-between"
          style={{ backgroundColor: theme.backgroundColor }}
        >
          <ul className="list-reset flex flex-row md:flex-col text-center md:text-left text-xl">
            <li
              className=" text-white text-xl font-roboto font-semibold pl-4"
              style={{ backgroundColor: theme.tableBackground }}
            >
              <button className="block py-1 md:py-3 pl-1 align-middle  no-underline text-white hover:text-white font-roboto font-semibold">
                <i className="fas fa-home pr-0 md:pr-3"></i>
                <span className="pb-1 md:pb-0  block md:inline-block ">
                  Dashboard
                </span>
              </button>
            </li>
            <li className=" flex-1   text-xl font-roboto font-semibold text-white pl-4">
              <Link
                to="/orders"
                className="block py-1 md:py-3 pl-1 align-middle  no-underline text-white  "
              >
                <i className="fas fa-utensils pr-0 md:pr-3"></i>
                <span className="pb-1 md:pb-0   block md:inline-block">
                  Orders
                </span>
              </Link>
            </li>
            <li className=" flex-1   text-xl font-roboto font-semibold text-white pl-4">
              <Link
                to="/tables"
                className="block py-1 md:py-3 pl-1 align-middle  no-underline text-white  "
              >
                <i className="fas fa-table pr-0 md:pr-3 "></i>
                <span className="pb-1 md:pb-0 block md:inline-block">
                  Tables
                </span>
              </Link>
            </li>
            <li className=" flex-1   text-xl font-roboto font-semibold text-white pl-4">
              <Link
                to="/kitchen"
                className="block py-1 md:py-3 pl-1 align-middle  no-underline text-white  "
              >
                <i className="fas fa-concierge-bell pr-0 md:pr-3 "></i>
                <span className="pb-1 md:pb-0 block md:inline-block">
                  Kitchen
                </span>
              </Link>
            </li>

            <li className=" flex-1   text-xl font-roboto font-semibold text-whitepl-2 pl-4">
              <Link
                to="/menu"
                className="block py-1 md:py-3 pl-0 md:pl-1 align-middle  no-underline text-white "
              >
                <i className="fa fa-wallet pr-0 md:pr-3"></i>
                <span className="pb-1 md:pb-0 block md:inline-block">Menu</span>
              </Link>
            </li>
            <li className=" flex-1   text-xl font-roboto font-semibold text-white pl-4">
              <Link
                to="/attendance"
                className="block py-1 md:py-3 pl-1 align-middle no-underline text-white  "
              >
                <i className="fas fa-address-card pr-0 md:pr-3 "></i>
                <span className="pb-1 md:pb-0 block md:inline-block">
                  Attendance
                </span>
              </Link>
            </li>
            <li className=" flex-1 text-xl font-roboto font-semibold text-white pl-4">
              <Link
                to="/login"
                className="block py-1 md:py-3 pl-1 align-middle no-underline text-white  "
              >
                <i className="fas fa-sign-out-alt pr-0 md:pr-3 "></i>
                <span className="pb-1 md:pb-0 block md:inline-block">
                  Logout
                </span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
