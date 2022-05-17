import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Logo from ".././assets/Images/Logo.png";
import chefLogin from ".././assets/Images/chefLogin.png";
import { NotificationContext } from "../context/Notification";
import { BackendUrl } from "../config";

const SignUp = () => {
    const navigate = useNavigate()
    const notify = useContext(NotificationContext);
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState({
        fullName: "",
        email_id: "",
        contact: "",
        position: "",
        password: "",
    });
    let name, value;
    const handleInputs = (e) => {
        name = e.target.name;
        value = e.target.value;
        setUser({ ...user, [name]: value });
    };

    const registerUser = async (e) => {
        e.preventDefault();
        setLoading(true);
        axios
            .post(`${BackendUrl}/app/signup`, user)
            .then((res) => {
                notify(res?.data?.message || "User Registered Successfully!");
                navigate('/login')
            })
            .catch((err) =>
                notify(err?.response?.data?.message || "Unable To Register")
            )
            .finally(() => setLoading(false));
    };

    return (
        <div className="flex flex-col">
            <div className="bg-white py-2">
                <img className="mx-auto w-28 h-auto mb-4" src={Logo} alt="" />
            </div>
            <div className="mb-10">
                <div className="flex flex-row h-auto m-auto bg-white w-3/4 rounded-3xl shadow-2xl">
                    <img src={chefLogin} alt="" />
                    <form
                        onSubmit={registerUser}
                        className="flex flex-col justify-center w-1/2 md:w-1/3 px-6 mx-auto py-4 font-bold font-roboto text-lg justify"
                    >
                        <div className="w-full mb-4 flex justify-center text-red-500 text-2xl">
                            Sign up
                        </div>
                        <div className="flex flex-col gap-4 mb-6">
                            <select
                                name="position"
                                className="p-3 w-full bg-red-500 text-md rounded-lg text-white font-thin"
                                onChange={handleInputs}
                                required
                                value={user.position}
                            >
                                <option value="" hidden>
                                    Select Operator Type
                                </option>
                                <option
                                    value={"manager"}
                                    className="border-black border-2 p-2"
                                >
                                    Manager
                                </option>
                                <option
                                    value={"supermanager"}
                                    className="border-black border-2 p-2"
                                >
                                    Supermanager
                                </option>
                            </select>
                            <div className="relative w-full">
                                <input
                                    required
                                    name="fullName"
                                    type="text"
                                    value={user.fullName}
                                    onChange={handleInputs}
                                    placeholder="Full Name"
                                    className="rounded-md border-2 border-gray-200 w-full p-2 px-3"
                                />
                                <div className="w-3 text-sm fas fa-user text-red-500 absolute right-4 top-1/2 transform -translate-y-1/2" />
                            </div>
                            <div className="relative w-full">
                                <input
                                    required
                                    name="email_id"
                                    type="email"
                                    value={user.email_id}
                                    onChange={handleInputs}
                                    placeholder="Email Id"
                                    className="rounded-md border-2 border-gray-200 w-full p-2 px-3"
                                />
                                <div className="w-3 text-sm fas fa-at text-red-500 absolute right-4 top-1/2 transform -translate-y-1/2" />
                            </div>
                            <div className="relative w-full">
                                <input
                                    required
                                    name="contact"
                                    type="tel"
                                    value={user.contact}
                                    onChange={handleInputs}
                                    placeholder="Phone Number"
                                    className="rounded-md border-2 border-gray-200 w-full p-2 px-3"
                                />
                                <div className="w-3 text-sm fa-solid fa-address-book text-red-500 absolute right-4 top-1/2 transform -translate-y-1/2" />
                            </div>
                            <div className="relative w-full">
                                <input
                                    required
                                    name="password"
                                    type="password"
                                    value={user.password}
                                    onChange={handleInputs}
                                    placeholder="Password"
                                    className="rounded-md border-2 border-gray-200 w-full p-2 px-3"
                                />
                                <div className="w-3 text-sm fa-solid fa-key text-red-500 absolute right-4 top-1/2 transform -translate-y-1/2" />
                            </div>
                        </div>
                        <div className="flex justify-center w-full mb-3">
                            <button
                                disabled={loading}
                                className="bg-red-500 items-center flex justify-center w-1/2 h-10 rounded-xl text-white font-medium text-xl focus:outline-none"
                                value="Register"
                                type="submit"
                            >
                                {loading ? (
                                    <div className="border-2 border-t-transparent h-5 w-5 animate-spin rounded-full" />
                                ) : (
                                    "Register"
                                )}
                            </button>
                        </div>
                        <p className="text-center text-base">
                            {"Already registered? "}
                            <Link
                                to="/login"
                                className="underline text-blue-700"
                            >
                                Login
                            </Link>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
