import { TCustomSocket } from '@/types/socket.types'
import { Server } from 'socket.io'
import { GroupDataType, groupEvent } from './register'
import validateResource from '@/utils/validateResourse'
import {
  clear_unread_schema,
  create_group_schema,
  send_message_schema
} from '@/schema/group.event'
import emitServiceError from '../emitServiceError'
import ChatGroupService from '@/services/chatGroup.services'
import addToAsyncQueue from '@/utils/asyncReqQueue'

export default function (socket: TCustomSocket, io: Server) {
  socket.on(groupEvent.create_group, async (data: GroupDataType[groupEvent.create_group]) => {
    try {
      validateResource(create_group_schema, data)
      const { newGroupId, memberSocketIds } = await ChatGroupService.create(
        data.creatorId,
        data.participantIds
      )

      io.to(memberSocketIds).emit(groupEvent.create_success, {
        newGroupId: String(newGroupId)
      } as GroupDataType[groupEvent.create_success])
    } catch (error) {
      const message = 'something went wrong! please try again later.'
      emitServiceError(socket, io, message)
    }
  })

  socket.on(groupEvent.send_message, async (data: GroupDataType[groupEvent.send_message]) => {
    try {
      validateResource(send_message_schema, data)
      const { newMessage, memberSocketIds } = await ChatGroupService.createMessage(data)

      io.to(memberSocketIds).emit(groupEvent.new_message, {
        newMessage: newMessage
      })
    } catch (error) {
      const message = 'something went wrong! please try again later.'
      emitServiceError(socket, io, message)
    }
  })

  socket.on(groupEvent.clear_unread, async (data: GroupDataType[groupEvent.clear_unread]) => {
    await addToAsyncQueue(async (): Promise<void> => {
      try {
        validateResource(clear_unread_schema, data)

        const { totalUnread, lastMsgSender } = await ChatGroupService.clearUnread(
          data.groupId,
          data.currentId,
          data.currLastMsgId
        )

        io.to(lastMsgSender.socketId).emit(groupEvent.user_seen, {
          groupId: data.groupId,
          totalUnread: totalUnread
        } as GroupDataType[groupEvent.user_seen])
      } catch {
        const message = 'something went wrong! please try again later.'
        emitServiceError(socket, io, message)
      }
    })
  })
}
