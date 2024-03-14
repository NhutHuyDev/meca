import { TCustomSocket } from '@/types/socket.types'

const requireUser = async (socket: TCustomSocket, next: (err?: Error) => void) => {
  const user = socket.user

  if (!user) {
    const error = new Error('forbidden')
    next(error)
  }

  console.log(':userId requireUser:: ', user)

  next()
}

export default requireUser
