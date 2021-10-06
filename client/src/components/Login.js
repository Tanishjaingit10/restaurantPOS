import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';

const Login = () => {
    const history = useHistory();
    const [email_id, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const loginUser = async (e) => {
        e.preventDefault();

        const res = await fetch("app/signin", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email_id, password
            })
        });

        const data = await res.json();

        if (data.status === 422 || !data) {
            window.alert("Invalid credentials");
            console.log("Invalid credentails");
        }
        else {
            window.alert("Successful");
            console.log("Successful");

            history.push("/");
        }
    }

    return (
        /*<div>
            <form method="POST" className="container">
                <div className="form-group">
                    <label htmlFor="email">Email address</label>
                    <input type="email" className="form-control" name="email_id" id="email" value={email_id} onChange={(e) => setEmail(e.target.value)} />

                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" className="form-control" name="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <button type="submit" className="btn btn-primary" value="Log In" onClick={loginUser}>Submit</button>
                <p>Create account<a href="/signup">Sign Up</a></p>
            </form>
        </div>*/
        <figure className="h-screen flex bg-gray-100">
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
        </figure>
    )

}

export default Login
