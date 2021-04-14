const express = require('express')
const Route = express.Router()
const premiereController = require('./premiere_controller')

Route.get('/', premiereController.getAllPremiere)
Route.get('/:id', premiereController.getPremiereById)
Route.post('/:id', premiereController.postPremiere)
Route.patch('/:id', premiereController.updatePremiere)
Route.delete('/:id', premiereController.deletePremiere)
module.exports = Route
