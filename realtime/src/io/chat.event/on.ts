import { TCustomSocket } from '@/types/socket.types'
import { Server } from 'socket.io'
import { ChatDataType, chatEvent } from './register'
import validateResource from '@/utils/validateResourse'
import { send_message_schema } from '@/schema/chat.event'
import ChatOneToOneService from '@/services/chatOneToOne.services'
import emitServiceError from '../emitServiceError'

export default function (socket: TCustomSocket, io: Server) {
  socket.on(chatEvent.send_message, async (data: ChatDataType[chatEvent.send_message]) => {
    try {
      validateResource(send_message_schema, data)
      const { newMessage, sender, recipient } = await ChatOneToOneService.createMessage(data)

      io.to(sender.socketId).emit(chatEvent.new_message, {
        newMessage: newMessage
      })

      io.to(recipient.socketId).emit(chatEvent.new_message, {
        newMessage: newMessage
      })
    } catch {
      const message = 'something went wrong! please try again later.'
      emitServiceError(socket, io, message)
    }
  })
}
