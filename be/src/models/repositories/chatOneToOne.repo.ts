import ChatOneToOneModel from '@/models/chatOneToOne.model'
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
          from: 'Friendships',
          let: { currentUser: new Types.ObjectId(userId), otherUser: '$otherUser' },
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
          isFriend: {
            $cond: { if: { $gt: [{ $size: '$isFriend' }, 0] }, then: true, else: false }
          },
          unread: 1,
          lastMessage: {
            $ifNull: [{ $arrayElemAt: ['$lastMessage', 0] }, null]
          }
        }
      }
    ])
  }

  static async getDetail(id: string, currentId: string) {
    return await ChatOneToOneModel.aggregate(
      [
        {
          $match: {
            _id: new Types.ObjectId(id),
            $or: [
              { firstUser: new Types.ObjectId(currentId) },
              { secondUser: new Types.ObjectId(currentId) }
            ]
          }
        },
        {
          $addFields: {
            otherUser: {
              $cond: [
                { $eq: ['$firstUser', new Types.ObjectId(currentId)] },
                '$secondUser',
                '$firstUser'
              ]
            }
          }
        },
        {
          $addFields: {
            otherUserUnread: {
              $cond: [
                { $eq: ['$firstUser', new Types.ObjectId(currentId)] },
                '$unReadSecondUser',
                '$unReadFirstUser'
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
                $sort: { createdAt: 1 }
              },
              {
                $project: {
                  chatOneToOne: 0
                }
              }
            ],
            as: 'messages'
          }
        },
        {
          $project: {
            from: {
              $arrayElemAt: ['$otherUserData', 0]
            },
            messages: 1,
            statusLastMessage: {
              $cond: { if: { $gt: ['$otherUserUnread', 0] }, then: 'sent', else: 'seen' }
            }
          }
        }
      ],
      { $limit: 1 }
    )
  }
}

export default ChatOneToOneRepo
