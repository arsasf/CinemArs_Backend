const connection = require('../../config/mysql')

module.exports = {
  getDataCount: (id, searchByName, { sort }, searchBydate) => {
    console.log(id, searchByName, { sort }, searchBydate)
    return new Promise((resolve, reject) => {
      connection.query(
        `SELECT COUNT(*) as total  FROM((movie LEFT JOIN  premiere ON movie.movie_id = premiere.movie_id) LEFT JOIN location ON location.location_id=premiere.location_id)LEFT JOIN show_time ON premiere.show_time_id = show_time.premiere_id WHERE premiere.movie_id = ? AND location.location_city LIKE "%"?"%" AND Date(show_time.show_time_date) AND show_time.show_time_date LIKE "%"?"%" ORDER BY ${sort}`,
        [id, searchByName, searchBydate],
        (error, result) => {
          console.log(error)
          console.log(result)
          !error ? resolve(result[0].total) : reject(new Error(error))
        }
      )
    })
  },
  getDataAll: (searchByName, { sort }, limit, offset) => {
    return new Promise((resolve, reject) => {
      connection.query(
        `SELECT premiere.premiere_id, premiere.premiere_img, movie.movie_name, location.location_city, location.location_address, 
        premiere.premiere_name, premiere.premiere_price, show_time.show_time_date, show_time.show_time_clock 
        FROM ((premiere premiere LEFT JOIN movie movie ON premiere.movie_id = movie.movie_id) 
        LEFT JOIN location location on premiere.location_id = location.location_id) 
        LEFT JOIN show_time show_time ON premiere.show_time_id = show_time.show_time_id
        WHERE premiere_name LIKE "%"?"%" ORDER BY ${sort} LIMIT ? OFFSET ?`,
        [searchByName, limit, offset],
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error))
          console.log(result)
          console.log(error)
        }
      )
    })
  },
  getDataById: (id, searchByName, { sort }, searchBydate, limit, offset) => {
    console.log(id)
    return new Promise((resolve, reject) => {
      connection.query(
        `SELECT premiere.premiere_id, movie.movie_id,location.location_id, show_time.show_time_id, premiere.premiere_img, location.location_address, show_time.show_time_clock, premiere.premiere_name, premiere.premiere_price FROM((movie movie LEFT JOIN premiere premiere ON movie.movie_id = premiere.movie_id) LEFT JOIN location location ON location.location_id=premiere.location_id)LEFT JOIN show_time show_time ON premiere.show_time_id = show_time.premiere_id WHERE premiere.movie_id = ? AND location.location_city LIKE "%"?"%" AND Date(show_time.show_time_date) AND show_time.show_time_date LIKE "%"?"%" ORDER BY ${sort} LIMIT ? OFFSET ?`,
        [id, searchByName, searchBydate, limit, offset],
        (error, result) => {
          console.log(error)
          console.log(result)
          !error ? resolve(result) : reject(new Error(error))
        }
      )
    })
  },
  createData: (setData) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'INSERT INTO premiere SET ?',
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
  updateData: (setData, id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'UPDATE premiere SET ? WHERE premiere_id = ?',
        [setData, id],
        (error, result) => {
          if (!error) {
            const newResult = {
              id: id,
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
  deleteData: (id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'DELETE FROM premiere WHERE premiere_id = ?',
        id,
        (error, result) => {
          if (!error) {
            const newResult = {
              id: id
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
