const order_template_copy = require('../models/order')
const add_order =async (request, response, next)=>{
    const {customer,order,payment}=request.body;
    console.log(order)
    console.log(customer)
            
        const new_order = new order_template_copy({customer,order,payment})
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
