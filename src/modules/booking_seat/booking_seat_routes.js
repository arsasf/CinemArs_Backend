const express = require('express')
const Route = express.Router()
const bookingSeatController = require('./booking_seat_controller')

Route.get('/', bookingSeatController.getAllBookingSeat)
Route.get('/:id', bookingSeatController.getBookingSeatById)
Route.post('/:id', bookingSeatController.postBookingSeat)
module.exports = Route
