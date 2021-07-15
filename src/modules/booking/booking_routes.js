const express = require('express')
const Route = express.Router()
const bookingController = require('./booking_controller')
const authMiddleware = require('../../middleware/auth')
const { isAdmin } = require('../../middleware/auth')

Route.get('/', bookingController.getAllBooking)
Route.get('/:id', bookingController.getBookingById)
Route.get('/user/:id', bookingController.getBookingByUserId)
Route.get(
  '/admin/dashboard',
  authMiddleware.authentication,
  isAdmin,
  bookingController.getBookingDashboard
)
Route.post('/', authMiddleware.authentication, bookingController.postBooking)
module.exports = Route
