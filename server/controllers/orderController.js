const order_template_copy = require('../models/order')
const add_order =async (request, response, next)=>{
    const{order}=request.body;
    if(!order)
    {
        console.log(4);
        return response.status(422).json({error:"Please fill out the required fields!"})
    }
            

    // await category_template_copy.findOne({category:category}).then((categoryExist)=>{
    //     if(categoryExist){
    //         console.log(1)
    //         return response.status(402).json({error:"Item Already Exists!"})
    //     }
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
