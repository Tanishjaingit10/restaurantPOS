const table_template_copy = require("../models/tables");

const add_table = async (request, response, next) => {
    const { number, capacity, location, image, status } = request.body;
    if (!number || !capacity) {
        return response
            .status(422)
            .json({ error: "Please fill out the required fields!" });
    }
    await table_template_copy.findOne({ number: number }).then((tableExist) => {
        if (tableExist) {
            return response
                .status(402)
                .json({ message: "Table Already Exists!" });
        }
        const table = new table_template_copy({
            number,
            capacity,
            location,
            image,
            status,
        });
        table
            .save()
            .then(() => response.json({ message: "Item added successfully!" }))
            .catch((error) =>
                response
                    .status(401)
                    .json({ message: "Item could not be added!" })
            );
    });
};

const vacate_table = async (req, res) => {
    tableId = req?.params?.id;
    table_template_copy
        .findOne({ _id: tableId })
        .then((data) => {
            data.status = "Free";
            data.session = null;
            return data.save();
        })
        .then(() => res.json({ message: "Table is now vacant" }))
        .catch((err) =>
            res.status(500).json({ message: "Unable to vacate table" })
        );
};

const get_table = async (request, response) => {
    table_template_copy.findOne(
        { category: request.params.id },
        (err, data) => {
            if (!err) {
                if (data === null)
                    response.json({ message: "Item not found!" });
                else response.send(data);
            } else {
                response.json({ message: "Item could not be shown!" });
            }
        }
    );
};

const all_table = async (request, response) => {
    table_template_copy.find({}, (err, data) => {
        if (!err) response.send(data);
        else console.log(err);
    });
};

const remove_table = async (request, response, next) => {
    let itemId = request.params.id;
    table_template_copy
        .findOneAndDelete({ _id: itemId })
        .then(() => {
            response.json({ message: "Table removed successfully!" });
        })
        .catch((error) => {
            response.json({ message: "Table could not be removed!" });
        });
};

const available_table = async (request, response) => {
    table_template_copy.find({ status: "Free" }, (err, data) => {
        if (!err) response.status(200).send(data);
        else console.log(err);
    });
};

const single_table = (req, res) => {
    const number = req.params.number;
    table_template_copy
        .findOne({ number })
        .then((data) => res.json(data))
        .catch((err) =>
            res.status(500).json({ message: "Unable to get table" })
        );
};

const clearTables = (req, res) => {
    table_template_copy
        .deleteMany({})
        .then((data) => res.json("deleted"))
        .catch((err) =>
            res.status(500).json({ err: err.stack || err.message })
        );
};

module.exports = {
    add_table,
    get_table,
    all_table,
    remove_table,
    available_table,
    vacate_table,
    clearTables,
    single_table,
};
