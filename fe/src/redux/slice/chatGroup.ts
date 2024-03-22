import { ChatGroup } from '@/types/chat.types'
import { GroupMessage } from '@/types/message.types'
import { createSlice } from '@reduxjs/toolkit'
import { AppDispatch, RootState } from '../store'
import { getError, getRespone, sendRequest } from './request'
import axiosInstance from '@/utils/axios'
import customHttpHeaders from '@/utils/customHttpHeaders'
import { ContactUser } from '@/types/user.types'

export type TChatGroupState = {
  chatGroupId: string
  messages: GroupMessage[]
  chatGroups: ChatGroup[]
  statusLastMessage?: number
  currentFroms?: ContactUser[]
  groupName?: string
}

const initialState: TChatGroupState = {
  chatGroupId: '',
  messages: [],
  chatGroups: []
}

const slice = createSlice({
  name: 'chatGroup',
  initialState,
  reducers: {
    setChatGroupId(state, action) {
      state.chatGroupId = action.payload.chatGroupId
    },
    clearChatGroupId(state) {
      state.chatGroupId = ''
    },
    setChatGroups(state, action) {
      state.chatGroups = action.payload.chatGroups
    },
    setStatusLastMessage(state, action) {
      state.statusLastMessage = action.payload.statusLastMessage
    },
    setCurrentGroup(state, action) {
      state.statusLastMessage = action.payload.totalRead
      state.messages = action.payload.messages
      state.currentFroms = action.payload.members
    },
    updateSingleChatGroup(state, action) {
      const { chatGroup, text, type, sender, createdAt, _id } = action.payload
        .newMessage as GroupMessage

      const newMessage = {
        _id,
        text,
        type,
        sender,
        createdAt
      }

      /**
       * @description tìm đoạn chat cần cập nhật
       */
      const currentChatIndex = state.chatGroups.findIndex(
        (chat) => chat._id === chatGroup
      )

      const currentChat = state.chatGroups.splice(currentChatIndex, 1)[0]

      /**
       * @description cập nhật lại lastMessage
       */
      currentChat.lastMessage = newMessage

      if (state.chatGroupId === chatGroup) {
        state.chatGroups.splice(currentChatIndex, 0, currentChat)
      } else {
        currentChat.currentUnread = !currentChat.currentUnread
          ? 1
          : currentChat.currentUnread + 1
        state.chatGroups.unshift(currentChat)
      }

      state.statusLastMessage = 0
    },
    updateCurrentMessage(state, action) {
      const { chatGroup, text, type, sender, createdAt, _id } = action.payload
        .newMessage as GroupMessage

      const newMessage = {
        _id,
        text,
        type,
        chatGroup,
        sender,
        createdAt,
        isLastMessage: true
      } as GroupMessage

      const msgLen = state.messages.length

      if (msgLen > 0) {
        state.messages[msgLen - 1].isLastMessage = undefined
      }

      if (state.chatGroupId === chatGroup) {
        state.messages.push(newMessage)
      }
    },
    clearUnread(state, action) {
      const groupId = action.payload.groupId

      /**
       * @description tìm đoạn chat cần cập nhật
       */
      const currentChatIndex = state.chatGroups.findIndex(
        (chat) => chat._id === groupId
      )

      state.chatGroups[currentChatIndex].currentUnread = 0
    }
  }
})

export const {
  setChatGroupId,
  updateSingleChatGroup,
  updateCurrentMessage,
  clearUnread,
  setStatusLastMessage,
  clearChatGroupId
} = slice.actions

export default slice.reducer

enum chatGroupReq {
  fetchGroups = 'fetchGroups',
  fetchGroup = 'fetchGroup'
}

/**
 * @description fetchChats
 */
export function thunkFetchGroups() {
  return async (dispatch: AppDispatch, getState: () => RootState) => {
    const requestName = chatGroupReq.fetchGroups

    const apiUrl = '/chat/group/'

    const { auth } = getState()

    dispatch(
      sendRequest({
        requestName
      })
    )

    await axiosInstance
      .get(apiUrl, {
        headers: {
          Authorization: 'Bearer ' + auth.accessToken,
          [customHttpHeaders.CLIENT_ID]: auth.clientId
        }
      })
      .then((response) => {
        dispatch(
          getRespone({
            requestName,
            responseData: response.data
          })
        )

        dispatch(
          slice.actions.setChatGroups({
            chatGroups: response.data
          })
        )
      })
      .catch((error) => {
        dispatch(
          getError({
            requestName,
            errorMessage: error.message
          })
        )
      })
  }
}

/**
 * @description get-detail-ChatOneToOne
 */
export function thunkGetGroupDetail(chatOneToOneId: string) {
  return async (dispatch: AppDispatch, getState: () => RootState) => {
    const requestName = chatGroupReq.fetchGroup

    const apiUrl = `/chat/group/${chatOneToOneId}`

    const { auth } = getState()

    dispatch(
      sendRequest({
        requestName
      })
    )

    await axiosInstance
      .get(apiUrl, {
        headers: {
          Authorization: 'Bearer ' + auth.accessToken,
          [customHttpHeaders.CLIENT_ID]: auth.clientId
        }
      })
      .then((response) => {
        dispatch(
          getRespone({
            requestName,
            responseData: response.data[0]
          })
        )

        dispatch(
          slice.actions.setCurrentGroup({
            messages: response.data[0].messages,
            members: response.data[0].members,
            totalRead: response.data[0].totalRead
          })
        )
      })
      .catch((error) => {
        dispatch(
          getError({
            requestName,
            errorMessage: error.message
          })
        )
      })
  }
}
