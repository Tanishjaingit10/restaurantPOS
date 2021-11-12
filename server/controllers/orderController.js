const order_template_copy = require('../models/order')
const add_order = async (request, response, next) => {
    const { customer, order, payment } = request.body;
    console.log(request.body._id)
    console.log(order)
    console.log(customer)
    console.log(payment)
    if (!order[0] || !customer.contact) {
        console.log(4);
        return response.status(422).json({ error: "Please fill out the required fields!" })
    }

    const new_order = new order_template_copy({ customer, order, payment })
    new_order.save().then(() => {
        console.log(1)
        response.status(201).json({ message: "Order added successfully!" })
    })
        .catch(error => {
            console.log(2)
            response.status(401).json({ error: "Order could not be added!" })
        })

}
const all_order = async (request, response) => {
    order_template_copy.find({}, (err, data) => {
        if (!err)
            response.send(data);
        else
            console.log(err);

    });
}
const update_order = async (request, response, next) => {
    let itemId = request.params.id;
    console.log(1)
    console.log(itemId)
    const { customer,order,payment,time,order_id } = request.body;
    console.log(request.body)
    let updatedData = {
        customer:customer,
        order:order,
        payment:payment,
        time:time,
        order_id:order_id
    }
    // if (!customer.contact || !order[0])
    //     return response.status(422).json({ error: "Please fill out the required fields!" })
    order_template_copy.findOneAndUpdate({ _id: itemId }, { $set: updatedData }).then((data) => {
        if (data === null)
            response.json({ message: 'Item not found!' })
        else response.status(200).json({ message: 'Item updated successfully!' })
    })
        .catch(error => {
            response.status(401).json({ message: 'Item could not be updated!' })
        })

}

module.exports = {
    add_order, all_order, update_order
}
