const mongoose = require('mongoose')
const itemSchema = mongoose.Schema({
    title:String,
    image:String
},{ timestamps: true })


module.exports = mongoose.model('Item', itemSchema)