const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config({ path: "../config.env" });

const getDate = () =>
    new Date().toLocaleDateString("pt-br").split("/").reverse().join("-");

const attendance_template = new mongoose.Schema({
    user_id: { type: String, required: true },
    status: { type: String, default: "Shift Not Started" },
    checkInTime: { type: String, default: "N/A" },
    checkOutTime: { type: String, default: "N/A" },
    date: { type: String, default: getDate },
});

module.exports = mongoose.model("attendances", attendance_template);
