import customHttpHeaders from '@/utils/customHttpHeaders'
import checkValidObjectId from '@/utils/checkValidObjectId'
import { TCustomSocket } from '@/types/socket.types'

const validateHeader = (socket: TCustomSocket, next: (err?: Error) => void) => {
  /**
   * @description validate clientId
   */

  const request = socket.request

  const clientId = request.headers[customHttpHeaders.CLIENT_ID] as string

  if (!clientId || checkValidObjectId(clientId)) {
    next()
  } else {
    const clientIdError = new Error(`clientId isn't valid`)
    next(clientIdError)
  }
}

export default validateHeader
