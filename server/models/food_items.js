const mongoose = require('mongoose')

const food_item_template = new mongoose.Schema({

    foodItem:{
        type:String,
        
    },
    category:{
        type:String,
        
    },
    // image:{
    //     type:String,
    //     required:true
    // },
    time:{
        type:String,
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

})

module.exports = mongoose.model('food_items', food_item_template)