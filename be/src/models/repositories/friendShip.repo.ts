import { Types } from 'mongoose'
import FriendShipModel from '../friendship.model'

class FriendshipRepo {
  static create = async function (userId: string) {
    return FriendShipModel.create({
      user: new Types.ObjectId(userId)
    })
  }

  static addFriend = async function (userId: string, friendId: string) {
    return FriendShipModel.findOneAndUpdate(
      {
        user: new Types.ObjectId(userId)
      },
      {
        $push: { friends: new Types.ObjectId(friendId) }
      }
    )
  }

  static findFriends = async function (userId: string) {
    const friends = await FriendShipModel.findOne(
      {
        user: new Types.ObjectId(userId)
      },
      {
        __v: 0,
        _id: 0,
        user: 0,
        createdAt: 0,
        updatedAt: 0
      }
    )
      .populate({
        path: 'friends',
        select: {
          __v: 0,
          createdAt: 0,
          updatedAt: 0
        }
      })
      .exec()

    return friends
  }
}

export default FriendshipRepo
