const mongoose = require('mongoose')

const payment_intent_template = new mongoose.Schema({
    status:String
})

module.exports = mongoose.model('payment_intent', payment_intent_template)