const mongoose = require('mongoose')

const category_template = new mongoose.Schema({

    category:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    color:{
        type:String,
        required:true
    }
})

module.exports = mongoose.model('category', category_template)