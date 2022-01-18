const signup_template_copy = require('../models/registered_users')
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");
const attendance_template_copy = require('../models/attendance')

const show_users = async (request, response, next)=>{
    signup_template_copy.find({},(err,data) =>{
        if(!err)
            response.send(data);
        else 
            console.log(err);

    });
}

const get_user = async (request, response) => {
    signup_template_copy.findOne({ email_id: request.params.id }, (err, data) => {
        if (!err) {
            if (data === null)
                response.json({ message: 'Item not found!' })
            else response.send(data);
        }
        else
        {
            response.json({ message: 'Item could not be shown!' })
        }
    });
}

const add_user =async (request, response, next)=>{
    const{fullName,email_id,contact,position,password,attendence}=request.body;
    if(!fullName||!email_id||!contact||!position||!password)
            return response.status(422).json({error:"Please fill out all the fields!"})
    const saltPassword = await bcrypt.genSalt(10)
    const securePassword = await bcrypt.hash(password, saltPassword)
    await signup_template_copy.findOne({email_id:email_id}).then((userExist)=>{
        if(userExist){
            return response.status(402).json({error:"User Already Exists!"})
        }
        const user = new signup_template_copy({fullName, email_id,contact,position,password:securePassword, attendence})
        user.save().then((res)=>{
            response.status(201).json({message: "User registered successfully!"})
            const newAttendees = new attendance_template_copy({user_id: res['_id'], status: 'Shift Not Started', checkInTime: 'N/A', checkOutTime: 'N/A', date: new Date().toLocaleDateString('pt-br').split( '/' ).reverse( ).join( '-' ) })
            newAttendees.save().then((res)=>{
                console.log("Attendees saved successfully")
            })
            .catch((err)=>{console.log(err)});
        })
        .catch(error =>{
            response.status(401).json({error: "Registeration Failed!"})
        })

    });

}
const login = async (request, response, next)=>{
    try{
        console.log(request)
        let token;
        const{email_id,password}=request.body;
        if(!email_id||!password)
            return response.status(402).json({error:"Please fill out all the fields!"})

        const userLogin = await signup_template_copy.findOne({email_id : email_id})
        
        if(userLogin){
            const isMatch = await bcrypt.compare(password, userLogin.password);
          
           
            if(!isMatch){
                response.status(401).json({error:"Invalid Credentials"});
            }
            else{
                token = await userLogin.generateAuthToken();
                response.cookie("jwtoken",token,{
                    expires: new Date(Date.now()+25892000000),
                    httpOnly: true
                })
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
const attendence = async (request, response)=>{
    try{
        const{email_id,password}=request.body;
        if(!email_id||!password)
            return response.status(402).json({error:"Please fill out all the fields!"})

        const userLogin = await signup_template_copy.findOne({email_id : email_id})
        
        if(userLogin){
            const isMatch = await bcrypt.compare(password, userLogin.password);
          
           
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
const update_user = async (request, response, next) => {
    let itemId = request.params.id;
    // console.log(itemId)
    const{fullName,email_id,contact,position,password,attendence}=request.body.finalUser;
    let updatedData = {
        fullName:fullName,
        email_id:email_id,
        contact:contact,
        position:position,
        password:password,
        attendence:attendence
    }
    if (!email_id || !fullName)
        return response.status(422).json({ error: "Please fill out the required fields!" })
    signup_template_copy.findOneAndUpdate({ email_id: email_id }, { $set: updatedData }).then((data) => {
        if (data === null)
            response.json({ message: 'Item not found!' })
        else response.status(200).json({ message: 'Item updated successfully!' })
    })
        .catch(error => {
            response.status(401).json({ message: 'Item could not be updated!' })
        })

}

module.exports = {
    show_users, add_user, login, get_user, update_user, attendence
}

