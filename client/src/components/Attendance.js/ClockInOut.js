import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BackendUrl } from "../../config";
import Popup from "../Popup";
// import signin from '.../popup.js';
let buttonValue = "Clock In";
let finalUser;
const ClockInOut = () => {
    const navigate = useNavigate();
    const [user, setUser] = useState({ fullName: "", email_id: "" });
    const [isOpen, setIsOpen] = useState(false);
    const [isError, setIsError] = useState(false);
    const [msg, setMsg] = useState("");
    let name, value;
    const handleInputs = (e) => {
        name = e.target.name;
        value = e.target.value;
        setUser({ ...user, [name]: value });
    };
    const onHome = (e) => {
        navigate("/dashboard");
    };
    const loadUser = () => {
        if (user.email_id) {
            axios.get(`${BackendUrl}/app/user/${user.email_id}`).then((res) => {
                finalUser = res.data;
                if (res?.data?.attendance?.status === "Clocked In")
                    buttonValue = "Clock Out";
            });
        }
    };
    useEffect(() => {
        loadUser();
    });

    const enterUser = async (e) => {
        e.preventDefault();

        axios
            .post(`${BackendUrl}/app/attendance`, {
                email_id: user.email_id,
                password: user.password,
            })
            .then(() => {
                finalUser.attendance = {
                    status:
                        buttonValue === "Clock In"
                            ? "Clocked In"
                            : "Clocked Out",
                    checkinTime:
                        buttonValue === "Clock In"
                            ? new Date().toLocaleTimeString()
                            : finalUser.attendance.checkinTime,
                    checkoutTime:
                        buttonValue === "Clock In"
                            ? "N/A"
                            : new Date().toLocaleTimeString(),
                    date: new Date().toISOString().split("T")[0],
                };
                setMsg("Successful!");
                setIsOpen(!isOpen);
                return axios.put(`${BackendUrl}/app/updateUser/${user.email_id}`, {
                    finalUser,
                });
            })
            .catch((err) => {
                setIsError(!isError);
                setMsg("Invalid Credentials!");
            });
    };

    return (
        <div>
            <nav className="bg-primary py-6 px-1 mt-0 h-auto w-full top-0 text-2xl ">
                <div className="text-center w-full relative">
                    <div className=" text-white ml-4 absolute left-4">
                        <Link to="/attendance">
                            <i className="fas fa-arrow-left mr-4" />
                            Back
                        </Link>
                    </div>
                    <div className="text-white px-2  font-semibold">
                        Clock In / Out
                    </div>
                </div>
            </nav>
            <div className="mt-20">
                <form className="w-1/2 md:w-1/3 mx-auto py-10 font-bold font-roboto text-lg">
                    <div className="shadow-2xl">
                        <div className="bg-primary px-6 pt-4">
                            <label className="text-left text-white">
                                Enter User Id
                            </label>
                            <input
                                name="email_id"
                                type="email"
                                value={user.email_id}
                                onChange={handleInputs}
                                className={
                                    "w-full p-2 border-black border-2 outline-none text-sm transition duration-150 ease-in-out mb-4 mt-2"
                                }
                            />
                        </div>

                        <div className="bg-primary px-6 pb-4">
                            <label className="text-white text-left">
                                Password / Employee Code
                            </label>
                            <input
                                name="password"
                                type="password"
                                value={user.password}
                                onChange={handleInputs}
                                // value={password}
                                // onChange={(e) => setPassword(e.target.value)}
                                className={
                                    "w-full p-2 border-black border-2 outline-none text-sm transition duration-150 ease-in-out mb-4 mt-2"
                                }
                            />
                        </div>
                    </div>
                    <div className="bg-white w-full my-6">
                        <button
                            className="bg-green w-full py-4 text-white font-semibold text-2xl focus:outline-none"
                            onClick={enterUser}
                            type="submit"
                        >
                            {buttonValue}
                        </button>
                    </div>
                    {/* <p className="text-center">New User ? <Link to="/" className="underline">Sign Up</Link></p> */}
                </form>
            </div>
            {isOpen && (
                <Popup
                    content={
                        <>
                            <p className="pb-4 text-red-500 font-bold">{msg}</p>
                            <button
                                className="bg-green px-10 py-2"
                                onClick={onHome}
                            >
                                Ok
                            </button>
                        </>
                    }
                    handleClose={onHome}
                />
            )}

            {isError && (
                <Popup
                    content={
                        <>
                            <p className="pb-4 font-bold text-red-500">{msg}</p>
                            <button
                                className="bg-green px-10 py-2"
                                onClick={enterUser}
                            >
                                Try Again
                            </button>
                        </>
                    }
                    handleClose={enterUser}
                />
            )}
        </div>
    );
};

export default ClockInOut;
