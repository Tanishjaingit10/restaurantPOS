const colour_template_copy = require('../models/colour')

const show_colours = async (request, response, next)=>{
    colour_template_copy.find({},(err,data) =>{
        if(!err)
        {
            response.send(data);
        }
        else 
            console.log(err);

    });
}
// const get_colour = async(request,response, next) =>{
//     console.log(1)
//     console.log(request.body._id)
//     colour_template_copy.find({name:request.body.name},(err,data) =>{
//         if(!err)
//             response.send(data);
//         else 
//             console.log(err);

//     });
// }
const get_colour = async(request,response) =>{
    const{name,code,check}=request.body;

    colour_template_copy.findById(request.params.id,(err,data) =>{
        if(!err)
            response.send(data);
        else 
            console.log(err);

    });
}
const update_colour = async (request, response, next)=>{
    let itemId = request.params.id;
    const{name,code,check}=request.body;
    let updatedData = {
        name: name,
        code: code,
        check: check
    }
    if(!name||!code)
            return response.status(422).json({error:"Please fill out the required fields!"})
    await colour_template_copy.findOneAndUpdate({name:itemId}, {$set: updatedData}).then((data) =>{
        if(data===null)
            response.json({message: 'colour not found!'})
        else response.json({message: 'colour updated successfully!'})
    })
    .catch(error =>{
        response.json({message: 'Item could not be updated!'})
    })

}


const add_colour =async (request, response, next)=>{
    const{name,code,check}=request.body;
    if(!code)
    {
        console.log(4);
        return response.status(422).json({error:"Please fill out the required fields!"})
    }
            

    await colour_template_copy.findOne({code:code}).then((categoryExist)=>{
        if(categoryExist){
            console.log(1)
            return response.status(402).json({error:"Item Already Exists!"})
        }
        const col = new colour_template_copy({name,code,check})
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
    show_colours, get_colour, add_colour, update_colour
}