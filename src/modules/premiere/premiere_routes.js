const express = require('express')
const Route = express.Router()
const premiereController = require('./premiere_controller')
const redisMiddleware = require('../../middleware/redis')
const authMiddleware = require('../../middleware/auth')
const { isAdmin } = require('../../middleware/auth')
const uploadFile = require('../../middleware/uploads')

Route.get('/', authMiddleware.authentication, premiereController.getAllPremiere)
Route.get(
  '/:id',
  authMiddleware.authentication,
  premiereController.getPremiereById
)
Route.get(
  '/movie/:id',
  authMiddleware.authentication,
  premiereController.getPremiereByMovieId
)
Route.get(
  '/movie-search/:id',
  authMiddleware.authentication,
  premiereController.getPremiereSearch
)
Route.post(
  '/:id',
  authMiddleware.authentication,
  isAdmin,
  uploadFile,
  redisMiddleware.cleardataPremiereRedis,
  premiereController.postPremiere
)
Route.patch(
  '/:id',
  authMiddleware.authentication,
  isAdmin,
  uploadFile,
  redisMiddleware.cleardataPremiereRedis,
  premiereController.updatePremiere
)
Route.delete(
  '/:id',
  authMiddleware.authentication,
  isAdmin,
  uploadFile,
  redisMiddleware.cleardataPremiereRedis,
  premiereController.deletePremiere
)
module.exports = Route
