import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import axiosInstance from '@/utils/axios'
import customHttpHeaders from '@/utils/customHttpHeaders'
import { AppDispatch, RootState } from '../store'
import { getError, getRespone, sendRequest } from './request'
import { OneToOneMessage } from '@/types/message.types'
import { ChatOneToOne } from '@/types/chat.types'
import { ContactUser } from '@/types/user.types'

export type TChatOneToOneState = {
  chatOneToOneId: string
  messages: OneToOneMessage[]
  chatOneToOnes: ChatOneToOne[]
  currentFrom?: ContactUser
  currentIsFriend?: boolean
  statusLastMessage?: string
}

const initialState: TChatOneToOneState = {
  chatOneToOneId: '',
  messages: [],
  chatOneToOnes: []
}

const slice = createSlice({
  name: 'chatOneToOne',
  initialState,
  reducers: {
    setChatOneToOneId(state, action) {
      state.chatOneToOneId = action.payload.chatOneToOneId
    },
    clearChatOneToOneId(state) {
      state.chatOneToOneId = ''
    },
    setChatOneToOnes(state, action) {
      state.chatOneToOnes = action.payload.chatOneToOnes
    },
    setCurrentChat(state, action) {
      state.currentFrom = action.payload.from
      state.statusLastMessage = action.payload.statusLastMessage
      state.messages = action.payload.messages

      const currentChatIndex = state.chatOneToOnes.findIndex(
        (chat) => chat._id === state.chatOneToOneId
      )

      state.chatOneToOnes[currentChatIndex].from.online =
        action.payload.from.online

      state.currentIsFriend = state.chatOneToOnes[currentChatIndex].isFriend
    },
    setStatusLastMessage(state, action) {
      state.statusLastMessage = action.payload.statusLastMessage
    },
    updateSingleChatOneToOne(state, action) {
      const { chatOneToOne, text, type, sender, recipient, createdAt, _id } =
        action.payload.newMessage as OneToOneMessage

      const newMessage = {
        _id,
        text,
        type,
        sender,
        recipient,
        createdAt
      }

      /**
       * @description tìm đoạn chat cần cập nhật
       */
      const currentChatIndex = state.chatOneToOnes.findIndex(
        (chat) => chat._id === chatOneToOne
      )

      const currentChat = state.chatOneToOnes.splice(currentChatIndex, 1)[0]

      /**
       * @description cập nhật lại lastMessage
       */
      currentChat.lastMessage = newMessage

      if (state.chatOneToOneId === chatOneToOne) {
        state.chatOneToOnes.splice(currentChatIndex, 0, currentChat)
      } else {
        currentChat.unread = !currentChat.unread ? 1 : currentChat.unread + 1
        state.chatOneToOnes.unshift(currentChat)
      }

      state.statusLastMessage = 'sent'
    },
    updateCurrentMessage(state, action) {
      const { chatOneToOne, text, type, sender, recipient, createdAt, _id } =
        action.payload.newMessage as OneToOneMessage

      const newMessage = {
        _id,
        text,
        type,
        sender,
        recipient,
        createdAt,
        isLastMessage: true
      } as OneToOneMessage

      const msgLen = state.messages.length

      if (msgLen > 0) {
        state.messages[msgLen - 1].isLastMessage = undefined
      }

      if (state.chatOneToOneId === chatOneToOne) {
        state.messages.push(newMessage)
      }
    },
    clearUnread(state, action: PayloadAction<{ chatOneToOneId: string }>) {
      const chatOneToOneId = action.payload.chatOneToOneId

      /**
       * @description tìm đoạn chat cần cập nhật
       */
      const currentChatIndex = state.chatOneToOnes.findIndex(
        (chat) => chat._id === chatOneToOneId
      )

      state.chatOneToOnes[currentChatIndex].unread = 0
    }
  }
})

export const {
  setChatOneToOneId,
  updateSingleChatOneToOne,
  updateCurrentMessage,
  clearUnread,
  setStatusLastMessage,
  clearChatOneToOneId
} = slice.actions

export default slice.reducer

enum chatOneToOneReq {
  fetchChats = 'fetchChats',
  fetchChat = 'fetchChat'
}

/**
 * @description fetchChats
 */
export function thunkFetchChatOneToOnes() {
  return async (dispatch: AppDispatch, getState: () => RootState) => {
    const requestName = chatOneToOneReq.fetchChats

    const apiUrl = '/chat/individual/'

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
          slice.actions.setChatOneToOnes({
            chatOneToOnes: response.data
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
export function thunkGetChatDetail(chatOneToOneId: string) {
  return async (dispatch: AppDispatch, getState: () => RootState) => {
    const requestName = chatOneToOneReq.fetchChat

    const apiUrl = `/chat/individual/${chatOneToOneId}`

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
          slice.actions.setCurrentChat({
            messages: response.data[0].messages,
            from: response.data[0].from,
            statusLastMessage: response.data[0].statusLastMessage
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
