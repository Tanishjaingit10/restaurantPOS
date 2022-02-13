const storeInfo = require("../models/storeInfo");
const store_info_template = require("../models/storeInfo");

function updateStoreInfo(req, res) {
    timings = req.body.timings;
    store_info_template.findOne().then((data) => {
        if (data === null) data = new store_info_template();
        data.timings = timings;
        if (req.body.selectedHours) data.selectedHours = req.body.selectedHours;
        data.save()
            .then((data) => res.json(data))
            .catch((err) => res.json(err));
    });
}

function getStoreInfo(req, res) {
    store_info_template
        .findOne()
        .then((data) => res.json(data))
        .catch((err) => res.status(500).json({ message: "Error" }));
}

module.exports = { updateStoreInfo, getStoreInfo };
