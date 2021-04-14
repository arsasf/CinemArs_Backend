const express = require('express')
const Route = express.Router()
// cara pemanggilan 1
// const { sayHello } = require('./movie_controller')
// cara pemanggilan 2
const movieController = require('./movie_controller')

// route cara pemanggilan 1
// Route.get('/hello', sayHello)
// route cara pemanggilan 2
// Route.get('/hello', movieController.sayHello)

Route.get('/', movieController.getAllMovies)
Route.get('/:id', movieController.getMovieById)
Route.post('/:id', movieController.postMovie)
Route.patch('/:id', movieController.updateMovie)
Route.delete('/:id', movieController.deleteMovie)
module.exports = Route
