import { thunkFetchChatOneToOnes } from '@/redux/slice/chatOneToOne'
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
import { AppDispatch, RootState } from '@/redux/store'
import { socket } from '@/socket'

export enum FriendEventEvens {
  FrientRequest = 'friend_request',
  FrientRequestSent = 'friend_request_sent',
  NewFriendRequest = 'new_friend_request',

  AcceptFriendRequest = 'accept_friend_request',
  AcceptedFriendRequestResponse = 'accepted_friend_request_response',

  SenderCancelFriendRequest = 'sender_cancel_friend_request',
  SenderCancelFriendRequestResponse = 'sender_cancel_friend_request_response',

  RecipientCancelFriendRequest = 'recipient_cancel_friend_request',
  RecipientCancelFriendRequestResponse = 'recipient_cancel_friend_request_response',

  UnFriendRequest = 'un_friend_request',
  UnFriendRequestResponse = 'un_friend_request_response'
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
      async (data: EventResponse) => {
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
      async (data: EventResponse) => {
        dispatch(
          notifyMessageToast({
            message: data.message
          })
        )
        dispatch(thunkFetchFriendRequests())
        dispatch(thunkFetchOthers())
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
      async (data: EventResponse) => {
        dispatch(closeLoadingOverlay())
        dispatch(
          notifyMessageToast({
            message: data.message
          })
        )
        dispatch(thunkFetchFriends())
        dispatch(thunkFetchFriendRequests())
        dispatch(thunkFetchOthers())
        dispatch(thunkFetchChatOneToOnes())
      }
    )
  }
}

export function emitSenderCancelFriendRequest(data: CancelFriendRequestData) {
  return (dispatch: AppDispatch) => {
    socket.emit(FriendEventEvens.SenderCancelFriendRequest, data, () => {
      dispatch(openLoadingOverlay())
    })
  }
}

export function listenSenderCancelFriendRequestResponse() {
  return (dispatch: AppDispatch, getState: () => RootState) => {
    const { auth } = getState()

    const clientId = auth.clientId

    socket.on(
      FriendEventEvens.SenderCancelFriendRequestResponse,
      async (data: SenderCancelFriendRequestResponse) => {
        dispatch(closeLoadingOverlay())
        if (clientId === data.senderId) {
          dispatch(
            notifyMessageToast({
              message: data.message
            })
          )
        }
        dispatch(thunkFetchOthers())
        dispatch(thunkFetchFriendRequests())
      }
    )
  }
}

export function emitRecipientCancelFriendRequest(
  data: CancelFriendRequestData
) {
  return (dispatch: AppDispatch) => {
    socket.emit(FriendEventEvens.RecipientCancelFriendRequest, data, () => {
      dispatch(openLoadingOverlay())
    })
  }
}

export function listenRecipientCancelFriendRequestResponse() {
  return (dispatch: AppDispatch, getState: () => RootState) => {
    const { auth } = getState()

    const clientId = auth.clientId

    socket.on(
      FriendEventEvens.RecipientCancelFriendRequestResponse,
      async (data: RecipientCancelFriendRequestResponse) => {
        dispatch(closeLoadingOverlay())

        if (clientId === data.recipientId) {
          dispatch(
            notifyMessageToast({
              message: data.message
            })
          )
        }

        dispatch(thunkFetchOthers())
        dispatch(thunkFetchFriendRequests())
      }
    )
  }
}

export function emitUnFriendRequest(data: UnFriendRequestData) {
  return (dispatch: AppDispatch) => {
    socket.emit(FriendEventEvens.UnFriendRequest, data, () => {
      dispatch(openLoadingOverlay())
    })
  }
}

export function listenUnFriendRequestResponse() {
  return (dispatch: AppDispatch, getState: () => RootState) => {
    const { auth } = getState()

    const clientId = auth.clientId

    socket.on(
      FriendEventEvens.UnFriendRequestResponse,
      async (data: UnFriendRequestResponse) => {
        dispatch(closeLoadingOverlay())

        if (clientId === data.currentUser) {
          dispatch(
            notifyMessageToast({
              message: data.message
            })
          )
        }

        dispatch(thunkFetchFriends())
        dispatch(thunkFetchOthers())
      }
    )
  }
}

type FriendRequestEventData = {
  to: string
  from: string
}

type AcceptFriendRequestData = {
  friendRequestId: string
}

type CancelFriendRequestData = {
  friendRequestId: string
}

type UnFriendRequestData = {
  userId: string
  friendId: string
}

type EventResponse = {
  message: string
}

type SenderCancelFriendRequestResponse = {
  message: string
  senderId: string
}

type UnFriendRequestResponse = {
  message: string
  currentUser: string
}

type RecipientCancelFriendRequestResponse = {
  message: string
  recipientId: string
}
