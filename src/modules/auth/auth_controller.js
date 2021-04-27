const helper = require('../../helpers/wrapper')
const bcrypt = require('bcrypt')
const authModel = require('./auth_model')
const jwt = require('jsonwebtoken')

module.exports = {
  register: async (req, res) => {
    try {
      const { userEmail, userPassword, userName } = req.body
      const salt = bcrypt.genSaltSync(10)
      const encryptPassword = bcrypt.hashSync(userPassword, salt)
      console.log(`Before encrypt = ${userPassword}`)
      console.log(`after encrypt = ${encryptPassword}`)
      const setData = {
        user_name: userName,
        user_email: userEmail,
        user_password: encryptPassword
      }
      const result = await authModel.register(setData)
      delete result.user_password
      // kondisi cek email apakah ada didalam databse?
      // jika ada  response gagal msg = email sudaha pernah difatrakan
      // jika tidak ada = menjalnkan proses model resgister usser
      console.log(result)
      return helper.response(res, 200, 'Success Register User', result)
    } catch (error) {
      return helper.response(res, 408, 'Bad Request', error)
    }
  },
  login: async (req, res) => {
    try {
      const { userEmail, userPassword } = req.body
      const checkEmailUser = await authModel.getDataConditions({
        user_email: userEmail
      })
      // console.log('checkEmailUser')

      if (checkEmailUser.length > 0) {
        // console.log(checkEmailUser)
        const checkPassword = bcrypt.compareSync(
          userPassword,
          checkEmailUser[0].user_password
        )
        console.log(checkPassword)
        //
        if (checkPassword) {
          const payload = checkEmailUser[0]
          delete payload.user_password
          const token = jwt.sign({ ...payload }, 'RAHASIA', {
            expiresIn: '24h'
          })
          console.log(token)
          const result = { ...payload, token }
          return helper.response(res, 200, 'Success login', result)
        } else {
          return helper.response(res, 400, 'Wrong Password')
        }
      } else {
        return helper.response(res, 404, 'Email/ Account Not registered')
      }
    } catch (error) {
      return helper.response(res, 408, 'Bad Request', error)
    }
  }
}
