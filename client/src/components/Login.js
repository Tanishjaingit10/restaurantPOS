import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import options from "../levels";
import Logo from "../images/logo.jpeg";
import signin from "../signin";
import Popup from "./Popup";
import chefLogin from "../images/chefLogin.png";

const Login = () => {
  const history = useHistory();
  const [email_id, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [position, setPosition] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [msg, setMsg] = useState("");

  const loginUser = async (e) => {
    e.preventDefault();

    const res = await fetch("/app/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        position,
        email_id,
        password,
      }),
    });

    setIsOpen(!isOpen);
    if (res.status === 201) {
      history.push("/home");
    } else {
      let obj = signin.find((pop) => pop.id === res.status);
      setMsg(obj.title);
    }
  };

  return (
    <div className="h-screen">
      <div className="bg-white py-2 ">
        <img className="mx-auto w-28 h-auto mb-4 " src={Logo} alt="" />
      </div>
      <div className="flex flex-row h-auto m-auto bg-white w-3/4 rounded-3xl shadow-2xl">
        <img src={chefLogin} />
        <form className="w-1/2 md:w-1/3 mx-auto py-10 font-bold font-roboto text-lg">
          <div>
            <div className="bg-white px-6 py-4 ">
              <div className="w-full justify-center">
                <h1 className="text-red text-center text-2xl">Login</h1>
              </div>
              <label className="text-left text-black mr-4 font-normal">
                Enter as
              </label>
              <select
                name="position"
                className="p-2  border-2 w-full text-md bg-red rounded-lg text-white font-thin"
                onChange={(e) => setPosition(e.target.value)}
                value={position}
              >
                <option value="none" selected="selected" hidden>
                  Select Operator Type
                </option>
                {options.map((option) => (
                  <option
                    value={option.value}
                    className="bg-gray-300 border-black border-2 p-2"
                  >
                    {option.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="bg-white px-6 pt-4">
              <label className="text-left font-normal">Enter User Id</label>
              <input
                name="email_id"
                placeholder="Enter User ID"
                type="email"
                value={email_id}
                onChange={(e) => setEmail(e.target.value)}
                className={
                  "w-full p-2 rounded-lg border-gray-200 border-2 outline-none text-sm transition duration-150 ease-in-out mb-4 mt-2"
                }
              />
            </div>
            <div className="bg-white px-6 pb-4">
              <label className=" text-left font-normal">Password</label>
              <input
                name="password"
                placeholder="Password / Employee Code"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={
                  "w-full p-2 rounded-lg border-gray-200 border-2 outline-none text-sm transition duration-150 ease-in-out mb-4 mt-2"
                }
              />
            </div>
            <div className="flex flex-row justify-between">
              <div className="mx-6">
                <input
                  type="checkbox"
                  id="remember"
                  name="remember"
                  value="Remember Me"
                />
                <span className="text-red text-base font-thin">
                  {"  "}Remember Me
                </span>
              </div>
              <a className="text-red text-base font-thin">
                Forgot ID / Password?
              </a>
            </div>
          </div>
          <div className="w-1/2 my-6 m-auto">
            <button
              className="bg-red text-center w-full m-auto py-3 rounded-xl text-white font-medium text-xl focus:outline-none"
              value="Login"
              onClick={loginUser}
              type="submit"
            >
              Sign In
            </button>
          </div>

          <p className="text-center">
            New User ?{" "}
            <a href="/" className="underline">
              Sign Up
            </a>
          </p>
        </form>
      </div>
      {isOpen && (
        <Popup
          content={
            <>
              <p className="pb-4 text-red font-bold">{msg}</p>
              <button className="bg-green px-10 py-2" onClick={loginUser}>
                Try Again
              </button>
            </>
          }
          handleClose={loginUser}
        />
      )}
    </div>
  );
};

export default Login;
