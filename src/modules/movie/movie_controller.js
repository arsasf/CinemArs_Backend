const redis = require('redis')
const client = redis.createClient()
const helper = require('../../helpers/wrapper')
const movieModel = require('./movie_model')
const fs = require('fs')

module.exports = {
  // sayHello: (req, res) => {
  //   res.status(200).send('Hello World')
  // },
  getAllMovies: async (req, res) => {
    try {
      let { page, limit, searchByName, sort, month } = req.query

      switch (page) {
        case undefined:
          page = 1
          break
        case '':
          page = 1
          break
        default:
          break
      }
      switch (limit) {
        case undefined:
          limit = 10
          break
        case '':
          limit = 10
          break
        default:
          break
      }
      switch (sort) {
        case undefined:
          sort = 'movie_id ASC'
          break
        case '':
          sort = 'movie_id ASC'
          break
        default:
          break
      }
      switch (searchByName) {
        case undefined:
          searchByName = ''
          break
        case '':
          searchByName = ''
          break
        default:
          break
      }
      switch (month) {
        case undefined:
          month = 'MONTH(now())'
          break
        case '':
          month = 'MONTH(now())'
          break
        default:
          break
      }
      page = parseInt(page)
      limit = parseInt(limit)
      const totalData = await movieModel.getDataCount({ month }, searchByName, {
        sort
      })
      const totalpage = Math.ceil(totalData / limit)
      const offset = page * limit - limit
      const pageInfo = {
        page,
        totalpage,
        limit,
        totalData
      }
      const result = await movieModel.getDataAll(
        { month },
        searchByName,
        { sort },
        limit,
        offset
      )
      client.setex(
        `getmovie:${JSON.stringify(req.query)}`,
        3600,
        JSON.stringify({ result, pageInfo })
      )
      return helper.response(res, 200, 'Success Get Data', result, pageInfo)
    } catch (error) {
      console.log(error)
      return helper.response(res, 400, 'Bad Request', error)
    }
  },
  getMovieById: async (req, res) => {
    try {
      const { id } = req.params
      const result = await movieModel.getDataById(id)
      if (result.length > 0) {
        client.set(`getmovie:${id}`, JSON.stringify(result))
        return helper.response(res, 200, 'Success Get Data', result)
      } else {
        return helper.response(res, 404, `Data By Id ${id} Not Found !`, null)
      }
    } catch (error) {
      return helper.response(res, 400, 'Bad Request', error)
    }
  },
  postMovie: async (req, res) => {
    try {
      const {
        movieName,
        movieCategory,
        movieReleaseDate,
        movieDurationHours,
        movieDurationMinutes,
        movieDirectedBy,
        movieCasts,
        movieSynopsis
      } = req.body
      switch (movieName) {
        case undefined:
          return helper.response(res, 404, 'Please Input Movie Name')
        case '':
          return helper.response(res, 404, 'Please Input Movie Name')
        default:
          break
      }
      switch (movieCategory) {
        case undefined:
          return helper.response(res, 404, 'Please Input Category')
        case '':
          return helper.response(res, 404, 'Please Input Category')
        default:
          break
      }
      switch (movieReleaseDate) {
        case undefined:
          return helper.response(res, 404, 'Please Input Release Date')
        case '':
          return helper.response(res, 404, 'Please Input Release Date')
        default:
          break
      }
      switch (movieDurationHours) {
        case undefined:
          return helper.response(res, 404, 'Please Input Duration Hours')
        case '':
          return helper.response(res, 404, 'Please Input Duration Hours')
        case movieDurationHours.length > 1:
          return helper.response(
            res,
            404,
            'Duration Hours Wrong, Please Check Again'
          )

        default:
          break
      }
      switch (movieDurationMinutes) {
        case undefined:
          return helper.response(res, 404, 'Please Input Duration Minutes')
        case '':
          return helper.response(res, 404, 'Please Input Duration Minutes')
        case movieDurationMinutes.length > 1:
          return helper.response(
            res,
            404,
            'Duration Minutes Wrong, Please Check Again'
          )
        default:
          break
      }
      switch (movieDirectedBy) {
        case undefined:
          return helper.response(res, 404, 'Please Input Director')
        case '':
          return helper.response(res, 404, 'Please Input Director')
        default:
          break
      }
      switch (movieCasts) {
        case undefined:
          return helper.response(res, 404, 'Please Input Casts')
        case '':
          return helper.response(res, 404, 'Please Input Casts')
        default:
          break
      }
      switch (movieSynopsis) {
        case undefined:
          return helper.response(res, 404, 'Please Input Synopsis')
        case '':
          return helper.response(res, 404, 'Please Input Synopsis')
        default:
          break
      }
      switch (req.file) {
        case undefined:
          return helper.response(res, 404, 'Please Input File Image')
        case '':
          return helper.response(res, 404, 'Please Input File Image')
        default:
          break
      }
      const setData = {
        movie_name: movieName,
        movie_category: movieCategory,
        movie_release_date: movieReleaseDate,
        movie_duration: `${movieDurationHours} hours ${movieDurationMinutes} minutes`,
        movie_directed_by: movieDirectedBy,
        movie_casts: movieCasts,
        movie_synopsis: movieSynopsis,
        movie_image: req.file ? req.file.filename : ''
      }
      const result = await movieModel.createData(setData)
      console.log(
        `Success create movie Id : ${result.id}  and add file : ${result.movie_image}\n`
      )
      return helper.response(res, 200, 'Success Create Movie', result)
    } catch (error) {
      console.log(error)
      return helper.response(res, 400, 'Bad Request', error)
    }
  },

  updateMovie: async (req, res) => {
    try {
      const { id } = req.params
      const resultId = await movieModel.getDataById(id)
      if (resultId.length > 0) {
        const {
          movieName,
          movieCategory,
          movieReleaseDate,
          movieDurationHours,
          movieDurationMinutes,
          movieDirectedBy,
          movieCasts,
          movieSynopsis
        } = req.body
        console.log(movieDurationHours.length)
        switch (movieName) {
          case undefined:
            return helper.response(
              res,
              404,
              'Update Failed, Please Input Movie Name'
            )
          case '':
            return helper.response(
              res,
              404,
              'Update Failed, Please Input Movie Name'
            )
          default:
            break
        }
        switch (movieCategory) {
          case undefined:
            return helper.response(
              res,
              404,
              'Update Failed, Please Input Category'
            )
          case '':
            return helper.response(
              res,
              404,
              'Update Failed, Please Input Category'
            )
          default:
            break
        }
        switch (movieReleaseDate) {
          case undefined:
            return helper.response(
              res,
              404,
              'Update Failed, Please Input Release Date'
            )
          case '':
            return helper.response(
              res,
              404,
              'Update Failed, Please Input Release Date'
            )
          default:
            break
        }
        switch (movieDurationHours) {
          case undefined:
            return helper.response(
              res,
              404,
              'Update Failed, Please Input Duration Hours'
            )
          case '':
            return helper.response(
              res,
              404,
              'Update Failed, Please Input Duration Hours'
            )
          case movieDurationHours.length > 1:
            return helper.response(
              res,
              404,
              'Update Failed, Input Duration Hours Wrong. Please Check Again'
            )
          default:
            break
        }
        switch (movieDurationMinutes) {
          case undefined:
            return helper.response(
              res,
              404,
              'Update Failed, Please Input Duration Minutes'
            )
          case '':
            return helper.response(
              res,
              404,
              'Update Failed, Please Input Duration Minutes'
            )
          case movieDurationMinutes.length > 1:
            return helper.response(
              res,
              404,
              'Update Failed, Input Duration Minutes Wrong. Please Check Again'
            )
          default:
            break
        }
        switch (movieDirectedBy) {
          case undefined:
            return helper.response(
              res,
              404,
              'Update Failed, Please Input Director'
            )
          case '':
            return helper.response(
              res,
              404,
              'Update Failed, Please Input Director'
            )
          default:
            break
        }
        switch (movieCasts) {
          case undefined:
            return helper.response(
              res,
              404,
              'Update Failed, Please Input Casts'
            )
          case '':
            return helper.response(
              res,
              404,
              'Update Failed, Please Input Casts'
            )
          default:
            break
        }
        switch (movieSynopsis) {
          case undefined:
            return helper.response(
              res,
              404,
              'Update Failed, Please Input Synopsis'
            )
          case '':
            return helper.response(
              res,
              404,
              'Update Failed, Please Input Synopsis'
            )
          default:
            break
        }
        switch (req.file) {
          case undefined:
            return helper.response(
              res,
              404,
              'Update Failed, Please Input Image'
            )
          case '':
            return helper.response(
              res,
              404,
              'Update Failed, Please Input Image'
            )
          default:
            break
        }
        const setData = {
          movie_name: movieName,
          movie_image: req.file ? req.file.filename : '',
          movie_category: movieCategory,
          movie_release_date: movieReleaseDate,
          movie_duration: `${movieDurationHours} hours ${movieDurationMinutes} minutes`,
          movie_directed_by: movieDirectedBy,
          movie_casts: movieCasts,
          movie_synopsis: movieSynopsis,
          movie_updated_at: new Date(Date.now())
        }
        const result = await movieModel.updateData(setData, id)
        console.log(`Success update movie Id : ${id} \n`)
        const pathFile = 'src/uploads/' + resultId[0].movie_image
        if (fs.existsSync(pathFile)) {
          fs.unlink(pathFile, function (err) {
            if (err) throw err
            console.log('Oldest Image Success Deleted')
          })
        }
        return helper.response(res, 200, 'Success update Movie', result)
      } else {
        console.log(res)
        return helper.response(res, 404, `Data By Id ${id} Not Found !`, null)
      }
    } catch (error) {
      return helper.response(res, 400, 'Bad Request', error)
    }
  },

  deleteMovie: async (req, res) => {
    try {
      const { id } = req.params
      const resultId = await movieModel.getDataById(id)
      if (resultId.length > 0) {
        const pathFile = 'src/uploads/' + resultId[0].movie_image
        console.log(pathFile)
        if (fs.existsSync(pathFile)) {
          fs.unlink(pathFile, function (err) {
            if (err) throw err
            console.log('Image was Deleted')
          })
        }
        const result = await movieModel.deleteData(id)
        console.log(`Success Delete movie Id : ${id} \n`)
        return helper.response(res, 200, 'Success Delete Movie', result)
      } else {
        return helper.response(res, 404, `Data By Id ${id} Not Found !`, null)
      }
    } catch (error) {
      return helper.response(res, 400, 'Bad Request', error)
    }
  }
}
