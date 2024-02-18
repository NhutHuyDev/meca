import { BadRequestError, ConflictError } from '../core/error.responses'
import { omit } from 'lodash'
import UserRepo from '../models/repositories/user.repo'
import UserModel, { User, privateFields } from '../models/user.model'
import sendEmail from '../utils/mailer'
import log from '../utils/logger'
import { nanoid } from 'nanoid'
import KeyStoreRepo from '../models/repositories/keyStore.repo'

class UserService {
  static createUser = async function (input: Partial<User>) {
    /**
     * @description check uniqueness of email
     */
    const user = await UserRepo.findUserByEmail(input.email || '')

    if (user) throw new ConflictError('email is already in use')

    const newUser = await UserModel.create(input)

    await KeyStoreRepo.createKeyPair(String(newUser._id))

    await sendEmail({
      to: newUser.email,
      from: 'test@example.com',
      subject: 'Verify your email',
      text: `verification code: ${newUser.verificationCode}. Id: ${newUser._id}`
    })

    return omit(newUser.toJSON(), privateFields)
  }

  static verifyUser = async function (id: string, verificationCode: string) {
    /**
     * @description check if user id exists
     */
    const user = await UserRepo.findUserById(id)

    if (!user) throw new BadRequestError("user doesn't exist")

    if (user.verified) return 'user already verified'

    /**
     * @description check to see if the verificationCode matches
     */
    if (user.verificationCode === verificationCode) {
      user.verified = true
      await user.save()

      return 'user successfully verified'
    }

    return 'could not verify user'
  }

  static sendResetPasswordCode = async function (email: string) {
    const user = await UserRepo.findUserByEmail(email)

    if (!user) {
      log.debug(`user with email ${email} does not exists`)
      return "email doesn't exist, please create your account"
    }

    if (!user.verified) {
      return 'user is not verified'
    }

    const passwordResetCode = nanoid()

    user.passwordResetCode = passwordResetCode

    await user.save()

    /**
     * @description send email the reset password code
     */
    await sendEmail({
      to: user.email,
      from: 'test@example.com',
      subject: 'Reset your password',
      text: `Password reset code: ${passwordResetCode}. Id ${user._id}`
    })

    log.debug(`Password reset email sent to ${email}`)

    return `access your email - ${email} to get reset password code`
  }

  static resetPassword = async function (id: string, newPassword: string, passwordResetCode: string) {
    const user = await UserRepo.findUserById(id)

    if (!user) throw new BadRequestError("user doesn't exist")

    if (!user.passwordResetCode || user.passwordResetCode !== passwordResetCode) {
      return 'could not reset user password'
    }

    user.passwordResetCode = null

    user.password = newPassword

    await user.save()

    return 'successfully updated password'
  }
}

export default UserService
