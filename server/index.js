const express = require('express')
const dotenv = require('dotenv')
// var bodyParser = require('body-parser')
const app = express()
// // app.use(express.bodyParser());
// app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
// app.use(bodyParser.json())
const mongoose = require('mongoose')
dotenv.config({path: './config.env'});
const routesUrls = require('./routes/registered_users')
const cors = require('cors')
const DB = process.env.DATABASE
mongoose.connect(DB, ()=>console.log("Database connected"))

app.use(express.json())
app.use(cors())
app.use('/app', routesUrls)
app.listen(4000, ()=>console.log("server is up and running"))
