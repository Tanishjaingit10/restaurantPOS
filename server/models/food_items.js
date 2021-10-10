const mongoose = require('mongoose')

const food_item_template = new mongoose.Schema({

    foodItem:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    image:{
        data: Buffer,
        contentType: String
    },
    description:{
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
    },


})

module.exports = mongoose.model('food_items', food_item_template)