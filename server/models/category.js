const mongoose = require("mongoose");

const category_template = new mongoose.Schema({
    category: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    image: {
        type: String,
    },
});

module.exports = mongoose.model("category", category_template);
