import { BadRequestError, UnauthorizedError } from '../core/error.responses'
import { verifyJwt } from '../helpers/jwt'
import KeyStoreRepo from '../models/repositories/keyStore.repo'
import SessionRepo from '../models/repositories/session.repo'
import UserRepo from '../models/repositories/user.repo'

class AccessService {
  static signIn = async function (email: string, password: string) {
    const user = await UserRepo.findUserByEmail(email)

    if (!user) {
      throw new BadRequestError('invalid email or password')
    }

    const isValid = await user.validatePassword(password)

    if (!isValid) {
      throw new BadRequestError('invalid email or password')
    }

    const keyPair = await KeyStoreRepo.getKeyPairByUserId(String(user._id))

    const signingKey = keyPair.privateKeyDecoding

    const accessToken = await SessionRepo.signAccessToken(user, signingKey)

    const refreshToken = await SessionRepo.signRefreshToken(user.id, signingKey)

    return {
      accessToken,
      refreshToken
    }
  }

  static refreshAccessToken = async function (refreshToken: string, clientId: string) {
    /**
     * @description step 1. Get key pair by clientId
     */
    const keyPair = await KeyStoreRepo.getKeyPairByUserId(clientId)

    const verifyingKey = keyPair.publicKeyDecoding
    const signingKey = keyPair.privateKeyDecoding

    /**
     * @description step 2. Verify refresh token
     */
    const decoded = verifyJwt<{ session: string }>(refreshToken, verifyingKey)

    if (!decoded) {
      throw new UnauthorizedError('could not refresh access token')
    }

    /**
     * @description step 3. Find current session
     */
    const session = await SessionRepo.findSessionById(decoded.session)

    if (!session || !session.valid) {
      throw new UnauthorizedError('could not refresh access token')
    }

    /**
     * @description step 4. Check if clientId matches with user of current session
     */
    const user = await UserRepo.findUserById(String(session.user))

    if (!user || String(user._id) !== clientId) {
      throw new UnauthorizedError('could not refresh access token')
    }

    /**
     * @description step 5. Sign new access token
     */
    const accessToken = await SessionRepo.signAccessToken(user, signingKey)

    return { accessToken }
  }

  static signOut = async function (refreshToken: string, clientId: string) {
    /**
     * @description step 1. Get verifying key by clientId
     */
    const keyPair = await KeyStoreRepo.getKeyPairByUserId(clientId)

    const verifyingKey = keyPair.publicKeyDecoding

    /**
     * @description step 2. Verify refresh token
     */
    const decoded = verifyJwt<{ session: string }>(refreshToken, verifyingKey)

    if (!decoded) {
      throw new UnauthorizedError('refresh token is not valid')
    }

    /**
     * @description step 3. Find current session
     */
    const session = await SessionRepo.findSessionById(decoded.session)

    if (!session) {
      throw new UnauthorizedError('session is not found')
    }

    /**
     * @description step 4. Check if clientId matches with user of current session
     */
    const user = await UserRepo.findUserById(String(session.user))

    if (!user || String(user._id) !== clientId) {
      throw new UnauthorizedError()
    }

    /**
     * @description step 5. update current session and save
     */
    session.valid = false

    session.save()

    return 'sign out successfully'
  }
}

export default AccessService
