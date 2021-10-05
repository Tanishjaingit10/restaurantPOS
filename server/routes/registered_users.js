const express = require('express')
const jwt = require('jsonwebtoken')
const router = express.Router()
const signup_template_copy = require('../models/registered_users')
const bcrypt = require('bcrypt')

router.post('/signup', async (request, response)=>{

    const saltPassword = await bcrypt.genSalt(10)
    const securePassword = await bcrypt.hash(request.body.password, saltPassword)
    const signedUpUser = new signup_template_copy({
        fullName:request.body.fullName,
        email_id:request.body.email_id,
        password:securePassword
    })
    signedUpUser.save().then(data=>{
        response.json(data)
    })
    .catch(error =>{
        response.json(error)
    })

});
router.post('/signin', async (request, response)=>{
    try{
        let token;
        const{email_id,password}=request.body;
        if(!email_id||!password)
            return response.status(400).json({error:"Please fill out all the fields!"})

        const userLogin = await signup_template_copy.findOne({email_id : email_id})
        
        
        if(userLogin){
            const isMatch = await bcrypt.compare(password, userLogin.password);
            const token = await userLogin.generateAuthToken();
            console.log(token);

            if(!isMatch){
                response.status(400).json({error:"Invalid Credentials"});
            }
            else{
                response.json({message:"User Sign in successfully"});
            }

        }
        else{
            response.status(400).json({error:"Invalid Credentials"});
        }
        
    }
    catch(error){
        response.json(error)
    }
});


module.exports = router