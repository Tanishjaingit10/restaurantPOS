const dotenv = require("dotenv");
dotenv.config({ path: ".env" });

const localhost = true;

const DATABASE = localhost
    ? "mongodb://Restaurant_database:Restaurant_database@cluster0-shard-00-00.xwjxx.mongodb.net:27017,cluster0-shard-00-01.xwjxx.mongodb.net:27017,cluster0-shard-00-02.xwjxx.mongodb.net:27017/?ssl=true&replicaSet=atlas-ev3fwa-shard-0&authSource=admin&retryWrites=true&w=majority"
    // ? "mongodb+srv://Restaurant_database:Restaurant_database@cluster0.xwjxx.mongodb.net/Restaurant_database?retryWrites=true&w=majority"
    : process.env.DATABASE;

const SECRET_KEY = process.env.SECRET_KEY;

module.exports = {
    DATABASE,
    SECRET_KEY
};
