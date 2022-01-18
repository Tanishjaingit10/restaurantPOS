const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config({path:'../config.env'})

const reservation_template = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    email_id: {
        type: String,
        required: true
    },
    contact: {
        type: String,
        required: true
    },
    date: {
        type: String,
    },
    start_time: {
        type: String,
    },
    end_time: {
        type: String,
    },
    table: {
        type: String,
    }
})

module.exports = mongoose.model('reservations', reservation_template)