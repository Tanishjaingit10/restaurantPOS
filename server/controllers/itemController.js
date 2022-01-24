const items_template_copy = require("../models/food_items");

const get_item = async (request, response) => {
    items_template_copy.findOne(
        { foodItem: request.params.id },
        (err, data) => {
            if (!err) {
                if (data === null)
                    response.json({ message: "Item not found!" });
                else response.send(data);
            } else {
                response.json({ message: "Item could not be shown!" });
            }
        }
    );
};
const all_items = async (request, response) => {
    items_template_copy.find({}, (err, data) => {
        if (!err) response.send(data);
        else console.log(err);
    });
};

const update_item = async (request, response, next) => {
    let itemId = request.params.id;
    const { foodItem, price, availability } = request.body;
    if (!foodItem || !price || !availability)
        return response
            .status(422)
            .json({ message: "Please fill out the required fields!" });
    items_template_copy
        .findOneAndUpdate({ _id: itemId }, { $set: request.body })
        .then((data) => {
            if (data === null) response.json({ message: "Item not found!" });
            else response.json({ message: "Item updated successfully!" });
        })
        .catch((error) => {
            response.json({ message: "Item could not be updated!" });
        });
};

const remove_item = async (request, response, next) => {
    let itemId = request.params.id;
    items_template_copy
        .findOneAndDelete({ _id: itemId })
        .then(() => {
            response.json({ message: "Item removed successfully!" });
        })
        .catch((error) => {
            response.json({ message: "Item could not be removed!" });
        });
};

const add_item = async (req, res) => {
    const item = new items_template_copy(req.body);
    if (!item.foodItem || !item.price || !item.availability || !item.foodType) {
        res.status(422).json({
            message: "Please fill out the required fields!",
        });
    } else {
        item.save()
            .then(() => {
                res.status(201).json({ message: "Item added successfully!" });
            })
            .catch((error) => {
                res.status(401).json({ message: "Item could not be added!" });
            });
    }
};

module.exports = {
    get_item,
    all_items,
    update_item,
    add_item,
    remove_item,
};
