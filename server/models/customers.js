const mongoose = require('mongoose')

const customer_template = new mongoose.Schema({

    name:{
        type:String,
        required:true
    },
    contact:{
        type:String,
        // required:true
    },
    email:{
        type:String,
    },
    date:{
        type: Date,
        default: Date.now
    },
    num_orders:{
      type: Number,
      default: 0
    },
    total_amount_spent:{
      type: Number,
      default: 0
    }
})

module.exports = mongoose.model('customers', customer_template)