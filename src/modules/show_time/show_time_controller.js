const helper = require('../../helpers/wrapper')
const showtimeModel = require('./show_time_model')

module.exports = {
  getAllShowTime: async (req, res) => {
    try {
      let { page, limit, searchByDate, sort } = req.query
      if (!page && !limit && !sort && !searchByDate) {
        page = 1
        limit = 11
        sort = 'show_time_id ASC'
        searchByDate = ''
      } else if (!page && limit && sort && searchByDate) {
        page = 1
      } else if (!page && !limit && sort && searchByDate) {
        page = 1
        limit = 11
      } else if (!page && !limit && !sort && searchByDate) {
        page = 1
        limit = 11
        sort = 'show_time_id ASC'
      } else if (!page && !limit && sort && !searchByDate) {
        page = 1
        limit = 11
        searchByDate = ''
      } else if (page && !limit && sort && searchByDate) {
        limit = 11
      } else if (page && !limit && !sort && searchByDate) {
        limit = 11
        sort = 'show_time_id ASC'
      } else if (page && !limit && !sort && !searchByDate) {
        limit = 11
        sort = 'show_time_id ASC'
        searchByDate = ''
      } else if (page && limit && !sort && searchByDate) {
        sort = 'show_time_id ASC'
      } else if (page && limit && !sort && !searchByDate) {
        sort = 'show_time_id ASC'
        searchByDate = ''
      } else if (page && limit && sort && !searchByDate) {
        searchByDate = ''
      }
      page = parseInt(page)
      limit = parseInt(limit)
      const totalData = await showtimeModel.getDataCount(searchByDate, { sort })
      const totalpage = Math.ceil(totalData / limit)
      const offset = page * limit - limit
      const pageInfo = {
        page,
        totalpage,
        limit,
        totalData
      }
      const result = await showtimeModel.getDataAll(
        searchByDate,
        { sort },
        limit,
        offset
      )
      if (result.length > 0) {
        return helper.response(res, 200, 'Success Get Data', pageInfo, result)
      } else {
        return helper.response(
          res,
          404,
          `Data ${searchByDate} Not Found !`,
          null
        )
      }
    } catch (error) {
      return helper.response(res, 400, 'Bad Request', error)
    }
  },
  getShowTimeById: async (req, res) => {
    try {
      const { id } = req.params
      const result = await showtimeModel.getDataById(id)
      if (result.length > 0) {
        return helper.response(res, 200, 'Success Get Data', result)
      } else {
        return helper.response(res, 404, `Data By Id ${id} Not Found !`, null)
      }
    } catch (error) {
      return helper.response(res, 400, 'Bad Request', error)
    }
  },
  postShowTime: async (req, res) => {
    try {
      console.log(req.body)
      const { premiereId, showTimeDate, showTimeClock } = req.body
      const setData = {
        premiere_id: premiereId,
        show_time_date: showTimeDate,
        show_time_clock: showTimeClock
      }
      const result = await showtimeModel.createData(setData)
      return helper.response(res, 200, 'Success Create ShowTime!', result)
    } catch (error) {
      return helper.response(res, 400, 'Bad Request', error)
    }
  },
  updateShowTime: async (req, res) => {
    try {
      const { id } = req.params
      const resultId = await showtimeModel.getDataById(id)
      if (resultId.length > 0) {
        const { premiereId, showTimeDate, showTimeClock } = req.body
        const setData = {
          premiere_id: premiereId,
          show_time_date: showTimeDate,
          show_time_clock: showTimeClock,
          show_time_updated_at: new Date(Date.now())
        }
        const result = await showtimeModel.updateData(setData, id)
        console.log(result, setData, id)
        return helper.response(res, 200, 'Success Update ShowTime!', result)
      } else {
        return helper.response(res, 404, `Data By Id ${id} Not Found !`, null)
      }
    } catch (error) {
      return helper.response(res, 400, 'Bad Request', error)
    }
  },
  deleteshowTime: async (req, res) => {
    try {
      const { id } = req.params
      const resultId = await showtimeModel.getDataById(id)
      if (resultId.length > 0) {
        const result = await showtimeModel.deleteData(id)
        return helper.response(res, 200, 'Success Delete Location!', result)
      } else {
        return helper.response(res, 404, `Data By Id ${id} Not Found !`, null)
      }
    } catch (error) {
      return helper.response(res, 400, 'Bad Request', error)
    }
  }
}
