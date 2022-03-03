const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const config = require("../config");

const signup_template = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
    },
    email_id: {
        type: String,
        required: true,
    },
    contact: {
        type: String,
        required: true,
    },
    position: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    tokens: [
        {
            token: {
                type: String,
                required: true,
            },
        },
    ],
    attendence: {
        type: {
            status: String,
            checkinTime: String,
            checkoutTime: String,
            date: String,
        },
    },
});

//generating tokens
signup_template.methods.generateAuthToken = async function () {
    try {
        let token = jwt.sign({ _id: this._id }, config.SECRET_KEY);
        this.tokens = this.tokens.concat({ token });
        await this.save();
        return token;
    } catch (error) {
        console.log(error);
    }
};
module.exports = mongoose.model("registered_users", signup_template);
