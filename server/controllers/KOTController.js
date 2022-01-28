const kot_template_copy = require("../models/kot");
const order_template_copy = require("../models/order");

const generate_kot = (req, res) => {
    let body = req.body;
    const order = new order_template_copy(body);
    order
        .save()
        .then((data) => {
            let savedOrder = data._doc
            delete savedOrder._id
            const newKOT = new kot_template_copy(savedOrder);
        })
    res.json("okkk")
    // let data = {
    //     order_id,
    //     comments,
    //     order: {
    //         _id,
    //         foodItem,
    //         orderedVariant: {
    //             variant,
    //             price,
    //             quantity,
    //         },
    //         timeToCook,
    //         quantity,
    //     },
    //     tableNumber,
    // };
};

const get_kot = (req, res) => {
    kot_template_copy
        .find()
        .then((data) => res.json(data))
        .catch((err) => res.json(err));
    // res.json("okk")
};

module.exports = {
    generate_kot,
    get_kot,
};
