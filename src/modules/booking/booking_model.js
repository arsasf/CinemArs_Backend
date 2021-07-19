const connection = require('../../config/mysql')
const midtransClient = require('midtrans-client')

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
  getDataBooking: (movieId, premiereId, showTimeId) => {
    return new Promise((resolve, reject) => {
      connection.query(
        `SELECT movie.movie_name , premiere.premiere_image, premiere.premiere_name, premiere.show_time_date, premiere.premiere_price, show_time.show_time_clock FROM (premiere) JOIN movie ON premiere.movie_id = movie.movie_id JOIN show_time ON premiere.premiere_id = show_time.premiere_id WHERE movie.movie_id = ${movieId} AND premiere.premiere_id = ${premiereId} AND show_time.show_time_id = ${showTimeId}`,
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
  getDataOrderHistoryByUserId: (id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        `SELECT *FROM booking JOIN show_time ON show_time.show_time_id = booking.show_time_id JOIN premiere ON show_time.premiere_id = premiere.premiere_id JOIN movie ON premiere.movie_id = movie.movie_id JOIN location ON premiere.location_id = location.location_id WHERE booking.user_id = ${id} ORDER BY booking.booking_id DESC`,
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error))
        }
      )
    })
  },
  getDataDashboard: (movie, premiere, location, month) => {
    console.log(movie, premiere, location, month)
    return new Promise((resolve, reject) => {
      connection.query(
        `SELECT MONTH(booking_created_at) AS month, SUM(booking_total_price) AS total from booking JOIN premiere ON premiere.premiere_id = booking.premiere_id JOIN movie ON premiere.movie_id = movie.movie_id JOIN location ON location.location_id = premiere.location_id WHERE month(booking.booking_created_at) = ${month} AND year(booking.booking_created_at) = 2021 AND movie.movie_name LIKE "%"?"%" AND premiere.premiere_name LIKE "%"?"%" AND location.location_city LIKE "%"?"%"`,
        [movie, premiere, location],
        (error, result) => {
          console.log(result)
          console.log(error)
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
  },
  postOrderMidtrans: ({ orderId, orderAmount }) => {
    return new Promise((resolve, reject) => {
      const snap = new midtransClient.Snap({
        isProduction: false,
        serverKey: 'SB-Mid-server-cQ2SdW4dl4T4ETGWBbXzM6BS',
        clientKey: 'SB-Mid-client-Br8qu0hv-PGs4oyU'
      })
      const parameter = {
        transaction_details: {
          order_id: orderId,
          gross_amount: orderAmount
        },
        credit_card: {
          secure: true
        }
      }
      snap
        .createTransaction(parameter)
        .then((transaction) => {
          // transaction token
          const transactionToken = transaction.token
          console.log('transaction:', transaction)
          console.log('transactionToken:', transactionToken)
          resolve(transaction.redirect_url)
        })
        .catch((error) => {
          console.log(error)
          reject(error)
        })
    })
  }
}
