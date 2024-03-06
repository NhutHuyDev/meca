import ChatOneToOneModel from '../chatOneToOne.model'
import { Types } from 'mongoose'

class ChatOneToOneRepo {
  static create = async function (firstUserId: string, secondUserId: string) {
    return ChatOneToOneModel.create({
      firstUser: new Types.ObjectId(firstUserId),
      secondUser: new Types.ObjectId(secondUserId)
    })
  }

  static findByUserId(userId: string) {
    return ChatOneToOneModel.aggregate([
      {
        $match: {
          $or: [
            { firstUser: new Types.ObjectId(userId) },
            { secondUser: new Types.ObjectId(userId) }
          ]
        }
      },
      {
        $addFields: {
          otherUser: {
            $cond: [
              { $eq: ['$firstUser', new Types.ObjectId(userId)] },
              '$secondUser',
              '$firstUser'
            ]
          }
        }
      },
      {
        $lookup: {
          from: 'Users',
          let: { otherUserId: '$otherUser' },
          pipeline: [
            {
              $match: {
                $expr: { $eq: ['$_id', '$$otherUserId'] }
              }
            },
            {
              $project: {
                _id: 1,
                firstName: 1,
                lastName: 1,
                avatar: 1,
                online: 1
              }
            }
          ],
          as: 'otherUserData'
        }
      },
      {
        $lookup: {
          from: 'Messages',
          let: { chatId: '$_id' },
          pipeline: [
            {
              $match: {
                $expr: { $eq: ['$chatOneToOne', '$$chatId'] }
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
                chatOneToOne: 0
              }
            }
          ],
          as: 'lastMessage'
        }
      },
      {
        $project: {
          from: {
            $arrayElemAt: ['$otherUserData', 0]
          },
          unread: '$unRead',
          lastMessage: {
            $ifNull: [{ $arrayElemAt: ['$lastMessage', 0] }, null]
          }
        }
      }
    ])
  }
}

export default ChatOneToOneRepo
