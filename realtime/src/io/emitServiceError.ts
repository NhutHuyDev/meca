import { TCustomSocket } from '@/types/socket.types'
import { Server } from 'socket.io'

export default function (socket: TCustomSocket, io: Server, message: string) {
  io.to(socket.id).emit('error:service', {
    message
  })
}
