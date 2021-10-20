const mongoose = require('mongoose')

const variant_template = new mongoose.Schema({

    variant:{
        type:String,
    },
    description:{
        type:String,
    },
    price:{
        type:Number,
    }
})

module.exports = mongoose.model('variant', variant_template)