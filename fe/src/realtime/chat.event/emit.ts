// import { AppDispatch } from '@/redux/store'
import { socket } from '@/socket'
import { ChatDataType, chatEvent } from './register'

export default class ChatEventEmit {
  static send_message = function (data: ChatDataType[chatEvent.send_message]) {
    return () => {
      socket.emit(chatEvent.send_message, data)
    }
  }
}
