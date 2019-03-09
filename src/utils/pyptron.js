const debug = require('debug')('pyphoy:pyptron')
const { URL, URLSearchParams } = require('url')
const { request } = require('./request')
const { url } = require('../config').pyptron

module.exports = async (options = {}) => {
  const { city = '', category = '', queryParams } = options
  const pyptronApiEndpoint = url
  const urlObject = new URL(pyptronApiEndpoint)
  urlObject.search = new URLSearchParams(queryParams)
  urlObject.pathname = `${
    urlObject.pathname.endsWith('/')
      ? urlObject.pathname
      : `${urlObject.pathname}/`
  }${city}${category ? `/${category}` : ''}`
  debug("Using API URL: '%s'.", urlObject.href)
  return request(urlObject)
}
