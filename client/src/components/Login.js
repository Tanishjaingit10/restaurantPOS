/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Logo from ".././assets/Images/Logo.png";
import chefLogin from ".././assets/Images/chefLogin.png";
import axios from "axios";
import { NotificationContext } from "../context/Notification";
import { useEffect } from "react";
import { UserContext } from "../context/User";

const Login = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [email_id, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [position, setPosition] = useState("");
    const [rememberMe, setRememberMe] = useState(false);
    const [loading, setLoading] = useState(false);
    const { isAuthenticated, setIsAuthenticated } = useContext(UserContext);
    const notify = useContext(NotificationContext);

    const loginUser = async (e) => {
        e.preventDefault();
        setLoading(true);
        axios
            .post("/app/signin", {
                position,
                email_id,
                password,
            })
            .then((res) => {
                if (res?.data?.token)
                    localStorage.setItem("token", res.data.token);
                setIsAuthenticated(true);
                if (location.state) navigate(location.state);
                else navigate("/dashboard");
            })
            .catch((err) => notify(err?.response?.data?.message || "Error"))
            .finally(() => setLoading(false));
    };

    useEffect(() => {
        if (location?.state) notify("Login Required");
        if (isAuthenticated)
            location.state ? navigate(location.state) : navigate("/dashboard");
    }, []);

    return (
        <div className="h-screen">
            <div className="bg-white py-2 ">
                <img className="mx-auto w-28 h-auto mb-4 " src={Logo} alt="" />
            </div>
            <div className="flex flex-row h-auto m-auto bg-white w-3/4 rounded-3xl shadow-xl">
                <img src={chefLogin} alt="" />
                <form
                    onSubmit={(e) => loginUser(e)}
                    className="flex flex-col px-6 justify-center w-1/2 md:w-1/3 mx-auto py-10 font-bold font-roboto text-lg"
                >
                    <div className="w-full flex mb-4 justify-center text-2xl text-red-500">
                        Login
                    </div>
                    <div className="flex flex-col gap-4 mb-6">
                        <div className="w-full">
                            <select
                                name="position"
                                className="p-3 w-full bg-red-500 text-md rounded-lg text-white font-thin"
                                onChange={(e) => setPosition(e.target.value)}
                                required
                                value={position}
                            >
                                <option value="" hidden>
                                    Select Operator Type
                                </option>
                                <option
                                    value={"manager"}
                                    className="border-black border-2 p-2"
                                >
                                    {"Manager"}
                                </option>
                                <option
                                    value={"supermanager"}
                                    className="border-black border-2 p-2"
                                >
                                    {"Supermanager"}
                                </option>
                            </select>
                        </div>
                        <div className="relative w-full">
                            <input
                                required
                                name="email_id"
                                placeholder="Enter User ID"
                                type="email"
                                value={email_id}
                                onChange={(e) => setEmail(e.target.value)}
                                className="rounded-md border-2 border-gray-200 w-full p-2 px-3"
                            />
                            <div className="w-3 text-sm fas fa-user text-red-500 absolute right-4 top-1/2 transform -translate-y-1/2" />
                        </div>
                        <div className="relative w-full">
                            <input
                                required
                                name="password"
                                placeholder="Password / Employee Code"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="rounded-md border-2 border-gray-200 w-full p-2 px-3"
                            />
                            <div className="w-3 text-sm fa-solid fa-key text-red-500 absolute right-4 top-1/2 transform -translate-y-1/2" />
                        </div>
                        <div className="flex flex-row justify-between">
                            <button
                                type="button"
                                onClick={() => setRememberMe(!rememberMe)}
                                className="text-base font-thin text-red-500"
                            >
                                <div
                                    className={`${
                                        rememberMe
                                            ? "fas fa-check-square"
                                            : "far fa-square"
                                    } mr-2`}
                                />
                                Remember Me
                            </button>
                            <Link
                                to=""
                                type="button"
                                className="text-base font-thin text-red-500"
                            >
                                Forgot ID / Password?
                            </Link>
                        </div>
                    </div>
                    <div className="flex justify-center w-full mb-3">
                        <button
                            disabled={loading}
                            className="bg-red-500 items-center flex justify-center w-1/2 h-10 rounded-xl text-white font-medium text-xl focus:outline-none"
                            value="Login"
                            type="submit"
                        >
                            {loading ? (
                                <div className="border-2 border-t-transparent h-5 w-5 animate-spin rounded-full" />
                            ) : (
                                "Sign In"
                            )}
                        </button>
                    </div>
                    <p className="text-center text-base">
                        {"New User? "}
                        <Link to="/" className="underline text-blue-700">
                            Sign Up
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Login;
