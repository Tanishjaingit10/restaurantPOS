const mongoose = require('mongoose')

const table_template = new mongoose.Schema({

    number:{
        type:Number,
    },
    capacity:{
        type:Number,
    },
    location:{
        type:String,
    },
    image:{
        type:String,
    }
})

module.exports = mongoose.model('table', table_template)