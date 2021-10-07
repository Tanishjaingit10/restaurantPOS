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
    price:{
        type:Number,
        required:true
    },
   

})