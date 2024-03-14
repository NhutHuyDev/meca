import UserRepo from '@/models/repositories/user.repo'
import { TCustomSocket } from '@/types/socket.types'

export async function onConnectionHandler(socket: TCustomSocket) {
  const userId = socket.user?._id

  const socketId = socket.id

  userId && (await UserRepo.setOnline(userId, socketId))
}
