const helper = require('../../helpers/wrapper')
const bookingSeatModel = require('../booking_seat/booking_seat_model')

module.exports = {
  getAllBookingSeat: async (req, res) => {
    try {
      const result = await bookingSeatModel.getDataAll()
      return helper.response(res, 200, 'Success Get Data', result)
    } catch (error) {
      return helper.response(res, 400, 'Bad Request', error)
    }
  },
  getBookingSeatById: async (req, res) => {
    try {
      const { id } = req.params
      const result = await bookingSeatModel.getDataById(id)
      if (result.length > 0) {
        return helper.response(res, 200, 'Success Get Data', result)
      } else {
        return helper.response(res, 404, `Data By Id ${id} Not Found !`, null)
      }
    } catch (error) {
      return helper.response(res, 400, 'Bad Request', error)
    }
  },
  postBookingSeat: async (req, res) => {
    try {
      const { bookingId, bookingSetLocation } = req.body
      const setDataSeat = {
        booking_id: bookingId,
        booking_set_location: bookingSetLocation
      }
      const result = await bookingSeatModel.createDataBookingSeat(setDataSeat)
      return helper.response(res, 200, 'Success Create Booking Seat!', result)
    } catch (error) {
      return helper.response(res, 400, 'Bad Request', error)
    }
  }
}
