import ChatGroupRepo from '@/models/repositories/chatGroup.repo'
import UserRepo from '@/models/repositories/user.repo'
import UserModel from '@/models/user.model'

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
}
