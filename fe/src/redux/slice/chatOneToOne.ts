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

export type OneToOneMessage = {
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
    }
  }
})

export const { setChatOneToOneId } = slice.actions

export default slice.reducer

type TChatOneToOneRequest = 'fetchChatOneToOnes'

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
