const debug = require('debug')('pyphoy:server')
const http = require('http')
const app = require('../app')

const server = http.createServer(app)

function normalizePort(val) {
  const port = parseInt(val, 10)
  if (Number.isNaN(port)) {
    // named pipe
    return val
  }
  if (port >= 0) {
    // port number
    return port
  }
  return false
}
app.set('port', normalizePort(process.env.PORT || 3000))

function onError(error) {
  if (error.syscall !== 'listen') {
    throw error
  }

  const bind =
    typeof port === 'string'
      ? `Pipe ${app.get('port')}`
      : `Port ${app.get('port')}`

  // handle specific listen errors with friendly messages
  switch (error.code) {
    case 'EACCES':
      // eslint-disable-next-line no-console
      console.error(`${bind} requires elevated privileges`)
      process.exit(1)
      break
    case 'EADDRINUSE':
      // eslint-disable-next-line no-console
      console.error(`${bind} is already in use`)
      process.exit(1)
      break
    default:
      throw error
  }
}

function onListening() {
  const addr = server.address()
  const bind = typeof addr === 'string' ? `pipe ${addr}` : `port ${addr.port}`
  debug(`Listening on ${bind}`)
}

server.listen(app.get('port'))
server.on('error', onError)
server.on('listening', onListening)
