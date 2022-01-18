const mongoose = require('mongoose')

const table_template = new mongoose.Schema({

    number:{
        type:String,
    },
    capacity:{
        type:Number,
    },
    location:{
        type:String,
    },
    image:{
        type:String,
    },
    status:{
        type:String   //{'Free', 'Unavailable'}
    }
})

module.exports = mongoose.model('table', table_template)