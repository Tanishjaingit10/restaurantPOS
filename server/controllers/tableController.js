const table_template_copy = require('../models/tables')
const add_table =async (request, response, next)=>{
    const{number,capacity,location,image}=request.body;
    if(!number||!capacity)
    {
        console.log(4);
        return response.status(422).json({error:"Please fill out the required fields!"})
    }
            

    await table_template_copy.findOne({number:number}).then((tableExist)=>{
        if(tableExist){
            console.log(1)
            return response.status(402).json({error:"Item Already Exists!"})
        }
        const table = new table_template_copy({number,capacity,location,image})
        table.save().then(()=>{
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
    add_table
}


