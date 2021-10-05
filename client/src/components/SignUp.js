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

    const PostData = async (e) =>{
        e.preventDefault();
        const {fullName, email_id, password} = user;
        const res = await fetch("/signup",{
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
        <div>
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
           
        </div>
    )
}

export default SignUp
