const mongoose = require('mongoose')

const food_item_template = new mongoose.Schema({

    foodItem:{
        type:String,
        
    },
    category:{
        type:String,
        
    },

    time:{
        type:String
    },
    description:{
        type:String,
    },
    price:{
        type:Number,
        
    },
    availability:{
        type:String,
    },
    discount:{
        type:Number
    },
    image: {
        type:String
    },
    variant: {
        type: [String]
    },
    finalAvailable: {
        type: [{
            day: String,
            startTime: String,
            endTime: String
        }]
    }


})

module.exports = mongoose.model('food_items', food_item_template)