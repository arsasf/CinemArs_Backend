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
      if (!page && !limit && !sort && !searchByName && !month) {
        page = 1
        limit = 11
        sort = 'movie_id ASC'
        searchByName = ''
        month = 'MONTH(now())'
        console.log(req.query)
      } else if (
        !page &&
        !limit &&
        !sort &&
        !searchByName &&
        month === 'month(now()) 1'
      ) {
        page = 1
        limit = 11
        sort = 'movie_id ASC'
        searchByName = ''
        month = 'MONTH(now())+1'
        console.log(req.query)
      } else if (page && !limit && !sort && !searchByName && !month) {
        limit = 11
        sort = 'movie_id ASC'
        searchByName = ''
        month = 'MONTH(now())'
        console.log(req.query)
      } else if (page && limit && !sort && !searchByName && !month) {
        sort = 'movie_id ASC'
        searchByName = ''
        month = 'MONTH(now())'
        console.log(req.query)
      } else if (page && limit && sort && !searchByName && !month) {
        searchByName = ''
        month = 'MONTH(now())'
        console.log(req.query)
      } else if (page && limit && sort && searchByName && !month) {
        month = 'MONTH(now())'
        console.log(req.query)
      } else if (page && limit && sort && searchByName && month) {
        console.log(req.query)
      } else if (!page && limit && sort && searchByName && month) {
        page = 1
        console.log(req.query)
      } else if (!page && limit && !sort && searchByName && month) {
        page = 1
        sort = 'movie_id ASC'
        console.log(req.query)
      } else if (!page && limit && !sort && !searchByName && month) {
        page = 1
        sort = 'movie_id ASC'
        searchByName = ''
        console.log(req.query)
      } else if (!page && limit && !sort && !searchByName && !month) {
        page = 1
        sort = 'movie_id ASC'
        searchByName = ''
        month = 'MONTH(now())'
        console.log(req.query)
      } else if (!page && limit && sort && !searchByName && !month) {
        page = 1
        searchByName = ''
        month = 'MONTH(now())'
        console.log(req.query)
      } else if (!page && limit && !sort && searchByName && !month) {
        page = 1
        sort = 'movie_id ASC'
        month = 'MONTH(now())'
        console.log(req.query)
      } else if (!page && !limit && sort && !searchByName && !month) {
        page = 1
        limit = 11
        searchByName = ''
        month = 'MONTH(now())'
        console.log(req.query)
      } else if (page && !limit && sort && !searchByName && !month) {
        limit = 11
        searchByName = ''
        month = 'MONTH(now())'
        console.log(req.query)
      } else if (!page && !limit && sort && searchByName && !month) {
        page = 1
        limit = 11
        month = 'MONTH(now())'
        console.log(req.query)
      } else if (!page && !limit && sort && !searchByName && month) {
        page = 1
        limit = 11
        searchByName = ''
        console.log(req.query)
      } else if (!page && !limit && !sort && searchByName && !month) {
        page = 1
        limit = 11
        sort = 'movie_id ASC'
        month = 'MONTH(now())'
        console.log(req.query)
      } else if (page && !limit && !sort && searchByName && !month) {
        limit = 11
        sort = 'movie_id ASC'
        month = 'MONTH(now())'
        console.log(req.query)
      } else if (page && limit && !sort && searchByName && !month) {
        sort = 'movie_id ASC'
        month = 'MONTH(now())'
        console.log(req.query)
      } else if (!page && !limit && !sort && searchByName && month) {
        page = 1
        limit = 11
        sort = 'movie_id ASC'
        console.log(req.query)
      } else if (!page && !limit && !sort && !searchByName && month) {
        page = 1
        limit = 11
        sort = 'movie_id ASC'
        searchByName = ''
        console.log(req.query)
      } else if (page && !limit && !sort && !searchByName && month) {
        limit = 11
        sort = 'movie_id ASC'
        searchByName = ''
        console.log(req.query)
      } else if (page && limit && !sort && !searchByName && month) {
        sort = 'movie_id ASC'
        searchByName = ''
        console.log(req.query)
      }
      page = parseInt(page)
      limit = parseInt(limit)
      const totalData = await movieModel.getDataCount({ month }, searchByName, {
        sort
      })
      console.log(totalData)
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
      // console.log(req.body)
      const {
        movieName,
        movieCategory,
        movieReleaseDate,
        movieDuration,
        movieDirectedBy,
        movieCasts,
        movieSynopsis
      } = req.body
      const setData = {
        movie_name: movieName,
        movie_category: movieCategory,
        movie_release_date: movieReleaseDate,
        movie_duration: movieDuration,
        movie_directed_by: movieDirectedBy,
        movie_casts: movieCasts,
        movie_synopsis: movieSynopsis,
        movie_image: req.file ? req.file.filename : ''
      }
      console.log(setData)
      const result = await movieModel.createData(setData)
      return helper.response(res, 200, 'Success Create Movie', result)
    } catch (error) {
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
          movieDuration,
          movieDirectedBy,
          movieCasts,
          movieSynopsis
        } = req.body
        const setData = {
          movie_name: movieName,
          movie_image: req.file ? req.file.filename : '',
          movie_category: movieCategory,
          movie_release_date: movieReleaseDate,
          movie_duration: movieDuration,
          movie_directed_by: movieDirectedBy,
          movie_casts: movieCasts,
          movie_synopsis: movieSynopsis,
          movie_updated_at: new Date(Date.now())
        }
        const pathFile = 'src/uploads/' + resultId[0].movie_image
        console.log(pathFile)
        if (fs.existsSync(pathFile)) {
          console.log(true)
          fs.unlink(pathFile, function (err) {
            if (err) throw err
            console.log('File Deleted')
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

  deleteMovie: async (req, res) => {
    try {
      const { id } = req.params
      const resultId = await movieModel.getDataById(id)
      console.log(resultId[0].movie_image)
      if (resultId.length > 0) {
        const pathFile = 'src/uploads/' + resultId[0].movie_image
        console.log(pathFile)
        if (fs.existsSync(pathFile)) {
          console.log(true)
          fs.unlink(pathFile, function (err) {
            if (err) throw err
            console.log('File Deleted')
          })
        }
        const result = await movieModel.deleteData(id)
        return helper.response(res, 200, 'Success Delete Movie', result)
      } else {
        return helper.response(res, 404, `Data By Id ${id} Not Found !`, null)
      }
    } catch (error) {
      return helper.response(res, 400, 'Bad Request', error)
    }
  }
}
