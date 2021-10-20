const express = require('express')
const jwt = require('jsonwebtoken')
const router = express.Router()
const multer = require('multer')
const signup_template_copy = require('../models/registered_users')
const items_template_copy = require('../models/food_items')
const colour_template_copy = require('../models/colour')
const side_template_copy = require('../models/side_items')
const bcrypt = require('bcrypt')
const userController = require('../controllers/userController')
const itemController = require('../controllers/itemController');
const categoryController= require('../controllers/categoryController')
const colourController = require('../controllers/colourController')
const variantController = require('../controllers/variantController')
// router.get('/', async (request, response)=>{
//     response.json('hey!');
// })

// const storage = multer.diskStorage({
//     destination: (req, file, callback)=>{
//         console.log(file)
//         callback(null, ".../client/public/uploads/")
//         // console.log(req);
//         // console.log(file)
//     },
//     filename: (req, file, callback)=>{
//         console.log(file)
//         console.log(1)
//         callback(null,file.originalname)
//     }
// })


router.post('/signup', userController.add_user)
router.get('/users', userController.show_users)
router.get('/user/:id', userController.get_user)
router.post('/signin', userController.login)
router.get('/items', itemController.all_items)
router.get('/item/:id', itemController.get_item)
router.put('/updateItem/:id', itemController.update_item)
router.delete('/removeItem/:id', itemController.remove_item)
router.post('/addCategory', categoryController.add_category)
router.delete('/removeCategory/:id', categoryController.remove_category)
router.get('/category', categoryController.all_category)
router.get('/colour/:id', colourController.get_colour)
router.post('/addColour', colourController.add_colour)
router.get('/colours', colourController.show_colours)
router.put('/updateColour/:id', colourController.update_colour)
router.get('/category/:id', categoryController.get_category)
router.put('/updateCategory/:id', categoryController.update_category)
router.post('/addVariant', variantController.add_variant)

router.post('/addItem',(req,res)=>{
    console.log(1)
    console.log(req.body)
    const item = new items_template_copy({ foodItem:req.body.foodItem, category:req.body.category,time:req.body.time,
        description:req.body.description, price:req.body.price, 
        availability:req.body.availability, discount: req.body.discount, image: req.body.image, variant: req.body.variant})
    console.log(item)
    console.log(item.foodItem)
    if(!item.foodItem||!item.category||!item.price||!item.availability)
    {
        console.log(4);
        res.status(422).json({message:"Please fill out the required fields!"})
    }
    else
    {item.save().then(() => {
        res.status(201).json({ message: "Item added successfully!" })
    })
        .catch(error => {
            res.status(401).json({ message: "Item could not be added!" })
        })
    }


})



module.exports = router