import { BadRequestError, InternalServerError } from '../core/error.responses'
import UserRepo from '../models/repositories/user.repo'
import sendEmail from '../utils/mailer'
import log from '../utils/logger'
import CredentialRepo from '../models/repositories/credential.repo'
import fs from 'fs'
import path from 'path'

class CredentialService {
  static sendResetPasswordCode = async function (email: string) {
    /**
     * @description 1. kiểm tra email có tồn tại hay không
     */
    const user = await UserRepo.findUserByEmail(email)
    if (!user) {
      throw new BadRequestError("email doesn't exist, please create your account")
    }

    /**
     * @description 2. sinh mới và lưu passwordResetCode
     */
    const userCredential = await CredentialRepo.findOneByUserId(String(user._id))

    if (!userCredential) throw new InternalServerError()

    const passwordResetCode = userCredential.generatePasswordResetCode()
    await userCredential.save()

    const resetPasswordUrl = `http://localhost:3000/auth/new-password/${user._id}/${passwordResetCode}`

    /**
     * @description 3. tạo template để gửi mail
     */
    const parentDir = path.resolve(__dirname, '..')

    try {
      const emailTemplate = fs.readFileSync(
        path.join(parentDir, 'templates/resetPassword.template.html'),
        'utf-8'
      )

      const html = emailTemplate.replace('{{passwordResetUrl}}', resetPasswordUrl)

      /**
       * @description 4. gửi mail
       */
      await sendEmail({
        to: user.email,
        from: 'test@example.com',
        subject: 'Reset your password',
        text: `Password reset code: ${passwordResetCode}. Id ${user._id}`,
        html: html,
        attachments: [
          {
            filename: 'icon-2.png',
            path: path.join(parentDir, 'templates/img.template/icon-2.png'),
            cid: 'imageUrl'
          }
        ]
      })
      log.info(`Verify OTP sent to ${email}`)
      return {
        email: email,
        message: `access your email - ${email} to get reset password code`
      }
    } catch (error) {
      throw new InternalServerError()
    }
  }

  static resetPassword = async function (
    userId: string,
    newPassword: string,
    passwordResetCode: string
  ) {
    /**
     * @description 1. kiểm tra có tồn tại yêu cầu reset lại password hay không
     */
    const userCredential = await CredentialRepo.findValidRequestResetPassword(userId)

    if (!userCredential) throw new BadRequestError('could not reset user password 1')

    /**
     * @description 2. kiểm tra password reset code có tồn tại trong database hay không
     */
    if (!userCredential.passwordResetCode) {
      throw new BadRequestError('could not reset user password 2')
    }

    /**
     * @description 3. validation password reset code
     */
    if (await userCredential.validatePasswordResetCode(passwordResetCode)) {
      userCredential.passwordResetCode = null
      userCredential.passwordResetExpires = null
      userCredential.credPassword = newPassword
      await userCredential.save()
      return 'successfully updated user password'
    }

    throw new BadRequestError('could not reset user password 3')
  }
}

export default CredentialService
