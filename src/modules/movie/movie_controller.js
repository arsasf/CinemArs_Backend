const helper = require('../../helpers/wrapper')
const movieModel = require('./movie_model')

module.exports = {
  // sayHello: (req, res) => {
  //   res.status(200).send('Hello World')
  // },
  getAllMovies: async (req, res) => {
    try {
      let { page, limit, searchByName, sort } = req.query
      if (!page && !limit && !sort && !searchByName) {
        page = 1
        limit = 11
        sort = 'movie_id ASC'
        searchByName = ''
      } else if (!page && limit && sort && searchByName) {
        page = 1
      } else if (!page && !limit && sort && searchByName) {
        page = 1
        limit = 11
      } else if (!page && !limit && !sort && searchByName) {
        page = 1
        limit = 11
        sort = 'movie_id ASC'
      } else if (!page && !limit && sort && !searchByName) {
        page = 1
        limit = 11
        searchByName = ''
      } else if (page && !limit && sort && searchByName) {
        limit = 11
      } else if (page && !limit && !sort && searchByName) {
        limit = 11
        sort = 'movie_id ASC'
      } else if (page && !limit && !sort && !searchByName) {
        limit = 11
        sort = 'movie_id ASC'
        searchByName = ''
      } else if (page && limit && !sort && searchByName) {
        sort = 'movie_id ASC'
      } else if (page && limit && !sort && !searchByName) {
        sort = 'movie_id ASC'
        searchByName = ''
      } else if (page && limit && sort && !searchByName) {
        searchByName = ''
      }
      page = parseInt(page)
      limit = parseInt(limit)
      const totalData = await movieModel.getDataCount(searchByName, { sort })
      const totalpage = Math.ceil(totalData / limit)
      const offset = page * limit - limit
      const pageInfo = {
        page,
        totalpage,
        limit,
        totalData
      }
      const result = await movieModel.getDataAll(
        searchByName,
        { sort },
        limit,
        offset
      )
      if (result.length > 0) {
        return helper.response(res, 200, 'Success Get Data', result, pageInfo)
      } else {
        return helper.response(
          res,
          404,
          `Data ${searchByName} Not Found !`,
          null
        )
      }
    } catch (error) {
      return helper.response(res, 400, 'Bad Request', error)
    }
  },
  getMovieById: async (req, res) => {
    try {
      const { id } = req.params
      const result = await movieModel.getDataById(id)
      if (result.length > 0) {
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
        movie_synopsis: movieSynopsis
      }
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
          movie_category: movieCategory,
          movie_release_date: movieReleaseDate,
          movie_duration: movieDuration,
          movie_directed_by: movieDirectedBy,
          movie_casts: movieCasts,
          movie_synopsis: movieSynopsis,
          movie_updated_at: new Date(Date.now())
        }
        const result = await movieModel.updateData(setData, id)
        console.log(result, setData, id)
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
      if (resultId.length > 0) {
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
