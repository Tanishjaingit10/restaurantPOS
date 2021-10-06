import React, {useState} from 'react';
import { useHistory } from 'react-router-dom';

const SignUp = () => {
    const history = useHistory();
    const [user, setUser] = useState({fullName:"", email_id:"",password:""});

    let name, value;
    const handleInputs = (e)=> {
          console.log(e);
          name = e.target.name;
          value = e.target.value;
          setUser({...user,[name]:value});
    }

    const registerUser = async (e) =>{
        e.preventDefault();
        const {fullName, email_id, password} = user;
        const res = await fetch("/app/signup",{
            method:"POST",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                fullName, email_id, password
            })
        });
        
        const data = await res.json();

        if(data.status=== 422 || !data)
        {
            window.alert("Invalid registration");
            console.log("Invalid Registration");
        }
        else{
            window.alert("Successful registration");
            console.log("Successful Registration");

            history.push("/login");
        }
    }

    return (
       /* <div>
            <form method="POST" className="container mt-4 mx-auto">
            <div className="form-group">
                    <label htmlFor="name">Full Name</label>
                    <input type="text" className="form-control" name="fullName" id="name" value={user.fullName} onChange={handleInputs} />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email address</label>
                    <input type="email" className="form-control" name="email_id" id="email" value={user.email_id} onChange={handleInputs}/>

                </div>
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" className="form-control" name="password" id="password" value={user.password} onChange={handleInputs}/>
                </div>
                <button type="submit" className="btn btn-primary" onClick={PostData}>Submit</button>
                <p>Already have an account?<a href="/login">Login</a></p>
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
                            SignUp to create account
                        </h1>
                    </div>
                    <form>
                        <label className="text-left">Fullname:</label>
                        <input
                            name="fullName"
                            type="text"
                            value={user.fullName} onChange={handleInputs}
                            placeholder="Fullname"
                            className={
                                "w-full p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4"
                            }
                        />
                        <label>Email id:</label>
                        <input
                            name="email_id"
                            type="email"
                            value={user.email_id}
                            onChange={handleInputs}
                            placeholder="Email id"
                            className={
                                "w-full p-2 text-primary border rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4"
                            }
                        />
                        <label>Password:</label>
                        <input
                            name="password"
                            type="password"
                            value={user.password}
                            onChange={handleInputs}
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
        </figure>
    )
}

export default SignUp
