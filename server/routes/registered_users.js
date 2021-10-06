const express = require('express')
const jwt = require('jsonwebtoken')
const router = express.Router()
const signup_template_copy = require('../models/registered_users')
const bcrypt = require('bcrypt')

router.post('/signup', async (request, response)=>{

    const{fullName,email_id,password}=request.body;
    if(!fullName||!email_id||!password)
            return response.status(422).json({error:"Please fill out all the fields!"})
    const saltPassword = await bcrypt.genSalt(10)
    const securePassword = await bcrypt.hash(password, saltPassword)
    await signup_template_copy.findOne({email_id:email_id}).then((userExist)=>{
        if(userExist){
            return response.status(422).json({error:"User Already Exists!"})
        }
        const user = new signup_template_copy({fullName, email_id,password:securePassword})
        user.save().then(()=>{
            response.status(201).json({message: "User registered successfully!"})
        })
        .catch(error =>{
            response.status(422).json({error: "Registeration Failed!"})
        })

    });
    

});
router.post('/signin', async (request, response)=>{
    try{
        let token;
        const{email_id,password}=request.body;
        if(!email_id||!password)
            return response.status(401).json({error:"Please fill out all the fields!"})

        const userLogin = await signup_template_copy.findOne({email_id : email_id})
        
        if(userLogin){
            const isMatch = await bcrypt.compare(password, userLogin.password);
            token = await userLogin.generateAuthToken();
            // console.log(token);

            if(!isMatch){
                response.status(401).json({error:"Invalid Credentials"});
            }
            else{
                response.json({message:"User Sign in successfully"});
            }

        }
        else{
            response.status(401).json({error:"Invalid Credentials"});
        }
        
    }
    catch(error){
        response.json(error)
    }
});


module.exports = router