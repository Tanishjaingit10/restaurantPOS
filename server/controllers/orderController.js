const order_template_copy = require('../models/order')
const add_order = async (request, response, next) => {
    const { customer, order, payment } = request.body;
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
    console.log(request.params.id)
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

const getOrderByDate = async (request, response) => {
    order_template_copy.find({ 'time': { $gte: request.params.startDate, $lte: request.params.stopDate} }, (err, data) => {
        if (!err) {
            response.send(data);
        }
        else
        {
            response.json({ message: 'Item could not be shown!' })
        }
    });
}

const getOrderByStatus = async (request, response) => {
    order_template_copy.find({ 'payment.orderStatus': request.params.status }, (err, data) => {
        if (!err) {
            response.send(data);
        }
        else
        {
            response.json({ message: 'Item could not be shown!' })
        }
    });
}

const getOrderById = async (request, response) => {
    order_template_copy.find({ 'order_id': request.params.id }, (err, data) => {
        if (!err) {
            response.send(data);
        }
        else
        {
            response.json({ message: 'Item could not be shown!' })
        }
    });
}

const delete_order = async (request,response) => {
    let itemId = request.params.id;
    order_template_copy
        .findOneAndDelete({ order_id: itemId })
        .then(() => {
            response.json({ message: "Item removed successfully!" });
        })
        .catch((error) => {
            response.json({ message: "Item could not be removed!" });
        });
}

const order_ready = async (request,response) => {
    let itemId = request.params.id;
    const timeTakenToComplete = request.body.timeTakenToComplete
    order_template_copy.findOne({ order_id: itemId }).then((data) => {
        if (data === null)
        response.json({ message: 'Item not found!' })
        else {
            data.payment.orderStatus = "ReadyToServe"
            data.payment.timeTakenToComplete = timeTakenToComplete
            data.save().then(()=>
                response.status(200).json({ message: 'Item updated successfully!' })
            ).catch(()=>response.status(401).json({ message: 'Item could not be updated!' }))
        }
    })
        .catch(error => {
            response.status(401).json({ message: 'Item could not be updated!' })
        })
}

const order_item_status = async (request,response) => {
    const itemId = request.params.id;
    const item = request.body.item;
    const itemStatus = request.body.itemStatus
    order_template_copy.findOne({ order_id: itemId }).then((data) => {
        const indx = data.order.findIndex((it)=>JSON.stringify(it)===JSON.stringify(item))
        data.order[indx].itemStatus = itemStatus
        data.save().then(()=>
            response.json({message:"status updated"})
        )
    }).catch(err=>response.status(401).json({ message: 'Item could not be updated!' }))
}

module.exports = {
    add_order, all_order, update_order, get_order, getOrderByDate, getOrderByStatus, getOrderById, delete_order, order_ready, order_item_status
}
