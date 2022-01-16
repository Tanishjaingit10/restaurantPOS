const reservation_template_copy = require('../models/reservation')

const add_reservation = async (request, response, next) =>{
    console.log(request.body)
    const {fullName, email_id, contact, date, start_time, end_time, table} = request.body
    console.log(fullName, email_id, contact, date, start_time, end_time, table)
    const new_reservation = reservation_template_copy({fullName: request.body.fullName, email_id: request.body.email_id, contact: request.body.contact, date: request.body.date, start_time: request.body.startTime, end_time: request.body.endTime, table: request.body.table})
    new_reservation.save(err =>{
        if (err != null){
            console.log(err, ': error adding record')
            response.status(400).json({message: 'Error creating reservation'})
        }
        else
            response.status(200).json({message: 'Reservation created successfully'})
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
        else response.status(200).json({ message: 'Item updated successfully!' })
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
    console.log(request.body, request.params);
    let itemId = request.params.id;
    reservation_template_copy.findOneAndDelete({reservation: itemId})
    .then(() =>{
        response.json({ message: 'Item removed successfully!' })
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
    console.log(request.params)
    reservation_template_copy.find({start_time: { $lte: request.params.end_time }, end_time: { $gte: request.params.start_time}, date: request.params.date}, (err, data) =>{
        if (!err){
            console.log(data);
            response.status(200).send(data);
        } else
            console.log(err);
    });
}

module.exports = {
    add_reservation, update_reservation, all_reservations, remove_reservation, get_reservation_by_date, get_reservation_by_table, get_reservation_by_time
}
