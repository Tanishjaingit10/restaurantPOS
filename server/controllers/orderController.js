const order_template_copy = require('../models/order')
const add_order =async (request, response, next)=>{
    const{order}=request.body;
    console.log(order)
    if(!order)
    {
        console.log(4);
        return response.status(422).json({error:"Please fill out the required fields!"})
    }
            
        const new_order = new order_template_copy({order})
        new_order.save().then(()=>{
            console.log(2)
            response.status(201).json({message: "Order added successfully!"})
        })
        .catch(error =>{
            
            console.log(3)
            response.status(401).json({error: "Order could not be added!"})
        })

    }

module.exports = {
    add_order
}
