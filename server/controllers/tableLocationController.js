const table_location_template_copy = require("../models/tableLocation");

const add_table_location = (req, res, next) => {
    const { table_location } = req.body;
    if (!table_location)
        return res
            .status(400)
            .json({ message: "Please fill out the required fields!" });

    table_location_template_copy
        .findOne({ table_location: table_location })
        .then((table_locationExist) => {
            if (table_locationExist)
                return res
                    .status(409)
                    .json({ message: "Location Already Exists!" });

            const location = new table_location_template_copy(req.body);
            location
                .save()
                .then(() => {
                    res.status(201).json({
                        message: "Location added successfully!",
                    });
                })
                .catch((error) => {
                    res.status(500).json({
                        message: "Location could not be added!",
                    });
                });
        })
        .catch(next);
};

const update_table_location = (req, res, next) => {
    let location = req.params.location;
    const { table_location } = req.body;
    if (!table_location)
        return res
            .status(400)
            .json({ error: "Please fill out the required fields!" });
    table_location_template_copy
        .findOneAndUpdate({ table_location: location }, { $set: req.body })
        .then((data) => {
            if (data === null)
                res.status(404).json({ message: "Item not found!" });
            else res.json({ message: "Item updated successfully!" });
        })
        .catch((error) => {
            res.status(500).json({ message: "Item could not be updated!" });
            next(error);
        });
};

const get_table_location = (req, res) => {
    table_location_template_copy.findOne(
        { table_location: req.params.location },
        (err, data) => {
            if (!err) {
                if (data === null)
                    res.status(404).json({ message: "Item not found!" });
                else res.send(data);
            } else {
                res.json({ message: "Item could not be shown!" });
            }
        }
    );
};

const all_table_location = async (req, res) => {
    table_location_template_copy.find({}, (err, data) => {
        if (!err) res.send(data);
        else res.status(500).json({ message: "Unable to get table locations" });
    });
};

const remove_table_location = async (req, res, next) => {
    let location = req.params.location;
    table_location_template_copy
        .findOneAndDelete({ table_location: location })
        .then(() => {
            res.json({ message: "Item removed successfully!" });
        })
        .catch((error) => {
            res.status(500).json({ message: "Item could not be removed!" });
        });
};

module.exports = {
    add_table_location,
    get_table_location,
    update_table_location,
    all_table_location,
    remove_table_location,
};
