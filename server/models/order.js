const mongoose = require('mongoose')

const order_template = new mongoose.Schema({

    order:{
        type:[
            {
                foodItem:String,
                image:String,
                orderedVariant:{
                    type:[
                        {
                            variant:String,
                            description:String,
                            price:Number
                        }
                    ]
                },
                price:Number,
                subtotal:Number
            }
        ]
    }

})

module.exports = mongoose.model('order', order_template)