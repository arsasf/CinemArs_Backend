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
  getDataByUserId: (id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'SELECT * FROM booking join premiere ON premiere.premiere_id = booking.premiere_id JOIN movie ON premiere.movie_id = movie.movie_id JOIN location ON location.location_id = premiere.location_id WHERE booking.user_id = ?',
        id,
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error))
        }
      )
    })
  },
  getDataDashboard: (movie, premiere, location) => {
    console.log(movie, premiere, location)
    return new Promise((resolve, reject) => {
      connection.query(
        'SELECT MONTH(booking_created_at) AS month, SUM(booking_total_price) AS total from booking JOIN premiere ON premiere.premiere_id = booking.premiere_id JOIN movie ON premiere.movie_id = movie.movie_id JOIN location ON location.location_id = premiere.location_id WHERE movie.movie_name LIKE "%"?"%" AND premiere.premiere_name LIKE "%"?"%" AND location.location_city LIKE "%"?"%" GROUP BY MONTH(booking_created_at)',
        [movie, premiere, location],
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
