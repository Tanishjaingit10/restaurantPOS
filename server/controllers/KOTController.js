const kot_template_copy = require("../models/KOT");
const order_template_copy = require("../models/order");
const table_template_copy = require("../models/tables");

const { ObjectId } = require("mongodb");
const { isValidObjectId } = require("mongoose");

const Processing = "Processing";
const isUpdated = "isUpdated";
const ReadyToServe = "ReadyToServe";
const Completed = "Completed";

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

const generate_kot = (req, res) => {
    if (req.body.order) {
        for (let order of req.body.order)
            if (!isValidObjectId(order._id)) order._id = ObjectId();
    }
    order_template_copy
        .findOne({ order_id: req.body?.order_id })
        .then((data) => {
            table_template_copy
                .findOneAndUpdate(
                    { number: req?.body?.payment?.table },
                    { status: "Unavailable" }
                ).then(()=>{})
            if (data === null) {
                if (!req.body?.order?.length)
                    return res
                        .status(400)
                        .json({ message: "Please Provide Food Items" });
                const newOrder = new order_template_copy(req.body);
                newOrder.save().then((data) => {
                    const newKOT = new kot_template_copy({
                        ...data.toJSON(),
                        tableNumber: data.payment.table,
                    });
                    newKOT.save().then(() => res.status(202).json(data));
                });
            }
            // else existing order
            else {
                const oldOrderInfo = data.toJSON();
                const newOrderInfo = req.body;
                const newKotOrders = [];
                kot_template_copy
                    .find({ order_id: oldOrderInfo.order_id })
                    .then((obj) => {
                        const oldKotList = obj.map((it) => it.toJSON());
                        newOrderInfo.order.forEach((newOrder) => {
                            const oldOrder = oldOrderInfo.order.find(
                                (it) => it._id.toString() === newOrder._id
                            );
                            if (!oldOrder) newKotOrders.push(newOrder);
                            else {
                                if (
                                    !areSame(
                                        newOrder.orderedVariant,
                                        oldOrder.orderedVariant
                                    )
                                ) {
                                    oldKotList.forEach((kot) => {
                                        const item = kot.order.find(
                                            (item) =>
                                                item._id.toString() ===
                                                newOrder._id
                                        );
                                        if (item) {
                                            item.orderedVariant =
                                                newOrder.orderedVariant;
                                            kot[isUpdated] = true;
                                            kot.status = Processing;
                                        }
                                    });
                                }
                                if (newOrder.quantity > oldOrder.quantity) {
                                    newKotOrders.push({
                                        ...newOrder,
                                        quantity:
                                            newOrder.quantity -
                                            oldOrder.quantity,
                                    });
                                } else if (
                                    newOrder.quantity < oldOrder.quantity
                                ) {
                                    let quantDiff =
                                        oldOrder.quantity - newOrder.quantity;
                                    oldKotList.forEach((kot) => {
                                        const item = kot.order.find(
                                            (item) =>
                                                item._id.toString() ===
                                                newOrder._id
                                        );
                                        if (item && quantDiff) {
                                            const q = Math.min(
                                                quantDiff,
                                                item.quantity
                                            );
                                            quantDiff -= q;
                                            if (q === item.quantity) {
                                                kot.order = kot.order.filter(
                                                    (it) =>
                                                        it._id.toString() !==
                                                        newOrder._id
                                                );
                                            } else {
                                                item.quantity -= q;
                                            }
                                            kot[isUpdated] = true;
                                            kot.status = Processing;
                                        }
                                    });
                                }
                            }
                        });
                        oldOrderInfo.order.forEach((oldOrderItem) => {
                            if (
                                !newOrderInfo.order.some(
                                    (item) =>
                                        item._id.toString() ===
                                        oldOrderItem._id.toString()
                                )
                            )
                                oldKotList.forEach((kot) => {
                                    if (
                                        kot.order.some(
                                            (it) =>
                                                it._id.toString() ===
                                                oldOrderItem._id.toString()
                                        )
                                    ) {
                                        kot[isUpdated] = true;
                                        kot.order = kot.order.filter(
                                            (it) =>
                                                it._id.toString() !==
                                                oldOrderItem._id.toString()
                                        );
                                    }
                                });
                        });
                        oldKotList.forEach((item) => {
                            if (item.isUpdated) {
                                if (item.order?.length)
                                    kot_template_copy
                                        .findOneAndUpdate(
                                            { _id: item._id },
                                            item
                                        )
                                        .then(() => {});
                                else
                                    kot_template_copy
                                        .findOneAndDelete(
                                            { _id: item._id },
                                            item
                                        )
                                        .then(() => {});
                            }
                        });
                        if (newKotOrders.length) {
                            const newKOT = new kot_template_copy({
                                ...oldOrderInfo,
                                time: Date.now(),
                                _id: new ObjectId(),
                                order: newKotOrders,
                                tableNumber: oldOrderInfo.payment.table,
                            });
                            newKOT.save().then(() => {});
                        }
                        order_template_copy
                            .findOneAndUpdate(
                                { order_id: newOrderInfo.order_id },
                                req.body,
                                { new: true }
                            )
                            .then((updatedOrder) =>
                                res.status(202).json(updatedOrder)
                            );
                    });
            }
        })
        .catch(() =>
            res.status(500).json({ message: "Unable to Generate KOT" })
        );
};

const get_incomplete_kot = async (request, response) => {
    kot_template_copy
        .find({ status: { $in: [Processing, ReadyToServe] } })
        .then((data) => {
            response.json(data);
        })
        .catch(() =>
            response.status(401).json({ message: "Unable To fetch data" })
        );
};

const kot_order_status = async (request, response) => {
    let itemId = request.params.id;
    const body = request.body;
    kot_template_copy
        .findOne({ _id: itemId })
        .then((data) => {
            if (data === null)
                response.status(404).json({ message: "Item not found!" });
            else {
                data.status = body.status;
                if (request.body.status === Completed) {
                    kot_template_copy.findOne({ _id: itemId }).then((kot) => {
                        kot_template_copy
                            .findOne({
                                order_id: kot.order_id,
                                status: { $in: [Processing, ReadyToServe] },
                            })
                            .then((kots) => {
                                if (!kots) {
                                    order_template_copy
                                        .findOne({ order_id: kot.order_id })
                                        .then((order) => {
                                            order.payment.orderStatus =
                                                Completed;
                                            order.save();
                                        });
                                }
                            });
                    });
                }
                return data
                    .save()
                    .then(() =>
                        response
                            .status(200)
                            .json({ message: "Item updated successfully!" })
                    );
            }
        })
        .catch(() => {
            response
                .status(401)
                .json({ message: "Item could not be updated!" });
        });
};

const kot_item_status = async (request, response) => {
    const kotId = request.params.id;
    const itemId = request.body.itemId;
    const itemStatus = request.body.itemStatus;
    kot_template_copy
        .findOne({ _id: kotId })
        .then((data) => {
            const indx = data.order.findIndex(
                (it) => it._id.toString() === itemId
            );
            data.order[indx].itemStatus = itemStatus;
            return data
                .save()
                .then(() => response.json({ message: "status updated" }));
        })
        .catch(() =>
            response.status(401).json({ message: "Item could not be updated!" })
        );
};

module.exports = {
    generate_kot,
    kot_order_status,
    kot_item_status,
    get_incomplete_kot,
};