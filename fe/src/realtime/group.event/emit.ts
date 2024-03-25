import { socket } from '@/socket'
import { GroupDataType, groupEvent } from './register'
import { AppDispatch, RootState } from '@/redux/store'
import { openLoadingOverlay } from '@/redux/slice/loadingOverlay'
import { ChatGroup } from '@/types/chat.types'

export default class GroupEventEmit {
  static create_group = function (
    data: GroupDataType[groupEvent.create_group]
  ) {
    return (dispatch: AppDispatch) => {
      dispatch(openLoadingOverlay())
      socket.emit(groupEvent.create_group, data)
    }
  }

  static send_message = function (
    data: GroupDataType[groupEvent.send_message]
  ) {
    return () => {
      socket.emit(groupEvent.send_message, data)
    }
  }

  static clear_unread = function (
    data: GroupDataType[groupEvent.clear_unread]
  ) {
    return (_: AppDispatch, getState: () => RootState) => {
      const { chatGroup } = getState()

      const chatGroups = chatGroup.chatGroups as ChatGroup[]

      const currChat = chatGroups.filter(
        (chat: ChatGroup) => chat._id === data.groupId
      )

      if (currChat.length >= 1 && currChat[0].lastMessage) {
        data.currLastMsgId = currChat[0].lastMessage._id

        console.log('clear_unread::lastMessage - ', currChat[0].lastMessage._id)

        socket.emit(groupEvent.clear_unread, data)
      }
    }
  }
}
