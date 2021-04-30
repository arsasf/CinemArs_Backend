const helper = require('../../helpers/wrapper')
const bcrypt = require('bcrypt')
const authModel = require('./auth_model')
const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer')
// const SMTPConnection = require('nodemailer/lib/smtp-connection')
// const smtpTransport = require('nodemailer-smtp-transport')

module.exports = {
  register: async (req, res) => {
    try {
      const { userName, userEmail, userPassword } = req.body
      const checkEmailUser = await authModel.getDataUser(userEmail)
      console.log(checkEmailUser.length)
      if (checkEmailUser.length === 0) {
        console.log(true)
        const transporter = nodemailer.createTransport({
          host: 'smtp.ethereal.email',
          port: 587,
          auth: {
            user: 'ike.thompson5@ethereal.email',
            pass: 'Kq4aEzYFvmUPTxG2Da'
          }
        })
        // send email
        const result = await transporter.sendMail({
          from: 'ike.thompson5@ethereal.email',
          to: userEmail,
          subject: 'Test Email Subject',
          html: '<p>Hai, Welcome </p>'
        })
        console.log(result)
        console.log('Message sent: %s', result.messageId)
        console.log('Preview URL: %s', nodemailer.getTestMessageUrl(result))
        // const salt = bcrypt.genSaltSync(10)
        // const encryptPassword = bcrypt.hashSync(userPassword, salt)
        // console.log(`Before encrypt = ${userPassword}`)
        // console.log(`after encrypt = ${encryptPassword}`)
        // const setData = {
        //   user_name: userName,
        //   user_email: userEmail,
        //   user_password: encryptPassword,
        //   user_status: 1
        // }
        // const result = await authModel.register(setData)
        // delete result.user_password
        // return helper.response(res, 200, 'Success Register User', result)
      } else {
        return helper.response(
          res,
          409,
          'Your Email was resgistered, duplicated data !'
        )
      }
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
      // [1] proses pengecekan apakah email ada di database atau tidak?
      if (checkEmailUser.length > 0) {
        // console.log(checkEmailUser)
        const checkPassword = bcrypt.compareSync(
          userPassword,
          checkEmailUser[0].user_password
        )
        console.log(checkPassword)
        // [2] proses pengecekan apakah password yang dimasukan sesuai atau tidak
        if (checkPassword) {
          const payload = checkEmailUser[0]
          delete payload.user_password
          const token = jwt.sign({ ...payload }, 'RAHASIA', {
            expiresIn: '24h'
          })
          // console.log(token)
          const result = { ...payload, token }
          return helper.response(res, 200, 'Success login !', result)
        } else {
          return helper.response(res, 400, 'Wrong Password !')
        }
      } else {
        return helper.response(res, 404, 'Email/ Account Not registered')
      }
    } catch (error) {
      return helper.response(res, 408, 'Bad Request', error)
    }
  },
  getUserAll: async (req, res) => {
    try {
      const result = await authModel.getDataUser()
      return helper.response(res, 200, 'Success Get Data User !', result)
    } catch (error) {
      return helper.response(res, 408, 'Bad Request', error)
    }
  }
}
