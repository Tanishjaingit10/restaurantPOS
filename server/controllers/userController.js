const signup_template_copy = require('../models/registered_users')
const bcrypt = require('bcrypt')


const show_users = async (request, response, next)=>{
    signup_template_copy.find({},(err,data) =>{
        if(!err)
            response.send(data);
        else 
            console.log(err);

    });
}

const get_user = async(request,response) =>{
    signup_template_copy.findById(request.params.id,(err,data) =>{
        if(!err)
            response.send(data);
        else 
            console.log(err);

    });
}


const add_user =async (request, response, next)=>{
    const{fullName,email_id,contact,position,password}=request.body;
    if(!fullName||!email_id||!contact||!position||!password)
            return response.status(422).json({error:"Please fill out all the fields!"})
    const saltPassword = await bcrypt.genSalt(10)
    const securePassword = await bcrypt.hash(password, saltPassword)
    await signup_template_copy.findOne({email_id:email_id}).then((userExist)=>{
        if(userExist){
            return response.status(402).json({error:"User Already Exists!"})
        }
        const user = new signup_template_copy({fullName, email_id,contact,position,password:securePassword})
        user.save().then(()=>{
            response.status(201).json({message: "User registered successfully!"})
        })
        .catch(error =>{
            response.status(401).json({error: "Registeration Failed!"})
        })

    });

}
const login = async (request, response, next)=>{
    try{
        let token;
        const{email_id,password}=request.body;
        if(!email_id||!password)
            return response.status(402).json({error:"Please fill out all the fields!"})

        const userLogin = await signup_template_copy.findOne({email_id : email_id})
        
        if(userLogin){
            const isMatch = await bcrypt.compare(password, userLogin.password);
            token = await userLogin.generateAuthToken();
            // console.log(token);
            // response.cookie("jwtoken",token,{
            //     expires: new Date(Date.now()+25892000000),
            //     httpOnly: true
            // })
            if(!isMatch){
                response.status(401).json({error:"Invalid Credentials"});
            }
            else{
                response.status(201).json({message:"User Sign in successfully"});
            }

        }
        else{
            response.status(401).json({error:"Invalid Credentials"});
        }
        
    }
    catch(error){
        response.status(404).json(error)
    }
    
}
module.exports = {
    show_users, add_user, login, get_user
}

