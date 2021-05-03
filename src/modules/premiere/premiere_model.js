const connection = require('../../config/mysql')

module.exports = {
  getDataCountAll: (searchByName, { sort }) => {
    return new Promise((resolve, reject) => {
      connection.query(
        `SELECT COUNT(*) as total FROM premiere JOIN movie on premiere.movie_id = movie.movie_id JOIN location ON premiere.location_id = location.location_id WHERE premiere.premiere_name LIKE "%"?"%" ORDER BY ${sort}`,
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
        `SELECT * FROM premiere JOIN movie on premiere.movie_id = movie.movie_id JOIN location ON premiere.location_id = location.location_id WHERE premiere.premiere_name LIKE "%"?"%" ORDER BY ${sort} LIMIT ? OFFSET ?`,
        [searchByName, limit, offset],
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error))
        }
      )
    })
  },
  getDataById: (id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'SELECT * FROM premiere JOIN movie on premiere.movie_id = movie.movie_id JOIN location ON premiere.location_id = location.location_id WHERE premiere.premiere_id = ?',
        id,
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error))
        }
      )
    })
  },
  getDataCountByMovieId: (
    id,
    { sort },
    searchByLocation,
    searchByReleaseDate
  ) => {
    return new Promise((resolve, reject) => {
      connection.query(
        `SELECT COUNT(*) as total FROM premiere JOIN movie ON premiere.movie_id = movie.movie_id JOIN location ON premiere.location_id = location.location_id WHERE movie.movie_id = ? AND location.location_city = ? AND premiere.show_time_date= ? ORDER BY ${sort}`,
        [id, searchByLocation, searchByReleaseDate],
        (error, result) => {
          !error ? resolve(result[0].total) : reject(new Error(error))
        }
      )
    })
  },
  getDataByMovieId: (
    id,
    { sort },
    searchByLocation,
    searchByReleaseDate,
    limit,
    offset
  ) => {
    return new Promise((resolve, reject) => {
      connection.query(
        `SELECT * FROM premiere JOIN movie ON premiere.movie_id = movie.movie_id JOIN location ON premiere.location_id = location.location_id WHERE movie.movie_id = ? AND location.location_city = ? AND premiere.show_time_date= ? ORDER BY ${sort} LIMIT ? OFFSET ?`,
        [id, searchByLocation, searchByReleaseDate, limit, offset],
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error))
        }
      )
    })
  },
  getShowTimeClock: (id, date) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'SELECT show_time.show_time_id, show_time.show_time_clock FROM(show_time JOIN premiere ON premiere.premiere_id = show_time.premiere_id) WHERE premiere.premiere_id = ? and premiere.show_time_date = ?',
        [id, date],
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
