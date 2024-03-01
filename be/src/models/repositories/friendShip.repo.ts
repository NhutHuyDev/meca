import { Types } from 'mongoose'
import FriendShipModel from '../friendship.model'
import { privateFields } from '../user.model'

class FriendShipRepo {
  static createFriendShip = async function (userId: string) {
    return FriendShipModel.create({
      user: new Types.ObjectId(userId)
    })
  }

  static findFriends = async function (userId: string) {
    const friends = await FriendShipModel.find(
      {
        user: new Types.ObjectId(userId)
      },
      {
        __v: 0,
        _id: 0,
        createdAt: 0,
        updatedAt: 0
      }
    )
      .populate({
        path: 'friends.friendId',
        select: '-__v -verified -deleted'
      })
      .exec()

    return friends
  }
}

export default FriendShipRepo
