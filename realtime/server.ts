import registerEvent from '@/io/registerEvent'
import app from '@/app'
import config from '@/config'
import { createServer } from 'http'
import { Server } from 'socket.io'
import deserializeUser from '@/ioMiddlewares/deserializeUser'
import requireUser from '@/ioMiddlewares/requireUser'
import validateHeader from '@/ioMiddlewares/validateHeader'

const PORT = config.app.port

const httpServer = createServer(app)

export const io = new Server(httpServer, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    credentials: true
  }
})

/**
 * @description middleware
 */

io.use(validateHeader)

io.use(deserializeUser)

io.use(requireUser)

/**
 * @description listen on realtime services
 */

io.on('connection', registerEvent)

httpServer.listen(PORT, () => {
  console.log(`MECA realtime server started with ${PORT}`)
})

process.on('SIGINT', () => {
  httpServer.close(() => console.log('Exit Server Express'))
})
