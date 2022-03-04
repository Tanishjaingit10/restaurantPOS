const reservation_template_copy = require('../models/reservation')
const table_template_copy = require('../models/tables')

const add_reservation = async (request, response, next) =>{
    const {fullName, email_id, contact, date, start_time, end_time, table} = request.body
    const new_reservation = reservation_template_copy({fullName: request.body.fullName, email_id: request.body.email_id, contact: request.body.contact, date: request.body.date, start_time: request.body.startTime, end_time: request.body.endTime, table: request.body.table})
    new_reservation.save(err =>{
        if (err != null){
            console.log(err, ': error adding record')
            response.status(400).json({message: 'Error creating reservation'})
        }
        else{
            response.status(200).json({message: 'Reservation created successfully'})
            table_template_copy.findOneAndUpdate({number: request.body.table}, {$set: {status: 'Unavailable'}})
            .then(res => {})
            .catch(err => console.log(err))
        }
    })
}

const update_reservation = async (request, response, next) =>{
    let itemId = request.params.id;

    const { fullName, email_id, contact, date, startTime, endTime, table } = request.body;
    let updatedData = {
        fullName: fullName,
        email_id: email_id,
        contact: contact,
        date: date,
        start_time: startTime,
        end_time: endTime,
        table: table
    }
    reservation_template_copy.findOneAndUpdate({ '_id': itemId }, { $set: updatedData })
    .then((data) =>{
        if (data === null)
            response.json({ message: 'Item not found!' })
        else { 
            response.status(200).json({ message: 'Item updated successfully!' })
            if (data.hasOwnProperty('table') === true){
                if (data.table !== table){
                    table_template_copy.findOneAndUpdate({number: request.body.table}, {$set: {status: 'Unavailable'}})
                    table_template_copy.findOneAndUpdate({number: data.table}, {$set: {status: 'Free'}})
                }
            }
            else{
                reservation_template_copy.findOneAndUpdate({ '_id': itemId }, {$set: {table: table}})
                .then(res => {})
                .catch(err => console.log(err))
                table_template_copy.findOneAndUpdate({number: request.body.table}, {$set: {status: 'Unavailable'}})
                .then(res => {})
                .catch(err => console.log(err))
            }
        }
    })
    .catch(error =>{
        response.status(401).json({ message: 'Item could not be updated!' })
    })
}

const all_reservations = async (request, response) =>{
    reservation_template_copy.find({}, (err, data) =>{
        if (!err)
            response.send(data);
        else
            console.log(err);
    });
}

const get_reservation_by_date = async (request, response) =>{
    reservation_template_copy.find({date: request.params.date}, (err, data) =>{
        if (!err)
            response.send(data);
        else
            console.log(err);
    });
}

const remove_reservation = async (request, response, next) =>{
    let itemId = request.params.id;
    reservation_template_copy.findOneAndDelete({_id: itemId})
    .then((res) =>{
        response.json({ message: 'Item removed successfully!' })
        table_template_copy.findOneAndUpdate({number: res.table}, {$set: {status: 'Free'}})
    })
    .catch(error =>{
        response.json({ message: 'Item could not be removed!' })
    })
}

const get_reservation_by_table = async (request, response, next) =>{
    reservation_template_copy.find({table: request.params.table}, (err, data) =>{
        if (!err)
            response.status(200).send(data);
        else
            console.log(err);
    });
}
 
const get_reservation_by_time = async (request, response, next) =>{
    reservation_template_copy.find({start_time: { $gte: request.params.start_time, $lte: request.params.end_time }, end_time: { $gte: request.params.start_time}, date: request.params.date}, (err, data) =>{
        if (!err){
            reservation_template_copy.find({end_time: { $gte: request.params.start_time, $lte: request.params.end_time }, date: request.params.date}, (err, add_data) =>{
                if (!err){
                    var final_data = data.concat(add_data)
                    var distinctValues = {};
                    for (var i = 0; i < final_data.length; i++) {
                        if (distinctValues.hasOwnProperty(final_data[i]['_id'])){
                            final_data.splice(i, 1);
                            i--;
                        } else {
                            distinctValues[final_data[i]['_id']] = true;
                        }
                    }
                    response.status(200).send(final_data);
                } else
                    console.log(err);
            });
        } else
            console.log(err);
    });
}


const getDashboardReservation = async (request, response) => {
  const labels = ['12:00am-4:00am', '4:00am-8:00am', '8:00am-12:00pm', '12:00pm-4:00pm', '4:00pm-8:00pm', '8:00pm-12:00am'];
  var DineIn = [0, 0, 0, 0, 0, 0]
  var TakeAway = [0, 0, 0, 0, 0, 0]
  reservation_template_copy.find({ date: { $gte: request.params.startDate, $lte: request.params.stopDate }}, (err, data) => {
    if (!err) {
      // console.log(data)
      for (var i = 0; i < data.length; i++) {
        if (data[i].start_time >= '00:00:00' && data[i].start_time < '04:00:00')
          DineIn[0] += 1
        else if (data[i].start_time >= '04:00:00' && data[i].start_time < '08:00:00')
          DineIn[1] += 1
        else if (data[i].start_time >= '08:00:00' && data[i].start_time < '12:00:00')
          DineIn[2] += 1
        else if (data[i].start_time >= '12:00:00' && data[i].start_time < '16:00:00')
          DineIn[3] += 1
        else if (data[i].start_time >= '16:00:00' && data[i].start_time < '20:00:00')
          DineIn[4] += 1
        else if (data[i].start_time >= '20:00:00' && data[i].start_time < '24:00:00')
          DineIn[5] += 1
      }
      // console.log('DineIn', DineIn, TakeAway)
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

const clearReservations = (req, res) => {
    reservation_template_copy
        .deleteMany({})
        .then((data) => res.json("deleted"))
        .catch((err) =>
            res.status(500).json({ err: err.stack || err.message })
        );
};

module.exports = {
    add_reservation,
    update_reservation,
    all_reservations,
    remove_reservation,
    get_reservation_by_date,
    get_reservation_by_table,
    get_reservation_by_time,
    getDashboardReservation,
    clearReservations,
};
