const mongoose = require("mongoose");

const autoIncrement = require("mongoose-sequence")(mongoose);

const order_template = new mongoose.Schema({
    order_id: {
        type: Number,
    },
    customer: {
        type: {
            name: {
                type: String,
                default: "",
            },
            contact: {
                type: String,
                default: "",
            },
            email: {
                type: String,
                default: "",
            },
        },
    },
    order: {
        type: [
            {
                foodItem: {
                    type: String,
                    default: "",
                },
                orderedVariant: {
                    type: [
                        {
                            variant: String,
                            description: String,
                            price: Number,
                            quantity: Number,
                        },
                    ],
                    default: [],
                },
                price: {
                    type: Number,
                    default: 0,
                },
                discount: {
                    type: Number,
                    default: 0,
                },
                subtotal: {
                    type: Number,
                    default: 0,
                },
                time: {
                    type: Number,
                    default: 0,
                },
                quantity: {
                    type: Number,
                    default: 0,
                },
            },
        ],
        default: [],
    },
    payment: {
        type: {
            paymentIntentId: String, // for stripe
            subTotal: {
                type: Number,
                default: 0,
            },
            tax: {
                type: Number,
                default: 0,
            },
            discount: {
                type: Number,
                default: 0,
            },
            total: {
                type: Number,
                default: 0,
            },
            tip: {
                type: Number,
                default: 0,
            },
            mode: {
                type: String, // cash // card // payLater // online
                default: "payLater",
            },
            status: {
                type: String, // Pending // Completed // Cancelled //
                default: "Pending",
            },
            orderType: {
                type: String, // Dine In // Take Away //
                default: "Take Away",
            },
            orderStatus: {
                type: String, // Processing // ReadyToServe // Completed // Cancelled //
                default: "Processing",
            },
            table: String
        },
        default: {},
    },
    pickupTime: {
        type: Date,
        default: Date.now,
    },
    comments: {
        type: String,
        default: ""
    },
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
