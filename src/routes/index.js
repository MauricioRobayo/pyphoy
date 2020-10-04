/* eslint no-prototype-builtins: 0 */

const { Router } = require('express')
const sm = require('sitemap')
const { getCityData } = require('pyptron')
const { helpers, site } = require('../config')

const router = Router()

router.get('/sitemap.xml', (req, res, next) => {
  const lastmod = res.locals.d
  lastmod.setHours(0, 0, 0, 0)
  let urls = [
    {
      url: res.locals.url,
      lastmod,
      changefreq: 'daily',
      priority: 1,
    },
  ]
  urls = urls.concat(
    Object.keys(res.locals.citiesMap).reduce((paths, city) => {
      paths.push({
        url: `/${city}`,
        lastmod,
        changefreq: 'daily',
        priority: 0.8,
      })
      Object.keys(res.locals.citiesMap[city].categories).forEach((category) => {
        paths.push({
          url: `/${city}/${category}`,
          lastmod,
          changefreq: 'daily',
          priority: 0.6,
        })
        if (
          city === 'manizales' &&
          category === 'transporte-publico-colectivo'
        ) {
          ;['H', 'I', 'J', 'A', 'B', 'C', 'D', 'E', 'F', 'G'].forEach((num) => {
            paths.push({
              url: `/${city}/${category}/${num}`,
              lastmod,
              changefreq: 'daily',
              priority: 0.2,
            })
          })
        } else {
          for (let i = 0; i <= 9; i += 1) {
            paths.push({
              url: `/${city}/${category}/${i}`,
              lastmod,
              changefreq: 'daily',
              priority: 0.2,
            })
          }
        }
      })
      return paths
    }, []),
  )
  const sitemap = sm.createSitemap({
    hostname: site.url,
    cacheTime: 600000, // 600 sec - cache purge period
    urls,
  })
  sitemap.toXML((err, xml) => {
    if (err) {
      next(err)
      return
    }
    res.header('Content-Type', 'application/xml')
    res.send(xml)
  })
})

router.get('/', (req, res) => {
  res.render('home', {
    home: true,
  })
})

router.get('/:city', (req, res, next) => {
  const date = res.locals.ISODateShort
  const queryParams = { date }
  const { citiesMap } = res.locals
  const { city } = req.params
  if (!citiesMap.hasOwnProperty(city)) {
    next()
    return
  }
  const pypData = getCityData(city, queryParams)
  const cityName = pypData.name
  const title = site.title({ city: cityName })
  const description = site.description({ city: cityName })
  const path = [
    {
      path: city,
      name: cityName,
    },
  ]
  res.render('city', {
    cityPage: true,
    pypData,
    path,
    cityName,
    title,
    description,
  })
})

router.get('/:city/:category', (req, res, next) => {
  const days = req.query.f ? parseInt(req.query.f, 10) : 8
  if (days > 30) {
    next()
    return
  }
  const date = helpers.localISOString(res.locals.d)
  const queryParams = { date, days }
  const { citiesMap } = res.locals
  const { city, category } = req.params
  if (!citiesMap.hasOwnProperty(city)) {
    next()
    return
  }
  if (!citiesMap[city].categories.hasOwnProperty(category)) {
    next()
    return
  }
  const pypData = getCityData(city, { category, ...queryParams })
  const cityName = pypData.name
  const { name: categoryName, key: categoryKey } = citiesMap[city].categories[
    category
  ]
  const categoryData = pypData.categories[categoryKey]
  const title = site.title({ city: cityName, category: categoryName })
  const SEOTitle = site.title({
    city: cityName,
    category: categoryName,
    date: (res.locals.archive && res.locals.date) || '',
  })
  const description = site.description({
    city: cityName,
    category: categoryName,
    date: (res.locals.archive && res.locals.date) || '',
  })
  const path = [
    {
      path: city,
      name: cityName,
    },
    {
      path: category,
      name: categoryName,
    },
  ]
  const today = new Date()
  const todayISODate = today.toISOString()
  const todayISODateShort = helpers.localISOString(today)
  res.render('category', {
    categoryPage: true,
    pypData,
    cityName,
    categoryName,
    categoryKey,
    categoryData,
    title,
    SEOTitle,
    description,
    today,
    todayISODate,
    todayISODateShort,
    path,
  })
})

/* GET Query page. */
router.get('/:city/:category/:number', (req, res, next) => {
  const { ISODateShort: date, citiesMap } = res.locals
  const { city, category, number } = req.params
  const int = parseInt(number, 10)
  const num = Number.isNaN(int) ? number.toString().toUpperCase() : int
  const queryParams = { date, days: 30 }
  if (city === 'manizales' && category === 'transporte-publico-colectivo') {
    if (!['H', 'I', 'J', 'A', 'B', 'C', 'D', 'E', 'F', 'G'].includes(num)) {
      next()
      return
    }
  } else if (![0, 1, 2, 3, 4, 5, 6, 7, 8, 9].includes(num)) {
    next()
    return
  }

  // verificamos que la ciudad solicitada se encuentre disponible
  if (!citiesMap.hasOwnProperty(city)) {
    next()
    return
  }
  // verificamos que la categoría solicita se encuentre disponible dentro de la ciudad
  if (!citiesMap[city].categories.hasOwnProperty(category)) {
    next()
    return
  }
  const pypData = getCityData(city, { category, ...queryParams })
  const { name: categoryName, key: categoryKey } = citiesMap[city].categories[
    category
  ]
  const categoryData = pypData.categories[categoryKey]
  const cityName = pypData.name
  const title = site.title({
    city: cityName,
    category: categoryName,
    number: num,
  })
  const description = site.description({
    city: cityName,
    category: categoryName,
    number: num,
  })
  const status = categoryData.data[0].numbers.includes(num)
  const nextPyp = categoryData.data.filter((val) => val.numbers.includes(num))
  const path = [
    {
      path: city,
      name: cityName,
    },
    {
      path: category,
      name: categoryName,
    },
    {
      path: number,
      name: number,
    },
  ]
  res.render('number', {
    numberPage: true,
    cityName,
    categoryName,
    categoryKey,
    categoryData,
    title,
    description,
    pypData,
    nextPyp,
    num,
    status,
    path,
  })
})

module.exports = router
