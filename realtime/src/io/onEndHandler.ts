import UserRepo from '@/models/repositories/user.repo'
import { TCustomSocket } from '@/types/socket.types'

export function onEndHandler(socket: TCustomSocket) {
  socket.on('end', () => {
    const userId = socket.user?._id

    userId && UserRepo.setOffline(userId)

    socket.disconnect()
  })
}
