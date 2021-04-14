const express = require('express')
const Route = express.Router()
const showTimeController = require('./show_time_controller')

Route.get('/', showTimeController.getAllShowTime)
Route.get('/:id', showTimeController.getShowTimeById)
Route.post('/:id', showTimeController.postShowTime)
Route.patch('/:id', showTimeController.updateShowTime)
Route.delete('/:id', showTimeController.deleteshowTime)
module.exports = Route
