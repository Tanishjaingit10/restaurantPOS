const mongoose = require('mongoose')
const shortid = require('shortid');
const autoIncrement = require('mongoose-sequence')(mongoose);
const order_template = new mongoose.Schema({
    order_id: {
        type: Number
    },
    customer:{
        type: {
            name: String,
            contact: String,
            email: String
        }
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
        type: {
            subTotal: Number,
            tax:Number,
            discount: Number,
            total: Number,
            mode: String, 
            status: String,
            orderType: String,
            orderStatus: String,
            table: String,
            timeToCook: Number

        }
    },
    time: {
        type: Date,
        default: Date.now()
    }
    
})

order_template.plugin(autoIncrement, {inc_field: 'order_id', start_seq: 2021001})

module.exports = mongoose.model('order', order_template)