const helper = require('../helpers/wrapper')
const jwt = require('jsonwebtoken')

module.exports = {
  authentication: (req, res, next) => {
    // console.log('PROSES AUTHENTICATON MIDDLEWARE RUNNING')
    let token = req.headers.authorization
    // console.log(token)
    if (token) {
      token = token.split(' ')[1]
      // proses validasi token
      jwt.verify(token, 'RAHASIA', (error, result) => {
        if (
          (error && error.name === 'JsonWebTokenError') ||
          (error && error.name === 'TokenExpiredError')
        ) {
          return helper.response(res, 403, error.message)
        } else {
          // console.log(result) //berisi data sebelum di enkripsi
          req.decodeToken = result
          next()
        }
      })
    } else {
      return helper.response(res, 403, 'Please login first!')
    }
  },
  isAdmin: (req, res, next) => {
    console.log('middleware running ')
    console.log(req.decodeToken)
    if (req.decodeToken.user_role === 'admin') {
      console.log('anda adalah admin')
      next()
    } else {
      return helper.response(res, 403, 'You are not admin')
    }
  }
}
