import React from "react";
import { Outlet } from "react-router-dom";
import SideBar from "../components/newSideBar";
import CustomNavBar from "../components/Common/CustomNavBar";

export const DefaultLayout = () => {
    return (
        <div className="flex flex-row">
            <div
                className=""
                style={{ position: "fixed", zIndex: 999, minHeight: "100vh" }}
            >
                <SideBar />
            </div>
            <div
                style={{
                    width: "calc(100vw - 55px)",
                    float: "right",
                    margin: "0 0 0 55px",
                    minHeight: "100vh",
                }}
            >
                <CustomNavBar />
                <div className="pl-3">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};
