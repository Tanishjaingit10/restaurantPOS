const attendance_template_copy = require('../models/attendance')

const add_attendance = async (request, response, next) =>{
    const {userId, status, checkInTime, checkOutTime, date } = request.body
    const new_attendance = attendance_template_copy({userId, status, checkInTime, checkOutTime, date})
    new_attendance.save(err =>{
        if (err != null){
            console.log(err, ': error adding record')
            response.status(400).json({message: 'Error creating attendance'})
        }
        else{
            response.status(200).json({message: 'attendance created successfully'})
        }
    })
}

const get_attendance = async (request, response) =>{
    attendance_template_copy.find({}, (err, data) =>{
        if (!err)
            response.send(data);
        else
            console.log(err);
    });
}

const update_attendance = async (request, response, next) =>{
    let itemId = request.params.id;
    console.log(request.params, request.body)
    const { userId, status, checkInTime, checkOutTime, date } = request.body;
    let updatedData = {
        status: status, 
        checkInTime: checkInTime, 
        checkOutTime: checkOutTime, 
    }
    attendance_template_copy.findOneAndUpdate({ _id: itemId, date: request.body.date }, { $set: updatedData })
    .then((data) =>{
        if (data === null)
            response.json({ message: 'Item not found!' })
        else { 
            response.status(200).json({ message: 'Item updated successfully!' })
            if (status === 'Shift Completed'){ 
                const new_attendance = attendance_template_copy({user_id: userId, status: 'Shift Not Started', checkInTime: 'N/A', checkOutTime: 'N/A', date: new Date(new Date().setDate(new Date(date).getDate() + 1)).toLocaleDateString('pt-br').split( '/' ).reverse( ).join( '-' )})
                new_attendance.save(err =>{
                    if (err != null){
                        console.log(err, ': error adding record')
                    }
                    else{
                        console.log('attendance created successfully')
                    }
                })
            }
        }
    })
    .catch((err) => console.log(err))
}

const get_attendance_by_date = async (request, response) =>{
    console.log(request.params)
    // if (request.params.startDate != request.params.endDate)
        attendance_template_copy.find({'date': {$gte: request.params.startDate, $lte: request.params.endDate}}, (err, data) =>{
            console.log(data);
            if (!err)
                response.send(data);
            else
                console.log(err);
        });
    // else 
    //     attendance_template_copy.find({'date': request.params.startDate}, (err, data) =>{
    //         console.log(data);
    //         if (!err)
    //             response.send(data);
    //         else
    //             console.log(err);
    //     });
}

module.exports = {
    add_attendance, get_attendance, update_attendance, get_attendance_by_date
}