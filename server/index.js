const express = require('express')
const dotenv = require('dotenv')
const app = express()
const fileUpload = require('express-fileupload')
const mongoose = require('mongoose')
dotenv.config({path: './config.env'});
const routesUrls = require('./routes/registered_users')
const cors = require('cors')
const DB = process.env.DATABASE
mongoose.connect(DB, ()=>console.log("Database connected"))

app.use(fileUpload())
app.use(express.json())
app.use(cors())
app.use('/app', routesUrls)
app.listen(4000, ()=>console.log("server is up and running"))
