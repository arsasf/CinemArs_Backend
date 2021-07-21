const express = require('express')
const Route = express.Router()
const locationController = require('./location_controller')

Route.get('/', locationController.getAllLocation)
Route.get('/:id', locationController.getLocationById)
Route.get('/user/search', locationController.getDataSearch)
Route.post('/:id', locationController.postLocation)
Route.patch('/:id', locationController.updateLocation)
Route.delete('/:id', locationController.deleteLocation)
module.exports = Route
