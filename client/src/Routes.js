import React, { useContext } from "react";
import { Routes, Route, Navigate, useLocation, Outlet } from "react-router-dom";
import ViewAttendance from "./components/Attendance.js/ViewAttendance";
import Customers from "./components/Customers";
import Dashboard from "./components/Dashboard/Dashboard";
import Kitchen from "./components/Kitchen";
import Login from "./components/Login";
import Menu from "./components/Menu";
import Orders from "./components/Orders";
import Pos from "./components/PosContainer.js/Pos";
import Reservations from "./components/Reservations";
import Sales from "./components/Sales";
import SignUp from "./components/SignUp";
import Split from "./components/Split";
import Tables from "./components/Tables";
import Takeaways from "./components/Takeaways";
import Attendance from "./components/Attendance.js/Attendance";
import Wastage from "./components/Wastage";

import { UserContext } from "./context/User";
import { DefaultLayout } from "./layouts/DefaultLayout";

const Router = () => {
    const { isAuthenticated } = useContext(UserContext);
    const location = useLocation()
    return (
        <Routes>
            <Route element={isAuthenticated ? <Navigate to={location.state||'dashboard'} />:<Outlet/>} >
                <Route path="/" element={<SignUp />} />
                <Route path="/login" element={<Login />} />
            </Route>
            <Route element={isAuthenticated ? <DefaultLayout /> : <Navigate to='login' state={location.pathname} />} >
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/menu" element={<Menu />} />
                <Route path="/tables" element={<Tables />} />
                <Route path="/pos" element={<Pos />} />
                <Route path="/orders" element={<Orders />} />
                <Route path="/kitchen" element={<Kitchen />} />
                <Route path="/customers" element={<Customers />} />
                <Route path="/sales" element={<Sales />} />
                <Route path="/attendance" element={<Attendance />} />
                <Route path="/viewAttendance" element={<ViewAttendance />} />
                <Route path="/takeaways" element={<Takeaways />} />
                <Route path="/reservations" element={<Reservations />} />
                <Route path="/split" element={<Split />} />
                <Route path="/wastage" element={<Wastage />} />
            </Route>
        </Routes>
    );
};

export default Router;
