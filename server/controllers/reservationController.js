const reservation_template_copy = require("../models/reservation");

const add_reservation = async (req, res, next) => {
    const new_reservation = reservation_template_copy({
        ...req.body,
        start_time: req.body.startTime,
        end_time: req.body.endTime,
    });
    new_reservation
        .save()
        .then(() => res.json({ message: "Reservation created successfully" }))
        .catch(() =>
            res.status(500).json({ message: "Error creating reservation" })
        );
};

const update_reservation = async (req, res, next) => {
    let itemId = req.params.id;
    reservation_template_copy
        .findOneAndUpdate(
            { _id: itemId },
            {
                $set: {
                    ...req.body,
                    start_time: req.body.startTime,
                    end_time: req.body.endTime,
                },
            }
        )
        .then(() => res.json({ message: "Item updated successfully!" }))
        .catch(() =>
            res.status(401).json({ message: "Item could not be updated!" })
        );
};

const all_reservations = async (req, res) => {
    reservation_template_copy
        .find({})
        .then((data) => res.json(data))
        .catch(() =>
            res.status(500).json({ message: "Unable to get reservation data" })
        );
};

const get_reservation_by_date = async (req, res) => {
    reservation_template_copy
        .find({ date: req.params.date })
        .then((data) => res.json(data))
        .catch(() =>
            res.status(500).json({ message: "Unable to get reservations data" })
        );
};

const remove_reservation = async (req, res, next) => {
    let itemId = req.params.id;
    reservation_template_copy
        .findOneAndDelete({ _id: itemId })
        .then(() => res.json({ message: "Item removed successfully!" }))
        .catch(() => res.json({ message: "Item could not be removed!" }));
};

const get_reservation_by_table = async (req, res, next) => {
    reservation_template_copy
        .find({ table: req.params.table })
        .then((data) => res.json(data))
        .catch(() =>
            res.status(500).json({ message: "Unable to get reservations data" })
        );
};

const get_reservation_by_time = async (req, res, next) => {
    const start_time = req.params.start_time;
    const end_time = req.params.end_time;
    const date = req.params.date;
    const item_id = req.params.item_id;
    reservation_template_copy
        .find({
            $or: [
                { start_time: { $gte: start_time, $lte: end_time } },
                { end_time: { $gte: start_time, $lte: end_time } },
                {
                    start_time: { $lte: start_time },
                    end_time: { $gte: end_time },
                },
            ],
            date: date,
        })
        .then((data) =>
            res.json(data.filter((it) => it._id.toString() !== item_id))
        )
        .catch((err) =>
            res.status(500).json({ message: "Unable to get reservations data" })
        );
};

const getDashboardReservation = async (req, res) => {
    var DineIn = [0, 0, 0, 0, 0, 0];
    reservation_template_copy.find(
        {
            date: {
                $gte: req.params.startDate,
                $lte: req.params.stopDate,
            },
        },
        (err, data) => {
            if (!err) {
                for (var i = 0; i < data.length; i++) {
                    if (
                        data[i].start_time >= "00:00:00" &&
                        data[i].start_time < "04:00:00"
                    )
                        DineIn[0] += 1;
                    else if (
                        data[i].start_time >= "04:00:00" &&
                        data[i].start_time < "08:00:00"
                    )
                        DineIn[1] += 1;
                    else if (
                        data[i].start_time >= "08:00:00" &&
                        data[i].start_time < "12:00:00"
                    )
                        DineIn[2] += 1;
                    else if (
                        data[i].start_time >= "12:00:00" &&
                        data[i].start_time < "16:00:00"
                    )
                        DineIn[3] += 1;
                    else if (
                        data[i].start_time >= "16:00:00" &&
                        data[i].start_time < "20:00:00"
                    )
                        DineIn[4] += 1;
                    else if (
                        data[i].start_time >= "20:00:00" &&
                        data[i].start_time < "24:00:00"
                    )
                        DineIn[5] += 1;
                }
                res.status(200).send([
                    {
                        label: "Dine In",
                        data: DineIn,
                    },
                    {
                        label: "Take Away",
                        data: [],
                    },
                ]);
            } else {
                console.log("Error: ", err);
                res.status(401)
                    .send([])
                    .json({ message: "Item could not be shown!" });
            }
        }
    );
};

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
