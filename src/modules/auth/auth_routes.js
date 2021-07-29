const express = require('express')
const Route = express.Router()
const authMiddleware = require('../../middleware/auth')
const uploadFile = require('../../middleware/uploads')
const {
  register,
  login,
  verify,
  updateProfile,
  updatePasswordUser,
  getDataUserById,
  deleteImage
} = require('./auth_controller')

Route.post('/login', login)
Route.post('/register', register)
Route.get('/verify/:hash', verify)
Route.get('/:id', authMiddleware.authentication, getDataUserById)
Route.patch(
  '/update-profile',
  authMiddleware.authentication,
  uploadFile,
  updateProfile
)
Route.patch(
  '/delete-image',
  authMiddleware.authentication,
  uploadFile,
  deleteImage
)
Route.patch(
  '/update-password',
  authMiddleware.authentication,
  updatePasswordUser
)
module.exports = Route
