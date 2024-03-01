import checkValidObjectId from './src/utils/checkValidObjectId'
import app from './src/app'
import config from './src/config'
import log from './src/utils/logger'
import { Server } from 'socket.io'
import UserRepo from './src/models/repositories/user.repo'

const PORT = config.app.port

const server = app.listen(PORT, () => {
  log.info(`MECA server started with ${PORT}`)
})

const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST']
  }
})

io.on('connection', async (socket) => {
  const userId = socket.handshake.query['userId'] as string

  const socketId = socket.id

  log.info('::user connected - ', socketId)

  if (checkValidObjectId(userId)) {
    await UserRepo.setSocketId(userId, socketId)
  }

  socket.on('friend-request', async (data) => {
    const to = await UserRepo.findUserById(data.to)

    const socketId = to?.socketId as string

    io.to(socketId).emit('new-friend-request', () => {})
  })
})

process.on('SIGINT', () => {
  server.close(() => log.info('Exit Server Express'))
})
