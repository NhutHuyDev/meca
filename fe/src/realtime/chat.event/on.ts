import { AppDispatch, RootState } from '@/redux/store'
import { socket } from '@/socket'
import {
  setStatusLastMessage,
  updateCurrentMessage,
  updateSingleChatOneToOne
} from '@/redux/slice/chatOneToOne'
import { ChatDataType, chatEvent } from './register'
import ChatEventEmit from './emit'

export default function () {
  return (dispatch: AppDispatch, getState: () => RootState) => {
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

        const { auth, chatOneToOne } = getState()

        const chatOneToOneId = chatOneToOne.chatOneToOneId
        const clientId = auth.clientId

        if (chatOneToOneId === data.newMessage.chatOneToOne) {
          const timeoutId = setTimeout(() => {
            dispatch(
              ChatEventEmit.clear_unread({
                currentId: clientId,
                chatOneToOneId: chatOneToOneId
              })
            )
            clearTimeout(timeoutId)
          }, 2000)
        }
      }
    )

    socket.on(
      chatEvent.user_seen,
      async (data: ChatDataType[chatEvent.user_seen]) => {
        const { chatOneToOne } = getState()

        const chatOneToOneId = chatOneToOne.chatOneToOneId

        if (chatOneToOneId === data.chatOneToOneId) {
          dispatch(
            setStatusLastMessage({
              statusLastMessage: 'seen'
            })
          )
        }
      }
    )
  }
}
