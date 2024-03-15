import { socket } from '@/socket'
import { ChatDataType, chatEvent } from './register'

export default class ChatEventEmit {
  static send_message = function (data: ChatDataType[chatEvent.send_message]) {
    return () => {
      socket.emit(chatEvent.send_message, data)
    }
  }

  static clear_unread = function (data: ChatDataType[chatEvent.clear_unread]) {
    return () => {
      socket.emit(chatEvent.clear_unread, data)
    }
  }
}
