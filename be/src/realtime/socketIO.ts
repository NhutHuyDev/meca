import UserRepo from '../models/repositories/user.repo'
import checkValidObjectId from '../utils/checkValidObjectId'
import { Server as HttpServer } from 'http'
import {
  Server as SocketIOServer,
  ServerOptions as SocketServerOption,
  Socket
} from 'socket.io'
import handleFriendEvent from './friend.events'
import handleMessageEvent from './message.events'

class SocketIO {
  private io: SocketIOServer
  private httpServer: HttpServer
  private options?: Partial<SocketServerOption>

  constructor(httpServer: HttpServer, options?: Partial<SocketServerOption>) {
    this.httpServer = httpServer
    this.options = options
  }

  public connect(callback?: () => void): SocketIOServer {
    if (!this.io) {
      this.io = new SocketIOServer(this.httpServer, this.options)

      this.io.on('connection', async (socket: Socket) => {
        const userId = socket.handshake.query['userId'] as string

        const socketId = socket.id

        if (checkValidObjectId(userId)) {
          await UserRepo.setOnline(userId, socketId)
        }

        /**
         * @description Listen Events
         */

        handleFriendEvent(socket, this.io)
        handleMessageEvent(socket, this.io)

        socket.on('end', async (data) => {
          const userId = data.userId

          if (checkValidObjectId(userId)) {
            await UserRepo.setOffline(userId)
          }

          socket.disconnect()
        })

        if (callback) {
          callback()
        }
      })
    }
    return this.io
  }
}

export default SocketIO
