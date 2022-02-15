const express = require("express");
const dotenv = require("dotenv");
const app = express();
const mongoose = require("mongoose");
dotenv.config({ path: "./config.env" });
const routesUrls = require("./routes/registered_users");
const { DatabaseStatus } = require("./middleware/DatabaseState");
const cors = require("cors");
const DB = process.env.DATABASE;
const PORT = 4000;

mongoose
    .connect(DB)
    .then(() => console.log("Connected to Database"))
    .catch((err) => console.log("DB connection error: ", err));

app.use(express.json());
app.use(cors());
app.use("/app", DatabaseStatus, routesUrls);

app.listen(PORT, () =>
    console.log(`Server running at http://localhost:${PORT}`)
);
