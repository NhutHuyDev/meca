import ChatGroupRepo from '@/models/repositories/chatGroup.repo'

export default class ChatGroupService {
  static getGroups = async function (userId: string) {
    return await ChatGroupRepo.findByUserId(userId)
  }

  static getGroupDetail = async function (id: string, currentId: string) {
    return await ChatGroupRepo.findOneById(id, currentId)
  }
}
