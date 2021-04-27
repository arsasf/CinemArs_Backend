const helper = require('../../helpers/wrapper')
const premiereModel = require('./premiere_model')

module.exports = {
  getAllPremiere: async (req, res) => {
    try {
      let { page, limit, searchByName, sort } = req.query
      if (!page && !limit && !sort && !searchByName) {
        page = 1
        limit = 11
        sort = 'premiere.premiere_id ASC'
        searchByName = ''
      } else if (!page && limit && sort && searchByName) {
        page = 1
      } else if (!page && !limit && sort && searchByName) {
        page = 1
        limit = 11
      } else if (!page && !limit && !sort && searchByName) {
        page = 1
        limit = 11
        sort = 'premiere.premiere_id ASC'
      } else if (!page && !limit && sort && !searchByName) {
        page = 1
        limit = 11
        searchByName = ''
      } else if (page && !limit && sort && searchByName) {
        limit = 11
      } else if (page && !limit && !sort && searchByName) {
        limit = 11
        sort = 'premiere.premiere_id ASC'
      } else if (page && !limit && !sort && !searchByName) {
        limit = 11
        sort = 'premiere.premiere_id ASC'
        searchByName = ''
      } else if (page && limit && !sort && searchByName) {
        sort = 'premiere.premiere_id ASC'
      } else if (page && limit && !sort && !searchByName) {
        sort = 'premiere.premiere_id ASC'
        searchByName = ''
      } else if (page && limit && sort && !searchByName) {
        searchByName = ''
      }
      page = parseInt(page)
      limit = parseInt(limit)
      const totalData = await premiereModel.getDataCount(searchByName, { sort })
      const totalpage = Math.ceil(totalData / limit)
      const offset = page * limit - limit
      const pageInfo = {
        page,
        totalpage,
        limit,
        totalData
      }
      const result = await premiereModel.getDataAll(
        searchByName,
        { sort },
        limit,
        offset
      )
      console.log(result)
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
  getPremiereById: async (req, res) => {
    try {
      const { id } = req.params
      console.log(req.params)
      let { page, limit, searchByName, sort, searchBydate } = req.query
      console.log(req.query)
      if (!page && !limit && !sort && !searchByName && !searchBydate) {
        page = 1
        limit = 11
        sort = 'premiere.premiere_id ASC'
        searchByName = ''
        searchBydate = ''
        console.log(req.query)
      } else if (
        !page &&
        !limit &&
        !sort &&
        !searchByName &&
        searchBydate === ' 1'
      ) {
        page = 1
        limit = 11
        sort = 'premiere.premiere_id ASC'
        searchByName = ''
        searchBydate = '+1'
        console.log(req.query)
      } else if (page && !limit && !sort && !searchByName && !searchBydate) {
        limit = 11
        sort = 'premiere.premiere_id ASC'
        searchByName = ''
        searchBydate = ''
        console.log(req.query)
      } else if (page && limit && !sort && !searchByName && !searchBydate) {
        sort = 'premiere.premiere_id ASC'
        searchByName = ''
        searchBydate = ''
        console.log(req.query)
      } else if (page && limit && sort && !searchByName && !searchBydate) {
        searchByName = ''
        searchBydate = ''
        console.log(req.query)
      } else if (page && limit && sort && searchByName && !searchBydate) {
        searchBydate = ''
        console.log(req.query)
      } else if (page && limit && sort && searchByName && searchBydate) {
        console.log(req.query)
      } else if (!page && limit && sort && searchByName && searchBydate) {
        page = 1
        console.log(req.query)
      } else if (!page && limit && !sort && searchByName && searchBydate) {
        page = 1
        sort = 'premiere.premiere_id ASC'
        console.log(req.query)
      } else if (!page && limit && !sort && !searchByName && searchBydate) {
        page = 1
        sort = 'premiere.premiere_id ASC'
        searchByName = ''
        console.log(req.query)
      } else if (!page && limit && !sort && !searchByName && !searchBydate) {
        page = 1
        sort = 'premiere.premiere_id ASC'
        searchByName = ''
        searchBydate = ''
        console.log(req.query)
      } else if (!page && limit && sort && !searchByName && !searchBydate) {
        page = 1
        searchByName = ''
        searchBydate = ''
        console.log(req.query)
      } else if (!page && limit && !sort && searchByName && !searchBydate) {
        page = 1
        sort = 'premiere.premiere_id ASC'
        searchBydate = ''
        console.log(req.query)
      } else if (!page && !limit && sort && !searchByName && !searchBydate) {
        page = 1
        limit = 11
        searchByName = ''
        searchBydate = ''
        console.log(req.query)
      } else if (page && !limit && sort && !searchByName && !searchBydate) {
        limit = 11
        searchByName = ''
        searchBydate = ''
        console.log(req.query)
      } else if (!page && !limit && sort && searchByName && !searchBydate) {
        page = 1
        limit = 11
        searchBydate = ''
        console.log(req.query)
      } else if (!page && !limit && sort && !searchByName && searchBydate) {
        page = 1
        limit = 11
        searchByName = ''
        console.log(req.query)
      } else if (!page && !limit && !sort && searchByName && !searchBydate) {
        page = 1
        limit = 11
        sort = 'premiere.premiere_id ASC'
        searchBydate = ''
        console.log(req.query)
      } else if (page && !limit && !sort && searchByName && !searchBydate) {
        limit = 11
        sort = 'premiere.premiere_id ASC'
        searchBydate = ''
        console.log(req.query)
      } else if (page && limit && !sort && searchByName && !searchBydate) {
        sort = 'premiere.premiere_id ASC'
        searchBydate = ''
        console.log(req.query)
      } else if (!page && !limit && !sort && searchByName && searchBydate) {
        page = 1
        limit = 11
        sort = 'premiere.premiere_id ASC'
        console.log(req.query)
      } else if (!page && !limit && !sort && !searchByName && searchBydate) {
        page = 1
        limit = 11
        sort = 'premiere.premiere_id ASC'
        searchByName = ''
        console.log(req.query)
      } else if (page && !limit && !sort && !searchByName && searchBydate) {
        limit = 11
        sort = 'premiere.premiere_id ASC'
        searchByName = ''
        console.log(req.query)
      } else if (page && limit && !sort && !searchByName && searchBydate) {
        sort = 'premiere.premiere_id ASC'
        searchByName = ''
        console.log(req.query)
      }
      console.log(req.query)
      page = parseInt(page)
      limit = parseInt(limit)
      const totalData = await premiereModel.getDataCount(
        id,
        searchByName,
        {
          sort
        },
        searchBydate
      )
      console.log(totalData)
      const totalpage = Math.ceil(totalData / limit)
      const offset = page * limit - limit
      const pageInfo = {
        page,
        totalpage,
        limit,
        totalData
      }
      const result = await premiereModel.getDataById(
        id,
        searchByName,
        { sort },
        searchBydate,
        limit,
        offset
      )
      if (result.length > 0) {
        return helper.response(res, 200, 'Success Get Data', result, pageInfo)
      } else {
        return helper.response(res, 404, `Data By Id ${id} Not Found !`, null)
      }
    } catch (error) {
      return helper.response(res, 400, 'Bad Request', error)
    }
  },
  postPremiere: async (req, res) => {
    try {
      console.log(req.body)
      const {
        movieId,
        locationId,
        showTimeId,
        premiereName,
        premierePrice
      } = req.body
      const setData = {
        movie_id: movieId,
        location_id: locationId,
        show_time_id: showTimeId,
        premiere_name: premiereName,
        premiere_price: premierePrice
      }
      const result = await premiereModel.createData(setData)
      return helper.response(res, 200, 'Success Create Premiere!', result)
    } catch (error) {
      return helper.response(res, 400, 'Bad Request', error)
    }
  },
  updatePremiere: async (req, res) => {
    try {
      const { id } = req.params
      const resultId = await premiereModel.getDataById(id)
      if (resultId.length > 0) {
        const {
          movieId,
          locationId,
          showTimeId,
          premiereName,
          premierePrice
        } = req.body
        const setData = {
          movie_id: movieId,
          location_id: locationId,
          show_time_id: showTimeId,
          premiere_name: premiereName,
          premiere_price: premierePrice,
          premiere_updated_at: new Date(Date.now())
        }
        const result = await premiereModel.updateData(setData, id)
        console.log(result, setData, id)
        return helper.response(res, 200, 'Success update Premiere!', result)
      } else {
        return helper.response(res, 404, `Data By Id ${id} Not Found !`, null)
      }
    } catch (error) {
      return helper.response(res, 400, 'Bad Request', error)
    }
  },
  deletePremiere: async (req, res) => {
    try {
      const { id } = req.params
      const resultId = await premiereModel.getDataById(id)
      if (resultId.length > 0) {
        const result = await premiereModel.deleteData(id)
        return helper.response(res, 200, 'Success Delete Premiere!', result)
      } else {
        return helper.response(res, 404, `Data By Id ${id} Not Found !`, null)
      }
    } catch (error) {
      return helper.response(res, 400, 'Bad Request', error)
    }
  }
}
