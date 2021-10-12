import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import signup from '../popup';
import options from '../levels';
import Logo from '../images/logo.PNG'
import Popup from './Popup';

const SignUp = () => {
    const history = useHistory();
    const [user, setUser] = useState({ fullName: "", email_id: "", contact: "", position: "", password: "" });
    let name, value;
    const handleInputs = (e) => {
        console.log(e);
        name = e.target.name;
        value = e.target.value;
        setUser({ ...user, [name]: value });
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
                fullName, email_id, contact, position, password
            })
        });

        const data = await res.json();
        console.log(contact);
        console.log(position);
        console.log(res.status);

        if (res.status === 201) {
            window.alert("Successful registration");
            console.log("Successful Registration");
            history.push("/login");
           
        }
        else {
                let obj = signup.find((msg) => msg.id === res.status);
                console.log(obj.title);
                return (
                    <div>{obj.title}</div>
                );
        }
    }


    return (
        <div className="h-screen">
            <div className="bg-gray-300 py-2">
                <img className="mx-auto w-36 h-auto" src={Logo} />
                {/*<h1 className="text-center font-bold text-4xl">Logo</h1>*/}
            </div>
            <div>
                <form className="w-1/2 md:w-1/3 mx-auto py-10 font-bold font-roboto text-lg">
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
                    <div className="bg-white w-full my-6">
                        <button className="bg-green w-full py-4 text-white font-semibold text-2xl focus:outline-none"
                            value="Register" onClick={registerUser} type="submit">Register</button>
                    </div>
                    <p className="text-center">Already registered ? <a href="/login" className="underline">Login</a></p>
                </form>
            </div>
        </div>
        /*
      <figure className="h-screen flex flex-col space-y-10">
             <div className="bg-gray-300 py-10">
                 <h1 className="w-60 mx-auto text-center font-bold text-4xl">Logo</h1>
             </div>
             <div className="w-full max-w-md m-auto bg-transparent border border-primaryBorder shadow-default bg-white">
                
 
                 <div className="text-primary text-black">
                     <div className="flex items-center mt-3 justify-center">
                         <h1 className="text-2xl font-medium text-primary mt-4 mb-2 text-white">
                             Sign Up to create account
                         </h1>
                     </div>
                     <form>
                         <div className="bg-yellow-500">
                         <label className="text-left">Fullname</label>
                         <input
                             name="fullName"
                             type="text"
                             value={user.fullName} onChange={handleInputs}
                             placeholder="Fullname"
                             className={
                                 "w-full p-2 text-primary border outline-none text-sm transition duration-150 ease-in-out mb-4"
                             }
                         />
                         <label>Email id</label>
                         <input
                             name="email_id"
                             type="email"
                             value={user.email_id}
                             onChange={handleInputs}
                             placeholder="Email id"
                             className={
                                 "w-full p-2 text-primary border outline-none text-sm transition duration-150 ease-in-out mb-4"
                             }
                         />
                         <label>Contact Number</label>
                         <input
                             name="contact"
                             type="phone"
                             value={user.contact}
                             onChange={handleInputs}
                             placeholder="Contact Number"
                             className={
                                 "w-full p-2 text-primary border outline-none text-sm transition duration-150 ease-in-out mb-4"
                             }
                         />
                         <label>Position</label>
                         <select name="position" className = "mr-2" onChange={handleInputs} value={user.position}>
                             <option>Select</option>
         
                             {options.map((option)=>(
                                 <option value={option.value}>{option.label}</option>
 
                             )) }
                             
                         </select>
                         <br/>
                         <label>Password</label>
                         <input
                             name="password"
                             type="password"
                             value={user.password}
                             onChange={handleInputs}
                             placeholder="Password"
                             className={
                                 "w-full p-2 text-primary border outline-none text-sm transition duration-150 ease-in-out mb-4"
                             }
                         />
                         </div>
                         <div className="flex items-center mt-3 justify-center">
                             <button
                                 className={
                                     " bg-gray-400 hover:bg-blue-500 py-2 px-4 text-md text-white border border-blue focus:outline-none focus:border-black"
                                 }
                                 value="SignUp" onClick={registerUser} type="submit">
                                 SignUp
                             </button>
                         </div>
                     </form>
                     <div className="flex items-center mt-3 justify-center">
                         <button className={"justify-center text-blue-500 hover:underline"} >
                             Already have an account? <a href="/login">Login</a>
                         </button>
                     </div>
                 </div>
 
             </div>
         </figure>*/


    )
}

export default SignUp
