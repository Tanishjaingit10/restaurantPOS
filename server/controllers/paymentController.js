const stripe = require("stripe")(process.env.STRIPE_PAYMENT_SECRET_KEY);

const stripe_payment = async (req, res) => {
    try {
        let intent = await stripe.paymentIntents.create({
            payment_method: req.body.id,
            description: "Test payment",
            amount: req.body.amount * 100,
            currency: "inr",
            confirmation_method: "manual",
            confirm: true,
        });
        // if (intent.status === "succeeded")
        res.json({ message: "Payment Completed" });
    } catch (e) {
        return res.status(500).json({ error: e.message });
    }
};

module.exports = {
    stripe_payment,
};
