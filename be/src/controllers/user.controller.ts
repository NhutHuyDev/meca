import { Request, Response } from 'express'
import {
  TRequestVerifyOtpSchema,
  TCreateUserSchema,
  TVerifyUserSchema
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

  static getCurrentUserHandler = async function (_: Request, res: Response) {
    new OkResponse(res.locals.user).send(res)
  }
}

export default UserController
