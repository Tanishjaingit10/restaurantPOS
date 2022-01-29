const kot_template_copy = require("../models/KOT");
const order_template_copy = require("../models/order");

const { ObjectId } = require("mongodb");
const { isValidObjectId } = require("mongoose");

const generate_kot = (req, res) => {
    if (req.body.order) {
        for (let order of req.body.order)
            if (!isValidObjectId(order._id)) order._id = ObjectId();
    }
    order_template_copy
        .findOne({ order_id: req.body?.order_id })
        .then((data) => {
            // if new order
            if (data === null) {
                const newOrder = new order_template_copy(req.body);
                return newOrder
                    .save()
                    .then((data) => {
                        const newKOT = new kot_template_copy({
                            ...data._doc,
                            tableNumber: data._doc.payment.table,
                        });
                        return newKOT.save();
                    })
                    .then((data) => console.log(data._doc)); // return res.json(data._doc)
            }
            // else existing order
            else {
                const oldOrderInfo = data.toJSON()
                const newOrderInfo = req.body
                const newKotOrders = [];
                newOrderInfo.order.forEach((newOrder) => {
                    const oldOrder = oldOrderInfo.order.find(
                        (it) => it._id.toString() === newOrder._id
                    );
                    if (!oldOrder) newKotOrders.push(newOrder);
                    else if (
                        areSame(
                            newOrder.orderedVariant,
                            oldOrder.orderedVariant
                        ) &&
                        newOrder.quantity > oldOrder.quantity
                    ) {
                        newKotOrders.push({
                            ...oldOrder,
                            quantity: newOrder.quantity - oldOrder.quantity,
                        });
                    }
                });
                const newKOT = new kot_template_copy({
                    ...oldOrderInfo,
                    _id: new ObjectId(),
                    order: newKotOrders,
                    tableNumber: oldOrderInfo.payment.table,
                });
                newKOT.save().then((kot) => console.log(kot));
                order_template_copy.findOneAndUpdate(
                    { order_id: newOrderInfo.order_id },
                    req.body
                );
            }
        });
    // .catch(() => console.log("error"));

    res.json("done");
};

const get_kot = (req, res) => {
    // kot_template_copy.deleteMany({})
    // .then(()=>res.json("deleted"))
    // .catch(()=>res.json("unable to delete"))
    kot_template_copy
        .find()
        .then((data) => res.json(data))
        .catch((err) => res.json(err));
};

module.exports = {
    generate_kot,
    get_kot,
};

const areSame = (orderVar1, orderVar2) => {
    if (Object.keys(orderVar1).length !== Object.keys(orderVar2).length)
        return false;
    let areSame = true;
    orderVar1.forEach((va1) => {
        orderVar2.forEach((va2) => {
            if (va1.variant === va2.variant) {
                if (va1.quantity !== va2.quantity) {
                    areSame = false;
                }
            }
        });
    });
    return areSame;
};
