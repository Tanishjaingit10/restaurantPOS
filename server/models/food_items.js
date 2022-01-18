const mongoose = require("mongoose");

const food_item_template = new mongoose.Schema({
    availability: {
        type: String,
    },
    availabilityType: {
        type: String,
    },
    category: {
        type: String,
    },
    description: {
        type: String,
    },
    discount: {
        type: Number,
    },
    finalAvailable: {
        type: [
            {
                day: String,
                startTime: String,
                endTime: String,
            },
        ],
    },
    finalVariant: {
        type: [
            {
                variant: String,
                description: String,
                price: Number,
            },
        ],
    },
    foodItem: {
        type: String,
    },
    foodType: {
        type: String,
    },
    image: {
        type: String,
    },
    price: {
        type: Number,
    },
    time: {
        type: String,
    },
});

module.exports = mongoose.model("food_items", food_item_template);
