const items_template_copy = require('../models/food_items')
const add_item = async (request, response, next) => {
    const { foodItem, category, image, description, price, availability } = request.body;
    if (!foodItem || !category || !price || !availability)
        return response.status(422).json({ error: "Please fill out the required fields!" })

    await items_template_copy.findOne({ foodItem: foodItem }).then((itemExist) => {
        if (itemExist) {
            return response.status(402).json({ error: "Item Already Exists!" })
        }
        const item = new items_template_copy({ foodItem, category, image, description, price, availability })
        item.save().then(() => {
            response.status(201).json({ message: "Item added successfully!" })
        })
            .catch(error => {
                response.status(401).json({ error: "Item could not be added!" })
            })

    });
}
const get_item = async (request, response) => {
    console.log(request.params.id)
    items_template_copy.findOne({ foodItem: request.params.id }, (err, data) => {
        if (!err) {
            if (data === null)
                response.json({ message: 'Item not found!' })
            else response.send(data);
        }
        else
        {
            response.json({ message: 'Item could not be shown!' })
        }

    });
}
const all_items = async (request, response) => {
    items_template_copy.find({}, (err, data) => {
        if (!err)
            response.send(data);
        else
            console.log(err);

    });
}

const update_item = async (request, response, next) => {
    let itemId = request.params.id;
    console.log(itemId)
    const { foodItem, category, image, description, price, availability } = request.body;
    let updatedData = {
        foodItem: foodItem,
        category: category,
        image: image,
        description: description,
        price: price,
        availability: availability
    }
    if (!foodItem || !category || !price || !availability)
        return response.status(422).json({ error: "Please fill out the required fields!" })
    items_template_copy.findOneAndUpdate({ foodItem: itemId }, { $set: updatedData }).then((data) => {
        if (data === null)
            response.json({ message: 'Item not found!' })
        else response.json({ message: 'Item updated successfully!' })
    })
        .catch(error => {
            response.json({ message: 'Item could not be updated!' })
        })

}

const remove_item = async (request, response, next) => {
    let itemId = request.params.id;
    items_template_copy.findOneAndDelete({foodItem:itemId}).then(() => {
        response.json({ message: 'Item removed successfully!' })
    })
        .catch(error => {
            response.json({ message: 'Item could not be removed!' })
        })

}


module.exports = {
    add_item, get_item, all_items, update_item, remove_item
}
