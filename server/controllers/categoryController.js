const category_template_copy = require("../models/category");
const add_category = async (request, response, next) => {
    const { category, description, image } = request.body;
    if (!category) {
        return response
            .status(422)
            .json({ error: "Please fill out the required fields!" });
    }

    await category_template_copy
        .findOne({ category: category })
        .then((categoryExist) => {
            if (categoryExist) {
                return response
                    .status(402)
                    .json({ error: "Item Already Exists!" });
            }
            const cat = new category_template_copy({
                category,
                description,
                image,
            });
            cat.save()
                .then(() => {
                    response
                        .status(201)
                        .json({ message: "Item added successfully!" });
                })
                .catch((error) => {
                    response
                        .status(401)
                        .json({ error: "Item could not be added!" });
                });
        });
};
const update_category = async (request, response, next) => {
    let itemId = request.params.id;
    const { category, description, image } = request.body;
    let updatedData = {
        category: category,
        description: description,
        image: image,
    };
    if (!category)
        return response
            .status(422)
            .json({ error: "Please fill out the required fields!" });
    category_template_copy
        .findOneAndUpdate({ _id: itemId }, { $set: updatedData })
        .then((data) => {
            if (data === null) response.json({ message: "Item not found!" });
            else
                response
                    .status(200)
                    .json({ message: "Item updated successfully!" });
        })
        .catch((error) => {
            response
                .status(401)
                .json({ message: "Item could not be updated!" });
        });
};
const get_category = async (request, response) => {
    category_template_copy.findOne(
        { category: request.params.id },
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
const all_category = async (request, response) => {
    category_template_copy.find({}, (err, data) => {
        if (!err) response.send(data);
        else console.log(err);
    });
};

const remove_category = async (request, response, next) => {
    let itemId = request.params.id;
    category_template_copy
        .findOneAndDelete({ _id: itemId })
        .then(() => {
            response.json({ message: "Item removed successfully!" });
        })
        .catch((error) => {
            response.json({ message: "Item could not be removed!" });
        });
};
module.exports = {
    add_category,
    get_category,
    update_category,
    all_category,
    remove_category,
};
