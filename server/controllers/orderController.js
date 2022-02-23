const order_template_copy = require('../models/order')
const customer_template_copy = require('../models/customers')
const table_template_copy = require('../models/tables')
const kot_template_copy = require("../models/KOT");

const add_order = async (request, response, next) => {
    const { customer, order, payment } = request.body;
    if (!order[0] || !customer.contact) {
        return response.status(422).json({ error: "Please fill out the required fields!" })
    }
    const new_order = new order_template_copy({ customer, order, payment })
    new_order.save()
    .then((savedData) => {
      if (customer){
        const new_customer = new customer_template_copy({ name: customer.name, contact: customer.contact, email: customer.email, date: new Date().toLocaleDateString('pt-br').split( '/' ).reverse( ).join( '-' ), num_orders: 1, total_amount_spent: payment.total, time: new Date().toLocaleTimeString('en-US', { hour12: false }), order_type: payment.orderType, order_id: savedData.order_id })
        new_customer.save()
        .then((res) => {
          console.log("Customer added", res)
        })
        .catch(err => { 
          console.log("Error adding customer: " + err)
        })
      }
      response.status(201).json({ message: "Order added successfully!" })
    })
    .catch(error => {
      response.status(401).json({ error: "Order could not be added!" })
    })


}

const all_order = async (request, response) => {
    order_template_copy.find({}, (err, data) => {
        if (!err)
            response.send(data);
        else
            console.log(err);

    });
}
const update_order = async (request, response, next) => {
    let itemId = request.params.id;
    const { customer,order,payment,date,time,order_id } = request.body;
    let updatedData = {
        customer:customer,
        order:order,
        payment:payment,
        date:date,
        time:time,
        order_id:order_id
    }
    // if (!customer.contact || !order[0])
    //     return response.status(422).json({ error: "Please fill out the required fields!" })
    order_template_copy.findOneAndUpdate({ _id: itemId }, { $set: updatedData }).then((data) => {
        if (data === null)
            response.json({ message: 'Item not found!' })
        else response.status(200).json({ message: 'Item updated successfully!' })
    })
        .catch(error => {
            response.status(401).json({ message: 'Item could not be updated!' })
        })

}
const get_order = async (request, response, next)=>{
    order_template_copy.findOne({ 'payment.table': request.params.id, 'payment.status':{$ne:"Completed"} }, (err, data) => {
        if (!err) {
            if (data === null)
                response.status(404).json({ message: 'Item not found!', data:null })
            else response.send(data);
        }
        else
        {
            response.status(500).json({ message: 'Item could not be shown!' })
        }

    });
}

const getOrderByDate = async (request, response) => {
    order_template_copy.find({}, (err, dbData) => {
      var data = [];
      for (var i = 0; i < dbData.length; i++) {
        if (dbData[i].time)
          if ( dbData[i].time.toLocaleDateString('pt-br').split( '/' ).reverse( ).join( '-' ) >= request.params.startDate && dbData[i].time.toLocaleDateString('pt-br').split( '/' ).reverse( ).join( '-' ) <= request.params.stopDate){
            data.push(dbData[i])
          }
      }
      if (!err) {
        response.send(data);
      }
      else
      {
        response.json({ message: 'Item could not be shown!' })
      }
    });
}

const getOrderByStatus = async (request, response) => {
    order_template_copy.find({ 'payment.orderStatus': request.params.status }, (err, data) => {
        if (!err) {
            response.send(data);
        }
        else
        {
            response.json({ message: 'Item could not be shown!' })
        }
    });
}

const getOrderById = async (request, response) => {
  order_template_copy.find({ 'order_id': request.params.id }, (err, data) => {
    if (!err) {
        response.status(200).send(data);
    }
    else
    {
        response.status(401).send([])
    }
  });
}

const getDashboardOrder = async (request, response) => {
  const labels = ['12:00am-4:00am', '4:00am-8:00am', '8:00am-12:00pm', '12:00pm-4:00pm', '4:00pm-8:00pm', '8:00pm-12:00am'];
  var DineIn = [0, 0, 0, 0, 0, 0]
  var TakeAway = [0, 0, 0, 0, 0, 0]
  if (request.params.type == 'Take Away') {
    order_template_copy.find({ 'payment.orderType': request.params.type }, (err, dbData) => {
      if (!err) {
        var data = [];
        for (var i = 0; i < dbData.length; i++) {
          if (dbData[i].time.toLocaleDateString('pt-br').split( '/' ).reverse( ).join( '-' ) >= request.params.startDate && dbData[i].time.toLocaleDateString('pt-br').split( '/' ).reverse( ).join( '-' ) <= request.params.stopDate)
            data.push(dbData[i])
        }
          for (var i = 0; i < data.length; i++) {
            if (new Date(data[i].time).toLocaleTimeString('en-US', { hour12: false }) >= '00:00:00' && new Date(data[i].time).toLocaleTimeString('en-US', { hour12: false }) < '04:00:00')
              TakeAway[0] += 1
            else if (new Date(data[i].time).toLocaleTimeString('en-US', { hour12: false }) >= '04:00:00' && new Date(data[i].time).toLocaleTimeString('en-US', { hour12: false }) < '08:00:00')
              TakeAway[1] += 1
            else if (new Date(data[i].time).toLocaleTimeString('en-US', { hour12: false }) >= '08:00:00' && new Date(data[i].time).toLocaleTimeString('en-US', { hour12: false }) < '12:00:00')
              TakeAway[2] += 1
            else if (new Date(data[i].time).toLocaleTimeString('en-US', { hour12: false }) >= '12:00:00' && new Date(data[i].time).toLocaleTimeString('en-US', { hour12: false }) < '16:00:00')
              TakeAway[3] += 1
            else if (new Date(data[i].time).toLocaleTimeString('en-US', { hour12: false }) >= '16:00:00' && new Date(data[i].time).toLocaleTimeString('en-US', { hour12: false }) < '20:00:00')
              TakeAway[4] += 1
            else if (new Date(data[i].time).toLocaleTimeString('en-US', { hour12: false }) >= '20:00:00' && new Date(data[i].time).toLocaleTimeString('en-US', { hour12: false }) < '24:00:00')
              TakeAway[5] += 1
          }
          response.status(200).send([
            {
              label: 'Dine In',
              data: []
            },
            {
            label: 'Take Away',
            data: TakeAway
          }
        ]);
      }
      else
      {
        console.log('Error: ', err)
        response.status(401).send([]).json({ message: 'Item could not be shown!' })
      }
    }); 
  }
  else if (request.params.type == 'Dine In') {
    order_template_copy.find({ 'payment.orderType': request.params.type }, (err, dbData) => {
      if (!err) {
        var data = [];
        for (var i = 0; i < dbData.length; i++) {
          if (dbData[i].time.toLocaleDateString('pt-br').split( '/' ).reverse( ).join( '-' ) >= request.params.startDate && dbData[i].time.toLocaleDateString('pt-br').split( '/' ).reverse( ).join( '-' ) <= request.params.stopDate)
            data.push(dbData[i])
        }
        for (var i = 0; i < data.length; i++) {
          if (new Date(data[i].time).toLocaleTimeString('en-US', { hour12: false }) >= '00:00:00' && new Date(data[i].time).toLocaleTimeString('en-US', { hour12: false }) < '04:00:00')
            DineIn[0] += 1
          else if (new Date(data[i].time).toLocaleTimeString('en-US', { hour12: false }) >= '04:00:00' && new Date(data[i].time).toLocaleTimeString('en-US', { hour12: false }) < '08:00:00')
            DineIn[1] += 1
          else if (new Date(data[i].time).toLocaleTimeString('en-US', { hour12: false }) >= '08:00:00' && new Date(data[i].time).toLocaleTimeString('en-US', { hour12: false }) < '12:00:00')
            DineIn[2] += 1
          else if (new Date(data[i].time).toLocaleTimeString('en-US', { hour12: false }) >= '12:00:00' && new Date(data[i].time).toLocaleTimeString('en-US', { hour12: false }) < '16:00:00')
            DineIn[3] += 1
          else if (new Date(data[i].time).toLocaleTimeString('en-US', { hour12: false }) >= '16:00:00' && new Date(data[i].time).toLocaleTimeString('en-US', { hour12: false }) < '20:00:00')
            DineIn[4] += 1
          else if (new Date(data[i].time).toLocaleTimeString('en-US', { hour12: false }) >= '20:00:00' && new Date(data[i].time).toLocaleTimeString('en-US', { hour12: false }) < '24:00:00')
            DineIn[5] += 1
        }
        response.status(200).send([
          {
            label: 'Dine In',
            data: DineIn
          },
          {
          label: 'Take Away',
          data: []
        }
      ]);
      }
      else
      {
        console.log('Error: ', err)
        response.status(401).send([]).json({ message: 'Item could not be shown!' })
      }
    });
  }
  else{
    order_template_copy.find({}, (err, dbData) => {
      if (!err) {
        var data = [];
        for (var i = 0; i < dbData.length; i++) {
          if (dbData[i].time.toLocaleDateString('pt-br').split( '/' ).reverse( ).join( '-' ) >= request.params.startDate && dbData[i].time.toLocaleDateString('pt-br').split( '/' ).reverse( ).join( '-' ) <= request.params.stopDate)
            data.push(dbData[i])
        }
        for (var i = 0; i < data.length; i++) {
          if (data[i].payment.orderType == 'Take Away'){
            if (new Date(data[i].time).toLocaleTimeString('en-US', { hour12: false }) >= '00:00:00' && new Date(data[i].time).toLocaleTimeString('en-US', { hour12: false }) < '04:00:00')
              TakeAway[0] += 1
            else if (new Date(data[i].time).toLocaleTimeString('en-US', { hour12: false }) >= '04:00:00' && new Date(data[i].time).toLocaleTimeString('en-US', { hour12: false }) < '08:00:00')
              TakeAway[1] += 1
            else if (new Date(data[i].time).toLocaleTimeString('en-US', { hour12: false }) >= '08:00:00' && new Date(data[i].time).toLocaleTimeString('en-US', { hour12: false }) < '12:00:00')
              TakeAway[2] += 1
            else if (new Date(data[i].time).toLocaleTimeString('en-US', { hour12: false }) >= '12:00:00' && new Date(data[i].time).toLocaleTimeString('en-US', { hour12: false }) < '16:00:00')
              TakeAway[3] += 1
            else if (new Date(data[i].time).toLocaleTimeString('en-US', { hour12: false }) >= '16:00:00' && new Date(data[i].time).toLocaleTimeString('en-US', { hour12: false }) < '20:00:00')
              TakeAway[4] += 1
            else if (new Date(data[i].time).toLocaleTimeString('en-US', { hour12: false }) >= '20:00:00' && new Date(data[i].time).toLocaleTimeString('en-US', { hour12: false }) < '24:00:00')
              TakeAway[5] += 1
          }
          else if (data[i].payment.orderType == 'Dine In'){
            if (new Date(data[i].time).toLocaleTimeString('en-US', { hour12: false }) >= '00:00:00' && new Date(data[i].time).toLocaleTimeString('en-US', { hour12: false }) < '04:00:00')
              DineIn[0] += 1
            else if (new Date(data[i].time).toLocaleTimeString('en-US', { hour12: false }) >= '04:00:00' && new Date(data[i].time).toLocaleTimeString('en-US', { hour12: false }) < '08:00:00')
              DineIn[1] += 1
            else if (new Date(data[i].time).toLocaleTimeString('en-US', { hour12: false }) >= '08:00:00' && new Date(data[i].time).toLocaleTimeString('en-US', { hour12: false }) < '12:00:00')
              DineIn[2] += 1
            else if (new Date(data[i].time).toLocaleTimeString('en-US', { hour12: false }) >= '12:00:00' && new Date(data[i].time).toLocaleTimeString('en-US', { hour12: false }) < '16:00:00')
              DineIn[3] += 1
            else if (new Date(data[i].time).toLocaleTimeString('en-US', { hour12: false }) >= '16:00:00' && new Date(data[i].time).toLocaleTimeString('en-US', { hour12: false }) < '20:00:00')
              DineIn[4] += 1
            else if (new Date(data[i].time).toLocaleTimeString('en-US', { hour12: false }) >= '20:00:00' && new Date(data[i].time).toLocaleTimeString('en-US', { hour12: false }) < '24:00:00')
              DineIn[5] += 1
          }
        }
        response.status(200).send([
          {
            label: 'Dine In',
            data: DineIn
          },
          {
          label: 'Take Away',
          data: TakeAway
        }
      ]);
      }
      else
      {
        console.log('Error: ', err)
        response.status(401).send([]).json({ message: 'Item could not be shown!' })
      }
    });
  }
}

const getTakeAwayOrders = async (request, response) => {
  order_template_copy.find({'payment.orderType': 'Take Away'}, (err, data) => {
    if (!err)
        response.send(data);
    else
        console.log(err);
});
}

const getTakeAwayOrderByDate = async (request, response) => {
  order_template_copy.find({'payment.orderType': 'Take Away'}, (err, dbData) => {
    var data = [];
    for (var i = 0; i < dbData.length; i++) {
      if (dbData[i].time)
        if ( dbData[i].time.toLocaleDateString('pt-br').split( '/' ).reverse( ).join( '-' ) >= request.params.startDate && dbData[i].time.toLocaleDateString('pt-br').split( '/' ).reverse( ).join( '-' ) <= request.params.stopDate){
          data.push(dbData[i])
        }
    }
    if (!err) {
      response.send(data);
    }
    else
    {
      response.json({ message: 'Item could not be shown!' })
    }
  });
}

const make_payment = (req,res) => {
  const mode = req?.body?.paymentMode
  const order_id = req.params.id
  order_template_copy.findOne({order_id:order_id})
    .then((data)=>{
      if(data===null)
        return res.status(500).json({message:"Order Not Found"})
      if(data.payment.status==="Completed")
        return res.json({message:"Payment Already Completed"})
      data.payment.status = "Completed"
      data.save().then(()=>{})
      res.json("ok")
    })
    .catch(()=>res.status(500).json({message:"Payment Failed"}))
}

const getOrderIdByPaymentIntentId = (req,res) => {
  const intentId = req.params.id
  order_template_copy.findOne({"payment.paymentIntentId":intentId},{order_id:1,_id:0})
  .then(data=>res.json(data?.order_id))
  .catch(err=>res.status(500).json({message:"Unable to fetch data"}))
}

const order_online = (req, res) => {
    const order = req.body;
    const newOrder = order_template_copy(order);
    newOrder
        .save()
        .then((data) => {
            if (data?.payment?.table?.length) {
                table_template_copy
                    .findOneAndUpdate(
                        { number: req?.body?.payment?.table },
                        { status: "Unavailable", time: Date.now() }
                    )
                    .then(() => {});
            }
            customer_template_copy
                .findOne({ contact: req.body?.customer?.contact })
                .then((data) => {
                    const customer = req.body?.customer;
                    if (customer?.name && customer?.contact)
                        if (data === null) {
                            const new_customer = new customer_template_copy({
                                name: customer?.name,
                                contact: customer?.contact,
                                email: customer?.email,
                                date: new Date()
                                    .toLocaleDateString("pt-br")
                                    .split("/")
                                    .reverse()
                                    .join("-"),
                                num_orders: 1,
                                total_amount_spent: data?.payment?.total,
                                time: new Date().toLocaleTimeString("en-US", {
                                    hour12: false,
                                }),
                                order_type: data?.payment?.orderType,
                                order_id: data?.order_id,
                            });
                            new_customer?.save().then(() => {});
                        } else {
                            data.name = customer.name;
                            data.email = customer.email;
                            data.num_orders++;
                            data.total_amount_spent += req.body?.payment?.total;
                            data.save().then(() => {});
                        }
                });
                const newKOT = new kot_template_copy({
                  ...order,
                  tableNumber: order?.payment?.table,
              });
              newKOT.save().then(() => {});
            res.json(data);
        })
        .catch((err) =>
            res.status(500).json({ message: "Unable to save order" })
        );
};

const generate_kot_of_order = (order) => {
  newKot = new kot_template_copy(order);
  newKot
      .save()
      .then((data) => res.json(data))
      .catch((err) =>
          res.status(500).json({ message: "Unable To Generate KOT!" })
      );
}

module.exports = {
    add_order, all_order, update_order, get_order, getOrderByDate, getOrderByStatus, getOrderById, getDashboardOrder, getTakeAwayOrders, getTakeAwayOrderByDate,make_payment,order_online,getOrderIdByPaymentIntentId,generate_kot_of_order
}
