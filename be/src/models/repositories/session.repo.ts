import { DocumentType } from '@typegoose/typegoose'
import { omit } from 'lodash'
import { signJwt } from '../../helpers/jwt'
import SessionModel from '../session.model'
import { User, privateFields } from '../user.model'
import config from '../../config'

class SessionRepo {
  static createSession = async function (userId: string) {
    return SessionModel.create({ user: userId })
  }

  static findSessionById = async function (id: string) {
    return SessionModel.findById(id)
  }

  static signRefreshToken = async function (userId: string, signingKey: string) {
    const session = await SessionRepo.createSession(userId)

    const refreshToken = signJwt(
      {
        session: session._id
      },
      signingKey,
      {
        expiresIn: config.app.refresh_token_expiration
      }
    )

    session.refreshToken = refreshToken

    await session.save()

    return refreshToken
  }

  static signAccessToken = async function (user: DocumentType<User>, signingKey: string) {
    const payload = omit(user.toJSON(), privateFields)

    const accessToken = signJwt(payload, signingKey, {
      expiresIn: config.app.access_token_expiration
    })

    return accessToken
  }
}

export default SessionRepo
