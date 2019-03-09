const http = require('http')
const https = require('https')

exports.request = params =>
  new Promise((resolve, reject) => {
    const { get } = params.protocol === 'http:' ? http : https
    const req = get(params, res => {
      if (res.statusCode < 200 || res.statusCode >= 300) {
        reject(new Error(res.statusCode))
        return
      }
      let data = ''
      res.on('data', _data => {
        data += _data
      })
      res.on('end', () => {
        resolve(JSON.parse(data))
      })
    })
    req.on('error', err => {
      reject(err)
    })
    req.end()
  })
