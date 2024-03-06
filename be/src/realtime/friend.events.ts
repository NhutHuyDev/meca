import FriendshipRequestModel from '../models/friendshipRequest.model'
import FriendshipRepo from '..//models/repositories/friendship.repo'
import FriendshipRequestRepo from '..//models/repositories/friendshipRequest'
import UserRepo from '../models/repositories/user.repo'
import checkValidObjectId from '..//utils/checkValidObjectId'
import { Socket, Server } from 'socket.io'
import SocketIO from './socketIO'

export enum FriendEvents {
  FrientRequest = 'friend_request',
  NewFriendRequest = 'new_friend_request',
  FrientRequestSent = 'friend_request_sent',
  AcceptFriendRequest = 'accept_friend_request',
  AcceptedFriendRequestResponse = 'accepted_friend_request_response'
}

function handleFriendEvent(socket: Socket, io: Server): void {
  /**
   * @description ::Event - friend_request
   */

  socket.on(FriendEvents.FrientRequest, async (data: FriendRequestEventData) => {
    if (!checkValidObjectId(data.to) || !checkValidObjectId(data.from)) return

    const from_user = await UserRepo.findUserById(data.from)
    const to_user = await UserRepo.findUserById(data.to)

    if (to_user && from_user) {
      try {
        await FriendshipRequestModel.create({
          sender: from_user._id,
          recipient: to_user._id
        })

        io.to(from_user.socketId).emit(FriendEvents.FrientRequestSent, {
          message: 'request sent successfully'
        })

        io.to(to_user.socketId).emit(FriendEvents.NewFriendRequest, {
          message: 'new friend request received'
        })
      } catch {
        io.to(from_user.socketId).emit(FriendEvents.FrientRequestSent, {
          message: 'something went wrong! try again'
        })

        io.to(to_user.socketId).emit(FriendEvents.NewFriendRequest, {
          message: 'something went wrong! try again'
        })
      }
    }
  })

  /**
   * @description ::Event - accept_friend_request
   */
  socket.on(FriendEvents.AcceptFriendRequest, async (data: AcceptFriendRequestEventData) => {
    if (!checkValidObjectId(data.friendRequestId)) return

    const friendRequestId = data.friendRequestId

    const friendRequest = await FriendshipRequestRepo.findById(friendRequestId)

    if (friendRequest) {
      const sender = await UserRepo.findUserById(String(friendRequest.sender))
      const recipient = await UserRepo.findUserById(String(friendRequest.recipient))

      if (sender && recipient) {
        try {
          await FriendshipRepo.addFriend(String(sender._id), String(recipient._id))
          await FriendshipRepo.addFriend(String(recipient._id), String(sender._id))

          await friendRequest.deleteOne()

          io.to(sender.socketId).emit(FriendEvents.AcceptedFriendRequestResponse, {
            message: 'your friend request was accepted'
          })

          io.to(recipient.socketId).emit(FriendEvents.AcceptedFriendRequestResponse, {
            message: 'Add new friend successfully'
          })
        } catch (error) {
          io.to(sender.socketId).emit(FriendEvents.AcceptedFriendRequestResponse, {
            message: 'something went wrong! try again'
          })

          io.to(recipient.socketId).emit(FriendEvents.AcceptedFriendRequestResponse, {
            message: 'something went wrong! try again'
          })
        }
      }
    }
  })
}

type FriendRequestEventData = {
  to: string
  from: string
}

type AcceptFriendRequestEventData = {
  friendRequestId: string
}

export default handleFriendEvent
