const express = require('express')
const Route = express.Router()
const showTimeController = require('./show_time_controller')
const authMiddleware = require('../../middleware/auth')
const { isAdmin } = require('../../middleware/auth')

Route.get('/', authMiddleware.authentication, showTimeController.getAllShowTime)
Route.get(
  '/:id',
  authMiddleware.authentication,
  showTimeController.getShowTimeById
)
Route.post(
  '/:id',
  authMiddleware.authentication,
  isAdmin,
  showTimeController.postShowTime
)
Route.patch(
  '/:id',
  authMiddleware.authentication,
  isAdmin,
  showTimeController.updateShowTime
)
Route.delete(
  '/:id',
  authMiddleware.authentication,
  isAdmin,
  showTimeController.deleteshowTime
)
module.exports = Route
