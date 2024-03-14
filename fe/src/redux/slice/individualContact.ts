import { createSlice } from '@reduxjs/toolkit'
import { AppDispatch, RootState } from '../store'
import axiosInstance from '@/utils/axios'
import customHttpHeaders from '@/utils/customHttpHeaders'
import { getError, getRespone, sendRequest } from './request'
import { ContactUser } from '@/types/user.types'

export type FriendRequest = {
  sender: string
  recipient: string
}

export type TIndividualContact = {
  others: ContactUser[]
  friends: ContactUser[]
  friendRequests: FriendRequest[]
}

const initialState: TIndividualContact = {
  others: [],
  friends: [],
  friendRequests: []
}

const slice = createSlice({
  name: 'individualContact',
  initialState,
  reducers: {
    setOthers(state, action) {
      state.others = action.payload.others
    },
    setFriends(state, action) {
      state.friends = action.payload.friends
    },
    setFriendRequests(state, action) {
      state.friendRequests = action.payload.friendRequests
    }
  }
})

/**
 * ---- THUNK ACTIONS ----
 */

enum individualContactReq {
  fetchFriends = 'fetchFriends',
  fetchOthers = 'fetchOthers',
  fetchFriendRequests = 'fetchFriendRequests'
}

export function thunkFetchFriends() {
  return async (dispatch: AppDispatch, getState: () => RootState) => {
    const requestName = individualContactReq.fetchFriends

    const apiUrl = '/friends/'

    const { auth } = getState()

    sendRequest({
      requestName
    })

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
          slice.actions.setFriends({
            friends: response.data.friends
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

export function thunkFetchOthers() {
  return async (dispatch: AppDispatch, getState: () => RootState) => {
    const requestName = individualContactReq.fetchOthers

    const apiUrl = '/users/get-others'

    const { auth } = getState()

    sendRequest({
      requestName
    })

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
          slice.actions.setOthers({
            others: response.data
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

export function thunkFetchFriendRequests() {
  return async (dispatch: AppDispatch, getState: () => RootState) => {
    const requestName = individualContactReq.fetchFriendRequests

    const apiUrl = '/friends/requests/'

    const { auth } = getState()

    sendRequest({
      requestName
    })

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
          slice.actions.setFriendRequests({
            friendRequests: response.data
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

export default slice.reducer
