const helper = require('../../helpers/wrapper')
const bcrypt = require('bcrypt')
const authModel = require('./auth_model')
const jwt = require('jsonwebtoken')
const nodemailer = require('nodemailer')
const fs = require('fs')
require('dotenv').config()

module.exports = {
  register: async (req, res) => {
    try {
      console.log('run')
      const { userName, userEmail, userPassword } = req.body
      console.log(req.body)

      const salt = bcrypt.genSaltSync(10)
      const encryptPassword = bcrypt.hashSync(userPassword, salt)
      console.log(`Before encrypt = ${userPassword}`)
      console.log(`after encrypt = ${encryptPassword}`)
      const checkEmailUser = await authModel.getDataUser(userEmail)
      if (checkEmailUser.length === 0) {
        const setData = {
          user_name: userName,
          user_email: userEmail,
          user_password: encryptPassword
        }
        const result = await authModel.register(setData)
        delete result.user_password
        const transporter = nodemailer.createTransport({
          host: 'smtp.gmail.com',
          port: 587,
          secure: false, // true for 465, false for other ports
          auth: {
            user: process.env.SMTP_EMAIL,
            pass: process.env.SMTP_PASSWORD
          }
        })
        const mailOptions = {
          from: `"CinemArs" <${process.env.SMTP_EMAIL}>`,
          to: userEmail,
          subject: 'CinemArs - Activation Email',
          html: `<p>
                      <p>
                        <b>Hello ${userName}, Welcome to CinemArs Ticket Booking. Click here to activate your account</b>
                      </p>
                      <p>
                        <a href='http://localhost:3001/api/v1/auth/verify/${result.id}'>Click !</>
                      </p>
                    </p>`
        }
        await transporter.sendMail(mailOptions, function (error, info) {
          if (error) {
            console.log(error)
            return helper.response(res, 400, 'Email not send !')
          } else {
            console.log('Email sent:' + info.response)
          }
        })
        return helper.response(
          res,
          200,
          'Success Register User, Please check your email to activation!',
          result
        )
      } else {
        return helper.response(
          res,
          409,
          'Your Email was resgistered, duplicated data !'
        )
      }
    } catch (error) {
      console.log(error)
      return helper.response(res, 408, 'Bad Request', error)
    }
  },
  login: async (req, res) => {
    try {
      const { userEmail, userPassword } = req.body
      const checkEmailUser = await authModel.getDataConditions({
        user_email: userEmail
      })
      if (checkEmailUser.length > 0) {
        const checkPassword = bcrypt.compareSync(
          userPassword,
          checkEmailUser[0].user_password
        )
        if (checkPassword) {
          const payload = checkEmailUser[0]
          delete payload.user_password
          const token = jwt.sign({ ...payload }, 'RAHASIA', {
            expiresIn: '24h'
          })
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
  verify: async (req, res) => {
    try {
      const { hash } = req.params
      const result = await authModel.verifyRegister(hash)
      return helper.response(res, 200, 'Success Verifikasi !', result)
    } catch (error) {
      return helper.response(res, 408, 'Bad Request', error)
    }
  },
  getDataUserById: async (req, res) => {
    try {
      const { id } = req.params
      const result1 = await authModel.getDataUserById(id)
      if (result1[0].user_image === '') {
        const setData = {
          user_image: 'Image.not.availabe.png'
        }
        let resultImage = await authModel.updateData(setData, id)
        resultImage = await authModel.getDataUserById(resultImage.id)
        return helper.response(
          res,
          200,
          'set Image default success',
          resultImage
        )
      }
      const result = await authModel.getDataUserById(id)
      return helper.response(res, 200, 'Success get data', result)
    } catch (error) {
      console.log(error)
      return helper.response(res, 408, 'Bad Request', error)
    }
  },
  updateProfile: async (req, res) => {
    try {
      const id = req.decodeToken.user_id
      const resultId = await authModel.getDataUserById(id)
      if (resultId.length > 0) {
        const { userFirstName, userLastName, userEmail, userPhoneNumber } =
          req.body
        const setData = {
          user_image: req.file ? req.file.filename : resultId[0].user_image,
          user_first_name: userFirstName || resultId[0].user_first_name,
          user_last_name: userLastName || resultId[0].user_last_name,
          user_email: userEmail || resultId[0].user_email,
          user_phone_number: userPhoneNumber || resultId[0].user_phone_number,
          user_updated_at: new Date(Date.now())
        }
        const imageToDelete = resultId[0].user_image
        console.log(imageToDelete)
        const isImageExist = fs.existsSync(`src/uploads/${imageToDelete}`)
        if (isImageExist && imageToDelete) {
          fs.unlink(`src/uploads/${imageToDelete}`, (err) => {
            if (err) throw err
            console.log(err)
          })
        }
        const result = await authModel.updateData(setData, id)
        console.log(
          `Success update movie Id : ${id} and update image : ${result.user_image}\n`
        )
        return helper.response(res, 200, 'Success update Movie', result)
      }
    } catch (error) {
      return helper.response(res, 408, 'Bad Request', error)
    }
  },
  updatePasswordUser: async (req, res) => {
    try {
      const id = req.decodeToken.user_id
      const { userNewPassword, userConfirmPassword } = req.body
      const salt = bcrypt.genSaltSync(10)
      const encryptPassword = bcrypt.hashSync(userNewPassword, salt)
      console.log(`Before encrypt = ${userNewPassword}`)
      console.log(`after encrypt = ${encryptPassword}`)
      if (userNewPassword !== userConfirmPassword) {
        return helper.response(
          res,
          403,
          'New Password and Confirm Password are different, please check again!'
        )
      } else {
        const setData = {
          user_password: encryptPassword
        }
        const result = await authModel.updateData(setData, id)
        delete result.user_password
        console.log('Sucess Update New Password !')
        return helper.response(res, 200, 'Success Update New Password', result)
      }
    } catch (error) {
      return helper.response(res, 408, 'Bad Request', error)
    }
  }
}
