const helper = require('../../helpers/wrapper')
const locationModel = require('./location_model')

module.exports = {
  getAllLocation: async (req, res) => {
    try {
      let { page, limit, searchByCity, sort } = req.query
      if (!page && !limit && !sort && !searchByCity) {
        page = 1
        limit = 11
        sort = 'location_id ASC'
        searchByCity = ''
      } else if (!page && limit && sort && searchByCity) {
        page = 1
      } else if (!page && !limit && sort && searchByCity) {
        page = 1
        limit = 11
      } else if (!page && !limit && !sort && searchByCity) {
        page = 1
        limit = 11
        sort = 'location_id ASC'
      } else if (!page && !limit && sort && !searchByCity) {
        page = 1
        limit = 11
        searchByCity = ''
      } else if (page && !limit && sort && searchByCity) {
        limit = 11
      } else if (page && !limit && !sort && searchByCity) {
        limit = 11
        sort = 'location_id ASC'
      } else if (page && !limit && !sort && !searchByCity) {
        limit = 11
        sort = 'location_id ASC'
        searchByCity = ''
      } else if (page && limit && !sort && searchByCity) {
        sort = 'location_id ASC'
      } else if (page && limit && !sort && !searchByCity) {
        sort = 'location_id ASC'
        searchByCity = ''
      } else if (page && limit && sort && !searchByCity) {
        searchByCity = ''
      }
      page = parseInt(page)
      limit = parseInt(limit)
      const totalData = await locationModel.getDataCount(searchByCity, { sort })
      const totalpage = Math.ceil(totalData / limit)
      const offset = page * limit - limit
      const pageInfo = {
        page,
        totalpage,
        limit,
        totalData
      }
      const result = await locationModel.getDataAll(
        searchByCity,
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
          `Data ${searchByCity} Not Found !`,
          null
        )
      }
    } catch (error) {
      return helper.response(res, 400, 'Bad Request', error)
    }
  },
  getLocationById: async (req, res) => {
    try {
      const { id } = req.params
      const result = await locationModel.getDataById(id)
      if (result.length > 0) {
        return helper.response(res, 200, 'Success Get Data', result)
      } else {
        return helper.response(res, 404, `Data By Id ${id} Not Found !`, null)
      }
    } catch (error) {
      return helper.response(res, 400, 'Bad Request', error)
    }
  },
  postLocation: async (req, res) => {
    try {
      console.log(req.body)
      const { locationCity, locationAddress } = req.body
      const setData = {
        location_city: locationCity,
        location_address: locationAddress
      }
      const result = await locationModel.createData(setData)
      return helper.response(res, 200, 'Success Create Location!', result)
    } catch (error) {
      return helper.response(res, 400, 'Bad Request', error)
    }
  },
  updateLocation: async (req, res) => {
    try {
      const { id } = req.params
      const resultId = await locationModel.getDataById(id)
      if (resultId.length > 0) {
        const { locationCity, locationAddress } = req.body
        const setData = {
          location_city: locationCity,
          location_address: locationAddress,
          location_updated_at: new Date(Date.now())
        }
        const result = await locationModel.updateData(setData, id)
        console.log(result, setData, id)
        return helper.response(res, 200, 'Success Update Location!', result)
      } else {
        return helper.response(res, 404, `Data By Id ${id} Not Found !`, null)
      }
    } catch (error) {
      return helper.response(res, 400, 'Bad Request', error)
    }
  },
  deleteLocation: async (req, res) => {
    try {
      const { id } = req.params
      const resultId = await locationModel.getDataById(id)
      if (resultId.length > 0) {
        const result = await locationModel.deleteData(id)
        return helper.response(res, 200, 'Success Delete Location!', result)
      } else {
        return helper.response(res, 404, `Data By Id ${id} Not Found !`, null)
      }
    } catch (error) {
      return helper.response(res, 400, 'Bad Request', error)
    }
  }
}
