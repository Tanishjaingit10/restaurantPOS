const mongoose = require('mongoose')

const colour_template = new mongoose.Schema({

    name:{
        type:String,
        required:true
    },
    code:{
        type:String,
        required:true
    },
    check:{
        type:Boolean,
        required:true
    }
})

module.exports = mongoose.model('colour', colour_template)