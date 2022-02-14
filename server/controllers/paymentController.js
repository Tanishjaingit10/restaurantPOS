const stripe = require("stripe")(process.env.STRIPE_PAYMENT_SECRET_KEY);
const payment_intent_template = require("../models/paymentIntent");

const stripe_payment = async (req, res) => {
    try {
        let intent = await stripe.paymentIntents.create({
            payment_method: req.body.id,
            description: "Test payment",
            amount: req.body.amount * 100,
            currency: "inr",
            confirm: true,
        });
        if (intent.id) {
            const payment = new payment_intent_template({
                _id: intent.id,
                status: intent.status,
            });
            return payment
                .save()
                .then(res.json(intent.id))
                .catch((err) =>
                    res.status(500).json({ message: "Unable to process." })
                );
        } else {
            return res.status(500).json({ message: "Payment Failed" });
        }
    } catch (e) {
        return res.status(500).json({ error: e.message });
    }
};

module.exports = {
    stripe_payment,
};
