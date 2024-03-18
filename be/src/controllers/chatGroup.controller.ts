import { OkResponse } from '@/core/success.responses'
import { TGetChatGroupSchema } from '@/schema/chatGroup.schema'
import ChatGroupService from '@/services/chatGroup.services'
import { Request, Response } from 'express'

export default class GroupController {
  static getGroupsHandler = async function (_: Request, res: Response) {
    const user = res.locals.user

    new OkResponse(await ChatGroupService.getGroups(user._id)).send(res)
  }

  static getGroupDetailHandler = async function (
    req: Request<TGetChatGroupSchema>,
    res: Response
  ) {
    const user = res.locals.user
    const chatGroupId = req.params.chatGroupId

    new OkResponse(await ChatGroupService.getGroupDetail(chatGroupId, user._id)).send(res)
  }
}
