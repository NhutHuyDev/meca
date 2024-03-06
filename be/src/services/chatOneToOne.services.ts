import ChatOneToOneRepo from '../models/repositories/chatOneToOne.repo'

class ChatOneToOneService {
  static getChatOneToOnes = async function (userId: string) {
    return await ChatOneToOneRepo.findByUserId(userId)
  }
}

export default ChatOneToOneService
