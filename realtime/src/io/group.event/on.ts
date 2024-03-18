import { TCustomSocket } from '@/types/socket.types'
import { Server } from 'socket.io'
import { GroupDataType, groupEvent } from './register'
import validateResource from '@/utils/validateResourse'
import { create_group_schema } from '@/schema/group.event'
import emitServiceError from '../emitServiceError'
import ChatGroupService from '@/services/chatGroup.services'

export default function (socket: TCustomSocket, io: Server) {
  socket.on(groupEvent.create_group, async (data: GroupDataType[groupEvent.create_group]) => {
    try {
      validateResource(create_group_schema, data)
      const { newGroupId, memberSocketIds } = await ChatGroupService.create(
        data.creatorId,
        data.participantIds
      )

      console.log(newGroupId, memberSocketIds)

      // memberSocketIds.forEach((socketId) => {
      io.to(memberSocketIds).emit(groupEvent.create_success, {
        newGroupId: String(newGroupId)
      } as GroupDataType[groupEvent.create_success])
      // })
    } catch (error) {
      const message = 'something went wrong! please try again later.'
      emitServiceError(socket, io, message)
    }
  })
}
