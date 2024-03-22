import { Types } from 'mongoose'
import ChatGroupModel, { ParticipantUnread } from '../chatGroup.model'
import UserModel from '../user.model'
import MessageModel from '../message.model'

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

  static increaseUnread = async function (id: string, currentId: string) {
    const currentChat = await ChatGroupModel.findById(id)

    const unreads = currentChat?.participantUnreads

    unreads?.forEach((unreads) => {
      if (String(unreads.participantId) !== currentId) {
        unreads.unread = unreads.unread + 1
      }
    })

    await currentChat?.updateOne({
      participantUnreads: unreads
    })
  }

  static clearUnread = async function (id: string, currentId: string, currLastMsgId: string) {
    console.log('--- running service repo ---')
    console.log('::id: ', id)
    console.log('::currentId: ', currentId)
    console.log('::currLastMsgId: ', currLastMsgId)

    const currentChat = await ChatGroupModel.findById(id)
    const lastMsg = await MessageModel.findById(currLastMsgId)

    if (!currentChat) throw new Error('current group or current user is not found')

    if (!lastMsg) throw new Error('last msg is not found')

    const lastMsgSender = await UserModel.findById(lastMsg.sender)

    if (!lastMsgSender) throw new Error('last msg sender is not found')

    const unreads = currentChat.participantUnreads

    let totalUnread = 0
    unreads.forEach((unreadInstance) => {
      if (String(unreadInstance.participantId) === currentId) {
        unreadInstance.unread = 0
      }
    })

    unreads.forEach((unread) => {
      if (unread.unread === 0) {
        totalUnread += 1
      }
    })

    await currentChat.updateOne({
      participantUnreads: unreads
    })

    return { totalUnread: totalUnread - 1, lastMsgSender }
  }
}

export default ChatGroupRepo
