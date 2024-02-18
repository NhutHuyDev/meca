import app from './src/app'
import config from './src/config'
import log from './src/utils/logger'

const PORT = config.app.port

const server = app.listen(PORT, () => {
  log.info(`MECA server started with ${PORT}`)
})

process.on('SIGINT', () => {
  server.close(() => log.info('Exit Server Express'))
})
