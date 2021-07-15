/* eslint-disable no-unused-expressions */
const helper = require('../../helpers/wrapper')
const premiereModel = require('./premiere_model')
const redis = require('redis')
const client = redis.createClient()
const fs = require('fs')

module.exports = {
  getAllPremiere: async (req, res) => {
    try {
      let { page, limit, sort, searchByName } = req.query
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
          sort = 'premiere.premiere_id ASC'
          break
        case '':
          sort = 'premiere.premiere_id ASC'
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
      page = parseInt(page)
      limit = parseInt(limit)
      const totalData = await premiereModel.getDataCountAll(searchByName, {
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
      const result = await premiereModel.getDataAll(
        searchByName,
        { sort },
        limit,
        offset
      )
      if (result.length > 0) {
        client.setex(
          `getpremiere:${JSON.stringify(req.query)}`,
          3600,
          JSON.stringify({ result, pageInfo })
        )
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
      console.log(error)
      return helper.response(res, 400, 'Bad Request', error)
    }
  },
  getPremiereById: async (req, res) => {
    try {
      const { id } = req.params
      const result = await premiereModel.getDataById(id)
      if (result.length > 0) {
        client.setex(`getpremiere:${id}`, 3600, JSON.stringify({ result }))
        console.log(`Success Get Data premiere id: ${id} \n`)
        return helper.response(res, 200, 'Success Get Data', result)
      } else {
        return helper.response(res, 404, `Data By Id ${id} Not Found !`, null)
      }
    } catch (error) {
      return helper.response(res, 400, 'Bad Request', error)
    }
  },
  getPremiereByMovieId: async (req, res) => {
    try {
      const { id } = req.params
      let { page, limit, sort, searchByLocation, searchByDate } = req.query
      page = page ? parseInt(page) : 1
      limit = limit ? parseInt(limit) : 9
      sort = sort || 'premiere.premiere_id ASC'
      searchByLocation = searchByLocation || ''
      searchByDate =
        searchByDate !== '' ? `${searchByDate}` : 'premiere.show_time_date'
      console.log(page, limit, sort, searchByLocation, searchByDate)
      const totalData = await premiereModel.getDataCountByMovieId(
        id,
        searchByLocation,
        searchByDate
      )
      page = parseInt(page)
      limit = parseInt(limit)
      const totalpage = Math.ceil(totalData / limit)
      const offset = page * limit - limit
      const pageInfo = {
        page,
        totalpage,
        limit,
        totalData
      }
      const result = await premiereModel.getDataByMovieId(
        id,
        { sort },
        searchByLocation,
        searchByDate,
        limit,
        offset
      )
      if (result.length > 0) {
        for (const value of result) {
          value.show_time_clock = await premiereModel.getShowTime(
            value.premiere_id
          )
        }
        return helper.response(res, 200, 'Success Get Data', result, pageInfo)
      } else {
        return helper.response(res, 404, `Data ${id} Not Found !`, null)
      }
    } catch (error) {
      console.log(error)
      return helper.response(res, 400, 'Bad Request', error)
    }
  },
  postPremiere: async (req, res) => {
    try {
      console.log(req.body)
      const { movieId, locationId, showTimeDate, premiereName, premierePrice } =
        req.body
      const setData = {
        movie_id: movieId,
        location_id: locationId,
        show_time_date: showTimeDate,
        premiere_name: premiereName,
        premiere_price: premierePrice,
        premiere_image: req.file ? req.file.filename : ''
      }
      const result = await premiereModel.createData(setData)
      console.log(
        `Success create movie Id : ${result.id}  and add file : ${result.movie_image}\n`
      )
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
          showTimeDate,
          premiereName,
          premierePrice
        } = req.body
        const setData = {
          movie_id: movieId,
          location_id: locationId,
          show_time_date: showTimeDate,
          premiere_image: req.file ? req.file.filename : '',
          premiere_name: premiereName,
          premiere_price: premierePrice,
          premiere_updated_at: new Date(Date.now())
        }
        console.log(resultId[0].premiere_image)
        const pathFile = 'src/uploads/' + resultId[0].premiere_image
        if (fs.existsSync(pathFile)) {
          fs.unlink(pathFile, function (err) {
            if (err) throw err
            console.log('Oldest Image Success Deleted')
          })
        }
        const result = await premiereModel.updateData(setData, id)
        console.log(
          `Success update movie Id : ${id} and add image ${result.premiere_image} \n`
        )

        return helper.response(res, 200, 'Success update Premiere!', result)
      } else {
        return helper.response(res, 404, `Data By Id ${id} Not Found !`, null)
      }
    } catch (error) {
      console.log(error)
      return helper.response(res, 400, 'Bad Request', error)
    }
  },
  deletePremiere: async (req, res) => {
    try {
      const { id } = req.params
      const resultId = await premiereModel.getDataById(id)
      if (resultId.length > 0) {
        const pathFile = 'src/uploads/' + resultId[0].premiere_image
        console.log(pathFile)
        if (fs.existsSync(pathFile)) {
          fs.unlink(pathFile, function (err) {
            if (err) throw err
            console.log('Image was Deleted')
          })
        }
        const result = await premiereModel.deleteData(id)
        console.log(`Success Delete movie Id : ${id} \n`)
        return helper.response(res, 200, 'Success Delete Premiere!', result)
      } else {
        return helper.response(res, 404, `Data By Id ${id} Not Found !`, null)
      }
    } catch (error) {
      return helper.response(res, 400, 'Bad Request', error)
    }
  }
}
