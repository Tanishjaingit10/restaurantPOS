const mongoose = require('mongoose')

const side_item_template = new mongoose.Schema({

    image:{
        type:String,
        // required:true
    }
})

module.exports = mongoose.model('side_items', side_item_template)