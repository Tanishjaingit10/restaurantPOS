const waste_food_template_copy = require("../models/wasteFood");
const order_template_copy = require("../models/order");

const all_orders_having_waste = (req, res) => {
    waste_food_template_copy
        .find({}, { order_id: 1, _id: 0 })
        .then((data) => {
            if (data === null) return res.json([]);
            orders = data.map((or) => or.order_id);
            return order_template_copy
                .find({ order_id: { $in: orders } })
                .then((data) => {
                    if (data === null) return res.json([]);
                    return res.json(data);
                });
        })
        .catch((err) => res.status(500).json(err));
};

const log_wastage = (req, res) => {
    const newWaste = new waste_food_template_copy(req.body);
    newWaste
        .save()
        .then((data) => res.json(data))
        .catch((err) => res.status(500).json(err));
};

const waste_by_order_id = (req, res) => {
    const order_id = req.params.order_id;
    waste_food_template_copy
        .find({ order_id })
        .then((data) => {
            if (data === null)
                return res.status(404).json({ message: "No wastage found" });
            return res.json(data);
        })
        .catch((err) =>
            res.status(500).json({ message: "Unable to find wastage" })
        );
};

module.exports = { all_orders_having_waste, log_wastage, waste_by_order_id };
