const helper = require('../../helpers/wrapper')
const movieModel = require('./movie_model')

module.exports = {
  sayHello: (req, res) => {
    res.status(200).send('Hello World')
  },
  getAllmovies: async (req, res) => {
    try {
      const result = await movieModel.getDataAll()
      console.log(result)
      return helper.response(res, 200, 'Success Get Data', result)
    } catch (error) {
      return helper.response(res, 400, 'Bad Request', error)
    }
  },
  getAllMoviesPagination: async (req, res) => {
    try {
      let { page, limit } = req.query
      page = parseInt(page)
      limit = parseInt(limit)
      const totalData = await movieModel.getDataCount()
      const totalpage = Math.ceil(totalData / limit)
      const offset = page * limit - limit
      const pageInfo = {
        page,
        totalpage,
        limit,
        totalData
      }
      const result = await movieModel.getDataAllPagination(limit, offset)
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
        return helper.response(res, 200, 'Success Get Data', result)
      } else {
        return helper.response(res, 404, `Data By Id ${id} Not Found !`, null)
      }
    } catch (error) {
      return helper.response(res, 400, 'Bad Request', error)
    }
  },
  getMovieByName: async (req, res) => {
    try {
      const { name } = req.params
      const result = await movieModel.getDataByName(name)
      if (result.length > 0) {
        return helper.response(res, 200, 'Success Get Data By Name', result)
      } else {
        return helper.response(
          res,
          404,
          `Data By Name ${name} Not Found !`,
          null
        )
      }
    } catch (error) {
      return helper.response(res, 400, 'Bad Request', error)
    }
  },
  getSortMovieByName: async (req, res) => {
    try {
      const { sort, order } = req.query
      console.log(`${sort}, ${order}`)
      const result = await movieModel.getSortDataByName()
      console.log(result)
      // if (result.length > 0) {
      //   return helper.response(res, 200, 'Success Get Data By Name', result)
      // } else {
      //   return helper.response(
      //     res,
      //     404,
      //     `Data By Name ${name} Not Found !`,
      //     null
      //   )
      // }
    } catch (error) {
      return helper.response(res, 400, 'Bad Request', error)
    }
  },
  postMovie: async (req, res) => {
    try {
      // console.log(req.body)
      const { movieName, movieCategory, movieReleaseDate } = req.body
      const setData = {
        movie_name: movieName,
        movie_category: movieCategory,
        movie_release_date: movieReleaseDate
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
        const { movieName, movieCategory, movieReleaseDate } = req.body
        const setData = {
          movie_name: movieName,
          movie_category: movieCategory,
          movie_release_date: movieReleaseDate,
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
