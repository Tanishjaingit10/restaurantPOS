import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import signup from '../popup';
import options from '../levels';
import Logo from '../images/logo.jpeg'
import Popup from './Popup';

const SignUp = () => {
    const history = useHistory();
    const [user, setUser] = useState({ fullName: "", email_id: "", contact: "", position: "", password: "" });
    const [isOpen, setIsOpen] = useState(false);
    const [attendence, setAttendence] = useState({status: "Session Not Started", checkinTime: "N/A",checkoutTime: "N/A", date: "N/A" })
    const [msg, setMsg] = useState("");
    const [isError, setIsError] = useState(false);
    let name, value;
    console.log(attendence)
    const handleInputs = (e) => {
        name = e.target.name;
        value = e.target.value;
        setUser({ ...user, [name]: value });
    }
    const onLogin = (e) => {
        history.push('/login');
    }

    const registerUser = async (e) => {
        e.preventDefault();
        const { fullName, email_id, contact, position, password } = user;
        const res = await fetch("/app/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                fullName, email_id, contact, position, password, attendence
            })
        });
       
        if (res.status === 201) {
            let ans = "Registration Successful";
            setMsg(ans);
            setIsOpen(!isOpen);
           
        }
        else {
                let obj = signup.find((pop) => pop.id === res.status);
                setMsg(obj.title);
                setIsError(!isError);
        }
    }


    return (
        <div className="h-screen">
            <div className="bg-gray-300 py-2">
                <img className="mx-auto w-36 h-auto" src={Logo} alt="" />
            </div>
            <div>
                <form className="w-1/2 md:w-1/3 mx-auto py-4 font-bold font-roboto text-lg justify">
                    <div className="shadow-2xl">
                        <div className="bg-white px-6 py-4">
                            <label className="text-left text-black mr-4">Position</label>
                            <select name="position" className="p-2 border-black border-2 w-4/5 text-md" onChange={handleInputs} value={user.position}>
                                <option className="bg-gray-300 border-black border-2 p-4">Select</option>

                                {options.map((option) => (
                                    <option value={option.value} className="bg-gray-300 border-black border-2 p-2">{option.label}</option>

                                ))}

                            </select>
                        </div>
                        <div className="bg-primary px-6 pt-4">
                            <label className="text-left text-white">Fullname</label>
                            <input
                                name="fullName"
                                type="text"
                                value={user.fullName} onChange={handleInputs}

                                className={
                                    "w-full p-2 border-black border-2 outline-none text-sm transition duration-150 ease-in-out mb-4 mt-2"
                                }
                            />
                        </div>
                        <div className="bg-primary px-6">
                            <label className="text-left text-white">Email id</label>
                            <input
                                name="email_id"
                                type="email"
                                value={user.email_id} onChange={handleInputs}

                                className={
                                    "w-full p-2 border-black border-2 outline-none text-sm transition duration-150 ease-in-out mb-4 mt-2"
                                }
                            />
                        </div>
                        <div className="bg-primary px-6">
                            <label className="text-left text-white">Contact Number</label>
                            <input
                                name="contact"
                                type="phone"
                                value={user.contact} onChange={handleInputs}

                                className={
                                    "w-full p-2 border-black border-2 outline-none text-sm transition duration-150 ease-in-out mb-4 mt-2"
                                }
                            />
                        </div>

                        <div className="bg-primary px-6 pb-4">
                            <label className="text-white text-left">Password</label>
                            <input
                                name="password"
                                type="password"
                                value={user.password}
                                onChange={handleInputs}

                                className={
                                    "w-full p-2 border-black border-2 outline-none text-sm transition duration-150 ease-in-out mb-4 mt-2"
                                }
                            />
                        </div>
                    </div>
                    <div className="bg-white w-full my-4 mb-2">
                        <button className="bg-green w-full py-4 text-white font-semibold text-2xl focus:outline-none"
                            value="Register" onClick={registerUser} type="submit">Register</button>
                    </div>
                    <p className="text-center">Already registered ? <a href="/login" className="underline">Login</a></p>
                </form>
            </div>
            {isError && <Popup
      content={<>
       
        <p className="pb-4 text-red font-bold">{msg}</p>
        <button className="bg-green px-10 py-2" onClick={registerUser}>Try Again</button>
      </>}
      handleClose={registerUser}   
    />}
    {isOpen && <Popup
                content={<>

                    <p className='pb-4 font-bold text-green'>{msg}</p>
                    <button className="bg-primary px-10 py-2" onClick={onLogin}>Ok</button>
                </>}
                handleClose={onLogin}
            />}
  </div>
       
       


    )
}

export default SignUp
