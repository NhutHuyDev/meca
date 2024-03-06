import UserModel from '../user.model'
import { Types } from 'mongoose'

class UserRepo {
  static findUserById = async function (id: string) {
    return UserModel.findById(id)
  }

  static findUserByEmail = async function (email: string) {
    return UserModel.findOne({
      email: email
    })
  }

  static setOnline = async function (id: string, socketId: string) {
    return UserModel.findByIdAndUpdate(id, {
      socketId: socketId,
      online: true
    })
  }

  static setOffline = async function (id: string) {
    return UserModel.findByIdAndUpdate(id, {
      online: false
    })
  }

  static findOthers = async function (currentId: string) {
    return UserModel.find(
      {
        _id: { $ne: new Types.ObjectId(currentId) }
      },
      {
        __v: 0,
        socketId: 0,
        createdAt: 0,
        updatedAt: 0
      }
    )
  }

  static findOthersV2 = async function (currentId: string) {
    return UserModel.aggregate([
      {
        $match: {
          _id: { $ne: new Types.ObjectId(currentId) }
        }
      },
      {
        $lookup: {
          from: 'Friendships',
          let: { currentUser: new Types.ObjectId(currentId), otherUser: '$_id' },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    { $eq: ['$user', '$$currentUser'] },
                    { $in: ['$$otherUser', '$friends'] }
                  ]
                }
              }
            }
          ],
          as: 'isFriend'
        }
      },
      {
        $lookup: {
          from: 'FriendshipRequests',
          let: { otherUser: '$_id', currentUser: new Types.ObjectId(currentId) },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    { $eq: ['$sender', '$$currentUser'] },
                    { $eq: ['$recipient', '$$otherUser'] },
                    { $eq: ['$deletedBySender', false] },
                    { $eq: ['$deletedByRecipient', false] }
                  ]
                }
              }
            }
          ],
          as: 'sentFriendRequest'
        }
      },
      {
        $lookup: {
          from: 'FriendshipRequests',
          let: { otherUser: '$_id', currentUser: new Types.ObjectId(currentId) },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    { $eq: ['$sender', '$$otherUser'] },
                    { $eq: ['$recipient', '$$currentUser'] },
                    { $eq: ['$deletedBySender', false] },
                    { $eq: ['$deletedByRecipient', false] }
                  ]
                }
              }
            }
          ],
          as: 'wantToMakeFriend'
        }
      },
      {
        $project: {
          firstName: 1,
          lastName: 1,
          online: {
            $cond: { if: { $gt: [{ $size: '$isFriend' }, 0] }, then: '$online', else: null }
          },
          isFriend: {
            $cond: { if: { $gt: [{ $size: '$isFriend' }, 0] }, then: true, else: false }
          },
          isSentFriendRequest: {
            $cond: {
              if: { $gt: [{ $size: '$sentFriendRequest' }, 0] },
              then: true,
              else: false
            }
          },
          wantToMakeFriend: {
            $cond: {
              if: { $gt: [{ $size: '$wantToMakeFriend' }, 0] },
              then: true,
              else: false
            }
          },
          friendshipRequestId: {
            $cond: {
              if: { $gt: [{ $size: '$wantToMakeFriend' }, 0] },
              then: { $arrayElemAt: ['$wantToMakeFriend._id', 0] },
              else: null
            }
          }
        }
      }
    ])
  }
}

export default UserRepo
