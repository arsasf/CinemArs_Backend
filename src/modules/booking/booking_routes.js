const express = require('express')
const Route = express.Router()
const bookingController = require('./booking_controller')

Route.get('/', bookingController.getAllBooking)
Route.get('/:id', bookingController.getBookingById)
Route.post('/:id', bookingController.postBooking)
module.exports = Route
