const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config({path:'../config.env'})
const signup_template = new mongoose.Schema({

    fullName:{
        type:String,
        required:true
    },
    email_id:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    tokens:[
        {
            token:{

                type:String,
                required:true
            }
        }
    ]

})

//generating tokens
signup_template.methods.generateAuthToken = async function () {
    console.log(1)
    try{
        console.log(process.env.SECRET_KEY);
        let token= jwt.sign({_id:this._id}, process.env.SECRET_KEY)
        this.tokens=this.tokens.concat({token:token});
        await this.save()
        return token;
    }

    catch(error){
        console.log(error)
    }
    
}
module.exports = mongoose.model('Restaurant_database', signup_template)