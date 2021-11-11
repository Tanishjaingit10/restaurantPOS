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
const get_customer = async (request, response) => {
    customer_template_copy.findOne({ contact: request.params.id }, (err, data) => {
        if (!err) {
            if (data === null)
                response.json({ message: 'Customer not found!' })
            else response.send(data);
        }
        else
        {
            response.json({ message: 'Customer could not be shown!' })
        }

    });
}
const update_customer = async (request, response, next) => {
    const { name,contact,email } = request.body;
    let updatedData = {
        name: name,
        contact: contact,
        email: email
    }
    if (!name || !contact)
        return response.status(422).json({ error: "Please fill out the required fields!" })
    customer_template_copy.findOneAndUpdate({ contact: contact }, { $set: updatedData }).then((data) => {
        if (data === null)
            response.json({ message: 'Customer not found!' })
        else response.status(200).json({ message: 'Customer updated successfully!' })
    })
        .catch(error => {
            response.status(401).json({ message: 'Customer could not be updated!' })
        })

}

module.exports = {
    add_customer, all_customers, get_customer, update_customer
}