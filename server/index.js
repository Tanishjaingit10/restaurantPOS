const express = require('express')
const dotenv = require('dotenv')
const app = express()
const mongoose = require('mongoose')
dotenv.config({path: './config.env'});
const routesUrls = require('./routes/registered_users')
const cors = require('cors')
const DB = process.env.DATABASE
const multer = require('multer');
const path = require('path');
mongoose.connect(DB, ()=>console.log("Database connected"))

app.use(express.json())
app.use(cors())
app.use('/app', routesUrls)

app.listen(4000, ()=>console.log("server is up and running"))
