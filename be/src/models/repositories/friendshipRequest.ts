import { Types } from 'mongoose'
import FriendshipRequestModel from '@/models/friendshipRequest.model'

class FriendshipRequestRepo {
  static deleteBySender = async function (id: string) {
    return FriendshipRequestModel.findByIdAndUpdate(id, {
      deletedBySender: true
    })
  }

  static deleteByRecipient = async function (id: string) {
    return FriendshipRequestModel.findByIdAndUpdate(id, {
      deletedByRecipient: true
    })
  }

  static findById = async function (id: string) {
    return FriendshipRequestModel.findById(id)
  }

  static findFriendshipRequests = async function (userId: string) {
    const friends = await FriendshipRequestModel.find(
      {
        $or: [
          { sender: new Types.ObjectId(userId) },
          { recipient: new Types.ObjectId(userId) }
        ]
      },
      {
        __v: 0,
        _id: 0
      }
    ).populate({
      path: 'sender recipient',
      select: '-__v -verified -deleted -createdAt -updatedAt'
    })

    return friends
  }

  static findFriendshipRequestsV2 = async function (userId: string) {
    const friends = await FriendshipRequestModel.aggregate([
      {
        $match: {
          $and: [
            {
              $or: [
                { sender: new Types.ObjectId(userId) },
                { recipient: new Types.ObjectId(userId) }
              ]
            },
            { deletedBySender: false },
            { deletedByRecipient: false }
          ]
        }
      },
      {
        $addFields: {
          isSender: {
            $cond: {
              if: { $eq: ['$sender', new Types.ObjectId(userId)] },
              then: true,
              else: false
            }
          }
        }
      },
      {
        $lookup: {
          from: 'Users',
          localField: 'sender',
          foreignField: '_id',
          as: 'sender'
        }
      },
      {
        $unwind: '$sender'
      },
      {
        $lookup: {
          from: 'Users',
          localField: 'recipient',
          foreignField: '_id',
          as: 'recipient'
        }
      },
      {
        $unwind: '$recipient'
      },
      {
        $project: {
          _id: 1,
          sender: {
            _id: 1,
            email: 1,
            firstName: 1,
            lastName: 1,
            about: 1
          },
          recipient: {
            _id: 1,
            email: 1,
            firstName: 1,
            lastName: 1,
            about: 1
          },
          isSender: 1,
          createdAt: 1
        }
      }
    ])

    return friends
  }
}

export default FriendshipRequestRepo
