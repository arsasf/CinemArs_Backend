const connection = require('../../config/mysql')

module.exports = {
  getDataCount: (searchByName, { sort }) => {
    return new Promise((resolve, reject) => {
      connection.query(
        `SELECT COUNT(*) AS total FROM premiere WHERE premiere_name LIKE "%"?"%" ORDER BY ${sort}`,
        searchByName,
        (error, result) => {
          !error ? resolve(result[0].total) : reject(new Error(error))
        }
      )
    })
  },
  getDataAll: (searchByName, { sort }, limit, offset) => {
    return new Promise((resolve, reject) => {
      connection.query(
        `SELECT premiere.premiere_id, movie.movie_name, location.location_city, location.location_address, 
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
  getDataById: (id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'SELECT premiere.premiere_id, movie.movie_name, location.location_city, location.location_address, premiere.premiere_name, premiere.premiere_price, show_time.show_time_date, show_time.show_time_clock FROM ((premiere premiere LEFT JOIN movie movie ON premiere.movie_id = movie.movie_id) LEFT JOIN location location on premiere.location_id = location.location_id) LEFT JOIN show_time show_time ON premiere.show_time_id = show_time.show_time_id WHERE premiere.premiere_id = ?',
        id,
        (error, result) => {
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
