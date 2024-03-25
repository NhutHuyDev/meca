import io, { Socket } from 'socket.io-client'
import { REALTIME_HOST } from './config'
import customHttpHeaders from './utils/customHttpHeaders'

let socket: Socket

const connectSocket = (accessToken: string, clientId: string) => {
  socket = io({
    path: REALTIME_HOST,
    extraHeaders: {
      [customHttpHeaders.AUTHORIZATION]: 'Bearer ' + accessToken,
      [customHttpHeaders.CLIENT_ID]: clientId
    },
    secure: true
  })
}

export { socket, connectSocket }
