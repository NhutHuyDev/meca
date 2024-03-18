import { ChatGroup } from '@/types/chat.types'
import { GroupMessage } from '@/types/message.types'
import { createSlice } from '@reduxjs/toolkit'
import { AppDispatch, RootState } from '../store'
import { getError, getRespone, sendRequest } from './request'
import axiosInstance from '@/utils/axios'
import customHttpHeaders from '@/utils/customHttpHeaders'

export type TChatGroupState = {
  chatGroupId: string
  messages: GroupMessage[]
  chatGroups: ChatGroup[]
  statusLastMessage?: string
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
    setChatGroups(state, action) {
      state.chatGroups = action.payload.chatGroups
    }
  }
})

export const { setChatGroupId } = slice.actions

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
export function thunkGetChatDetail(chatOneToOneId: string) {
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

        // dispatch(
        //   slice.actions.setCurrentChat({
        //     messages: response.data[0].messages,
        //     from: response.data[0].from,
        //     statusLastMessage: response.data[0].statusLastMessage
        //   })
        // )
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
