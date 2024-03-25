import { socket } from '@/socket'
import { FriendDataType, friendEvent } from './register'
import { AppDispatch } from '@/redux/store'
import { openLoadingOverlay } from '@/redux/slice/loadingOverlay'

export default class FriendEventEmit {
  static send_request = function (
    data: FriendDataType[friendEvent.send_request]
  ) {
    return (dispatch: AppDispatch) => {
      console.log('friend_send_request click')

      console.log(socket)

      socket?.connected &&
        socket.emit(friendEvent.send_request, data, () => {
          dispatch(openLoadingOverlay())
        })
    }
  }

  static accept_request = function (
    data: FriendDataType[friendEvent.accept_request]
  ) {
    return (dispatch: AppDispatch) => {
      socket.emit(friendEvent.accept_request, data, () => {
        dispatch(openLoadingOverlay())
      })
    }
  }

  static cancel_request = function (
    data: FriendDataType[friendEvent.cancel_request]
  ) {
    return (dispatch: AppDispatch) => {
      socket.emit(friendEvent.cancel_request, data, () => {
        dispatch(openLoadingOverlay())
      })
    }
  }

  static reject_request = function (
    data: FriendDataType[friendEvent.reject_request]
  ) {
    return (dispatch: AppDispatch) => {
      socket.emit(friendEvent.reject_request, data, () => {
        dispatch(openLoadingOverlay())
      })
    }
  }

  static un_friend = function (data: FriendDataType[friendEvent.un_friend]) {
    return (dispatch: AppDispatch) => {
      socket.emit(friendEvent.un_friend, data, () => {
        dispatch(openLoadingOverlay())
      })
    }
  }
}
