const helper = require('../../helpers/wrapper')
const bookingModel = require('./booking_model')
const bookingSeatModel = require('../booking_seat/booking_seat_model')
const premiereModel = require('../premiere/premiere_model')

module.exports = {
  getAllBooking: async (req, res) => {
    try {
      console.log(req.params, req.query, req.body)
      const { movieId, premiereId, showTimeId } = req.query
      console.log(movieId, premiereId, showTimeId)
      const result = await bookingModel.getDataBooking(
        movieId,
        premiereId,
        showTimeId
      )
      return helper.response(res, 200, 'Success Get Data', result)
    } catch (error) {
      console.log(error)
      return helper.response(res, 400, 'Bad Request', error)
    }
  },
  getBookingById: async (req, res) => {
    try {
      const { id } = req.params
      const result = await bookingModel.getDataById(id)
      if (result.length > 0) {
        return helper.response(res, 200, 'Success Get Data', result)
      } else {
        return helper.response(res, 404, `Data By Id ${id} Not Found !`, null)
      }
    } catch (error) {
      return helper.response(res, 400, 'Bad Request', error)
    }
  },
  getBookingByUserId: async (req, res) => {
    try {
      const { id } = req.params
      const result = await bookingModel.getDataByUserId(id)
      if (result.length > 0) {
        return helper.response(res, 200, 'Success Get Data', result)
      } else {
        return helper.response(res, 404, `Data By Id ${id} Not Found !`, null)
      }
    } catch (error) {
      return helper.response(res, 400, 'Bad Request', error)
    }
  },
  getHistoryOrderByUserId: async (req, res) => {
    try {
      const id = req.decodeToken.user_id
      const result = await bookingModel.getDataOrderHistoryByUserId(id)
      if (result.length > 0) {
        return helper.response(res, 200, 'Success Get Data', result)
      } else {
        return helper.response(res, 404, `Data By Id ${id} Not Found !`, null)
      }
    } catch (error) {
      console.log(error)
      return helper.response(res, 400, 'Bad Request', error)
    }
  },
  postBooking: async (req, res) => {
    try {
      const {
        userId,
        premiereId,
        showTimeId,
        bookingTicket,
        bookingSeat,
        bookingPaymentMethod,
        bookingStatus
      } = req.body
      const resultPremiere = await premiereModel.getDataById(premiereId)
      resultPremiere.forEach(async function (item) {
        try {
          const totalPrice = bookingTicket * item.premiere_price
          const data = {
            user_id: userId,
            premiere_id: premiereId,
            show_time_id: showTimeId,
            booking_ticket: bookingTicket,
            booking_total_price: totalPrice,
            booking_payment_method: bookingPaymentMethod,
            booking_status: bookingStatus
          }
          const result2 = await bookingModel.createDataBooking(data)
          bookingSeat.forEach(function (item) {
            const setDataSeat = {
              booking_id: result2.id,
              booking_set_location: item
            }
            bookingSeatModel.createDataBookingSeat(setDataSeat)
          })
          const dataPayment = {
            orderId: result2.id,
            orderAmount: result2.booking_total_price
          }
          const result = await bookingModel.postOrderMidtrans(dataPayment)
          return helper.response(res, 200, 'Success Booking Ticket', {
            redirectUrl: result
          })
        } catch (error) {
          return helper.response(res, 400, 'Bad Request', error)
        }
      })
    } catch (error) {
      return helper.response(res, 400, 'Bad Request', error)
    }
  },
  getBookingDashboard: async (req, res) => {
    try {
      const { movieName, premiereName, locationCity } = req.query
      console.log(req.body, req.query)
      const movie = movieName || ''
      const premiere = premiereName || ''
      const location = locationCity || ''
      const months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
      const totalAMonth = []
      for (const month of months) {
        console.log(month)
        const resultMonth = await bookingModel.getDataDashboard(
          movie,
          premiere,
          location,
          month
        )
        totalAMonth.push(resultMonth[0])
      }
      return helper.response(res, 200, 'Success Get Data', totalAMonth)
    } catch (error) {
      console.log(error)
      return helper.response(res, 400, 'Bad Request', error)
    }
  }
}

// SELECT MONTH(booking_created_at) AS month, SUM(booking_total_price) AS total from booking WHERE premiere_id=2 GROUP BY MONTH(booking_created_at)
