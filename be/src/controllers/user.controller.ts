import { Request, Response } from 'express'
import {
  TCreateUserSchema,
  TVerifyUserSchema,
  TForgotPasswordSchema,
  TResetPasswordSchema
} from '../schema/user.schema'
import UserService from '../services/user.services'
import { CreatedResponse, OkResponse } from '../core/success.responses'

class UserController {
  static createUserHandler = async function (req: Request<{}, {}, TCreateUserSchema>, res: Response) {
    new CreatedResponse(await UserService.createUser(req.body)).send(res)
  }

  static verifyUserHandler = async function (req: Request<TVerifyUserSchema>, res: Response) {
    const id = req.params.id
    const verificationCode = req.params.verificationCode
    new OkResponse(await UserService.verifyUser(id, verificationCode)).send(res)
  }

  static forgotPasswordHandler = async function (req: Request<{}, {}, TForgotPasswordSchema>, res: Response) {
    const email = req.body.email
    new OkResponse(await UserService.sendResetPasswordCode(email)).send(res)
  }

  static resetPasswordHandler = async function (
    req: Request<TResetPasswordSchema['params'], {}, TResetPasswordSchema['body']>,
    res: Response
  ) {
    const id = req.params.id
    const passwordResetCode = req.params.passwordResetCode
    const newPassword = req.body.password
    new OkResponse(await UserService.resetPassword(id, newPassword, passwordResetCode)).send(res)
  }

  static getCurrentUserHandler = async function (_: Request, res: Response) {
    new OkResponse(res.locals.user).send(res)
  }
}

export default UserController
