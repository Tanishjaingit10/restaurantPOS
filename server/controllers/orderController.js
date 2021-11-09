const order_template_copy = require('../models/order')
const add_order =async (request, response, next)=>{
    const {customer,order,payment}=request.body;
    console.log(order)
    console.log(customer)
    console.log(payment)
    if(!order[0]||!customer.contact)
    {
        console.log(4);
        return response.status(422).json({error:"Please fill out the required fields!"})
    }
           
        const new_order = new order_template_copy({customer,order,payment})
        new_order.save().then(()=>{
            console.log(1)
            response.status(201).json({message: "Order added successfully!"})
        })
        .catch(error =>{
            console.log(2)
            response.status(401).json({error: "Order could not be added!"})
        })

    }

module.exports = {
    add_order
}
