const express = require('express')
const Route = express.Router()
// cara pemanggilan 1
// const { sayHello } = require('./movie_controller')
// cara pemanggilan 2
const movieController = require('./movie_controller')
const authMiddleware = require('../../middleware/auth')
const uploadFile = require('../../middleware/uploads')
const redisMiddleware = require('../../middleware/redis')
const { isAdmin } = require('../../middleware/auth')
// route cara pemanggilan 1
// Route.get('/hello', sayHello)
// route cara pemanggilan 2
// Route.get('/hello', movieController.sayHello)

Route.get(
  '/',
  authMiddleware.authentication,
  uploadFile,
  redisMiddleware.getMovieRedis,
  movieController.getAllMovies
)
Route.get(
  '/:id',
  redisMiddleware.getMovieByIdRedis,
  movieController.getMovieById
)
Route.post(
  '/',
  authMiddleware.authentication,
  authMiddleware.isAdmin,
  uploadFile,
  redisMiddleware.cleardataMovieRedis,
  movieController.postMovie
)
Route.patch(
  '/:id',
  authMiddleware.authentication,
  authMiddleware.isAdmin,
  uploadFile,
  redisMiddleware.cleardataMovieRedis,
  movieController.updateMovie
)
Route.delete(
  '/:id',
  authMiddleware.authentication,
  isAdmin,
  uploadFile,
  redisMiddleware.cleardataMovieRedis,
  movieController.deleteMovie
)

module.exports = Route
