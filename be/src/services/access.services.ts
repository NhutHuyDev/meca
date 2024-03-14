import CredentialRepo from '@/models/repositories/credential.repo'
import {
  BadRequestError,
  InternalServerError,
  UnauthorizedError
} from '@/core/error.responses'
import { verifyJwt } from '@/helpers/jwt'
import KeyStoreRepo from '@/models/repositories/keyStore.repo'
import SessionRepo from '@/models/repositories/session.repo'
import UserRepo from '@/models/repositories/user.repo'

class AccessService {
  static signIn = async function (credLogin: string, credPassword: string) {
    /**
     * @description 1. kiểm tra credLogin
     */
    const userCredential = await CredentialRepo.findOneByCredLogin(credLogin)

    if (!userCredential) {
      throw new BadRequestError(`email isn't correct`)
    }

    /**
     * @description 2. Validate credPassword
     */

    const isValid = await userCredential.validatePassword(credPassword)

    if (!isValid) {
      throw new BadRequestError(`password isn't correct`)
    }

    /**
     * @description 3. Load thông tin user hiện tại
     */

    const currentUser = await UserRepo.findUserById(String(userCredential.user))

    if (!currentUser) {
      throw new InternalServerError()
    }

    /**
     * @description 4. Load thông tin khóa public
     */

    const keyPair = await KeyStoreRepo.getKeyPairByUserId(String(currentUser?._id))

    const signingKey = keyPair.privateKeyDecoding

    /**
     * @description 5. Ký và gửi các token
     */

    const accessToken = await SessionRepo.signAccessToken(currentUser, signingKey)

    const refreshToken = await SessionRepo.signRefreshToken(
      String(currentUser._id),
      signingKey
    )

    return {
      accessToken,
      refreshToken,
      clientId: userCredential.user
    }
  }

  static signOut = async function (refreshToken: string, clientId: string) {
    /**
     * @description 1. lấy cặp khóa public và private từ clientId
     */
    const keyPair = await KeyStoreRepo.getKeyPairByUserId(clientId)

    const verifyingKey = keyPair.publicKeyDecoding

    /**
     * @description 2. Verify refresh token
     */
    const decoded = verifyJwt<{ session: string }>(refreshToken, verifyingKey)

    if (!decoded) throw new UnauthorizedError('refresh token isn`t valid')

    /**
     * @description 3. load session hiện tại của refresh token
     */
    const currentSession = await SessionRepo.findSessionById(decoded.session)

    if (!currentSession) throw new UnauthorizedError('session isn`t found')

    if (!currentSession.available) throw new BadRequestError(`session has already unavailable`)

    /**
     * @description 4. kiểm tra lần nữa current session có thuộc về clientId không
     */
    if (String(currentSession.user) !== clientId)
      throw new UnauthorizedError(`clientId isn't valid`)

    /**
     * @description 5. disable current session
     */
    currentSession.available = false

    currentSession.save()

    return 'sign out successfully'
  }

  static refreshAccessToken = async function (refreshToken: string, clientId: string) {
    /**
     * @description 1. lấy cặp khóa public và private từ clientId
     */
    const keyPair = await KeyStoreRepo.getKeyPairByUserId(clientId)

    const verifyingKey = keyPair.publicKeyDecoding
    const signingKey = keyPair.privateKeyDecoding

    /**
     * @description 2. Verify refresh token
     */
    const decoded = verifyJwt<{ session: string }>(refreshToken, verifyingKey)

    if (!decoded) {
      throw new UnauthorizedError(`refresh access isn't valid`)
    }

    /**
     * @description 3. load session hiện tại của refresh token
     */
    const currentSession = await SessionRepo.findSessionById(decoded.session)

    if (!currentSession) throw new UnauthorizedError('session isn`t found')

    if (!currentSession.available) throw new UnauthorizedError(`session isn't available`)

    /**
     * @description 4. kiểm tra refresh token gửi đến có nằm trong db hay không
     */

    if (currentSession.refreshToken !== refreshToken)
      throw new UnauthorizedError(`refresh token isn't found`)

    /**
     * @description 5. kiểm tra lần nữa current session có thuộc về clientId không
     */

    if (String(currentSession.user) !== clientId)
      throw new UnauthorizedError(`clientId isn't valid`)

    /**
     * @description 6. tạo access token mới, thực hiện refresh token rotation và gửi chúng đi
     */
    const user = await UserRepo.findUserById(String(currentSession.user))

    if (!user) throw new InternalServerError()

    const accessToken = await SessionRepo.signAccessToken(user, signingKey)

    const newRefreshToken = await SessionRepo.updateRefreshToken(
      String(currentSession._id),
      signingKey
    )

    return { accessToken, refreshToken: newRefreshToken }
  }
}

export default AccessService
