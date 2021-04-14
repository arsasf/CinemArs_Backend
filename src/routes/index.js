const express = require('express')
const Route = express.Router()
const movieRouter = require('../modules/movie/movie_routes')
const premiereRouter = require('../modules/premiere/premiere_routes')
const locationRouter = require('../modules/location/location_routes')
const showTimeRouter = require('../modules/show_time/show_time_routes')
const bookingRouter = require('../modules/booking/booking_routes')
const bookingSeatRouter = require('../modules/booking_seat/booking_seat_routes')

// [1]
// Route.get('/hello', (req, res) => {
//   res.status(200).send('Hello World')
// })

// [2]
Route.use('/movie', movieRouter)
Route.use('/premiere', premiereRouter)
Route.use('/location', locationRouter)
Route.use('/showtime', showTimeRouter)
Route.use('/booking', bookingRouter)
Route.use('/bookingseat', bookingSeatRouter)

module.exports = Route
