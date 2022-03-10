const kot_template_copy = require("../models/KOT");
const order_template_copy = require("../models/order");
const table_template_copy = require("../models/tables");
const customer_template_copy = require("../models/customers");

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
            if (data?.payment?.status === Completed)
                return res.status(400).json({
                    message:
                        "This order is already paid. Please generate a new order",
                });
            if (data === null) {
                if (!req.body?.order?.length)
                    return res.status(400).json({
                        message: "Please Provide Food Items",
                    });
                table_template_copy
                    .findOne({ number: req?.body?.payment?.table })
                    .then((data) => {
                        data.status = "Unavailable";
                        if (!data.session) data.time = Date.now();
                        data.session = req?.body?.session;
                        data.save()
                            .then(() => {})
                            .catch((err) => console.log(err));
                    })
                    .catch((err) => console.log(err));
                const newOrder = new order_template_copy(req.body);
                newOrder.save().then((data) => {
                    if (
                        data.customer?.name ||
                        data.customer?.contact ||
                        data.customer?.email
                    ) {
                        customer = req.body.customer;
                        const new_customer = new customer_template_copy({
                            name: customer.name,
                            contact: customer.contact,
                            email: customer.email,
                            date: new Date()
                                .toLocaleDateString("pt-br")
                                .split("/")
                                .reverse()
                                .join("-"),
                            num_orders: 1,
                            total_amount_spent: data.payment?.total,
                            time: new Date().toLocaleTimeString("en-US", {
                                hour12: false,
                            }),
                            order_type: data?.payment?.orderType,
                            order_id: data.order_id,
                        });
                        new_customer.save().then((res) => {});
                    }
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
                table_template_copy
                    .findOneAndUpdate(
                        { number: req?.body?.payment?.table },
                        { status: "Unavailable" }
                    )
                    .then(() => {});
                kot_template_copy
                    .find({ order_id: oldOrderInfo.order_id })
                    .then((obj) => {
                        const oldKotList = obj.map((it) => it.toJSON());
                        oldKotList.sort((kot1, kot2) => kot2.time - kot1.time);
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
                                            item.quantity -= q;
                                            item.deleted.push(q);
                                            item.itemStatus = Processing;
                                            if (item.quantity === 0)
                                                item.itemStatus = ReadyToServe;
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
                                    kot.order.forEach((item) => {
                                        if (
                                            item._id.toString() ===
                                            oldOrderItem._id.toString()
                                        ) {
                                            item.deleted.push(item.quantity);
                                            item.quantity = 0;
                                            item.itemStatus = ReadyToServe;
                                            kot.status = Processing;
                                            kot[isUpdated] = true;
                                        }
                                    });
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
                            req.body.payment.orderStatus = Processing;
                            const newKOT = new kot_template_copy({
                                ...oldOrderInfo,
                                time: Date.now(),
                                _id: new ObjectId(),
                                order: newKotOrders,
                                comments: req.body?.comments || null,
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
        .then((kot) => {
            if (kot === null)
                response.status(404).json({ message: "Item not found!" });
            else {
                kot.status = body.status;
                if (request.body.status === ReadyToServe) {
                    kot.timeTakenToComplete = body.timeTakenToComplete;
                }
                kot.save().then(() => {
                    if (request.body.status === Completed) {
                        kot_template_copy
                            .findOne({
                                order_id: kot.order_id,
                                status: { $in: [Processing, ReadyToServe] },
                            })
                            .then((incompleteKOT) => {
                                if (!incompleteKOT) {
                                    order_template_copy
                                        .findOne({ order_id: kot.order_id })
                                        .then((order) => {
                                            if (order) {
                                                order.payment.orderStatus =
                                                    Completed;
                                                order.save();
                                            }
                                        });
                                }
                            });
                    }
                    response
                        .status(200)
                        .json({ message: "Item updated successfully!" });
                });
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

const clearKots = (req, res) => {
    kot_template_copy
        .deleteMany({})
        .then((data) => res.json("deleted"))
        .catch((err) =>
            res.status(500).json({ err: err.stack || err.message })
        );
};

module.exports = {
    generate_kot,
    kot_order_status,
    kot_item_status,
    get_incomplete_kot,
    clearKots,
};
