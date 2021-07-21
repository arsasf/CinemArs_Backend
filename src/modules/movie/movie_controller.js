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
      page = page ? parseInt(page) : 1
      limit = limit ? parseInt(limit) : 5
      sort = sort || 'movie_id ASC'
      searchByName = searchByName || ''
      month = month || 'MONTH(movie_release_date)'
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
      const setData = {
        movie_name: movieName,
        movie_category: movieCategory,
        movie_release_date: movieReleaseDate,
        movie_duration_hours: movieDurationHours,
        movie_duration_minutes: movieDurationMinutes,
        movie_directed_by: movieDirectedBy,
        movie_casts: movieCasts,
        movie_synopsis: movieSynopsis,
        movie_image: req.file ? req.file.filename : ''
      }
      const result = await movieModel.createData(setData)
      return helper.response(res, 200, 'Success Create Movie', result)
    } catch (error) {
      console.log(error)
      return helper.response(res, 400, 'Bad Request', error)
    }
  },

  updateMovie: async (req, res) => {
    try {
      const { id } = req.params
      const dataToUpdate = await movieModel.getDataById(id)
      if (dataToUpdate.length > 0) {
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
        const setData = {
          movie_name: movieName || dataToUpdate[0].movie_name,
          movie_category: movieCategory || dataToUpdate[0].movie_category,
          movie_release_date:
            movieReleaseDate || dataToUpdate[0].movie_release_date,
          movie_duration_hours:
            movieDurationHours || dataToUpdate[0].movie_duration_hours,
          movie_duration_minutes:
            movieDurationMinutes || dataToUpdate[0].movie_duration_minutes,
          movie_directed_by:
            movieDirectedBy || dataToUpdate[0].movie_directed_by,
          movie_casts: movieCasts || dataToUpdate[0].movie_casts,
          movie_synopsis: movieSynopsis || dataToUpdate[0].movie_synopsis,
          movie_updated_at: new Date(Date.now()),
          movie_image: req.file
            ? req.file.filename
            : dataToUpdate[0].movie_image
        }
        const imageToDelete = dataToUpdate[0].movie_image
        console.log(imageToDelete)
        const isImageExist = fs.existsSync(`src/uploads/${imageToDelete}`)
        if (isImageExist && imageToDelete) {
          fs.unlink(`src/uploads/${imageToDelete}`, (err) => {
            if (err) throw err
            console.log(err)
          })
        }
        const result = await movieModel.updateData(setData, id)
        return helper.response(res, 200, 'Success update Movie', result)
      } else {
        return helper.response(res, 404, `Data By Id ${id} Not Found !`, null)
      }
    } catch (error) {
      return helper.response(res, 400, 'Bad Request', error)
    }
  },

  updateImage: async (req, res) => {
    try {
      const { id } = req.params
      const setData = {
        movie_image: req.file ? req.file.filename : '',
        movie_updated_at: new Date(Date.now())
      }
      const dataToUpdate = await movieModel.getDataById(id)
      console.log(dataToUpdate)
      if (dataToUpdate.length > 0) {
        if (dataToUpdate.length > 0) {
          console.log(true)
          const imageToDelete = dataToUpdate[0].movie_image
          console.log(imageToDelete)
          const isImageExist = fs.existsSync(`src/uploads/${imageToDelete}`)
          if (isImageExist && imageToDelete) {
            console.log(true)
            fs.unlink(`src/uploads/${imageToDelete}`, (err) => {
              if (err) throw err
              console.log(err)
            })
          }
        }
        const result = await movieModel.updateData(setData, id)
        return helper.response(res, 200, 'Success Update Image', result)
      } else {
        return helper.response(res, 404, `Failed! Id ${id}  Not Found`)
      }
    } catch (error) {
      return helper.response(res, 400, 'Bad Request', error)
    }
  },
  deleteMovie: async (req, res) => {
    try {
      const { id } = req.params
      const isExist = await movieModel.getDataById(id)
      if (isExist.length === 0) {
        return helper.response(res, 404, 'Cannot delete empty data')
      } else {
        if (isExist.length > 0) {
          const imageToDelete = isExist[0].movie_image
          const isImageExist = fs.existsSync(`src/uploads/${imageToDelete}`)

          if (isImageExist && imageToDelete) {
            fs.unlink(`src/uploads/${imageToDelete}`, (err) => {
              if (err) throw err
            })
          }
        }
        const result = await movieModel.deleteData(id)

        return helper.response(
          res,
          200,
          `Success delete movie id ${id}`,
          result
        )
      }
    } catch (error) {
      console.log(error)
      return helper.response(res, 400, 'Bad request', error)
    }
  }
}
