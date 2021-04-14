const helper = require('../../helpers/wrapper')
const bookingModel = require('./booking_model')
const bookingSeatModel = require('../booking_seat/booking_seat_model')
const premiereModel = require('../premiere/premiere_model')

module.exports = {
  getAllBooking: async (req, res) => {
    try {
      const result = await bookingModel.getDataAll()
      return helper.response(res, 200, 'Success Get Data', result)
    } catch (error) {
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
  postBooking: async (req, res) => {
    try {
      const {
        premiereId,
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
            premiere_id: premiereId,
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
          return helper.response(res, 200, 'Success Create Booking!', result2)
        } catch (error) {
          return helper.response(res, 400, 'Bad Request', error)
        }
      })
    } catch (error) {
      return helper.response(res, 400, 'Bad Request', error)
    }
  }
}
