const table_template_copy = require('../models/tables')
const add_table =async (request, response, next)=>{
    const{number,capacity,location,image,status}=request.body;
    if(!number||!capacity)
    {

        return response.status(422).json({error:"Please fill out the required fields!"})
    }
            

    await table_template_copy.findOne({number:number}).then((tableExist)=>{
        if(tableExist){
            return response.status(402).json({error:"Item Already Exists!"})
        }
        const table = new table_template_copy({number,capacity,location,image,status})
        table.save().then(()=>{
            response.status(201).json({message: "Item added successfully!"})
        })
        .catch(error =>{
            
            response.status(401).json({error: "Item could not be added!"})
        })

    });
}

const get_table = async (request, response) => {
    table_template_copy.findOne({ category: request.params.id }, (err, data) => {
        if (!err) {
            if (data === null)
                response.json({ message: 'Item not found!' })
            else response.send(data);
        }
        else
        {
            response.json({ message: 'Item could not be shown!' })
        }

    });
}

const all_table = async (request, response) => {
    table_template_copy.find({}, (err, data) => {
        if (!err)
            response.send(data);
        else
            console.log(err);

    });
}
const remove_table = async (request, response, next) => {
    let itemId = request.params.id;
    table_template_copy.findOneAndDelete({number:itemId}).then(() => {
        response.json({ message: 'Table removed successfully!' })
    })
        .catch(error => {
            response.json({ message: 'Table could not be removed!' })
        })

}


module.exports = {
    add_table,get_table,all_table, remove_table
}


