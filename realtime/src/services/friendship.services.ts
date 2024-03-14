import ChatOneToOneRepo from '@/models/repositories/chatOneToOne.repo'
import FriendshipRepo from '@/models/repositories/friendship.repo'
import FriendshipRequestRepo from '@/models/repositories/friendshipRequest'
import UserRepo from '@/models/repositories/user.repo'

class FriendshipService {
  static createNewFriendRequest = async function (fromId: string, toId: string) {
    const sender = await UserRepo.findUserById(fromId)
    const recipient = await UserRepo.findUserById(toId)

    if (!sender || !recipient) throw new Error('user is not found')

    FriendshipRequestRepo.createRequest(fromId, toId)

    return {
      sender,
      recipient
    }
  }

  static acceptFriendRequest = async function (requestId: string, recipientId: string) {
    const request = await FriendshipRequestRepo.findById(requestId)
    const recipient = await UserRepo.findUserById(recipientId)

    if (!request || !recipient) throw new Error('request or user is not found')

    if (String(recipient._id) !== recipientId) throw new Error('cannot accept the request')

    const senderId = request.sender
    const sender = await UserRepo.findUserById(String(senderId))

    if (!sender) throw new Error('user is not found')

    await FriendshipRepo.addFriend(String(senderId), recipientId)
    await FriendshipRepo.addFriend(recipientId, String(senderId))

    await request.deleteOne()

    const existedChat = await ChatOneToOneRepo.findByBothUser(String(senderId), recipientId)

    if (!existedChat) {
      await ChatOneToOneRepo.create(String(recipient._id), String(sender._id))
    }

    return {
      sender,
      recipient
    }
  }

  static cancelFriendRequest = async function (requestId: string, senderId: string) {
    const request = await FriendshipRequestRepo.findById(requestId)
    const sender = await UserRepo.findUserById(senderId)

    if (!request || !sender) throw new Error('request or user is not found')

    if (String(sender._id) !== senderId) throw new Error('cannot accept the request')

    const recipientId = request.sender
    const recipient = await UserRepo.findUserById(String(recipientId))

    if (!recipient) throw new Error('user is not found')

    await FriendshipRequestRepo.deleteBySender(requestId)

    return {
      sender,
      recipient
    }
  }

  static rejectFriendRequest = async function (requestId: string, recipientId: string) {
    const request = await FriendshipRequestRepo.findById(requestId)
    const recipient = await UserRepo.findUserById(recipientId)

    if (!request || !recipient) throw new Error('request or user is not found')

    if (String(recipient._id) !== recipientId) throw new Error('cannot accept the request')

    const senderId = request.sender
    const sender = await UserRepo.findUserById(String(senderId))

    if (!sender) throw new Error('user is not found')

    await FriendshipRequestRepo.deleteByRecipient(requestId)

    return {
      sender,
      recipient
    }
  }

  static unFriend = async function (fromId: string, friendId: string) {
    const from = await UserRepo.findUserById(fromId)
    const friend = await UserRepo.findUserById(friendId)

    if (!from || !friend) throw new Error('user is not found')

    await FriendshipRepo.deleteFriend(fromId, friendId)
    await FriendshipRepo.deleteFriend(friendId, fromId)

    return {
      from,
      friend
    }
  }
}

export default FriendshipService
