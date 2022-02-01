const order_template_copy = require('../models/order')

const getCompletedOrders = async (request, response) => {
    order_template_copy.find({'payment.orderStatus': 'Ready to Serve'}, (err, data) => {
        if (!err)
            response.send(data);
        else
            console.log(err);

    });
}

const getCompletedOrderByDate = async (request, response) => {
    order_template_copy.find({ 'date': { $gte: request.params.startDate, $lte: request.params.stopDate}, 'payment.orderStatus': 'Ready to Serve' }, (err, data) => {
        if (!err) {
            response.send(data);
        }
        else
        {
            response.json({ message: 'Item could not be shown!' })
        }
    });
}


const getCompletedOrderById = async (request, response) => {
  order_template_copy.find({ 'order_id': request.params.id }, (err, data) => {
    if (!err) {
        response.status(200).send(data);
    }
    else
    {
        response.status(401).send([]).json({ message: 'Item could not be shown!' })
    }
  });
}


const getDashboardSales = async (request, response) => {
  const labels = ['12:00am-4:00am', '4:00am-8:00am', '8:00am-12:00pm', '12:00pm-4:00pm', '4:00pm-8:00pm', '8:00pm-12:00am'];
  var DineIn = [0, 0, 0, 0, 0, 0]
  var TakeAway = [0, 0, 0, 0, 0, 0]
  if (request.params.type == 'Take Away') {
    order_template_copy.find({ 'payment.orderType': request.params.type, 'payment.orderStatus': 'Ready to Serve' }, (err, dbData) => {
      if (!err) {
        var data = [];
        for (var i = 0; i < dbData.length; i++) {
          if (dbData[i].time.toLocaleDateString('pt-br').split( '/' ).reverse( ).join( '-' ) >= request.params.startDate && dbData[i].time.toLocaleDateString('pt-br').split( '/' ).reverse( ).join( '-' ) <= request.params.stopDate  )
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
    order_template_copy.find({ 'payment.orderType': request.params.type, 'payment.orderStatus': 'Ready to Serve' }, (err, dbData) => {
      if (!err) {
        var data = [];
        for (var i = 0; i < dbData.length; i++) {
          if (dbData[i].time.toLocaleDateString('pt-br').split( '/' ).reverse( ).join( '-' ) >= request.params.startDate && dbData[i].time.toLocaleDateString('pt-br').split( '/' ).reverse( ).join( '-' ) <= request.params.stopDate  )
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
    order_template_copy.find({'payment.orderStatus': 'Ready to Serve'}, (err, dbData) => {
      if (!err) {
        // console.log(dbData)
        var data = [];
        for (var i = 0; i < dbData.length; i++) {
          // console.log(dbData[i].time.toLocaleDateString('pt-br').split( '/' ).reverse( ).join( '-' ), request.params.date)
          if (dbData[i].time.toLocaleDateString('pt-br').split( '/' ).reverse( ).join( '-' ) >= request.params.startDate && dbData[i].time.toLocaleDateString('pt-br').split( '/' ).reverse( ).join( '-' ) <= request.params.stopDate  )
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

module.exports = {
  getCompletedOrders, getCompletedOrderByDate, getCompletedOrderById, getDashboardSales
}
