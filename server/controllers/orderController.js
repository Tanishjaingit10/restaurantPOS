const order_template_copy = require('../models/order')
const add_order =async (request, response, next)=>{
    const order=request.body;
    console.log(order)
            
        const new_order = new order_template_copy({order})
        new_order.save().then(()=>{
            response.status(201).json({message: "Order added successfully!"})
        })
        .catch(error =>{

            response.status(401).json({error: "Order could not be added!"})
        })

    }

module.exports = {
    add_order
}
