import { socket } from '@/socket'
import { GroupDataType, groupEvent } from './register'
import { AppDispatch, RootState } from '@/redux/store'
import { closeLoadingOverlay } from '@/redux/slice/loadingOverlay'
import {
  thunkFetchGroups,
  updateSingleChatGroup,
  updateCurrentMessage,
  setStatusLastMessage
} from '@/redux/slice/chatGroup'
import GroupEventEmit from './emit'

export default function () {
  return (dispatch: AppDispatch, getState: () => RootState) => {
    socket.on(
      groupEvent.create_success,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      async (data: GroupDataType[groupEvent.create_success]) => {
        dispatch(closeLoadingOverlay())
        dispatch(thunkFetchGroups())
      }
    )

    socket.on(
      groupEvent.new_message,
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      async (data: GroupDataType[groupEvent.new_message]) => {
        dispatch(
          updateSingleChatGroup({
            newMessage: data.newMessage
          })
        )

        dispatch(
          updateCurrentMessage({
            newMessage: data.newMessage
          })
        )

        const { auth, chatGroup } = getState()

        const chatGroupId = chatGroup.chatGroupId
        const clientId = auth.clientId

        if (chatGroupId === data.newMessage.chatGroup) {
          const timeoutId = setTimeout(() => {
            dispatch(
              GroupEventEmit.clear_unread({
                currentId: clientId,
                groupId: chatGroupId
              })
            )
            clearTimeout(timeoutId)
          }, 2000)
        }
      }
    )

    socket.on(
      groupEvent.user_seen,
      async (data: GroupDataType[groupEvent.user_seen]) => {
        const { chatGroup } = getState()

        const chatGroupId = chatGroup.chatGroupId

        if (chatGroupId === data.groupId) {
          dispatch(
            setStatusLastMessage({
              statusLastMessage: data.totalUnread
            })
          )
        }
      }
    )
  }
}
