import MessageModel, { Message } from '@/models/message.model'

class MessageRepo {
  static create = async function (data: Partial<Message>) {
    return MessageModel.create(data)
  }
}

export default MessageRepo
