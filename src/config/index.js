const { format } = require('date-fns')
const { es } = require('date-fns/locale')

const site = {
  url: 'https://www.pyphoy.com',
  env: process.env.NODE_ENV || 'development',
  name: 'Pico y placa hoy',
  title({ city, category, number, date = '' } = {}) {
    if (!city) {
      return 'Toda la información sobre el pico y placa en Colombia'
    }
    const base = `Pico y placa`
    if (!category) {
      return `${base} ${city}`
    }
    if (!number) {
      return `${base} ${category.toLowerCase()} en ${city}${date &&
        ` ${date.replace(',', '')}`}`
    }
    return `${base} ${category.toLowerCase()} en ${city} placas número ${number}${date &&
      ` ${date.replace(',', '')}`}`
  },
  description({ city, category, number, date = '' } = {}) {
    const base = `Horarios, días, fechas, ${
      number ? '' : 'placas, números, '
    }decretos, exensiones, sanciones y toda la información vigente del pico y placa`
    if (!city) {
      return `${base} en Colombia.`
    }
    if (!category) {
      return `${base} en ${city}`
    }
    if (!number) {
      return `${base} ${category.toLowerCase()} en ${city}${date &&
        ` el ${date.replace(',', '')}`}`
    }
    return `${base} ${category.toLowerCase()} en ${city} placas número ${number}${date &&
      ` el ${date.replace(',', '')}`}`
  },
}

const helpers = {
  longDate: "cccc, d 'de' MMMM 'de' yyyy",
  timeString(time) {
    const hours = Math.floor(time / (1000 * 60 * 60))
    const minutes = Math.floor((time % (1000 * 60 * 60)) / (1000 * 60))
    return `${hours ? `${hours}h` : ''}${minutes ? ` ${minutes}m` : ''}`
  },
  format(date, formatString) {
    return format(date, formatString || 'yyyy-MM-dd', { locale: es })
  },
  cdn(path) {
    const p = path.startsWith('/') ? path : `/${path}`
    if (site.env === 'production') {
      return `https://cdn.pyphoy.com/assets${p}`
    }
    return `${p}`
  },
  convert24toAMPM(hour24) {
    if (hour24 === '12:00') return `${hour24}m.`
    const [hours, minutes] = hour24.split(':')
    const hoursNumber = parseInt(hours, 10)
    if (hoursNumber === 12) return `${hour24}pm`
    return hoursNumber > 12
      ? `${hoursNumber - 12}:${minutes}pm`
      : `${hoursNumber}:${minutes}am`
  },
  dump(obj) {
    return JSON.stringify(obj, null, 2)
  },
  isPublic(name) {
    return (
      name.toLowerCase() === 'taxis' || name.toLowerCase().includes('público')
    )
  },
  pypNumbersToString(numbers) {
    if (!Array.isArray(numbers)) {
      return numbers
    }
    if (!numbers.length) {
      return 'NA'
    }
    // sort() muta el array original
    // Por eso usamos una copia
    switch ([...numbers].sort().join('')) {
      case '0123456789':
        return 'TODOS'
      default:
        return numbers.join('-')
    }
  },
}

module.exports = {
  site,
  helpers,
}
