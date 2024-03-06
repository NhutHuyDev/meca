import {
  thunkFetchFriendRequests,
  thunkFetchFriends,
  thunkFetchOthers
} from '@/redux/slice/individualContact'
import {
  closeLoadingOverlay,
  openLoadingOverlay
} from '@/redux/slice/loadingOverlay'
import { notifyMessageToast } from '@/redux/slice/messageToast'
import { AppDispatch } from '@/redux/store'
import { socket } from '@/socket'

export enum FriendEventEvens {
  FrientRequest = 'friend_request',
  FrientRequestSent = 'friend_request_sent',
  NewFriendRequest = 'new_friend_request',
  AcceptFriendRequest = 'accept_friend_request',
  AcceptedFriendRequestResponse = 'accepted_friend_request_response'
}

export function emitAddNewFriendEvent(data: FriendRequestEventData) {
  return (dispatch: AppDispatch) => {
    socket.emit(FriendEventEvens.FrientRequest, data, () => {
      dispatch(openLoadingOverlay())
    })
  }
}

export function listenFrientRequestSent() {
  return (dispatch: AppDispatch) => {
    socket.on(
      FriendEventEvens.FrientRequestSent,
      async (data: FrientRequestSentData) => {
        dispatch(closeLoadingOverlay())
        dispatch(
          notifyMessageToast({
            message: data.message
          })
        )
        dispatch(thunkFetchOthers())
      }
    )
  }
}

export function listenNewFriendRequest() {
  return async (dispatch: AppDispatch) => {
    socket.on(
      FriendEventEvens.NewFriendRequest,
      async (data: FrientRequestSentData) => {
        dispatch(
          notifyMessageToast({
            message: data.message
          })
        )
        dispatch(thunkFetchFriendRequests())
      }
    )
  }
}

export function emitAcceptFriendRequestEvent(data: AcceptFriendRequestData) {
  return (dispatch: AppDispatch) => {
    socket.emit(FriendEventEvens.AcceptFriendRequest, data, () => {
      dispatch(openLoadingOverlay())
    })
  }
}

export function listenAcceptedFriendRequestResponse() {
  return (dispatch: AppDispatch) => {
    socket.on(
      FriendEventEvens.AcceptedFriendRequestResponse,
      async (data: AcceptedFriendRequestResponseData) => {
        dispatch(closeLoadingOverlay())
        dispatch(
          notifyMessageToast({
            message: data.message
          })
        )
        dispatch(thunkFetchFriends())
        dispatch(thunkFetchFriendRequests())
        dispatch(thunkFetchOthers())
      }
    )
  }
}

export type FriendRequestEventData = {
  to: string
  from: string
}

export type AcceptFriendRequestData = {
  friendRequestId: string
}

export type FrientRequestSentData = {
  message: string
}

export type AcceptedFriendRequestResponseData = {
  message: string
}
