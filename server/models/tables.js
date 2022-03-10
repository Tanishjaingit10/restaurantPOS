const mongoose = require("mongoose");

const table_template = new mongoose.Schema({
    number: {
        type: String,
    },
    capacity: {
        type: Number,
    },
    location: {
        type: String,
        default: "",
    },
    image: {
        type: String,
    },
    status: {
        type: String, //{'Free', 'Unavailable'}
    },
    time: {
        type: Date,
    },
    session: {
        type: String,
    },
});

module.exports = mongoose.model("table", table_template);
