const customer_template_copy = require('../models/customers')
const add_customer =async (request, response, next)=>{
    const{name,contact,email}=request.body;
    if(!name||!contact)
    {
        return response.status(422).json({error:"Please fill out the required fields!"})
    }
            

    await customer_template_copy.findOne({contact:contact}).then((customerExist)=>{
        if(customerExist){
            return response.status(402).json({error:"Customer Already Exists!"})
        }
        const cat = new customer_template_copy({name,contact,email})
        cat.save().then(()=>{
            response.status(201).json({message: "Customer added successfully!"})
        })
        .catch(error =>{
            response.status(401).json({error: "Customer could not be added!"})
        })

    });
}
const all_customers = async (request, response) => {
    customer_template_copy.find({}, (err, data) => {
        if (!err)
            response.send(data);
        else
            console.log(err);

    });
}
const get_customer = async (request, response) => {
    customer_template_copy.findOne({ contact: request.params.id }, (err, data) => {
        if (!err) {
            if (data === null)
                response.json({ message: 'Customer not found!' })
            else response.send(data);
        }
        else
        {
            response.json({ message: 'Customer could not be shown!' })
        }

    });
}
const update_customer = async (request, response, next) => {
  const { name,contact,email } = request.body;
  let updatedData = {
    name: name,
    contact: contact,
    email: email
  }
  if (!name || !contact)
      return response.status(422).json({ error: "Please fill out the required fields!" })
  customer_template_copy.findOneAndUpdate({ contact: contact }, { $set: updatedData })
  .then((data) => {
    if (data === null)
        response.json({ message: 'Customer not found!' })
    else response.status(200).json({ message: 'Customer updated successfully!' })
  })
  .catch(error => {
    response.status(401).json({ message: 'Customer could not be updated!' })
  })
}

const updateCustomerOrder = (req, res) => {
  const { num_order, order_amount } = request.body;
    let updatedData = {
      num_order: num_order, 
      order_amount: order_amount,
    }
    customer_template_copy.findOneAndUpdate({ contact: contact }, { $set: updatedData })
    .then((data) => {
      if (data === null)
          response.json({ message: 'Customer not found!' })
      else response.status(200).json({ message: 'Customer updated successfully!' })
    })
    .catch(error => {
      response.status(401).json({ message: 'Customer could not be updated!' })
    })
}

const getCustomerByDate = async (request, response) => {
  customer_template_copy.find({ 'date': { $gte: request.params.startDate, $lte: request.params.stopDate} }, (err, data) => {
      if (!err) {
          response.status(200).send(data);
      }
      else
      {
          response.status(401).json({ message: 'Item could not be shown!' })
      }
  });
}

const getCustomerByValue = async (request, response) =>{
  customer_template_copy.find({ $or: [{ name: {$regex: request.params.value} }, { contact: {$regex: request.params.value} }, { email: {$regex: request.params.value}}] }, (err, data) => {
    if (!err) {
        response.status(200).send(data);
    }
    else
    {
        response.status(401).json({ message: 'Item could not be shown!' })
    }
  });
}

const getDashboardCustomer = async (request, response) => {
  const labels = ['12:00am-4:00am', '4:00am-8:00am', '8:00am-12:00pm', '12:00pm-4:00pm', '4:00pm-8:00pm', '8:00pm-12:00am'];
  var DineIn = [0, 0, 0, 0, 0, 0]
  var TakeAway = [0, 0, 0, 0, 0, 0]
  if (request.params.type == 'Take Away') {
    customer_template_copy.find({ 'order_type': request.params.type, date: request.params.date+'T00:00:00.000Z' }, (err, data) => {
      if (!err) {
          for (var i = 0; i < data.length; i++) {
            if (data[i].time >= '00:00:00' && data[i].time < '04:00:00')
              TakeAway[0] += 1
            else if (data[i].time >= '04:00:00' && data[i].time < '08:00:00')
              TakeAway[1] += 1
            else if (data[i].time >= '08:00:00' && data[i].time < '12:00:00')
              TakeAway[2] += 1
            else if (data[i].time >= '12:00:00' && data[i].time < '16:00:00')
              TakeAway[3] += 1
            else if (data[i].time >= '16:00:00' && data[i].time < '20:00:00')
              TakeAway[4] += 1
            else if (data[i].time >= '20:00:00' && data[i].time < '24:00:00')
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
    customer_template_copy.find({ 'order_type': request.params.type, date: request.params.date+'T00:00:00.000Z' }, (err, data) => {
      if (!err) {
        for (var i = 0; i < data.length; i++) {
          if (data[i].time >= '00:00:00' && data[i].time < '04:00:00')
            DineIn[0] += 1
          else if (data[i].time >= '04:00:00' && data[i].time < '08:00:00')
            DineIn[1] += 1
          else if (data[i].time >= '08:00:00' && data[i].time < '12:00:00')
            DineIn[2] += 1
          else if (data[i].time >= '12:00:00' && data[i].time < '16:00:00')
            DineIn[3] += 1
          else if (data[i].time >= '16:00:00' && data[i].time < '20:00:00')
            DineIn[4] += 1
          else if (data[i].time >= '20:00:00' && data[i].time < '24:00:00')
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
    customer_template_copy.find({date: request.params.date+'T00:00:00.000Z'}, (err, data) => {
      if (!err) {
        for (var i = 0; i < data.length; i++) {
          if (data[i].order_type == 'Take Away'){
            if (data[i].time >= '00:00:00' && data[i].time < '04:00:00')
              TakeAway[0] += 1
            else if (data[i].time >= '04:00:00' && data[i].time < '08:00:00')
              TakeAway[1] += 1
            else if (data[i].time >= '08:00:00' && data[i].time < '12:00:00')
              TakeAway[2] += 1
            else if (data[i].time >= '12:00:00' && data[i].time < '16:00:00')
              TakeAway[3] += 1
            else if (data[i].time >= '16:00:00' && data[i].time < '20:00:00')
              TakeAway[4] += 1
            else if (data[i].time >= '20:00:00' && data[i].time < '24:00:00')
              TakeAway[5] += 1
          }
          else if (data[i].order_type == 'Dine In'){
            if (data[i].time >= '00:00:00' && data[i].time < '04:00:00')
              DineIn[0] += 1
            else if (data[i].time >= '04:00:00' && data[i].time < '08:00:00')
              DineIn[1] += 1
            else if (data[i].time >= '08:00:00' && data[i].time < '12:00:00')
              DineIn[2] += 1
            else if (data[i].time >= '12:00:00' && data[i].time < '16:00:00')
              DineIn[3] += 1
            else if (data[i].time >= '16:00:00' && data[i].time < '20:00:00')
              DineIn[4] += 1
            else if (data[i].time >= '20:00:00' && data[i].time < '24:00:00')
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

module.exports = {
    add_customer, all_customers, get_customer, update_customer, updateCustomerOrder, getCustomerByDate, getCustomerByValue, getDashboardCustomer
}