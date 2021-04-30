const express = require('express')
const { isAdmin } = require('../../middleware/auth')
// const { isAdmin } = require('../../middleware/auth')
const Route = express.Router()
const authMiddleware = require('../../middleware/auth')

const { register, login, getUserAll } = require('./auth_controller')

Route.post('/login', authMiddleware.authentication, isAdmin, login)
Route.post('/register', register)
Route.get('/user', getUserAll)

module.exports = Route
