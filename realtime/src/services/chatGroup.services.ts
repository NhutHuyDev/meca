import { GroupDataType, groupEvent } from '@/io/group.event/register'
import ChatGroupModel from '@/models/chatGroup.model'
import { messageType } from '@/models/message.model'
import ChatGroupRepo from '@/models/repositories/chatGroup.repo'
import MessageRepo from '@/models/repositories/message.repo'
import UserRepo from '@/models/repositories/user.repo'
import UserModel, { User } from '@/models/user.model'
import { omit } from 'lodash'

export default class ChatGroupService {
  static create = async function (creatorId: string, participantIds: string[]) {
    const creator = await UserRepo.findUserById(creatorId)
    if (!creator) {
      throw new Error('creator user is not found')
    }

    const participants = await UserModel.find({
      _id: { $in: participantIds }
    })

    if (participants.length !== participantIds.length) {
      throw new Error('one or some participants is not found')
    }

    participantIds.push(creatorId)

    const newGroup = await ChatGroupRepo.create(creatorId, participantIds)

    const memberSocketIds = participants.map((participant) => participant.socketId)

    memberSocketIds.push(creator.socketId)

    return {
      newGroupId: newGroup._id,
      memberSocketIds
    }
  }

  static createMessage = async function (data: GroupDataType[groupEvent.send_message]) {
    const message = data.message

    const sender = await UserRepo.findUserById(message.sender)
    const currentGroup = await ChatGroupModel.findById(message.chatGroup).populate({
      path: 'participants'
    })

    if (!sender || !currentGroup) throw new Error('user is not found')

    const type = message.type

    let newMessage

    switch (type) {
      case messageType.Text:
        if (!message.text || message.text === '') {
          throw new Error('message text is not empty')
        }

        newMessage = await MessageRepo.createGroupTextMessage(
          message.sender,
          message.chatGroup,
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

    await ChatGroupRepo.increaseUnread(message.chatGroup, message.sender)

    const memberSocketIds = currentGroup.participants.map(
      (participant: any) => participant.socketId
    )

    return {
      sender,
      memberSocketIds,
      newMessage: omit(newMessage, ['__v', 'chatGroup'])
    }
  }

  static clearUnread = async function (id: string, currentId: string, currLastMsgId: string) {
    return await ChatGroupRepo.clearUnread(id, currentId, currLastMsgId)
  }
}
