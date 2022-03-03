const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });

const localhost = false;

const DATABASE = localhost
    ? "mongodb+srv://Restaurant_database:Restaurant_database@cluster0.xwjxx.mongodb.net/Restaurant_database?retryWrites=true&w=majority"
    : process.env.DATABASE;

const SECRET_KEY = process.env.SECRET_KEY;
const STRIPE_PAYMENT_SECRET_KEY = process.env.STRIPE_PAYMENT_SECRET_KEY;

module.exports = {
    DATABASE,
    SECRET_KEY,
    STRIPE_PAYMENT_SECRET_KEY,
};
