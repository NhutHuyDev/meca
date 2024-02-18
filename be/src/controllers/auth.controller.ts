import { Request, Response } from 'express'
import { TCreateSessionSchema } from '../schema/session.schema'
import { OkResponse } from '../core/success.responses'
import AccessService from '../services/auth.services'
import customHttpHeaders from '../utils/customHttpHeaders'

class AccessController {
  static createSessionHandler = async function (req: Request<{}, {}, TCreateSessionSchema>, res: Response) {
    const { email, password } = req.body

    new OkResponse(await AccessService.signIn(email, password)).send(res)
  }

  static refreshAccessTokenHandler = async function (req: Request, res: Response) {
    const refreshToken = req.headers[customHttpHeaders.REFRESH_TOKEN] as string
    const clientId = req.headers[customHttpHeaders.CLIENT_ID] as string

    new OkResponse(await AccessService.refreshAccessToken(refreshToken, clientId)).send(res)
  }

  static signOutHandler = async function (req: Request, res: Response) {
    const refreshToken = req.headers[customHttpHeaders.REFRESH_TOKEN] as string
    const clientId = req.headers[customHttpHeaders.CLIENT_ID] as string

    new OkResponse(await AccessService.signOut(refreshToken, clientId)).send(res)
  }
}

export default AccessController
