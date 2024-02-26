import { Request, Response } from 'express'
import {
  TRequestVerifyOtpSchema,
  TCreateUserSchema,
  TVerifyUserSchema,
  TForgotPasswordSchema,
  TResetPasswordSchema
} from '../schema/user.schema'
import UserService from '../services/user.services'
import { CreatedResponse, OkResponse } from '../core/success.responses'

class UserController {
  static requestVerifyOtpHandler = async function (
    req: Request<object, object, TRequestVerifyOtpSchema>,
    res: Response
  ) {
    new CreatedResponse(await UserService.requestVerifyOtp(req.body.email)).send(res)
  }

  static verifyUserHandler = async function (
    req: Request<object, object, TVerifyUserSchema>,
    res: Response
  ) {
    const email = req.body.email
    const otp = req.body.otp
    new OkResponse(await UserService.verifyUser(email, otp)).send(res)
  }

  static createUserHandler = async function (
    req: Request<object, object, TCreateUserSchema>,
    res: Response
  ) {
    new CreatedResponse(await UserService.createUser(req.body)).send(res)
  }

  // static forgotPasswordHandler = async function (
  //   req: Request<object, object, TForgotPasswordSchema>,
  //   res: Response
  // ) {
  //   const email = req.body.email
  //   new OkResponse(await UserService.sendResetPasswordCode(email)).send(res)
  // }
  // static resetPasswordHandler = async function (
  //   req: Request<
  //     TResetPasswordSchema['params'],
  //     object,
  //     TResetPasswordSchema['body']
  //   >,
  //   res: Response
  // ) {
  //   const id = req.params.id
  //   const passwordResetCode = req.params.passwordResetCode
  //   const newPassword = req.body.password
  //   new OkResponse(
  //     await UserService.resetPassword(id, newPassword, passwordResetCode)
  //   ).send(res)
  // }
  // static getCurrentUserHandler = async function (_: Request, res: Response) {
  //   new OkResponse(res.locals.user).send(res)
  // }
}

export default UserController
