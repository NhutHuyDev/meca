import { Server, Socket } from 'socket.io'
import { ChatEvents, TSendMessageData } from './chat.event.list'
import ChatOneToOneService from '../../services/chatOneToOne.services'
import UserRepo from '../../models/repositories/user.repo'

function handleChatEvent(socket: Socket, io: Server): void {
  socket.on(ChatEvents.send_message, async (data: TSendMessageData) => {
    const { chatOneToOne, type, text, sender, recipient } = data

    const senderUser = await UserRepo.findUserById(String(sender))
    const recipientUser = await UserRepo.findUserById(String(recipient))

    if (senderUser && recipientUser) {
      const newMessage = await ChatOneToOneService.createMessage(
        chatOneToOne,
        type,
        text,
        sender,
        recipient
      )

      io.to(senderUser.socketId).emit(ChatEvents.new_message, newMessage)
      io.to(recipientUser.socketId).emit(ChatEvents.new_message, newMessage)
    }
  })
}

export default handleChatEvent
