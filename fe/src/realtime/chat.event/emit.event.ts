import { AppDispatch } from '@/redux/store'
import { socket } from '@/socket'
import { ChatEvents, TSendMessageData } from './chat.event.list'
import { startRequest } from '@/redux/slice/request'

export function emitSendMessage(data: TSendMessageData) {
  return (dispatch: AppDispatch) => {
    socket.emit(ChatEvents.send_message, data, () => {
      dispatch(startRequest())
    })
  }
}
