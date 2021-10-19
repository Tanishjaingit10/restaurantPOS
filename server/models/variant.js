const mongoose = require('mongoose')

const variant_template = new mongoose.Schema({

    variant:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    }
})

module.exports = mongoose.model('variant', variant_template)