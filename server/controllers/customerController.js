const customer_template_copy = require('../models/customers')
const add_customer =async (request, response, next)=>{
    const{name,contact,email}=request.body;
    if(!name||!contact)
    {
        console.log(4);
        return response.status(422).json({error:"Please fill out the required fields!"})
    }
            

    await customer_template_copy.findOne({contact:contact}).then((customerExist)=>{
        if(customerExist){
            console.log(1)
            return response.status(402).json({error:"Customer Already Exists!"})
        }
        const cat = new customer_template_copy({name,contact,email})
        cat.save().then(()=>{
            console.log(2)
            response.status(201).json({message: "Customer added successfully!"})
        })
        .catch(error =>{
            
            console.log(3)
            response.status(401).json({error: "Customer could not be added!"})
        })

    });
}
const all_customers = async (request, response) => {
    customer_template_copy.find({}, (err, data) => {
        if (!err)
            response.send(data);
        else
            console.log(err);

    });
}
module.exports = {
    add_customer, all_customers
}