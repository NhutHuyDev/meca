import ChatOneToOneRepo from '@/models/repositories/chatOneToOne.repo'
import MessageRepo from '@/models/repositories/message.repo'
import { omit } from 'lodash'
import { ChatDataType, chatEvent } from '@/io/chat.event/register'
import { messageType } from '@/models/message.model'
import UserRepo from '@/models/repositories/user.repo'

class ChatOneToOneService {
  static getChatOneToOnes = async function (userId: string) {
    return await ChatOneToOneRepo.findByUserId(userId)
  }

  static getDetail = async function (id: string, currentId: string) {
    return await ChatOneToOneRepo.getDetail(id, currentId)
  }

  static createMessage = async function (data: ChatDataType[chatEvent.send_message]) {
    const message = data.message

    const sender = await UserRepo.findUserById(message.sender)
    const recipient = await UserRepo.findUserById(message.recipient)

    if (!sender || !recipient) throw new Error('user is not found')

    const type = message.type

    let newMessage

    switch (type) {
      case messageType.Text:
        if (!message.text || message.text === '') {
          throw new Error('message text is not empty')
        }

        newMessage = await MessageRepo.createTextMessage(
          message.sender,
          message.recipient,
          message.chatOneToOne,
          message.text
        )
        break

      case messageType.Media:
        break

      case messageType.Link:
        break

      case messageType.Document:
        break

      default:
        throw new Error('unsupport message type')
    }

    await ChatOneToOneRepo.increaseUnread(message.chatOneToOne, message.sender)

    return {
      sender,
      recipient,
      newMessage: omit(newMessage, ['__v', 'chatGroup'])
    }
  }

  static clearUnread = async function (id: string, currentId: string) {
    return await ChatOneToOneRepo.clearUnread(id, currentId)
  }
}

export default ChatOneToOneService
