import React, { useState } from 'react'
import { useHistory } from 'react-router-dom';

const Login = () => {
    const history = useHistory();
    const [email_id, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const loginUser = async (e) => {
        e.preventDefault();

        const res = await fetch("/signin", {
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

        return (
            <div>
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
            </div>
        )
    }
}

    export default Login
