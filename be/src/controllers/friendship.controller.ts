import { Request, Response } from 'express'
import { OkResponse } from '../core/success.responses'
import FriendshipService from '../services/friendship.services'

class FriendshipController {
  static getFriendsHandler = async function (
    req: Request<object, object, object>,
    res: Response
  ) {
    const user = res.locals.user

    new OkResponse(await FriendshipService.getFriends(user._id)).send(res)
  }
}

export default FriendshipController
