const category_template_copy = require('../models/category')
const add_category =async (request, response, next)=>{
    const{category,description,color}=request.body;
    if(!category||!color)
    {
        console.log(4);
        return response.status(422).json({error:"Please fill out the required fields!"})
    }
            

    await category_template_copy.findOne({category:category}).then((categoryExist)=>{
        if(categoryExist){
            console.log(1)
            return response.status(402).json({error:"Item Already Exists!"})
        }
        const cat = new category_template_copy({category,description,color})
        cat.save().then(()=>{
            console.log(2)
            response.status(201).json({message: "Item added successfully!"})
        })
        .catch(error =>{
            
            console.log(3)
            response.status(401).json({error: "Item could not be added!"})
        })

    });
}
const get_category = async(request,response) =>{
    console.log(request.body)
    console.log(request.body.category)
    console.log(1)
    items_template_copy.find({category:request.body.category},(err,data) =>{
        if(!err)
            response.send(data);
        else 
            console.log(err);

    });
}
const all_category = async (request, response) => {
    category_template_copy.find({}, (err, data) => {
        if (!err)
            response.send(data);
        else
            console.log(err);

    });
}

const remove_category = async (request, response, next) => {
    let itemId = request.params.id;
    category_template_copy.findOneAndDelete({category:itemId}).then(() => {
        response.json({ message: 'Item removed successfully!' })
    })
        .catch(error => {
            response.json({ message: 'Item could not be removed!' })
        })

}
module.exports = {
    add_category, get_category, all_category, remove_category
}
