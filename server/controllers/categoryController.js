const category_template_copy = require('../models/category')
const add_category =async (request, response, next)=>{
    const{category,description,color}=request.body;
    if(!category||!color)
    {
        console.log("1");
            return response.status(422).json({error:"Please fill out the required fields!"})
    }
    await category_template_copy.findOne({category:category}).then((categoryExist)=>{
        if(categoryExist){
            return response.status(402).json({error:"Item Already Exists!"})
        }
        const cat = new category_template_copy({category,description,color})
        cat.save().then(()=>{
            console.log("2");
            
            response.status(201).json({message: "Item added successfully!"})
        })
        .catch(error =>{
            response.status(401).json({error: "Item could not be added!"})
        })

    });
}

module.exports = {
    add_category
}