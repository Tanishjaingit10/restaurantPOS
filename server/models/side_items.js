const mongoose = require('mongoose')

const side_item_template = new mongoose.Schema({

    sideItem:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    availability:{
        type:Number,
        required:true
    }
})

module.exports = mongoose.model('side_items', signup_template)