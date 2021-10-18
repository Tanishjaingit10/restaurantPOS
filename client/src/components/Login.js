import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';
import options from '../levels';
import Logo from '../images/logo.PNG';
import signin from '../signin';
import Popup from './Popup';

const Login = () => {
    const history = useHistory();
    const [email_id, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [position, setPosition] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const [msg, setMsg] = useState("");

    const loginUser = async (e) => {
        e.preventDefault();

        const res = await fetch("/app/signin", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                position,email_id, password
            })
        });

        const data = await res.json();
        setIsOpen(!isOpen);
        
        if(res.status===201)
        {
           
            console.log("Successful");
            history.push("/home");
        }
        else
        {
            let obj = signin.find((pop) => pop.id === res.status);
            setMsg(obj.title);
            console.log(msg);  
        }
    }

    return (
        <div className="h-screen overflow-hidden">
        <div className="bg-gray-300 py-2">
        <img className="mx-auto w-36 h-auto" src={Logo}/>
        </div>
        <div>
            <form className="w-1/2 md:w-1/3 mx-auto py-10 font-bold font-roboto text-lg">
                <div className="shadow-2xl">
                <div className="bg-white px-6 py-4">
                <label className="text-left text-black mr-4">Enter as</label>
                <select name="position" className ="p-2 border-black border-2 w-4/5 text-md" onChange={(e) => setPosition(e.target.value)} value={position}>
                            {options.map((option)=>(
                                <option value={option.value} className="bg-gray-300 border-black border-2 p-2">{option.label}</option>

                            )) }
                            
                        </select>
                </div>
               
                <div className="bg-primary px-6 pt-4">
                <label className="text-left text-white">Enter User Id</label>
                        <input
                        name="email_id"
                        type="email"
                        value={email_id}
                        onChange={(e) => setEmail(e.target.value)}
                            
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
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                           
                            className={
                                "w-full p-2 border-black border-2 outline-none text-sm transition duration-150 ease-in-out mb-4 mt-2"
                            }
                        />
                </div>
                </div>
                <div className="bg-white w-full my-6">
                    <button className="bg-green w-full py-4 text-white font-semibold text-2xl focus:outline-none"
                      value="Login" onClick={loginUser} type="submit">Sign In</button>
                </div>
                <p className="text-center">New User ? <a href="/" className="underline">Sign Up</a></p>
            </form>
        </div>
        {isOpen && <Popup
      content={<>
       
        <p className="pb-4 text-red font-bold">{msg}</p>
        <button className="bg-green px-10 py-2" onClick={loginUser}>Try Again</button>
      </>}
      handleClose={loginUser}
    />}
    </div>
        /* <figure className="h-screen flex bg-gray-800">
            <div className="w-full max-w-md m-auto bg-white rounded-lg border border-primaryBorder shadow-default py-10 px-1">
                <blockquote className="text-2xl font-medium text-center">
                    <p className="text-lg font-semibold">Welcome to My-App</p>
                </blockquote>

                <div className="text-primary m-6">
                    <div className="flex items-center mt-3 justify-center">
                        <h1 className="text-2xl font-medium text-primary mt-4 mb-2">
                            Login to your account
                        </h1>
                    </div>
                    <form>
                        <label className="text-left">Username:</label>
                        <input
                            name="email_id"
                            type="email"
                            value={email_id}
                            onChange={(e) => setEmail(e.target.value)} 
                            placeholder="Username"
                            className={
                                "w-full p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4"
                            }
                        />
                        <label>Password:</label>
                        <input
                            name="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Password"
                            className={
                                "w-full p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4"
                            }
                        />
                        <div className="flex items-center mt-3 justify-center">
                            <button
                                className={
                                    "bg-blue-700 hover:bg-blue-500 py-2 px-4 text-md text-white rounded border border-blue focus:outline-none focus:border-black"
                                }
                                value="Login" onClick={loginUser} type="submit">
                                Login
                            </button>
                        </div>
                    </form>
                    <div className="flex items-center mt-3 justify-center">
                        <button className={"justify-center text-blue-500 hover:underline"} >
                            Need to register? <a href="/signup">SignUp</a>
                        </button>
                    </div>
                </div>

            </div>
        </figure>*/
    )

}

export default Login
