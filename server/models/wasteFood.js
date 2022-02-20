const mongoose = require("mongoose");

const waste_food_template = new mongoose.Schema({
    order_id: {
        type: Number,
        required: true,
    },
    foodItemType: {
        type: String, // Solid // Liquid // Mix //
        default: "Solid",
    },
    amountType: {
        type: String, // gms // kgs // Liters // Pieces //
        default: "gms",
    },
    foodItems: [
        {
            foodItem: String,
            image: String,
        },
    ],
    amount: {
        type: Number,
        default: 0,
    },
    wastageBy: {
        type: String, // Patron // Excess cooking //
        default: "Patron",
    },
    description: String,
    image: String,
});

module.exports = mongoose.model("waste_food", waste_food_template);
