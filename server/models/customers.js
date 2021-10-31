const mongoose = require('mongoose')

const customer_template = new mongoose.Schema({

    name:{
        type:String,
        required:true
    },
    contact:{
        type:String,
        // required:true
    },
    email:{
        type:String,
    }
})

module.exports = mongoose.model('customers', customer_template)