const connection = require('../../config/mysql')

module.exports = {
  getDataAll: () => {
    return new Promise((resolve, reject) => {
      connection.query(
        'SELECT booking.booking_id, premiere.premiere_name, premiere.premiere_price, booking.booking_ticket, booking.booking_total_price, booking.booking_payment_method, booking.booking_status, booking.booking_created_at, booking.booking_updated_at FROM booking booking LEFT JOIN premiere premiere on booking.premiere_id = premiere.premiere_id',
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error))
        }
      )
    })
  },
  getDataById: (id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'SELECT booking.booking_id, premiere.premiere_name, premiere.premiere_price, booking.booking_ticket, booking.booking_total_price, booking.booking_payment_method, booking.booking_status, booking.booking_created_at, booking.booking_updated_at FROM booking booking LEFT JOIN premiere premiere on booking.premiere_id = premiere.premiere_id WHERE booking.booking_id = ?',
        id,
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error))
        }
      )
    })
  },
  createDataBooking: (setData) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'INSERT INTO booking SET ?',
        setData,
        (error, result) => {
          // !error ? resolve({id: result.inserId, ...setData}) : reject(new Error(error))
          if (!error) {
            const newResult = {
              id: result.insertId,
              ...setData
            }
            resolve(newResult)
          } else {
            reject(new Error(error))
          }
        }
      )
    })
  }
}
