import { Socket } from 'socket.io'
import { onConnectionHandler } from './onConnectionHandler'
import { onEndHandler } from './onEndHandler'
import { io } from 'server'
import friendEventHandler from './friend.event/on'
import chatEventHandler from './chat.event/on'

export default function registerEvent(socket: Socket) {
  onConnectionHandler(socket)

  /**
   * @description handle realtime services
   */

  friendEventHandler(socket, io)

  chatEventHandler(socket, io)

  onEndHandler(socket)
}
