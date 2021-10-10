const express = require('express')
const jwt = require('jsonwebtoken')
const router = express.Router()
const signup_template_copy = require('../models/registered_users')
const items_template_copy = require('../models/food_items')
const bcrypt = require('bcrypt')
const userController = require('../controllers/userController')
const itemController = require('../controllers/itemController');
router.get('/', async (request, response)=>{
    response.json('hey!');
})

router.post('/signup', userController.add_user)
router.get('/users', userController.show_users)
router.get('/user/:id', userController.get_user)
router.post('/signin', userController.login)
router.post('/addItem', itemController.add_item)
router.get('/items', itemController.all_items)
router.get('/item/:id', itemController.get_item)
router.post('/updateItem', itemController.update_item)
router.post('/removeItem', itemController.remove_item)

module.exports = router