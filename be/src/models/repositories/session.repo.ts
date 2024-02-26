import { DocumentType } from '@typegoose/typegoose'
import { omit } from 'lodash'
import { decodeJwt, signJwt } from '../../helpers/jwt'
import SessionModel from '../session.model'
import { User, privateFields } from '../user.model'
import config from '../../config'
import log from '../../utils/logger'

class SessionRepo {
  // static createSession = async function (userId: string) {
  //   return SessionModel.create({ user: userId })
  // }

  static findSessionById = async function (id: string) {
    return SessionModel.findById(id)
  }

  static signRefreshToken = async function (userId: string, signingKey: string) {
    const session = await SessionModel.create({ user: userId })

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

  static updateRefreshToken = async function (userId: string, signingKey: string) {
    const currentSession = await SessionModel.findById(userId)

    if (currentSession) {
      const currentRefreshToken = currentSession.refreshToken

      const decodeRefreshToken = decodeJwt(currentRefreshToken)

      if (!decodeRefreshToken || !decodeRefreshToken.payload.exp) return null

      const oldExpiredTime = decodeRefreshToken.payload.exp

      const newRefreshToken = signJwt(
        {
          session: currentSession._id
        },
        signingKey,
        {
          expiresIn: oldExpiredTime - Math.floor(Date.now() / 1000)
        }
      )

      currentSession.refreshToken = newRefreshToken
      currentSession.save()

      return newRefreshToken
    } else {
      return null
    }
  }
}

export default SessionRepo
