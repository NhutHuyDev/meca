import { Request, Response } from 'express'
import { TForgotPasswordSchema, TResetPasswordSchema } from '@/schema/credential.schema'
import CredentialService from '@/services/credential.services'
import { OkResponse } from '@/core/success.responses'

class CredentialController {
  static forgotPasswordHandler = async function (
    req: Request<object, object, TForgotPasswordSchema>,
    res: Response
  ) {
    const email = req.body.email
    new OkResponse(await CredentialService.sendResetPasswordCode(email)).send(res)
  }

  static resetPasswordHandler = async function (
    req: Request<TResetPasswordSchema['params'], object, TResetPasswordSchema['body']>,
    res: Response
  ) {
    const userId = req.params.userId
    const passwordResetCode = req.params.passwordResetCode
    const newPassword = req.body.password
    new OkResponse(
      await CredentialService.resetPassword(userId, newPassword, passwordResetCode)
    ).send(res)
  }
}

export default CredentialController
