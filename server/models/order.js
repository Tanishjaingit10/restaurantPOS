const mongoose = require('mongoose')

const order_template = new mongoose.Schema({
    customer:{
        type: [{
            name: String,
            contact: String,
            email: String
        }]
    },
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
    },
    payment:{
        type: [{
            subTotal: Number,
            tax:Number,
            discount: Number,
            total: Number
        }]
    }

})

module.exports = mongoose.model('order', order_template)