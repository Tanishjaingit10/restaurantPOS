const variant_template_copy = require('../models/variant')

const get_variant = async(request,response) =>{
    const{variant,description,price}=request.body;

    variant_template_copy.findById(request.params.id,(err,data) =>{
        if(!err)
            response.send(data);
        else 
            console.log(err);

    });
}

const add_variant =async (request, response, next)=>{
    const{variant,description,price}=request.body;
            

    await variant_template_copy.findOne({variant:variant}).then((variantExist)=>{
        if(variantExist){
            console.log(1)
            return response.status(200).json({error:"Item Already Exists!"})
        }
        const col = new variant_template_copy({variant,description,price})
        col.save().then(()=>{
            console.log(2)
            response.status(201).json({message: "Item added successfully!"})
        })
        .catch(error =>{
            
            console.log(3)
            response.status(401).json({error: "Item could not be added!"})
        })

    });
}

module.exports = {
    get_variant, add_variant
}