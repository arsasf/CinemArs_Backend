const connection = require('../../config/mysql')

module.exports = {
  getDataCount: (searchByCity, { sort }) => {
    return new Promise((resolve, reject) => {
      connection.query(
        `SELECT COUNT(*) AS total FROM location WHERE location_city LIKE "%"?"%" ORDER BY ${sort}`,
        searchByCity,
        (error, result) => {
          !error ? resolve(result[0].total) : reject(new Error(error))
        }
      )
    })
  },
  getDataAll: (searchByCity, { sort }, limit, offset) => {
    return new Promise((resolve, reject) => {
      connection.query(
        `SELECT * FROM location WHERE location_city LIKE "%"?"%" ORDER BY ${sort} LIMIT ? OFFSET ?`,
        [searchByCity, limit, offset],
        (error, result) => {
          !error ? resolve(result) : reject(new Error(error))
        }
      )
    })
  },
  getDataById: (id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'SELECT * FROM location WHERE location_id = ?',
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
        'INSERT INTO location SET ?',
        setData,
        (error, result) => {
          // !error ? resolve({id: result.inserId, ...setData}) : reject(new Error(error))
          if (!error) {
            const newResult = {
              id: result.insertId,
              ...setData
            }
            resolve(newResult)
            console.log(newResult)
          } else {
            reject(new Error(error))
            console.log(error)
          }
        }
      )
    })
  },
  updateData: (setData, id) => {
    return new Promise((resolve, reject) => {
      connection.query(
        'UPDATE location SET ? WHERE location_id = ?',
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
        'DELETE FROM location WHERE location_id = ?',
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
