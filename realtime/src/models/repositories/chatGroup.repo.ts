import { Types } from 'mongoose'
import ChatGroupModel, { ParticipantUnread } from '../chatGroup.model'

class ChatGroupRepo {
  static create = async function (creatorId: string, participantIds: string[]) {
    const participantUnreads = participantIds.map(
      (participantId): ParticipantUnread => ({
        participantId: new Types.ObjectId(participantId),
        unread: 0
      })
    )

    return await ChatGroupModel.create({
      creator: creatorId,
      participants: participantIds,
      participantUnreads
    })
  }
}

export default ChatGroupRepo
