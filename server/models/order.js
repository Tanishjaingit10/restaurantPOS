const mongoose = require("mongoose");

const autoIncrement = require("mongoose-sequence")(mongoose);

const Processing = "Processing";
const order_template = new mongoose.Schema({
    order_id: {
        type: Number,
    },
    customer: {
        type: {
            name: String,
            contact: String,
            email: String,
        },
    },
    order: {
        type: [
            {
                foodItem: String,
                orderedVariant: {
                    type: [
                        {
                            variant: String,
                            description: String,
                            price: Number,
                            quantity: Number,
                        },
                    ],
                },
                price: Number,
                discount: Number,
                subtotal: Number,
                timeToCook: Number,
                quantity: Number,
            },
        ],
    },
    payment: {
        type: {
            paymentIntentId: String, // for stripe
            subTotal: Number,
            tax: Number,
            discount: Number,
            total: Number,
            tip: Number,
            mode: String,
            status: String, // Pending // Completed // Cancelled //
            orderType: String, // Dine In // Take Away //
            orderStatus: String, // Processing // ReadyToServe // Completed // Cancelled //
            table: String,
        },
    },
    comments: String,
    time: {
        type: Date,
        default: Date.now,
    },
});

order_template.plugin(autoIncrement, {
    inc_field: "order_id",
    start_seq: 2021001,
});

module.exports = mongoose.model("order", order_template);
