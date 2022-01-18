const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config({path:'../config.env'})

const attendance_template = new mongoose.Schema({
    user_id: {
        type: String,
        required: true
    },
    status:String,
    checkInTime: String,
    checkOutTime: String,
    date: String
})

module.exports = mongoose.model('attendances', attendance_template)