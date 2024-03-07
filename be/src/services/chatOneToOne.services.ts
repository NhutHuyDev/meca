import ChatOneToOneRepo from '../models/repositories/chatOneToOne.repo'
import MessageRepo from '../models/repositories/message.repo'
import { Types } from 'mongoose'
import { pick } from 'lodash'

class ChatOneToOneService {
  static getChatOneToOnes = async function (userId: string) {
    return await ChatOneToOneRepo.findByUserId(userId)
  }

  static getDetail = async function (id: string, currentId: string) {
    return await ChatOneToOneRepo.getDetail(id, currentId)
  }

  static createMessage = async function (
    chatOneToOne: string,
    type: string,
    text: string,
    sender: string,
    recipient: string
  ) {
    const newMessage = await MessageRepo.create({
      chatOneToOne: new Types.ObjectId(chatOneToOne),
      type,
      text,
      sender: new Types.ObjectId(sender),
      recipient: new Types.ObjectId(recipient)
    })

    return pick(newMessage, [
      '_id',
      'chatOneToOne',
      'type',
      'text',
      'sender',
      'recipient',
      'createdAt'
    ])
  }
}

export default ChatOneToOneService
