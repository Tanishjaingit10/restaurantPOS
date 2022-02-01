const mongoose = require("mongoose");
const autoIncrement = require("mongoose-sequence")(mongoose);

const Processing = "Processing";

const kot_template = new mongoose.Schema({
    kotNumber: Number,
    order_id: Number,
    comments: String,
    status: {
        type: String,
        default: Processing, // Processing // ReadyToServe // Completed //
    },
    time: {
        type: Date,
        default: Date.now,
    },
    order: {
        type: [
            {
                foodItem: String,
                orderedVariant: {
                    type: [
                        {
                            variant: String,
                            price: Number,
                            quantity: Number,
                        },
                    ],
                },
                itemStatus: {
                    type: String,
                    default: Processing, // Processing // ReadyToServe //
                },
                timeToCook: Number,
                quantity: Number,
            },
        ],
    },
    tableNumber: Number,
    timeTakenToComplete: {
        type: Number,
        default: 0,
    },
});

kot_template.plugin(autoIncrement, { inc_field: "kotNumber", start_seq: 1 });

module.exports = mongoose.model("kot", kot_template);
