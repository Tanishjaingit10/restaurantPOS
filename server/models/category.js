const mongoose = require("mongoose");

const category_template = new mongoose.Schema({
    category: {
        type: String
    },
    description: {
        type: String,
        required: true,
    },
    image: {
        type: String,
    },
});

module.exports = mongoose.model("category", category_template);
