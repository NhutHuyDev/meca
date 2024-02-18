import { Request, Response, NextFunction } from 'express'
import { verifyJwt } from '../helpers/jwt'
import customHttpHeaders from '../utils/customHttpHeaders'
import KeyStoreRepo from '../models/repositories/keyStore.repo'

const deserializeUser = async (req: Request, res: Response, next: NextFunction) => {
  const accessToken = (req.headers.authorization || '').replace(/^Bearer\s/, '')

  const clientId = req.headers[customHttpHeaders.CLIENT_ID] as string

  if (!accessToken || !clientId) {
    return next()
  }

  const keyPair = await KeyStoreRepo.getKeyPairByUserId(clientId)

  const verifyingKey = keyPair.publicKeyDecoding

  const decoded = verifyJwt(accessToken, verifyingKey)

  if (decoded) {
    res.locals.user = decoded
  }

  return next()
}

export default deserializeUser
