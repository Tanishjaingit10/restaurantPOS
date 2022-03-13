import React from "react";
import { Outlet } from "react-router-dom";
import SideBar from "../components/newSideBar";
import CustomNavBar from "../components/Common/CustomNavBar";

export const DefaultLayout = () => {
    return (
        <div className="flex flex-row">
            <div style={{ position: "fixed", zIndex: 999, minHeight: "100vh" }}>
                <SideBar />
            </div>
            <div
                style={{
                    float: "right",
                    margin: "0 0 0 220px",
                    minHeight: "100vh",
                }}
                className="flex-1"
            >
                <CustomNavBar />
                <div className="pl-3 w-full">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};
