const order_template_copy = require('../models/order')
const add_order = async (request, response, next) => {
    const { customer, order, payment } = request.body;
    console.log(request.body)
    if (!order[0] || !customer.contact) {
        return response.status(422).json({ error: "Please fill out the required fields!" })
    }

    const new_order = new order_template_copy({ customer, order, payment })
    new_order.save().then(() => {
        response.status(201).json({ message: "Order added successfully!" })
    })
        .catch(error => {
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
    const { customer,order,payment,time,order_id } = request.body;
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
const get_order = async (request, response, next)=>{
    order_template_copy.findOne({ 'payment.table': request.params.id }, (err, data) => {
        if (!err) {
            if (data === null)
                response.send({ message: 'Item not found!', data:null })
            else response.send(data);
        }
        else
        {
            response.json({ message: 'Item could not be shown!' })
        }

    });
}


module.exports = {
    add_order, all_order, update_order, get_order
}
