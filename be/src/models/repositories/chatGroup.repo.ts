import { Types } from 'mongoose'
import ChatGroupModel from '../chatGroup.model'

class ChatGroupRepo {
  static findOneById = async function (id: string, currentId: string) {
    return ChatGroupModel.aggregate([
      {
        $match: {
          _id: new Types.ObjectId(id)
        }
      },
      {
        $lookup: {
          from: 'Users',
          localField: 'creator',
          foreignField: '_id',
          as: 'userCreator',
          pipeline: [
            {
              $project: {
                _id: 1,
                firstName: 1,
                lastName: 1,
                avatar: 1
              }
            }
          ]
        }
      },
      {
        $lookup: {
          from: 'Users',
          localField: 'participants',
          foreignField: '_id',
          as: 'members',
          pipeline: [
            {
              $project: {
                _id: 1,
                firstName: 1,
                lastName: 1,
                avatar: 1
              }
            }
          ]
        }
      },
      {
        $lookup: {
          from: 'Messages',
          let: { groupId: '$_id' },
          pipeline: [
            {
              $match: {
                $expr: { $eq: ['$chatGroup', '$$groupId'] }
              }
            },
            {
              $sort: { createdAt: 1 }
            },
            {
              $project: {
                chatGroup: 0
              }
            }
          ],
          as: 'messages'
        }
      },
      {
        $addFields: {
          participantZeroUnreads: {
            $filter: {
              input: '$participantUnreads',
              as: 'participantUnread',
              cond: { $eq: ['$$participantUnread.unread', 0] }
            }
          }
        }
      },
      {
        $project: {
          creator: {
            $ifNull: [{ $arrayElemAt: ['$userCreator', 0] }, null]
          },
          members: 1,
          messages: 1,
          totalRead: { $size: '$participantZeroUnreads' }
        }
      }
    ])
  }
  static findByUserId = async function (userId: string) {
    return ChatGroupModel.aggregate([
      {
        $match: {
          participants: {
            $in: [new Types.ObjectId(userId)]
          }
        }
      },
      {
        $lookup: {
          from: 'Users',
          localField: 'creator',
          foreignField: '_id',
          as: 'userCreator',
          pipeline: [
            {
              $project: {
                _id: 1,
                firstName: 1,
                lastName: 1,
                avatar: 1
              }
            }
          ]
        }
      },
      {
        $lookup: {
          from: 'Users',
          localField: 'participants',
          foreignField: '_id',
          as: 'members',
          pipeline: [
            {
              $project: {
                _id: 1,
                firstName: 1,
                lastName: 1,
                avatar: 1
              }
            }
          ]
        }
      },
      {
        $lookup: {
          from: 'Messages',
          let: { groupId: '$_id' },
          pipeline: [
            {
              $match: {
                $expr: { $eq: ['$chatGroup', '$$groupId'] }
              }
            },
            {
              $sort: { createdAt: -1 }
            },
            {
              $limit: 1
            },
            {
              $project: {
                sender: 0,
                recipient: 0,
                chatGroup: 0
              }
            }
          ],
          as: 'lastMessage'
        }
      },
      {
        $addFields: {
          currentUnread: {
            $filter: {
              input: '$participantUnreads',
              as: 'participantUnread',
              cond: { $eq: ['$$participantUnread.participantId', new Types.ObjectId(userId)] }
            }
          }
        }
      },
      {
        $project: {
          creater: 1,
          members: 1,
          creator: {
            $ifNull: [{ $arrayElemAt: ['$userCreator', 0] }, null]
          },
          currentUnread: {
            $ifNull: [{ $arrayElemAt: ['$currentUnread.unread', 0] }, null]
          },
          lastMessage: {
            $ifNull: [{ $arrayElemAt: ['$lastMessage', 0] }, null]
          }
        }
      }
    ])
  }
}

export default ChatGroupRepo
