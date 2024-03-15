import { AppDispatch } from '@/redux/store'
import { socket } from '@/socket'
import { FriendDataType, friendEvent } from './register'
import { closeLoadingOverlay } from '@/redux/slice/loadingOverlay'
import { notifyMessage } from '@/redux/slice/messageToast'
import {
  thunkFetchFriendRequests,
  thunkFetchFriends,
  thunkFetchOthers
} from '@/redux/slice/individualContact'
import { thunkFetchChatOneToOnes } from '@/redux/slice/chatOneToOne'

export default function () {
  return (dispatch: AppDispatch) => {
    socket.on(
      friendEvent.request_success,
      async (data: FriendDataType[friendEvent.request_success]) => {
        dispatch(closeLoadingOverlay())
        dispatch(notifyMessage(data.message))
        dispatch(thunkFetchOthers())
      }
    )

    socket.on(
      friendEvent.new_request,
      async (data: FriendDataType[friendEvent.new_request]) => {
        dispatch(notifyMessage(data.message))
        dispatch(thunkFetchFriendRequests())
        dispatch(thunkFetchOthers())
      }
    )

    socket.on(
      friendEvent.accepted_success,
      async (data: FriendDataType[friendEvent.accepted_success]) => {
        dispatch(closeLoadingOverlay())
        dispatch(notifyMessage(data.message))
        dispatch(thunkFetchFriendRequests())
        dispatch(thunkFetchOthers())
        dispatch(thunkFetchChatOneToOnes())
      }
    )

    socket.on(
      friendEvent.new_friend,
      async (data: FriendDataType[friendEvent.new_friend]) => {
        dispatch(closeLoadingOverlay())
        dispatch(notifyMessage(data.message))
        dispatch(thunkFetchFriendRequests())
        dispatch(thunkFetchFriends())
        dispatch(thunkFetchOthers())
        dispatch(thunkFetchChatOneToOnes())
      }
    )

    socket.on(
      friendEvent.cancel_success,
      async (data: FriendDataType[friendEvent.cancel_success]) => {
        dispatch(closeLoadingOverlay())
        dispatch(notifyMessage(data.message))
        dispatch(thunkFetchOthers())
        dispatch(thunkFetchFriendRequests())
      }
    )

    socket.on(
      friendEvent.reject_success,
      async (data: FriendDataType[friendEvent.reject_success]) => {
        dispatch(closeLoadingOverlay())
        dispatch(notifyMessage(data.message))
        dispatch(thunkFetchOthers())
        dispatch(thunkFetchFriendRequests())
      }
    )

    socket.on(
      friendEvent.un_friend_success,
      async (data: FriendDataType[friendEvent.un_friend_success]) => {
        dispatch(closeLoadingOverlay())
        dispatch(notifyMessage(data.message))
        dispatch(thunkFetchFriends())
        dispatch(thunkFetchOthers())
        dispatch(thunkFetchChatOneToOnes())
      }
    )
  }
}
