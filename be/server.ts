import app from '@/app'
import config from '@/config'
import log from '@/utils/logger'

const PORT = config.app.port

const server = app.listen(PORT, () => {
  log.info(`MECA server started with ${PORT}`)
})

process.on('SIGINT', () => {
  server.close(() => log.info('Exit Server Express'))
})
