import { createSlice } from '@reduxjs/toolkit'
import {
  TRequest,
  clearRequestHistory,
  returnErrorResponse,
  returnSuccessResponse,
  setRequestHistory
} from './request'
import { AppDispatch, RootState } from '../store'
import axiosInstance from '@/utils/axios'
import customHttpHeaders from '@/utils/customHttpHeaders'

export type ContactUser = {
  _id: string
  email: string
  firstName: string
  lastName: string
  verified: boolean
  deleted: boolean
  avatar?: string
  about?: string
  socketId?: string
  online?: boolean
  isFriend?: boolean
  isSentFriendRequest?: boolean
  wantToMakeFriend?: boolean
  friendshipRequestId?: string
}

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

type TIndividualContactRequest =
  | 'fetchFriends'
  | 'fetchOthers'
  | 'fetchFriendRequests'

/**
 * @description fetch-friends
 */
export type TFetchFriendsResquest = {
  fetchFriends: TRequest<{
    friends: ContactUser[]
  }>
}
export function thunkFetchFriends() {
  return async (dispatch: AppDispatch, getState: () => RootState) => {
    dispatch(clearRequestHistory())

    const apiUrl = '/friends/'

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
            request: returnSuccessResponse<TIndividualContactRequest>(
              'fetchFriends',
              response.data
            )
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
          setRequestHistory({
            request: returnErrorResponse<TIndividualContactRequest>(
              'fetchFriends',
              error.data.message
            )
          })
        )
      })
  }
}

/**
 * @description fetch-others
 */
export function thunkFetchOthers() {
  return async (dispatch: AppDispatch, getState: () => RootState) => {
    dispatch(clearRequestHistory())

    const apiUrl = '/users/get-others'

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
            request: returnSuccessResponse<TIndividualContactRequest>(
              'fetchOthers',
              response.data
            )
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
          setRequestHistory({
            request: returnErrorResponse<TIndividualContactRequest>(
              'fetchOthers',
              error.data.message
            )
          })
        )
      })
  }
}

// const thunkFetchFriendRequests
export function thunkFetchFriendRequests() {
  return async (dispatch: AppDispatch, getState: () => RootState) => {
    dispatch(clearRequestHistory())

    const apiUrl = '/friends/request/'

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
            request: returnSuccessResponse<TIndividualContactRequest>(
              'fetchFriendRequests',
              response.data
            )
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
          setRequestHistory({
            request: returnErrorResponse<TIndividualContactRequest>(
              'fetchFriendRequests',
              error.data.message
            )
          })
        )
      })
  }
}

export const { setOthers } = slice.actions

export default slice.reducer
