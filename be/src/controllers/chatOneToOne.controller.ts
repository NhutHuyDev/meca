import { Request, Response } from 'express'
import { OkResponse } from '@/core/success.responses'
import ChatOneToOneService from '@/services/chatOneToOne.services'
import { TGetDetailChatSchema } from '@/schema/chatOneToOne.schema'

class ChatOneToOneController {
  static getChatsHandler = async function (_: Request, res: Response) {
    const user = res.locals.user

    new OkResponse(await ChatOneToOneService.getChatOneToOnes(user._id)).send(res)
  }

  static getChatDetailHandler = async function (
    req: Request<TGetDetailChatSchema>,
    res: Response
  ) {
    const user = res.locals.user
    const chatOneToOneId = req.params.chatOneToOneId

    new OkResponse(await ChatOneToOneService.getDetail(chatOneToOneId, user._id)).send(res)
  }
}

export default ChatOneToOneController
