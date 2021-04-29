const redis = require('redis')
const client = redis.createClient()
const helper = require('../helpers/wrapper')

module.exports = {
  getMovieByIdRedis: (req, res, next) => {
    const { id } = req.params
    client.get(`getmovie:${id}`, (error, result) => {
      if (!error && result != null) {
        console.log('data ada di dalam redis')
        return helper.response(
          res,
          200,
          'Success Get Data By Id',
          JSON.parse(result)
        )
      } else {
        console.log('data tidak ada di dalam redis')
        next()
      }
    })
  },
  getMovieRedis: (req, res, next) => {
    client.get(`getmovie:${JSON.stringify(req.query)}`, (error, result) => {
      if (!error && result != null) {
        console.log('data ada di dalam redis')
        const newResult = JSON.parse(result) // {data, pageinfo}
        return helper.response(
          res,
          200,
          'Success Get movie',
          newResult.result,
          newResult.pageInfo
        )
      } else {
        console.log('data tidak ada di dalam redis')
        next()
      }
    })
  },
  cleardataMovieRedis: (req, res, next) => {
    // proses pertama cari kunci yang berawalan
    client.keys('getmovie*', (_error, result) => {
      // console.log(result)
      if (result.length > 0) {
        result.forEach((item) => {
          client.del(item)
        })
      }
      next()
    })
  }
}
