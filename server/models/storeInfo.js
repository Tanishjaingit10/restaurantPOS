const mongoose = require("mongoose");

const store_info_template = new mongoose.Schema({
    timings: {
        type: String, // Always open // No hours available // Permanently closed // Open During Selected hours //
        required: true,
    },
    selectedHours: {
        type: Map,
        of: {
            isChecked: Boolean,
            hours: [
                {
                    startTime: String,
                    endTime: String,
                },
            ],
        },
        default: {},
    },
});

module.exports = mongoose.model("store_info", store_info_template);
