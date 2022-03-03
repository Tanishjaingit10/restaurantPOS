const jwt = require("jsonwebtoken");
const signup_template_copy = require("../models/registered_users");
const config = require("../config");

const AuthenticationMiddleware = async (req, res, next) => {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (!token) return res.sendStatus(401);
    jwt.verify(token, config.SECRET_KEY, (err, data) => {
        if (err)
            return res.status(401).json({ message: "Unable to authenticate" });
        else {
            signup_template_copy
                .findOne(data)
                .then((data) => (req.user = data))
                .catch((err) => console.log(err));
        }
    });
    return res.json("okk");
};

module.exports = {
    AuthenticationMiddleware,
};
