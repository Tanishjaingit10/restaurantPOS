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
const helpers = require('./helpers');

app.use(express.json())
app.use(cors())
app.use('/app', routesUrls)
// app.use('/uploads',express.static('uploads'));
// const storage = multer.diskStorage({
//     destination: function(req, file, cb) {
//         cb(null, 'uploads/');
//     },

//     // By default, multer removes file extensions so let's add them back
//     filename: function(req, file, cb) {
//         cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
//     }
// });
// app.use(express.static('./client/'));
app.listen(4000, ()=>console.log("server is up and running"))
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
    cb(null, '../client/public')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname )
  }
})
var upload = multer({ storage: storage }).single('file')

app.post('/upload',function(req, res) {
    upload(req, res, function (err) {
           if (err instanceof multer.MulterError) {
               return res.status(500).json(err)
           } else if (err) {
               return res.status(500).json(err)
           }
        //    const image = new image_template_copy({image})
        // image.save().then(()=>{
      return res.status(200).send(req.file)

    // }).catch(error =>{
            
    //     console.log(3)
    //     response.status(401).json({error: "Item could not be added!"})
    // })


});
})
// app.post('/addImage', (req, res) => {
//     let upload = multer({ storage: storage, fileFilter: helpers.imageFilter }).single('profile_pic');

//     upload(req, res, function(err) {
//         // req.file contains information of uploaded file
//         // req.body contains information of text fields, if there were any
//         console.log(req.file)
//         if (req.fileValidationError) {
//             return res.send(req.fileValidationError);
//         }
//         else if (!req.file) {
//             return res.status(422).json({message:"Please select an image!"})
//         }
//         else if (err instanceof multer.MulterError) {
//             return res.send(err);
//         }
//         else if (err) {
//             return res.send(err);
//         }
//         // Display uploaded image for user validation
//         console.log(req.file.path)
//         res.send(`You have uploaded this image: <hr/><img src="${req.file.path}" width="500"><hr />`);
//         // res.status(201).json({ message: "Item added successfully!" })
//     });
// });
