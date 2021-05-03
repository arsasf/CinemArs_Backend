const express = require('express')
const Route = express.Router()
const bookingController = require('./booking_controller')
const authMiddleware = require('../../middleware/auth')
const { isUser, isAdmin } = require('../../middleware/auth')

Route.get(
  '/',
  authMiddleware.authentication,
  isAdmin,
  bookingController.getAllBooking
)
Route.get(
  '/:id',
  authMiddleware.authentication,
  isAdmin,
  bookingController.getBookingById
)
Route.get(
  '/user/:id',
  authMiddleware.authentication,
  isUser,
  bookingController.getBookingByUserId
)
Route.get(
  '/admin/dashboard',
  authMiddleware.authentication,
  isAdmin,
  bookingController.getBookingDashboard
)
Route.post(
  '/:id',
  authMiddleware.authentication,
  isUser,
  bookingController.postBooking
)
module.exports = Route
