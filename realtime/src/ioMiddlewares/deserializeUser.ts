import { verifyJwt } from '@/helpers/jwt'
import KeyStoreRepo from '@/models/repositories/keyStore.repo'
import { TCustomSocket } from '@/types/socket.types'
import customHttpHeaders from '@/utils/customHttpHeaders'
import { User } from '@/models/user.model'

const deserializeUser = async (socket: TCustomSocket, next: (err?: Error) => void) => {
  const handshake = socket.handshake

  const accessToken = (handshake.headers['authorization'] || '').replace(/^Bearer\s/, '')

  const clientId = handshake.headers[customHttpHeaders.CLIENT_ID] as string

  if (!accessToken || !clientId) {
    return next()
  }

  const keyPair = await KeyStoreRepo.getKeyPairByUserId(clientId)

  const verifyingKey = keyPair.publicKeyDecoding

  const decoded = verifyJwt(accessToken, verifyingKey)

  if (decoded) {
    socket.user = decoded as User
  }

  return next()
}

export default deserializeUser
