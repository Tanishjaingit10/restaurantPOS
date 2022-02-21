const express = require('express')

const router = express.Router()

const userController = require('../controllers/userController')
const itemController = require('../controllers/itemController');
const categoryController= require('../controllers/categoryController')
const tableController = require('../controllers/tableController')
const orderController = require('../controllers/orderController')
const customerController = require('../controllers/customerController')
const reservationController = require('../controllers/reservationController')
const attendanceController = require('../controllers/attendanceController')
const salesController = require('../controllers/salesController')
const kotController = require('../controllers/KOTController')
const paymentController = require('../controllers/paymentController');
const storeInfoController = require('../controllers/storeInfoController');
const FileController = require('../controllers/FileController');
const wasteFoodController = require('../controllers/wasteFoodController');

const { upload } = require('../middleware/GridFS');
// const { AuthenticationMiddleware } = require('../middleware/Authentication');


router.get('/attendance', attendanceController.get_attendance)
router.get('/getAttendanceByDate/:startDate/:endDate', attendanceController.get_attendance_by_date)
router.put('/updateAttendance/:id', attendanceController.update_attendance)

router.get('/category', categoryController.all_category)
router.get('/category/:id', categoryController.get_category)
router.post('/addCategory', categoryController.add_category)
router.put('/updateCategory/:id', categoryController.update_category)
router.delete('/removeCategory/:id', categoryController.remove_category)

router.get('/customers', customerController.all_customers)
router.get('/customer/:id', customerController.get_customer)
router.get('/getCustomerByDate/:startDate/:stopDate', customerController.getCustomerByDate)
router.get('/getCustomerByValue/:value', customerController.getCustomerByValue)
router.get('/getDashboardCustomer/:type/:startDate/:stopDate', customerController.getDashboardCustomer)

router.get("/file/", FileController.all_files)
router.post("/file/", upload.single("file"), FileController.upload_file);
router.get("/file/:id", FileController.single_file)
router.get("/file/image/:id", FileController.display_image)
router.delete("/file/:id", FileController.delete_file)

router.get('/items',itemController.all_items)
router.post("/addItem", itemController.add_item);
router.put('/updateItem/:id', itemController.update_item)
router.delete('/removeItem/:id', itemController.remove_item)

router.get('/getIncompleteKot',kotController.get_incomplete_kot)
router.post('/generateKot',kotController.generate_kot)
router.post('/kotStatus/:id',kotController.kot_order_status)
router.post('/kotItemStatus/:id',kotController.kot_item_status)

router.get('/orders', orderController.all_order)
router.get('/orderForTable/:id', orderController.get_order)
router.get('/orderByDate/:startDate/:stopDate', orderController.getOrderByDate)
router.get('/orderByStatus/:status', orderController.getOrderByStatus)
router.get('/orderById/:id', orderController.getOrderById)
router.get('/orderIDByPaymentIntentId/:id', orderController.getOrderIdByPaymentIntentId)
router.get('/getDashboardOrder/:type/:startDate/:stopDate', orderController.getDashboardOrder)
router.get('/getTakeAwayOrders', orderController.getTakeAwayOrders)
router.get('/getTakeAwayOrderByDate/:startDate/:stopDate', orderController.getTakeAwayOrderByDate)
router.post('/makePayment/:id', orderController.make_payment)
router.post('/orderOnline', orderController.order_online)

router.post("/stripe", paymentController.stripe_payment);
router.post('/stripeWebhook', paymentController.stripeWebhook)
router.get('/getPaymentStatus/:id', paymentController.getPaymentStatus)

router.get('/allReservations', reservationController.all_reservations)
router.get('/getReservationsDate/:date', reservationController.get_reservation_by_date)
router.get('/getReservationByTable/:table', reservationController.get_reservation_by_table)
router.get('/getReservationByTime/:date/:start_time/:end_time', reservationController.get_reservation_by_time)
router.get('/getDashboardReservation/:type/:startDate/:stopDate', reservationController.getDashboardReservation)
router.post('/addReservation', reservationController.add_reservation)
router.put('/editReservation/:id', reservationController.update_reservation)
router.delete('/removeReservation/:id', reservationController.remove_reservation)

router.get('/getDashboardSales/:type/:startDate/:stopDate', salesController.getDashboardSales)
router.get('/getCompletedOrders', salesController.getCompletedOrders)
router.get('/getCompletedOrderByDate/:startDate/:stopDate', salesController.getCompletedOrderByDate)

router.get('/getStoreInfo',storeInfoController.getStoreInfo)
router.post('/updateStoreInfo',storeInfoController.updateStoreInfo)

router.get('/table', tableController.all_table)
router.get('/getAvailableTable', tableController.available_table)
router.post('/addTable', tableController.add_table)
router.delete('/removeTable/:id', tableController.remove_table)

router.get('/users', userController.show_users)
router.get('/user/:id', userController.get_user)
router.post('/signup', userController.add_user)
router.post('/signin', userController.login)
router.post('/attendence', userController.attendence)
router.put('/updateUser/:id', userController.update_user)

router.get('/allWasteOrders', wasteFoodController.all_orders_having_waste)
router.get('/wasteOrdersByDate/:startDate/:stopDate', wasteFoodController.waste_orders_by_date)
router.get('/wasteForOrder/:order_id', wasteFoodController.waste_by_order_id)
router.post('/logWastage', wasteFoodController.log_wastage)

// router.get("/auth",AuthenticationMiddleware)

module.exports = router;
