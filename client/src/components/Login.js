import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';
import options from '../levels';
import Logo from '../images/logo.jpeg';
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

        await res.json();
        setIsOpen(!isOpen);
        console.log(res.status)
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
        <div className="h-screen">
        <div className="bg-gray-300 py-2">
        <img className="mx-auto w-36 h-auto" src={Logo} alt=""/>
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
    )

}

export default Login
