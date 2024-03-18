import ChatOneToOneModel from '@/models/chatOneToOne.model'
import { Types } from 'mongoose'
import UserRepo from './user.repo'

class ChatOneToOneRepo {
  static create = async function (firstUserId: string, secondUserId: string) {
    return ChatOneToOneModel.create({
      firstUser: new Types.ObjectId(firstUserId),
      secondUser: new Types.ObjectId(secondUserId)
    })
  }

  static clearUnread = async function (id: string, currentId: string) {
    const currentChat = await ChatOneToOneModel.findById(id)

    if (!currentChat) throw new Error('current chat is not found')

    const firstUser = currentChat.firstUser as Types.ObjectId
    const secondUser = currentChat.secondUser as Types.ObjectId

    let unread
    let otherUser

    if (new Types.ObjectId(currentId).equals(firstUser)) {
      otherUser = await UserRepo.findUserById(String(secondUser))
      unread = {
        unReadFirstUser: 0
      }
    }

    if (new Types.ObjectId(currentId).equals(secondUser)) {
      otherUser = await UserRepo.findUserById(String(firstUser))
      unread = {
        unReadSecondUser: 0
      }
    }

    if (!otherUser) throw new Error('otherUser is not found')

    await currentChat.updateOne(unread, { new: true })

    return { otherUser }
  }

  static increaseUnread = async function (id: string, currentId: string) {
    const currentChat = await ChatOneToOneModel.findById(id)

    const firstUser = currentChat?.firstUser as Types.ObjectId
    const secondUser = currentChat?.secondUser as Types.ObjectId

    let unread

    if (new Types.ObjectId(currentId).equals(firstUser)) {
      unread = {
        unReadSecondUser: 1
      }
    }

    if (new Types.ObjectId(currentId).equals(secondUser)) {
      unread = {
        unReadFirstUser: 1
      }
    }

    return await ChatOneToOneModel.findOneAndUpdate(
      { _id: id },
      {
        $inc: unread
      },
      { new: true }
    )
  }

  static findByBothUser(sender: string, recipient: string) {
    return ChatOneToOneModel.findOne({
      $or: [
        {
          firstUser: new Types.ObjectId(sender),
          secondUser: new Types.ObjectId(recipient)
        },
        {
          firstUser: new Types.ObjectId(recipient),
          secondUser: new Types.ObjectId(sender)
        }
      ]
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
            messages: 1
          }
        }
      ],
      { $limit: 1 }
    )
  }
}

export default ChatOneToOneRepo
