import { AppDispatch } from '@/redux/store'
import { socket } from '@/socket'
import {
  updateCurrentMessage,
  updateSingleChatOneToOne
} from '@/redux/slice/chatOneToOne'
import { ChatDataType, chatEvent } from './register'

export default function () {
  return (dispatch: AppDispatch) => {
    socket.on(
      chatEvent.new_message,
      async (data: ChatDataType[chatEvent.new_message]) => {
        dispatch(
          updateSingleChatOneToOne({
            newMessage: data.newMessage
          })
        )

        dispatch(
          updateCurrentMessage({
            newMessage: data.newMessage
          })
        )
      }
    )
  }
}
