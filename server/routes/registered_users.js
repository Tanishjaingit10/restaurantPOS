const express = require('express')
const jwt = require('jsonwebtoken')
const router = express.Router()
const signup_template_copy = require('../models/registered_users')
const items_template_copy = require('../models/food_items')
const colour_template_copy = require('../models/colour')
const bcrypt = require('bcrypt')
const userController = require('../controllers/userController')
const itemController = require('../controllers/itemController');
const categoryController= require('../controllers/categoryController')
const colourController = require('../controllers/colourController')
const variantController = require('../controllers/variantController')
const tableController = require('../controllers/tableController')
const orderController = require('../controllers/orderController')
const customerController = require('../controllers/customerController')
const reservationController = require('../controllers/reservationController')
const attendanceController = require('../controllers/attendanceController')
const salesController = require('../controllers/salesController')


router.post('/addReservation', reservationController.add_reservation)
router.get('/allReservations', reservationController.all_reservations)
router.get('/getReservationsDate/:date', reservationController.get_reservation_by_date)
router.get('/getReservationByTable/:table', reservationController.get_reservation_by_table)
router.put('/editReservation/:id', reservationController.update_reservation)
router.delete('/removeReservation/:id', reservationController.remove_reservation)
router.get('/getReservationByTime/:date/:start_time/:end_time', reservationController.get_reservation_by_time)
router.get('/getDashboardReservation/:type/:date', reservationController.getDashboardReservation)

router.post('/addAttendance', attendanceController.add_attendance)
router.get('/attendance', attendanceController.get_attendance)
router.get('/getAttendanceByDate/:startDate/:endDate', attendanceController.get_attendance_by_date)
router.put('/updateAttendance/:id', attendanceController.update_attendance)

router.post('/signup', userController.add_user)
router.get('/users', userController.show_users)
router.get('/user/:id', userController.get_user)
router.post('/signin', userController.login)
router.post('/attendence', userController.attendence)
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

router.post('/addTable', tableController.add_table)
router.get('/table', tableController.all_table)
router.get('/getAvailableTable', tableController.available_table)
router.delete('/removeTable/:id', tableController.remove_table)

router.post('/addCustomer', customerController.add_customer)
router.get('/customers', customerController.all_customers)
router.get('/customer/:id', customerController.get_customer)
router.put('/updateCustomer/:id', customerController.update_customer)
router.get('/getCustomerByDate/:startDate/:stopDate', customerController.getCustomerByDate)
router.get('/getCustomerByValue/:value', customerController.getCustomerByValue)
router.get('/getDashboardCustomer:type/:date', customerController.getDashboardCustomer)

router.post('/addOrder', orderController.add_order)
router.get('/orders', orderController.all_order)
router.put('/updateOrder/:id', orderController.update_order)
router.get('/order/:id', orderController.get_order)
router.get('/orderByDate/:startDate/:stopDate', orderController.getOrderByDate)
router.get('/orderByStatus/:status', orderController.getOrderByStatus)
router.get('/orderById/:id', orderController.getOrderById)
router.get('/getDashboardOrder/:type/:date', orderController.getDashboardOrder)

router.get('/getDashboardSales/:type/:date', salesController.getDashboardSales)
router.get('/getCompletedOrders', salesController.getCompletedOrders)
router.get('/getCompletedOrderByDate/:startDate/:stopDate', salesController.getCompletedOrderByDate)

router.put('/updateUser/:id', userController.update_user)
router.post("/addItem", itemController.add_item);

module.exports = router;
