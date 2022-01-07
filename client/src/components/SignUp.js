import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import signup from "../popup";
import options from "../levels";
import Logo from "../images/logo.jpeg";
import Popup from "./Popup";
import chefLogin from "../images/chefLogin.png";
import { ThemeContext } from "../context/Theme";

const SignUp = () => {
  const history = useHistory();
  const [user, setUser] = useState({
    fullName: "",
    email_id: "",
    contact: "",
    position: "",
    password: "",
  });
  const theme = useContext(ThemeContext);
  const [isOpen, setIsOpen] = useState(false);
  const [attendence, setAttendence] = useState({
    status: "Session Not Started",
    checkinTime: "N/A",
    checkoutTime: "N/A",
    date: "N/A",
  });
  const [msg, setMsg] = useState("");
  const [isError, setIsError] = useState(false);
  let name, value;
  console.log(attendence);
  const handleInputs = (e) => {
    name = e.target.name;
    value = e.target.value;
    setUser({ ...user, [name]: value });
  };
  const onLogin = (e) => {
    history.push("/login");
  };

  const registerUser = async (e) => {
    e.preventDefault();
    const { fullName, email_id, contact, position, password } = user;
    const res = await fetch("/app/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        fullName,
        email_id,
        contact,
        position,
        password,
        attendence,
      }),
    });

    if (res.status === 201) {
      let ans = "Registration Successful";
      setMsg(ans);
      setIsOpen(!isOpen);
    } else {
      let obj = signup.find((pop) => pop.id === res.status);
      setMsg(obj.title);
      setIsError(!isError);
    }
  };

  return (
    <div>
      <div className="bg-white py-2">
        <img className="mx-auto w-28 h-auto mb-4" src={Logo} alt="" />
      </div>
      <div className="mb-10">
        <div className="flex flex-row h-auto m-auto bg-white w-3/4 rounded-3xl shadow-2xl">
          <img src={chefLogin} />

          <form className="w-1/2 md:w-1/3 mx-auto py-4 font-bold font-roboto text-lg justify">
            <div>
              <div className="bg-white px-6 py-4">
                <div className="w-full justify-center">
                  <h1
                    style={{ color: theme.backgroundColor }}
                    className="text-center text-2xl"
                  >
                    Login
                  </h1>
                </div>
                <label className="text-left text-black mr-4 font-normal">
                  Position
                </label>
                <select
                  name="position"
                  className="p-2 border-2 w-full text-md rounded-lg  text-white  font-thin"
                  onChange={handleInputs}
                  style={{ backgroundColor: theme.backgroundColor }}
                  value={user.position}
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
              <div className=" px-6 pt-4">
                <label className="text-left font-normal">Fullname</label>
                <input
                  name="fullName"
                  type="text"
                  value={user.fullName}
                  onChange={handleInputs}
                  placeholder="Full Name"
                  className={
                    "w-full p-2 rounded-lg border-gray-200 border-2 outline-none text-sm transition duration-150 ease-in-out mb-4 mt-2"
                  }
                />
              </div>
              <div className=" px-6">
                <label className="text-left font-normal  ">Email id</label>
                <input
                  name="email_id"
                  type="email"
                  value={user.email_id}
                  onChange={handleInputs}
                  placeholder="Email Id"
                  className={
                    "w-full p-2 rounded-lg border-gray-200 border-2 outline-none text-sm transition duration-150 ease-in-out mb-4 mt-2"
                  }
                />
              </div>
              <div className=" px-6">
                <label className="text-left font-normal  ">
                  Contact Number
                </label>
                <input
                  name="contact"
                  type="phone"
                  value={user.contact}
                  onChange={handleInputs}
                  placeholder="Phone Number"
                  className={
                    "w-full p-2 rounded-lg border-gray-200 border-2 outline-none text-sm transition duration-150 ease-in-out mb-4 mt-2"
                  }
                />
              </div>

              <div className=" px-6 pb-4">
                <label className=" font-normal  text-left">Password</label>
                <input
                  name="password"
                  type="password"
                  value={user.password}
                  onChange={handleInputs}
                  placeholder="Password"
                  className={
                    "w-full p-2 rounded-lg border-gray-200 border-2 outline-none text-sm transition duration-150 ease-in-out mb-4 mt-2"
                  }
                />
              </div>
            </div>
            <div className="w-1/2 my-3 m-auto">
              <button
                style={{ backgroundColor: theme.backgroundColor }}
                className="text-center w-full m-auto py-3 rounded-xl  text-white  font-medium text-xl focus:outline-none"
                value="Register"
                onClick={registerUser}
                type="submit"
              >
                Register
              </button>
            </div>
            <p className="text-center">
              Already registered ?{" "}
              <a href="/login" className="underline">
                Login
              </a>
            </p>
          </form>
        </div>
      </div>
      {isError && (
        <Popup
          content={
            <>
              <p className="pb-4 text-red font-bold">{msg}</p>
              <button className="bg-green px-10 py-2" onClick={registerUser}>
                Try Again
              </button>
            </>
          }
          handleClose={registerUser}
        />
      )}
      {isOpen && (
        <Popup
          content={
            <>
              <p className="pb-4 font-bold text-green">{msg}</p>
              <button className=" px-10 py-2" onClick={onLogin}>
                Ok
              </button>
            </>
          }
          handleClose={onLogin}
        />
      )}
    </div>
  );
};

export default SignUp;
