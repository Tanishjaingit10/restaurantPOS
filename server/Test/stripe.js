const testStripe = async (req, res) => {
    data = {
        object_id: req.body.data.object.id,
        payment_method: req.body.data.object.payment_method,
        payment_intent: req.body.data.object.payment_intent,
        event_type: req.body.type,
    };
    console.log(data);
    // console.log(req.body.data.object.id+" => "+req.body.data.object.payment_method+" => "+req.body.type);
    return res.json("ok");
};

const getPaymentStatus = async (req, res) => {
    return res.json("ok");
};

module.exports = {
    testStripe,
    getPaymentStatus,
};
