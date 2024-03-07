import { AppDispatch } from '@/redux/store'
import { socket } from '@/socket'
import { ChatEvents, TNewMessageData } from './chat.event.list'
import {
  updateCurrentMessage,
  updateSingleChatOneToOne
} from '@/redux/slice/chatOneToOne'

export function listenNewMessage() {
  return (dispatch: AppDispatch) => {
    socket.on(ChatEvents.new_message, async (data: TNewMessageData) => {
      dispatch(
        updateSingleChatOneToOne({
          newMessage: data
        })
      )

      dispatch(
        updateCurrentMessage({
          newMessage: data
        })
      )
    })
  }
}
