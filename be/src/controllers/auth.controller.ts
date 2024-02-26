import { Request, Response } from 'express'
import { TCreateSessionSchema } from '../schema/session.schema'
import { OkResponse } from '../core/success.responses'
import AccessService from '../services/access.services'
import customHttpHeaders from '../utils/customHttpHeaders'

class AuthController {
  static signInHandler = async function (
    req: Request<object, object, TCreateSessionSchema>,
    res: Response
  ) {
    const { credLogin, credPassword } = req.body

    new OkResponse(await AccessService.signIn(credLogin, credPassword)).send(res)
  }

  static signOutHandler = async function (req: Request, res: Response) {
    const refreshToken = req.headers[customHttpHeaders.REFRESH_TOKEN] as string
    const clientId = req.headers[customHttpHeaders.CLIENT_ID] as string

    new OkResponse(await AccessService.signOut(refreshToken, clientId)).send(res)
  }

  static refreshAccessTokenHandler = async function (req: Request, res: Response) {
    const refreshToken = req.headers[customHttpHeaders.REFRESH_TOKEN] as string
    const clientId = req.headers[customHttpHeaders.CLIENT_ID] as string

    new OkResponse(await AccessService.refreshAccessToken(refreshToken, clientId)).send(res)
  }
}

export default AuthController
