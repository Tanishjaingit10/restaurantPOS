const stripe = require("stripe")(process.env.STRIPE_PAYMENT_SECRET_KEY);
const payment_intent_template = require("../models/paymentIntent");
const order_template_copy = require("../models/order");
const customer_template_copy = require("../models/customers");
const table_template_copy = require("../models/tables");
const kot_template_copy = require("../models/KOT");

const stripe_payment = async (req, res) => {
    const amount = req?.body?.order?.payment?.total;
    try {
        let intent = await stripe.paymentIntents.create({
            payment_method: req.body.id,
            description: "stripe_payment",
            amount: amount * 100,
            currency: "inr",
            confirm: true,
        });
        if (intent.id) {
            const payment = new payment_intent_template({
                paymentMethodId: intent.payment_method,
                intentId: intent.id,
                status: intent.status,
            });
            payment
                .save()
                .then(() => {})
                .catch((err) =>
                    res.status(500).json({ message: "Unable to process." })
                );
            if (req?.body?.order?.payment)
                req.body.order.payment.paymentIntentId = intent.id;
            const newOrder = order_template_copy(req?.body?.order);
            newOrder
                .save()
                .then((data) => {
                    if (
                        data?.payment?.table?.length &&
                        data?.payment?.status === "Pending"
                    ) {
                        table_template_copy
                            .findOneAndUpdate(
                                { number: req?.body?.payment?.table },
                                { status: "Unavailable", time: Date.now() }
                            )
                            .then(() => {});
                    }
                    customer_template_copy
                        .findOne({ contact: data?.customer?.contact })
                        .then((data) => {
                            const customer = data?.customer;
                            if (customer?.name && customer?.contact)
                                if (data === null) {
                                    const new_customer =
                                        new customer_template_copy({
                                            name: customer.name,
                                            contact: customer.contact,
                                            email: customer.email,
                                            date: new Date()
                                                .toLocaleDateString("pt-br")
                                                .split("/")
                                                .reverse()
                                                .join("-"),
                                            num_orders: 1,
                                            total_amount_spent:
                                                data?.payment?.total,
                                            time: new Date().toLocaleTimeString(
                                                "en-US",
                                                {
                                                    hour12: false,
                                                }
                                            ),
                                            order_type:
                                                data?.payment?.orderType,
                                            order_id: data?.order_id,
                                        });
                                    new_customer?.save().then(() => {});
                                } else {
                                    data.name = customer.name;
                                    data.email = customer.email;
                                    data.num_orders++;
                                    data.total_amount_spent +=
                                        req.body?.payment?.total;
                                    data.save().then(() => {});
                                }
                        });
                    res.json({ order: data, intent });
                })
                .catch((err) => console.log("error", err));
        } else return res.status(500).json({ message: "Payment Failed" });
    } catch (e) {
        res.status(500).json({ message: e.message });
    }
};

const stripeWebhook = async (req, res) => {
    data = {
        object_id: req?.body?.data?.object?.id,
        payment_method: req?.body?.data?.object?.payment_method,
        payment_intent: req?.body?.data?.object?.payment_intent,
        event_type: req?.body?.type,
    };
    if (data.event_type) {
        const [type, status] = data.event_type.split(".");
        if (type === "payment_intent") {
            payment_intent_template
                .findOne({
                    intentId: data.object_id,
                })
                .then((intent) => {
                    if (intent && intent.status !== "succeeded") {
                        if (data.payment_method)
                            intent.paymentMethodId = data.payment_method;
                        intent.status = status;
                        intent.save().then(() => {});
                    } else console.log(intent?.id);
                });
            if (status === "succeeded") {
                order_template_copy
                    .findOne({
                        "payment.paymentIntentId": data.object_id,
                    })
                    .then((data) => {
                        if (data !== null) {
                            data.payment.status = "Completed";
                            data.save().then(() => {});
                            const newKOT = new kot_template_copy({
                                ...data.toJSON(),
                                tableNumber: data?.payment?.table,
                            });
                            newKOT.save().then(() => {});
                        }
                    });
            }
        }
    }
    return res.send("ok");
};

const getPaymentStatus = async (req, res) => {
    const intentId = req.params.id;
    payment_intent_template
        .findOne({ intentId })
        .then((data) => res.json(data.status))
        .catch((err) =>
            res.status(500).json({ message: "Unable to get payment status" })
        );
};

module.exports = {
    stripeWebhook,
    getPaymentStatus,
    stripe_payment,
};
