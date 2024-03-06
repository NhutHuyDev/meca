import { Request, Response } from 'express'
import { OkResponse } from '../core/success.responses'
import ChatOneToOneService from '../services/chatOneToOne.services'

class ChatOneToOneController {
  static getChatsHandler = async function (_: Request, res: Response) {
    const user = res.locals.user
    
    new OkResponse(await ChatOneToOneService.getChatOneToOnes(user._id)).send(res)
  }
}

export default ChatOneToOneController
