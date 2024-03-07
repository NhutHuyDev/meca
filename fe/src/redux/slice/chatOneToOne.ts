import { createSlice } from '@reduxjs/toolkit'
import { ContactUser } from './individualContact'
import {
  clearRequestHistory,
  returnErrorResponse,
  returnSuccessResponse,
  setRequestHistory
} from './request'
import axiosInstance from '@/utils/axios'
import customHttpHeaders from '@/utils/customHttpHeaders'
import { AppDispatch, RootState } from '../store'
import { TNewMessageData } from '@/realtime/chat.event/chat.event.list'

export type OneToOneMessage = {
  _id: string

  sender?: string

  recipient?: string

  type?: string

  chatOneToOne?: string

  text?: string

  imgUri?: string

  fileUri?: string

  link?: string

  replyMsg?: string

  createdAt?: string
}

export type ChatOneToOne = {
  _id: string
  from: ContactUser
  unread: number
  lastMessage: OneToOneMessage
  pinned?: boolean
}

export type TChatOneToOneState = {
  chatOneToOneId: string
  messages: OneToOneMessage[]
  chatOneToOnes: ChatOneToOne[]
  currentFrom?: ContactUser
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
    setChatOneToOnes(state, action) {
      state.chatOneToOnes = action.payload.chatOneToOnes
    },
    setCurrentChat(state, action) {
      state.currentFrom = action.payload.from
      state.messages = action.payload.messages
    },
    updateSingleChatOneToOne(state, action) {
      const { chatOneToOne, text, type, sender, recipient, createdAt, _id } =
        action.payload.newMessage as TNewMessageData

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
        state.chatOneToOnes.unshift(currentChat)
      }
    },
    updateCurrentMessage(state, action) {
      const { chatOneToOne, text, type, sender, recipient, createdAt, _id } =
        action.payload.newMessage as TNewMessageData

      const newMessage = {
        _id,
        text,
        type,
        sender,
        recipient,
        createdAt
      }

      if (state.chatOneToOneId === chatOneToOne) {
        state.messages.push(newMessage)
      }
    }
  }
})

export const {
  setChatOneToOneId,
  updateSingleChatOneToOne,
  updateCurrentMessage
} = slice.actions

export default slice.reducer

type TChatOneToOneRequest = 'fetchChatOneToOnes' | 'getChatDetail'

/**
 * @description fetch-ChatOneToOne
 */
export function thunkFetchChatOneToOnes() {
  return async (dispatch: AppDispatch, getState: () => RootState) => {
    dispatch(clearRequestHistory())

    const apiUrl = '/chat/individual/'

    const { auth } = getState()

    await axiosInstance
      .get(apiUrl, {
        headers: {
          Authorization: 'Bearer ' + auth.accessToken,
          [customHttpHeaders.CLIENT_ID]: auth.clientId
        }
      })
      .then((response) => {
        dispatch(
          setRequestHistory({
            request: returnSuccessResponse<TChatOneToOneRequest>(
              'fetchChatOneToOnes',
              response.data
            )
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
          setRequestHistory({
            request: returnErrorResponse<TChatOneToOneRequest>(
              'fetchChatOneToOnes',
              error.data.message
            )
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
    dispatch(clearRequestHistory())

    const apiUrl = `/chat/individual/${chatOneToOneId}`

    const { auth } = getState()

    await axiosInstance
      .get(apiUrl, {
        headers: {
          Authorization: 'Bearer ' + auth.accessToken,
          [customHttpHeaders.CLIENT_ID]: auth.clientId
        }
      })
      .then((response) => {
        dispatch(
          setRequestHistory({
            request: returnSuccessResponse<TChatOneToOneRequest>(
              'getChatDetail',
              response.data[0]
            )
          })
        )

        dispatch(
          slice.actions.setCurrentChat({
            messages: response.data[0].messages,
            from: response.data[0].from
          })
        )
      })
      .catch((error) => {
        dispatch(
          setRequestHistory({
            request: returnErrorResponse<TChatOneToOneRequest>(
              'getChatDetail',
              error.data.message
            )
          })
        )
      })
  }
}
