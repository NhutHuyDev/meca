import MessageModel, { Message, messageType } from '@/models/message.model'

class MessageRepo {
  static createTextMessage = async function (
    sender: string,
    recipient: string,
    chatOneToOne: string,
    text: string
  ) {
    return MessageModel.create({
      type: messageType.Text,
      sender,
      recipient,
      chatOneToOne,
      text
    })
  }
}

export default MessageRepo

// type: type,
// sender: message.sender,
// recipient: message.recipient,
// chatOneToOne: ,
// text: message.text
