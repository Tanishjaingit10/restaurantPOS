const mongoose = require('mongoose')

const table_location_template = new mongoose.Schema({

    table_location: {
        type: String,
        unique: true
    }

})

module.exports = mongoose.model('table_location', table_location_template)