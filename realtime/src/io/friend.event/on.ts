import { TCustomSocket } from '@/types/socket.types'
import { friendEvent, FriendDataType } from './register'
import validateResource from '@/utils/validateResourse'
import { accept_request_schema, cancel_request_schema, reject_request_schema, send_request_schema, un_friend_schema } from '@/schema/friend.event'
import { Server } from 'socket.io'
import FriendshipService from '@/services/friendship.services'
import emitServiceError from '../emitServiceError'

export default function (socket: TCustomSocket, io: Server) {
  socket.on(
    friendEvent.send_request,
    async (data: FriendDataType[friendEvent.send_request]) => {
      try {
        validateResource(send_request_schema, data)
        const { sender, recipient } = await FriendshipService.createNewFriendRequest(
          data.fromId,
          data.toId
        )

        io.to(sender.socketId).emit(friendEvent.request_success, {
          message: 'send request successfully'
        })

        io.to(recipient.socketId).emit(friendEvent.new_request, {
          message: 'new friend request'
        })
      } catch {
        const message = 'something went wrong! please try again later.'
        emitServiceError(socket, io, message)
      }
    }
  )

  socket.on(
    friendEvent.accept_request,
    async (data: FriendDataType[friendEvent.accept_request]) => {
      try {
        validateResource(accept_request_schema, data)
        const { sender, recipient } = await FriendshipService.acceptFriendRequest(
          data.requestId,
          data.recipientId
        )

        const senderName = sender.firstName + ' ' + sender.lastName
        const recipientName = recipient.firstName + ' ' + recipient.lastName

        io.to(sender.socketId).emit(friendEvent.new_friend, {
          message: `${recipientName} has accepted your friend request`
        })

        io.to(recipient.socketId).emit(friendEvent.accepted_success, {
          message: `accepted friend request from ${senderName}`
        })
      } catch {
        const message = 'something went wrong! please try again later.'
        emitServiceError(socket, io, message)
      }
    }
  )

  socket.on(
    friendEvent.cancel_request,
    async (data: FriendDataType[friendEvent.cancel_request]) => {
      try {
        validateResource(cancel_request_schema, data)

        console.log('friend:cancel_request')

        const { sender, recipient } = await FriendshipService.cancelFriendRequest(
          data.requestId,
          data.senderId
        )

        const recipientName = recipient.firstName + ' ' + recipient.lastName

        io.to(sender.socketId).emit(friendEvent.cancel_success, {
          message: `canceled friend request of ${recipientName} `
        })
      } catch {
        const message = 'something went wrong! please try again later.'
        emitServiceError(socket, io, message)
      }
    }
  )

  socket.on(
    friendEvent.reject_request,
    async (data: FriendDataType[friendEvent.reject_request]) => {
      try {
        validateResource(reject_request_schema, data)
        const { sender, recipient } = await FriendshipService.rejectFriendRequest(
          data.requestId,
          data.recipientId
        )

        const senderName = sender.firstName + ' ' + sender.lastName

        io.to(recipient.socketId).emit(friendEvent.reject_success, {
          message: `reject friend request with ${senderName} `
        })
      } catch {
        const message = 'something went wrong! please try again later.'
        emitServiceError(socket, io, message)
      }
    }
  )

  socket.on(friendEvent.un_friend, async (data: FriendDataType[friendEvent.un_friend]) => {
    try {
      validateResource(un_friend_schema, data)
      const { from, friend } = await FriendshipService.unFriend(data.fromId, data.friendId)

      const friendName = friend.firstName + ' ' + friend.lastName

      io.to(from.socketId).emit(friendEvent.un_friend_success, {
        message: `unfriended ${friendName} successful`
      })
    } catch {
      const message = 'something went wrong! please try again later.'
      emitServiceError(socket, io, message)
    }
  })
}
